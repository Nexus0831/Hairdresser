import React from "react";
import style from "./Loading.css";

export default function Loading(props) {
    if(props.isActive) {
        return (
            <div className={style.base}>
                <div className={`${style.btn} ${style.btntwo}`}>
                    <span className={style.text}>Loading...</span>
                </div>
            </div>
        );
    } else {
        return null;
    }
}