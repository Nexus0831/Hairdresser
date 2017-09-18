'use strict';

import React from "react";
import style from "./SubjectList.css";

export default class SubjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    render() {
        return(
            <div className={style.base}>
                <div className={style.background}></div>

            </div>
        );
    }
}
