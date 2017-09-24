'use strict';

import React from 'react';
import style from './SubjectList.css';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Menu, {MenuItem} from 'material-ui/Menu';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import {hashHistory, Link} from 'react-router';
import firebase from 'firebase/firebase-browser';

export default class SubjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: [],
            dialog: false,
            subjectName: "",
            subjects: [],
        };

        this.db = firebase.database();
        this.handleOnChangeSubjectName = this.handleOnChangeSubjectName.bind(this);
        this.handleRequestDialogClose = this.handleRequestDialogClose.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleDeleteOpen = this.handleDeleteOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchSubjects();
    };

    handleEditOpen = event => {
        this.state.open[event.currentTarget.id] = true;
        this.setState({anchorEl: event.currentTarget});
    };

    handleDeleteOpen = event => {
        this.state.open[event.currentTarget.id] = true;
        this.setState({anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: this.state.open.splice(0, 1)});
    };

    handleRequestDialogClose = () => {
        this.setState({dialog: false});
    };

    handleOnChangeSubjectName = event => {
        this.setState({subjectName: event.target.value});
    };

    handleDelete = event => {
        event.preventDefault();
        this.db.ref(event.currentTarget.id).remove().then(() => {
            return this.fetchSubjects().then(() => {
                hashHistory.push(`/subjectList`);
            });
        })
    };

    handleOnSubmit = event => {
        const {subjectName} = this.state;
        event.preventDefault();

        if (!subjectName.length) {
            return;
        }

        const newSubjectRef = this.db.ref("/subjects").push();
        const newSubject = {description: subjectName};

        newSubjectRef.update(newSubject).then(() => {
            this.setState({subjectName: ""});

            return this.fetchSubjects().then(() => {
                hashHistory.push(`/subjectList`);
            });
        });
    };

    fetchSubjects = () => {
        return this.db.ref("/subjects").once("value").then(snapshot => {
            const subjects = [];

            snapshot.forEach(item => {
                subjects.push(Object.assign({key: item.key}, item.val()));
            });

            this.setState({subjects});
            this.setState({dialog: false});
        });
    };

    renderSubjects() {
        const {subjects, open} = this.state;

        return (
            <Grid container spacing={0}>
                {subjects.map(subject =>
                    <Grid item xs={6} md={4} key={subject.key}>
                        <Card style={{margin: '10px'}}>
                            <CardContent>
                                <Typography type="headline" component="h2">
                                    {subject.description}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Link to={`/markdown/${subject.key}`}>
                                    <Button dense>
                                        新規
                                    </Button>
                                </Link>
                                {(() => {
                                    if (subject.Notes !== undefined) {
                                        return <div>
                                            <Button
                                            dense
                                            aria-owns={this.state.open ? subject.key : null}
                                            aria-haspopup="true"
                                            id={subject.key}
                                            onClick={this.handleEditOpen}
                                            >続き</Button>

                                            <Menu
                                                id={subject.key}
                                                anchorEl={this.state.anchorEl}
                                                open={open[subject.key]}
                                                onRequestClose={this.handleRequestClose}
                                            >
                                                {Object.values(subject.Notes).map(note =>
                                                    <Link to={`/markdown/${subject.key}/${note.key}`} style={{ outline: 0 }}>
                                                        <MenuItem key={note.key} onClick={this.handleRequestClose}>
                                                            {note.title}
                                                            </MenuItem>
                                                    </Link>
                                                )}
                                            </Menu>
                                            <Button
                                                dense
                                                style={{color: 'red'}}
                                                aria-owns={this.state.open ? subject.key : null}
                                                aria-haspopup="true"
                                                id={`${subject.key}-delete`}
                                                onClick={this.handleDeleteOpen}
                                            >ノートを削除</Button>
                                            <Menu
                                                id={subject.key}
                                                anchorEl={this.state.anchorEl}
                                                open={open[subject.key + "-delete"]}
                                                onRequestClose={this.handleRequestClose}
                                            >
                                                {Object.values(subject.Notes).map(note =>

                                                    <MenuItem style={{color: 'red'}} id={`/subjects/${subject.key}/Notes/${note.key}`}
                                                              onClick={this.handleDelete}>
                                                        {note.title}
                                                    </MenuItem>
                                                )}
                                            </Menu>
                                        </div>
                                    }
                                })()}



                                <Button
                                    dense
                                    style={{color: 'red'}}
                                    id={`/subjects/${subject.key}`}
                                    onClick={this.handleDelete}
                                >科目を削除</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                )}
                {this.renderAddSubject()}
            </Grid>
        )
    }

    renderAddSubject() {
        return (
            <Grid item xs={6} md={4}>
                <Card style={{margin: '10px', height: '120px'}}>
                    <Button
                        style={{width: '100%', height: '100%'}}
                        raised={true}
                        color="primary"
                        onClick={() => this.setState({dialog: true})}
                    >科目追加</Button>
                </Card>
            </Grid>
        )
    }

    renderAddSubjectForm() {
        const {subjectName} = this.state;

        return (
            <Dialog open={this.state.dialog} transition={Slide} onRequestClose={this.handleRequestDialogClose}>
                <DialogTitle><span style={{color: 'white'}}>科目を追加</span></DialogTitle>
                <form>
                    <DialogContent>
                        <TextField
                            label="科目名称"
                            style={{width: '400px', color: 'black'}}
                            onChange={this.handleOnChangeSubjectName}
                            value={subjectName}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleOnSubmit} raised={true} color="primary">
                            追加
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }

    render() {
        return (
            <div className={style.base}>
                <Link to={"/topPage"}>
                    <Button
                        color="contrast"
                    >Back</Button>
                </Link>
                {this.renderSubjects()}
                {this.renderAddSubjectForm()}
            </div>
        );
    }
}
