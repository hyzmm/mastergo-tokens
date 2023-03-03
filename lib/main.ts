import { MessageType, sendMsgToUI, UIMessage } from "@messages/sender";
import {
    ThemeApplyData,
    ThemeApplyScope,
    Token,
} from "../typings/tokenCommonFields";
import flatten from "lodash/fp/flatten";
import keyBy from "lodash/fp/keyBy";

import { convertTokenNameToTheme, traverse } from "@lib/helper";

mg.showUI(__html__, {
    // width: 800,
});

async function getTokensGroupedByType(): Promise<{
    effects: EffectStyle[];
    textStyles: TextStyle[];
    colors: PaintStyle[];
}> {
    let texts = mg.getLocalTextStyles();
    let paints = mg.getLocalPaintStyles();
    let effects = mg.getLocalEffectStyles();
    const teamLibrary = await mg.getTeamLibraryAsync();
    for (const { style, name } of teamLibrary) {
        texts = texts.concat(style.texts);
        paints = paints.concat(style.paints);
        effects = effects.concat(style.effects);
    }

    return {
        textStyles: texts.map((e) => {
            const v = JSON.parse(JSON.stringify(e));
            // @ts-ignore
            // delete v["ukey"];
            return v;
        }),
        colors: paints.map((e) => {
            const v = JSON.parse(JSON.stringify(e));
            // @ts-ignore
            // delete v["ukey"];
            return v;
        }),
        effects: effects.map((e) => {
            const v = JSON.parse(JSON.stringify(e));
            // @ts-ignore
            // delete v["ukey"];
            return v;
        }),
    };
}

async function getName2Token(): Promise<{ [key: string]: Token }> {
    const tokens = await getTokensGroupedByType();

    const flattenTokens = flatten(Object.values(tokens) as Token[][]);
    return keyBy("name", flattenTokens);
}

async function getGroupedTokens(): Promise<{ [key: string]: any }> {
    const map: any = {};
    const tokens = await getTokensGroupedByType();
    for (let [, tokenCategory] of Object.entries(tokens)) {
        tokenCategory.forEach((e) => {
            const names = e.name.split("/");
            let current = map;
            for (let name of names) {
                if (!current[name]) {
                    current[name] = {};
                }
                current = current[name];
            }
            Object.assign(current, e);
        });
    }
    return map;
}

mg.ui.onmessage = async ({ type, seq, data }: MessageType) => {
    console.info("Receive message from ui thread: ", type, data);

    switch (type as UIMessage) {
        case UIMessage.STORAGE_GET:
            mg.clientStorage.getAsync(data).then((value) => {
                sendMsgToUI({
                    type,
                    seq,
                    data: value,
                });
            });
            break;
        case UIMessage.STORAGE_SET:
            mg.clientStorage
                .setAsync(data.key, data.data)
                .catch((e) => console.error("failed to set storage", e));
            break;

        case UIMessage.GET_TOKENS:
            const a = await getGroupedTokens();
            sendMsgToUI({
                type,
                seq,
                data: await getGroupedTokens(),
            });
            break;
        case UIMessage.APPLY_THEME:
            applyTheme(data as ThemeApplyData).catch((e) =>
                console.error("failed to apply theme", e)
            );
            break;
    }

    async function applyTheme(data: ThemeApplyData) {
        let applyTo: ReadonlyArray<SceneNode>;
        const currentPage = mg.document.currentPage;
        switch (data.applyScope) {
            case ThemeApplyScope.page:
                applyTo = mg.document.currentPage.children;
                break;
            // case ThemeApplyScope.document:
            //     break;
            case ThemeApplyScope.selection:
                applyTo = currentPage.selection;
                break;
        }

        const name2token = await getName2Token();

        async function getNewStyleId(oldStyleId: string) {
            const oldToken = mg.getStyleById(oldStyleId);
            if (!oldToken) return null;

            const newTokenName = convertTokenNameToTheme(
                oldToken.name,
                data.newTheme
            );
            const newToken = name2token[newTokenName];
            if (mg.getStyleById(newToken.id)) {
                return newToken.id;
            } else {
                const teamLibStyle = await mg.importStyleByKeyAsync(
                    newToken.ukey
                );
                return teamLibStyle.id;
            }
        }

        for (const n of applyTo) {
            traverse(n, async (node) => {
                if (node.type == "TEXT") {
                    if (node.textStyles.length > 1) return;
                    const textStyle = node.textStyles[0];
                    if (textStyle.textStyleId) {
                        const newStyleId = await getNewStyleId(
                            textStyle.textStyleId
                        );
                        if (newStyleId) {
                            node.setRangeTextStyleId(
                                0,
                                node.characters.length,
                                newStyleId
                            );
                        }
                    }
                }
                // @ts-ignore
                if (node.fillStyleId) {
                    // @ts-ignore
                    node.fillStyleId = await getNewStyleId(node.fillStyleId);
                }
                // @ts-ignore
                if (node.strokeStyleId) {
                    // @ts-ignore
                    node.strokeStyleId = await getNewStyleId(
                        // @ts-ignore
                        node.strokeStyleId
                    );
                }
                // @ts-ignore
                if (node.effectStyleId) {
                    // @ts-ignore
                    node.effectStyleId = await getNewStyleId(
                        // @ts-ignore
                        node.effectStyleId
                    );
                }
            });
        }
    }
};
