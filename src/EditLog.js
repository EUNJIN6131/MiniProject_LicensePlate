import * as React from "react";
import { Box } from "@mui/material";

export default function EditLog({ isModificationLogVisible,
    licensePlateBeforeModification,
    licensePlateAfterModification,
    modificationDateTime, }) {
    return (
        <>
            {isModificationLogVisible && (
                <Box>
                    <p>수정 전 : {licensePlateBeforeModification}</p>
                    <p>수정 후 : {licensePlateAfterModification}</p>
                    <p>수정 일시 : {modificationDateTime}</p>
                </Box>
            )}
        </>
    );
}