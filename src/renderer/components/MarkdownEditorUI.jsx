import React from "react";
import Editor from "./Editor.jsx"
import Previewer from "./Previewer.jsx";
import style from "./MarkdownEditorUI.css";
import { ipcRenderer } from "electron";

export default class MarkDownEditorUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText(e) {
        this.setState({ text: e.target.value });
    }

    componentDidMount() {
        ipcRenderer.on("REQUEST_TEXT", () => {
            ipcRenderer.send("REPLY_TEXT", this.state.text);
        });

        ipcRenderer.on("SEND_TEXT", (_e, text) => {
            this.setState({ text });
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return(
            <div className={`${style.markdownEditor} row`}>
                <Editor
                    className={`${style.editorArea} col-md-6`}
                    value={this.state.text}
                    onChange={this.onChangeText}
                />

                <span className={style.markdownBorder}></span>

                <Previewer
                    className={`${style.previewerArea} col-md-6`}
                    value={this.state.text}
                />
            </div>
        );
    }

}