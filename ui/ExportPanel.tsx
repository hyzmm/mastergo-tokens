import React, { useState } from "react";
import { Button, Dialog } from "@mui/material";
import ExportDialog from "@ui/ExportDialog";

export default function ExportPanel() {
    const [openExportDialog, setOpenExportDialog] = useState(false);
    return (
        <>
            <Button variant={"contained"} onClick={handleOpenExportDialog}>
                导出
            </Button>
            <Dialog open={openExportDialog} onClose={handleCloseExportDialog}>
                <ExportDialog onClose={handleCloseExportDialog} />
            </Dialog>
        </>
    );
    function handleOpenExportDialog() {
        setOpenExportDialog(true);
    }

    function handleCloseExportDialog() {
        setOpenExportDialog(false);
    }
}
