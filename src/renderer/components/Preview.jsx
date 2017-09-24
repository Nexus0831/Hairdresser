"use strict";

import React from "react";
import {Link} from "react-router";
import firebase from "firebase/firebase-browser";
import Grid from 'material-ui/Grid';
import style from './Preview.css';
import {ipcRenderer} from "electron";
import List, { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import ListSubheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';
import marked from "marked";
marked.setOptions({
    sanitize: true,
    langPrefix: '',
});

export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
            open: {},
            subjects: []
        };

        this.db = firebase.database();
        this.handleSubjectClick = this.handleSubjectClick.bind(this);
        this.handleNoteClick = this.handleNoteClick.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on("REQUEST_TEXT", () => {
            ipcRenderer.send("REPLY_TEXT", this.state.text);
        });

        ipcRenderer.on("SEND_TEXT", (_e, text) => {
            this.setState({text});
        });

        this.fetchSubjects();
    };

    handleSubjectClick = event => {
        this.state.open[event.currentTarget.id] = !this.state.open[event.currentTarget.id];
        this.setState({ open: this.state.open });
    };

    handleNoteClick = event => {
        this.fbSubjectRef = this.db.ref(event.currentTarget.id);
        return this.fbSubjectRef.once("value").then(snapshot => {
            this.setState({text: snapshot.val().text});
        })
    };

    fetchSubjects = () => {
        return this.db.ref("/subjects").once("value").then(snapshot => {
            const subjects = [];
            const open = {};

            snapshot.forEach(item => {
                subjects.push(Object.assign({key: item.key}, item.val()));
                open[item.key] = false;
                console.log(open[item.key]);
            });
            console.log(open);


            this.setState({subjects});
            this.setState({open});
        });
    };

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        const {subjects} = this.state;

        return (
            <Grid container spacing={0} style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
                <Grid item xs={2} style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: 'linear-gradient(-180deg, #84316A, #732059)',
                    color: 'white'
                }}>
                    <Link to={"/topPage"}>
                        <Button
                            color="contrast"
                        >Back</Button>
                    </Link>

                    <List subheader={<ListSubheader style={{ color: 'white' }}>科目</ListSubheader>} >

                    {subjects.map(subject =>
                        <span key={subject.key}>
                        {(() => {
                            if (subject.Notes !== undefined) {
                                return <span>
                                            <ListItem button onClick={this.handleSubjectClick} id={subject.key}>
                                                <ListItemText primary={subject.description} />
                                                {this.state.open[subject.key] ? <ExpandLess/> : <ExpandMore/>}
                                            </ListItem>

                                            <Collapse in={this.state.open[subject.key]} transitionDuration="auto" unmountOnExit>
                                                {Object.values(subject.Notes).map(note =>
                                                    <ListItem button onClick={this.handleNoteClick} id={`/subjects/${subject.key}/Notes/${note.key}`}>
                                                        <ListItemText inset secondary={note.title} />
                                                    </ListItem>
                                                )}

                                            </Collapse>
                                        </span>
                            }
                        })()}
                        </span>
                    )}

                    </List>
                </Grid>
                <Grid item xs={10} className={style.previewer} id="preview">
                    <span style={{ paddingLeft: '8px' }} dangerouslySetInnerHTML={{__html: marked(this.state.text)}}/>
                </Grid>
            </Grid>
        );
    }
}