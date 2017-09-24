import React from "react";
import style from "./TopPage.css";
import {Link} from "react-router";
import Grid from "material-ui/Grid";
import SvgIcon from 'material-ui/SvgIcon/SvgIcon';


export default class TopPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={style.topPage}>

                <Grid container spacing={0} className={style.header}>
                    <Grid item xs={12} className={style.title}>
                        <h1>Hairdresser</h1>
                    </Grid>
                </Grid>

                <Grid container spacing={0} style={{ height: '20%'}} >
                    <Grid item xs={12} className={style.icon} justify="center">
                        <h2>本日はどのようなご用件で？</h2>
                    </Grid>
                </Grid>


                <Grid container spacing={0}>
                    <Grid item xs={3}>
                    </Grid>

                    <Grid item xs={2} className={style.icon} justify="center" align="flex-start">
                        <Link to="/subjectList">
                            <SvgIcon style={{ width: 60, height: 60,}}>
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </SvgIcon>
                            <br/>
                            エディター
                        </Link>
                    </Grid>

                    <Grid item xs={2} className={style.icon} justify="center" align="flex-start">
                        <Link to="/preview">
                            <SvgIcon style={{ width: 60, height: 60, }}>
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"/>
                            </SvgIcon>
                            <br/>
                            プレビュー
                        </Link>
                    </Grid>

                    <Grid item xs={2} className={style.icon} justify="center" align="flex-start">
                        <Link >
                            <SvgIcon style={{ width: 60, height: 60,}}>
                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </SvgIcon>
                            <br/>
                            スケジュール
                        </Link>
                    </Grid>

                    <Grid item xs={3}>
                    </Grid>

                </Grid>
            </div>
        );
    }
}