/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 501);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);


class FileManager {
    constructor() {
        this.filePath = "";
    }

    saveFile(filePath, text) {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_0_fs___default.a.writeFileSync(filePath, text);
            this.filePath = filePath;
            resolve();
        });
    }

    readFile(filePath) {
        return new Promise(resolve => {
            const text = __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFileSync(filePath, "utf8");
            this.filePath = filePath;
            resolve(text);
        });
    }

    overwriteFile(text) {
        return this.saveFile(this.filePath, text);
    }

    writePDF(filePath, pdf) {
        return new Promise(resolve => {
            __WEBPACK_IMPORTED_MODULE_0_fs___default.a.writeFileSync(filePath, pdf);
            resolve();
        });
    }
}

function createFileManager() {
    return new FileManager();
}

/* harmony default export */ __webpack_exports__["a"] = (createFileManager);

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);




class MainWindow {
    constructor() {
        this.window = new __WEBPACK_IMPORTED_MODULE_0_electron__["BrowserWindow"]({ width: 1200, height: 800 });
        this.window.loadURL(`file://${__dirname}/../../index.html`);
        this.window.on("closed", () => {
            this.window = null;
        });

        this.window.webContents.on("will-navigate", (e, url) => {
            e.preventDefault();
            __WEBPACK_IMPORTED_MODULE_0_electron__["shell"].openExternal(url);
        });
    }

    requestText() {
        return new Promise(resolve => {
            this.window.webContents.send("REQUEST_TEXT");
            __WEBPACK_IMPORTED_MODULE_0_electron__["ipcMain"].once("REPLY_TEXT", (_e, text) => resolve(text));
        });
    }

    sendText(text) {
        this.window.webContents.send("SEND_TEXT", text);
    }
}

function createMainWindow() {
    return new MainWindow();
}

/* harmony default export */ __webpack_exports__["a"] = (createMainWindow);

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_events__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_events__);




class PDFWindow extends __WEBPACK_IMPORTED_MODULE_1_events___default.a {
    constructor(text) {
        super(text);
        this.window = new __WEBPACK_IMPORTED_MODULE_0_electron__["BrowserWindow"]({ show: false });
        this.window.loadURL(`file://${__dirname}/../../pdf.html`);

        __WEBPACK_IMPORTED_MODULE_0_electron__["ipcMain"].once("REQUEST_TEXT", e => {
            e.returnValue = text;
        });

        __WEBPACK_IMPORTED_MODULE_0_electron__["ipcMain"].once("RENDERED_CONTENTS", () => {
            this.emit("RENDERED_CONTENTS");
        });
    }

    generatePDF() {
        return new Promise((resolve, reject) => {
            this.window.webContents.printToPDF({}, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    close() {
        this.window.close();
        this.window.on("closed", () => {
            this.window = null;
        });
    }
}

function createPDFWindow(contents, fileManager) {
    return new PDFWindow(contents, fileManager);
}

/* harmony default export */ __webpack_exports__["a"] = (createPDFWindow);

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);


function setAppMenu(options) {
    const template = [{
        label: "ファイル",
        submenu: [{ label: "ファイルを開く", accelerator: "CmdOrCtrl+O", click: () => options.openFile() }, { label: "保存", accelerator: "CmdOrCtrl+S", click: () => options.saveFile() }, { label: "名前を付けて保存", click: () => options.saveAsNewFile() }, { label: "PDFファイルを出力", click: () => options.exportPDF() }]
    }, {
        label: "編集",
        submenu: [{ label: "コピー", accelerator: "CmdOrCtrl+C", role: "copy" }, { label: "ペースト", accelerator: "CmdOrCtrl+V", role: "paste" }, { label: "カット", accelerator: "CmdOrCtrl+X", role: "cut" }, { label: "すべて選択", accelerator: "CmdOrCtrl+A", role: "selectall" }]
    }, {
        label: "表示",
        submenu: [{
            label: "デベロッパーツール",
            accelerator: "Alt+Command+I",
            click: () => __WEBPACK_IMPORTED_MODULE_0_electron__["BrowserWindow"].getFocusedWindow().toggleDevTools()
        }]
    }];

    if (process.platform === "darwin") {
        template.unshift({
            label: "MarkDownEditor",
            submenu: [{ label: "終了", accelerator: "CmdOrCtrl+Q", click: () => __WEBPACK_IMPORTED_MODULE_0_electron__["app"].quit() }]
        });
    }

    __WEBPACK_IMPORTED_MODULE_0_electron__["Menu"].setApplicationMenu(__WEBPACK_IMPORTED_MODULE_0_electron__["Menu"].buildFromTemplate(template));
}

/* harmony default export */ __webpack_exports__["a"] = (setAppMenu);

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);


function showExportPDFDialog() {
    return new Promise((resolve, reject) => {
        const file = __WEBPACK_IMPORTED_MODULE_0_electron__["dialog"].showSaveDialog({
            title: "PDFを出力",
            filter: [{ name: "pdf file", extensions: ["pdf"] }]
        });

        if (file) {
            resolve(file);
        } else {
            reject();
        }
    });
}

/* harmony default export */ __webpack_exports__["a"] = (showExportPDFDialog);

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);


function showOpenFileDialog() {
    return new Promise((resolve, reject) => {
        const files = __WEBPACK_IMPORTED_MODULE_0_electron__["dialog"].showOpenDialog({
            title: "open",
            properties: ["openFile"],
            filter: [{ name: "markdown file", extensions: ["md"] }]
        });

        if (files && files.length > 0) {
            resolve(files[0]);
        } else {
            reject();
        }
    });
}

/* harmony default export */ __webpack_exports__["a"] = (showOpenFileDialog);

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);


