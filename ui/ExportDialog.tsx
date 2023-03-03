import { UIMessage } from "@messages/sender";
import { DialogContent, DialogTitle } from "@mui/material";
import PluginCommunicator from "./PluginCommunicator";
import React, { useEffect } from "react";
import JsonHighlight from "@ui/components/JsonHighlight";

interface ExportDialogProps {
    onClose: VoidFunction;
}

export default function ExportDialog(props: ExportDialogProps) {
    const [tokens, setTokens] = React.useState();
    useEffect(() => {
        async function getTokens() {
            const result = await PluginCommunicator.send({
                type: UIMessage.GET_TOKENS,
            });
            setTokens(result);
        }

        getTokens().catch(console.error);
    }, []);

    return (
        <>
            <DialogTitle>Export</DialogTitle>
            <DialogContent>
                {tokens && (
                    <JsonHighlight>
                        {JSON.stringify(tokens, null, 4)}
                    </JsonHighlight>
                )}
            </DialogContent>
        </>
    );
}
