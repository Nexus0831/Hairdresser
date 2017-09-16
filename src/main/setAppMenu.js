import { app, Menu, BrowserWindow } from "electron";

function setAppMenu(options) {
    const template = [
        {
            label: "ファイル",
            submenu: [
                { label: "ファイルを開く", accelerator: "CmdOrCtrl+O", click: () => options.openFile() },
                { label: "保存", accelerator: "CmdOrCtrl+S", click: () => options.saveFile() },
                { label: "名前を付けて保存", click: () => options.saveAsNewFile() },
                { label: "PDFファイルを出力", click: () => options.exportPDF() }
            ]
        },
        {
            label: "編集",
            submenu: [
                { label: "コピー", accelerator: "CmdOrCtrl+C", role: "copy" },
                { label: "ペースト", accelerator: "CmdOrCtrl+V", role: "paste" },
                { label: "カット", accelerator: "CmdOrCtrl+X", role: "cut" },
                { label: "すべて選択", accelerator: "CmdOrCtrl+A", role: "selectall" }
            ]
        },
        {
            label: "表示",
            submenu: [
                {
                    label: "デベロッパーツール",
                    accelerator: "Alt+Command+I",
                    click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
                }
            ]
        }
    ];

    if (process.platform === "darwin" ) {
        template.unshift(
            {
                label: "MarkDownEditor",
                submenu: [
                    { label: "終了", accelerator: "CmdOrCtrl+Q", click: () => app.quit() }
                ]
            }
        );
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;