function showSaveAsNewFileDialog() {
    return new Promise((resolve, reject) => {
        const file = __WEBPACK_IMPORTED_MODULE_0_electron__["dialog"].showSaveDialog({
            file: "save",
            filter: [{ name: "markdown file", extensions: ["md"] }]
        });
        if (file) {
            resolve(file);
        } else {
            reject();
        }
    });
}

/* harmony default export */ __webpack_exports__["a"] = (showSaveAsNewFileDialog);

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_electron___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_electron__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createMainWindow__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setAppMenu__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__showSaveAsNewFileDialog__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createFileManager__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__showOpenFileDialog__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createPDFWindow__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__showExportPDFDialog__ = __webpack_require__(493);









let mainWindow = null;
let fileManager = null;

__WEBPACK_IMPORTED_MODULE_0_electron__["app"].on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        __WEBPACK_IMPORTED_MODULE_0_electron__["app"].quit();
    }
});

__WEBPACK_IMPORTED_MODULE_0_electron__["app"].on("activate", (_e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
        mainWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__createMainWindow__["a" /* default */])();
    }
});

function openFile() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__showOpenFileDialog__["a" /* default */])().then(filePath => fileManager.readFile(filePath)).then(text => mainWindow.sendText(text)).catch(error => {
        console.log(error);
    });
}

function saveFile() {
    if (!fileManager.filePath) {
        saveAsNewFile();
        return;
    }

    mainWindow.requestText().then(text => fileManager.overwriteFile(text)).catch(error => {
        console.log(error);
    });
}

function saveAsNewFile() {
    Promise.all([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__showSaveAsNewFileDialog__["a" /* default */])(), mainWindow.requestText()]).then(([filePath, text]) => fileManager.saveFile(filePath, text)).catch(error => {
        console.log(error);
    });
}

function exportPDF() {
    Promise.all([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__showExportPDFDialog__["a" /* default */])(), mainWindow.requestText()]).then(([filePath, text]) => {
        const pdfWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__createPDFWindow__["a" /* default */])(text);
        pdfWindow.on("RENDERED_CONTENTS", () => {
            pdfWindow.generatePDF().then(pdf => fileManager.writePDF(filePath, pdf)).then(() => pdfWindow.close()).catch(error => {
                console.log(error);
                pdfWindow.close();
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

__WEBPACK_IMPORTED_MODULE_0_electron__["app"].on("ready", () => {
    mainWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__createMainWindow__["a" /* default */])();
    fileManager = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__createFileManager__["a" /* default */])();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__setAppMenu__["a" /* default */])({ openFile, saveFile, saveAsNewFile, exportPDF });
});

/***/ }),

/***/ 845:
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ 846:
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map