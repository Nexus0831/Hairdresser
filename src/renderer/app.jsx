import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import TopPage from "./components/TopPage.jsx";
import MarkdownEditorUI from "./components/MarkdownEditorUI.jsx";
import SubjectList from "./components/SubjectList.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Test from "./components/Test.jsx";
import firebase from "firebase/firebase-browser";

const App = () => (
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="test" components={Test}/>
                <Route path="login" components={Login}/>
                <Route path="signup" components={Signup}/>
                <Route path="topPage" components={TopPage} />
                <Route path="subjectList" components={SubjectList} />
                <Route path="markdown/:subjectId" component={MarkdownEditorUI} />
            </Route>
        </Router>
);

const config = {
    apiKey: "AIzaSyCLOHCPll1_hWa76AnEAyaHE8jhOZiLGQQ",
    authDomain: "hairdresser-a6cdd.firebaseapp.com",
    databaseURL: "https://hairdresser-a6cdd.firebaseio.com",
    projectId: "hairdresser-a6cdd",
    storageBucket: "hairdresser-a6cdd.appspot.com",
    messagingSenderId: "913604042966"
};

firebase.initializeApp(config);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/login";
}

render(<App />, document.getElementById("app"));