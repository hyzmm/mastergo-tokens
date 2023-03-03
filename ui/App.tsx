import React, { useEffect, useState } from "react";
import "./App.css";
import {
    Box,
    createTheme,
    CssBaseline,
    Stack,
    Tab,
    Tabs,
    ThemeProvider,
} from "@mui/material";
import PluginCommunicator from "@ui/PluginCommunicator";
import { UIMessage } from "@messages/sender";
import TokenList from "@ui/TokenList";
import { ApplyTheme } from "@ui/components/ApplyTheme";
import ExportPanel from "@ui/ExportPanel";

function App() {
    const [themes, setThemes] = useState<string[]>([]);

    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = createTheme({
        // palette: { mode: prefersDarkMode ? "dark" : "light" }
    });

    const [tokens, setTokens] = useState<any>({});
    const [tab, setTab] = useState(0);

    useEffect(() => {
        PluginCommunicator.send({ type: UIMessage.STORAGE_GET }).then(
            (themes) => {
                if (themes) {
                    setThemes(themes);
                }
            }
        );

        async function getTokens() {
            const result = await PluginCommunicator.send({
                type: UIMessage.GET_TOKENS,
            });
            setTokens(result);
        }

        getTokens().catch(console.error);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack sx={{ height: "100%", width: "100%" }}>
                <Tabs value={tab} onChange={(e, i) => setTab(i)}>
                    <Tab label={"修改主题"}></Tab>
                    <Tab label={"定义主题"}></Tab>
                    <Tab label={"导出 "}></Tab>
                </Tabs>

                <Box
                    sx={{
                        flexGrow: 1,
                        overflow: "auto",
                    }}
                >
                    {tab == 0 && <ApplyTheme themes={themes} />}

                    {tab == 1 && Object.keys(tokens) && (
                        <TokenList tokens={tokens} onChange={setThemes} />
                    )}

                    {tab == 2 && <ExportPanel />}
                </Box>
            </Stack>
        </ThemeProvider>
    );
}

export default App;
