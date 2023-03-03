import * as React from "react";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox, ListItemButton, ListItemIcon } from "@mui/material";
import { storageGet, storageSet } from "@messages/sender";
import { LocalStorageKeys } from "../typings/tokenCommonFields";

interface TokenListProps {
    tokens: any;
    onChange: (themes: string[]) => void;
}

export default function TokenList(props: TokenListProps) {
    const [checked, setChecked] = React.useState<string[]>([]);

    useEffect(() => {
        storageGet(LocalStorageKeys.themes).then((value) => {
            if (value) setChecked(value);
        });
    }, []);

    useEffect(() => {
        props.onChange(checked);
        storageSet(LocalStorageKeys.themes, checked).catch(console.error);
    }, [checked]);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {props.tokens &&
                Object.keys(props.tokens).map((themeName) => {
                    return (
                        <ListItemButton
                            key={themeName}
                            role={undefined}
                            onClick={handleToggle(themeName)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(themeName) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={themeName}></ListItemText>
                        </ListItemButton>
                    );
                })}
        </List>
    );
}
