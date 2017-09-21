'use strict';

import React from "react";
import style from "./SubjectList.css";
import Card, {CardActions, CardContent} from "material-ui/Card";
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from "material-ui/Grid";
import Menu, {MenuItem} from 'material-ui/Menu';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from "material-ui/TextField";
import {hashHistory, Link} from "react-router";
import firebase from "firebase/firebase-browser";

export default class SubjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            anchorEl: null,
            open: false,
            dialog: false,
            subjectName: "",
            subjects: [],
        };

        this.db = firebase.database();
        this.handleOnChangeSubjectName = this.handleOnChangeSubjectName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleNoteCreate = this.handleNoteCreate.bind(this)

    }

    componentDidMount() {
        // コンポーネント初期化時にチャットルームの一覧を取得
        this.fetchSubjects();
    }

    handleNoteCreate() {
        hashHistory.push("/markdownEdit");
    }

    handleRequestDialogClose = () => {
        this.setState({dialog: false});
    };

    handleOnChangeSubjectName = event => {
        this.setState({subjectName: event.target.value});
    };

    handleOnSubmit = event => {
        const {subjectName} = this.state;
        event.preventDefault();

        if (!subjectName.length) {
            return;
        }

        // Firebaseデータベースに新規科目のデータを作成
        const newSubjectRef = this.db.ref("/subjects").push();
        const newSubject = {
            description: subjectName
        };

        // 作成したチャットルームのdescriptionを更新
        newSubjectRef.update(newSubject).then(() => {
            // 状態を再初期化
            this.setState({SubjectName: ""});

            return this.fetchSubjects().then(() => {
                hashHistory.push(`/subjectList`);
            });
        });
    };

    fetchSubjects() {
        // Firebaseデータベースから科目一覧を取得
        return this.db.ref("/subjects").once("value").then(snapshot => {
            const subjects = [];
            snapshot.forEach(item => {
                // データベースから取得したデータをオブジェクトとして取り出す
                subjects.push(Object.assign({key: item.key}, item.val()));
            });
            // 取得したオブジェクトの配列をコンポーネントのstateにセット
            this.setState({subjects});
            this.setState({dialog: false});
        });
    }

    renderSubjects() {
        const {subjects} = this.state;

        return (
            <Grid container spacing={0} style={{/*marginTop: '30px'*/}}>
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
                                <Button dense>続き</Button>
                                <Button
                                    dense
                                    style={{color: 'red'}}
                                >ノートを削除</Button>
                                <Button
                                    dense
                                    style={{color: 'red'}}
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
