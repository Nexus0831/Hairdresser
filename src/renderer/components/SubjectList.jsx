'use strict';

import React from "react";
import style from "./SubjectList.css";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';

const TITLE_STYLE = {
    width: '40%'
};


const TEXTFIELD_STYLE = {
    paddingLeft: '25px',
    paddingRight: '25px',
    marginBottom: '25px',
    width: 'auto'

};

const SERCH_STYLE = {
    width: '60%'
};

const RIGHT_BUTTON_STYLE = {
    marginLeft: '10px',
    marginRight: '20px'
};

const LEFT_BUTTON_STYLE = {
    marginLeft: '-20px'
};

const TOOLBAR_STYLE = {
    position: 'fixed',
    marginTop: '20px',
    backgroundColor: '#84316A',
    width: '100%',
    zIndex: 2
};

const TABLE_STYLE = {
    paddingTop: '30px',
    backgroundColor: 'rbga(0, 0, 0, 0)',
    zIndex: 1
};

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

                <Tabs style={TOOLBAR_STYLE}>
                    <Tab label="科目選択" >
                        <div>
                            <div style={TABLE_STYLE}>
                                <RaisedButton
                                    label="科目を追加"
                                    primary={true}
                                    fullWidth={true}
                                />
                                <Table className={style.list} >
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>科目名</TableHeaderColumn>
                                            <TableHeaderColumn>ページ数</TableHeaderColumn>
                                            <TableHeaderColumn>最終更新日</TableHeaderColumn>
                                            <TableHeaderColumn>担当教員</TableHeaderColumn>
                                            <TableHeaderColumn>時間割</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>テスト</TableRowColumn>
                                            <TableRowColumn>１３ページ</TableRowColumn>
                                            <TableRowColumn>2017/8/20</TableRowColumn>
                                            <TableRowColumn>前納先生</TableRowColumn>
                                            <TableRowColumn>火曜日 9時30分〜11時00分</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </Tab>

                    <Tab label="科目検索" >
                        <div>
                            <SelectField
                                floatingLabelText="検索項目"
                                value={this.state.value}
                                onChange={ (event, index, value) => this.setState({ value })}
                                style={TEXTFIELD_STYLE}
                            >
                                <MenuItem value={1} primaryText="科目名" />
                                <MenuItem value={2} primaryText="ページ数" />
                                <MenuItem value={3} primaryText="最終更新日" />
                                <MenuItem value={4} primaryText="担当教員" />
                                <MenuItem value={5} primaryText="時間割" />
                            </SelectField>

                            <TextField floatingLabelText="何を探しますか" style={TEXTFIELD_STYLE} />
                            <RaisedButton
                                label="検索"
                                primary={true}
                            />
                        </div>
                    </Tab>

                </Tabs>


            </div>
        );
    }
}
