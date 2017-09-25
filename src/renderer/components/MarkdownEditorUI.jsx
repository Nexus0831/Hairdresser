'use strict';

import React from "react";
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github'; // カラーテーマを選ぶ
import style from "./MarkdownEditorUI.css";
import {ipcRenderer} from "electron";
import {hashHistory, Link} from "react-router";
import Grid from "material-ui/Grid";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import marked from "marked";
marked.setOptions({
    gfm: true,
});
import firebase from "firebase/firebase-browser";

export default class MarkDownEditorUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
        };

        this.db = firebase.database();
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    onChangeText = text => {
        this.setState({text: text});
    };

    onChangeTitle = event => {
        this.setState({title: event.target.value});
    };


    componentDidMount() {
        ipcRenderer.on("REQUEST_TEXT", () => {
            ipcRenderer.send("REPLY_TEXT", this.state.text);
        });

        ipcRenderer.on("SEND_TEXT", (_e, text) => {
            this.setState({text});
        });

        const {subjectId, noteId} = this.props.params;

        if (noteId !== undefined) {
            this.fbSubjectRef = this.db.ref(`/subjects/${subjectId}/Notes/${noteId}`);
            return this.fbSubjectRef.once("value").then(snapshot => {
                this.setState({title: snapshot.val().title});
                this.setState({text: snapshot.val().text});
            })
        } else {
            this.fbSubjectRef = this.db.ref(`/subjects/${subjectId}`);
        }

    }

    handleOnSubmit = event => {
        const {title, text} = this.state;
        const {noteId} = this.props.params;
        event.preventDefault();

        if (!title.length || !text.length) {
            return;
        }

        if (noteId === undefined) {
            const newNoteRef = this.fbSubjectRef.child("Notes").push();
            const newNote = {
                title: title,
                writeDay: Date.now(),
                text: text,
                key: newNoteRef.key
            };

            newNoteRef.update(newNote).then(() => {
                hashHistory.push(`/subjectList`);
            });
        } else {
            this.fbSubjectRef.set({
                title: title,
                writeDay: Date.now(),
                text: text,
                key: noteId
            }).then(() => {
                hashHistory.push(`/subjectList`);
            });

        }

    };

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return (
            <div className={style.markdownEditor}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <TextField
                            label="タイトル"
                            style={{marginBottom: '10px', width: '70%'}}
                            onChange={this.onChangeTitle}
                            value={this.state.title}
                        />

                        <Button
                            raised={true}
                            color="primary"
                            className={style.submitButton}
                            style={{marginLeft: '5%'}}
                            onClick={this.handleOnSubmit}
                        >保存</Button>

                        <Link to={"/subjectList"} style={{marginLeft: '5%'}}>
                            <Button
                                color="contrast"
                            >Back</Button>
                        </Link>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={0}
                      style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
                    <Grid item xs={6} md={6} style={{borderRight: 'solid #000 1px', height: '100%'}}>
                        <AceEditor
                            mode="markdown"
                            theme="github"
                            name="editor" // id
                            width="100%"
                            height="100%"
                            fontSize={16}
                            tabSize={2}
                            showPrintMargin={false} // 真ん中らへんの線を消す
                            highlightActiveLine={false} // lineのハイライトを消す
                            onChange={this.onChangeText}
                            value={this.state.text}
                        />
                    </Grid>

                    <Grid item xs={6} md={6} className={style.previewer} id="preview">
                        <span dangerouslySetInnerHTML={{__html: marked(this.state.text)}}/>
                    </Grid>
                </Grid>
            </div>
        );
    }

}