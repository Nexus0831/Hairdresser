'use strict';

import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors.jsx";
import firebase from "firebase/firebase-browser";
import style from "./Signup.css";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const BUTTON_STYLE = {
    marginRight: 20,
};

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            errors: []
        };

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeName = this.handleOnChangeName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleOnChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleOnChangeName(e) {
        this.setState({name: e.target.value});
    }

    handleOnSubmit(e) {
        const {email, password, name} = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();

        if (!email.length) {
            isValid = false;
            errors.push("Email address cann't be blank.")
        }

        if (!password.length) {
            isValid = false;
            errors.push("Password cann't be blank.")
        }

        if (!name.length) {
            isValid = false;
            errors.push("Name cann't be blank.");
        }

        if (!isValid) {
            this.setState({errors});
            return;
        }

        // firebaseの新規アカウント作成処理
        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            return newUser.updateProfile({
                displayName: name
            });
        }).then(() => {
            // チャットルーム一覧画面へ遷移
            hashHistory.push("/topPage");
        }).catch(err => {
            // Firebaseでエラーになった場合にエラーメッセージを表示する
            this.setState({errors: [err.message]});
        });
    }

    render() {
        return (
            <div className={style.base}>
                <form onSubmit={this.handleOnSubmit} className={style.signup}>
                   <Errors errorMessages={this.state.errors} />

                    <div className="form-group">
                        <TextField
                            floatingLabelText="メールアドレス"
                            value={this.state.email}
                            onChange={this.handleOnChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            floatingLabelText="パスワード"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleOnChangePassword}
                        />
                     </div>

                     <div className="form-group">
                        <TextField
                            floatingLabelText="ユーザー名"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleOnChangeName}
                        />
                     </div>

                     <div className="form-group">
                         <RaisedButton label="アカウントを作成" primary={true} style={BUTTON_STYLE} />
                         <Link to="/login">
                            <RaisedButton label="キャンセル" />
                         </Link>
                     </div>
                 </form>
            </div>
        );
    }

}