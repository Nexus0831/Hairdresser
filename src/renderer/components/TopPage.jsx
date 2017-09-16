import React from "react";
import TopMenu from "./Menu.jsx";
import style from "./TopPage.css";
import { Link } from "react-router";

export default class TopPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={style.topPage}>
                <h1 className={style.title}>Hairdresser</h1>

                <Link to="/subjectList">
                    <TopMenu
                        className={`${style.menu} hvr-shutter-in-horizontal`}
                        src="static/icons/create.svg"
                        text="MarkDownで大切な授業内容を記録しましょう"
                    />
                </Link>

                <TopMenu
                    className={`${style.menu} hvr-shutter-in-horizontal`}
                    src="static/icons/pageview.svg"
                    text="今まであなたが記録したノートを閲覧しましょう"
                />

                <TopMenu
                    className={`${style.menu} hvr-shutter-in-horizontal`}
                    src="static/icons/date_range.svg"
                    text="あなたの授業の時間割を確認しましょう"
                />
            </div>
        );
    }
}