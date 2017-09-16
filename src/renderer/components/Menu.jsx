import React from "react";
import style from "./Menu.css";

export default function Menu(props) {
    return (
        <div id="menu" className={`${props.className} ${style.menu}`}>
            <div className={style.icons}>
                <img src={props.src} height="60%" className={style.icon} />
            </div>

            <p className={style.text}>{props.text}</p>
        </div>
    );
}