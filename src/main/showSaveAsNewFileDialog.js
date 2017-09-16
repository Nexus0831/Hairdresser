import { dialog } from "electron";

function showSaveAsNewFileDialog() {
    return new Promise((resolve, reject) => {
        const file = dialog.showSaveDialog(
            {
                file: "save",
                filter: [{ name: "markdown file", extensions: ["md"] }]
            }
        );
        if (file) {
            resolve(file);
        } else {
            reject();
        }
    });
}

export default showSaveAsNewFileDialog;