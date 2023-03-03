import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PluginCommunicator from "@ui/PluginCommunicator";
import { storageGet, storageSet, UIMessage } from "@messages/sender";
import {
    LocalStorageKeys,
    ThemeApplyData,
    ThemeApplyScope
} from "../../typings/tokenCommonFields";

interface ApplyThemeBarProps {
}

export function ApplyTheme(props: ApplyThemeBarProps) {
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [applyScope, setApplyScope] = useState(ThemeApplyScope.page);

    useEffect(() => {
        storageGet(LocalStorageKeys.applyScope).then((value) => {
            if (value) setApplyScope(value);
        });
        storageGet(LocalStorageKeys.themes).then((value) => {
            if (value) {
                setThemes(value);
                setSelectedTheme(value[0])
            }
        });
    }, []);

    useEffect(() => {
        storageSet(LocalStorageKeys.applyScope, applyScope);
    }, [applyScope]);

    return (
        <Stack
            direction="column"
            sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
            gap={2}
        >
            <FormControl
                size={"small"}
                sx={{
                    width: 200,
                }}
            >
                <InputLabel id={"select-theme-label"}>选择主题</InputLabel>
                <Select
                    labelId={"select-theme-label"}
                    label={"选择主题"}
                    value={selectedTheme}
                    onChange={handleChangeTheme}
                >
                    {themes.map((e) => {
                        return (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl
                size={"small"}
                sx={{
                    width: 130,
                }}
            >
                <InputLabel id={"apply-label"}>应用到</InputLabel>
                <Select
                    labelId={"apply-label"}
                    value={applyScope}
                    onChange={handleChangeApplyRange}
                    label={"应用到"}
                >
                    {Object.values(ThemeApplyScope).map((e) => {
                        return (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <Button variant="contained" onClick={applyTheme}>
                更新
            </Button>
        </Stack>
    );

    function handleChangeTheme(event: SelectChangeEvent) {
        setSelectedTheme(event.target.value as string);
    }

    function handleChangeApplyRange(event: SelectChangeEvent) {
        const value = event.target.value as ThemeApplyScope;
        setApplyScope(value);
        PluginCommunicator.send({
            type: UIMessage.STORAGE_SET,
            data: {
                key: "applyRange",
                data: value,
            },
        });
    }

    function applyTheme() {
        const data: ThemeApplyData = {
            newTheme: selectedTheme,
            applyScope: applyScope,
        };
        PluginCommunicator.send({
            type: UIMessage.APPLY_THEME,
            data,
        });
    }
}
