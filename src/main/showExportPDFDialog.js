import { dialog } from "electron";

function showExportPDFDialog() {
    return new Promise((resolve, reject) => {
        const file = dialog.showSaveDialog(
            {
                title: "PDFを出力",
                filter: [{ name: "pdf file", extensions: ["pdf"] }]
            }
        );

        if (file) {
            resolve(file);
        } else {
            reject();
        }
    });
}

export default showExportPDFDialog;