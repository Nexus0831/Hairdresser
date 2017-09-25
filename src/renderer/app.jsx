import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import TopPage from "./components/TopPage.jsx";
import MarkdownEditorUI from "./components/MarkdownEditorUI.jsx";
import SubjectList from "./components/SubjectList.jsx";
import Preview from "./components/Preview.jsx"
import firebase from "firebase/firebase-browser";

const App = () => (
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="topPage" components={TopPage} />
                <Route path="preview" components={Preview} />
                <Route path="subjectList" components={SubjectList} />
                <Route path="markdown/:subjectId" component={MarkdownEditorUI} />
                <Route path="markdown/:subjectId/:noteId" component={MarkdownEditorUI} />
            </Route>
        </Router>
);

const config = {
        
};

firebase.initializeApp(config);

// Routingの初期化
if (!location.hash.length) {
    location.hash = "#/topPage";
}

render(<App />, document.getElementById("app"));
