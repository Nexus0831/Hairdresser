import React from "react";
import { ipcRenderer } from "electron";
import marked from "marked";
marked.setOptions({
    sanitize: true,
    langPrefix: '',
});

export default class PDFUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }
    }

    componentDidMount() {
        const text = ipcRenderer.sendSync("REQUEST_TEXT");
        this.setState({ text });
    }

    componentDidUpdate() {
        this.syncImageRenderered().then(() => {
            ipcRenderer.send("RENDERED_CONTENTS");
        });
    }

    syncImageRenderered() {
        const images = Array.prototype.slice.call(document.querySelectorAll("img"));
        const loadingImage = images.filter((image) => !image.complete);

        if (loadingImage === 0) {
            return Promise.resolve();
        }

        return Promise.all(loadingImage.map((image) =>
            new Promise((resolve) => image.onload = () => resolve())));
    }

    render() {
        return(
            <span dangerouslySetInnerHTML={{__html: marked(this.state.text)}}/>
        );
    }
}