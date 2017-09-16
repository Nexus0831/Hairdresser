import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from "material-ui/RaisedButton";
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const TEST_STYLE = {
    color: 'white',
    backgroundColor: "purple",
    paddingBottom: '20px'
};

const BASE_STYLE = {
    padding: '20px'
};



export default class Test extends React.Component {
    render() {
        return(
            <div style={BASE_STYLE}>
                <GridList cols={4}>
                    <GridTile style={TEST_STYLE}>
                        <RaisedButton
                            label="科目を追加"
                            primary={true}
                            fullWidth={true}
                        />
                    </GridTile>
                    <GridTile
                        style={TEST_STYLE}
                        title="テスト"
                        titlePosition="top"
                    >

                    </GridTile>
                    <GridTile style={TEST_STYLE}>
                        <p>テスト</p>
                        <p>１３ページ</p>
                        <p>2017/8/20</p>
                        <p>前納先生</p>
                        <p>火曜日 9時30分〜11時00分</p>
                    </GridTile>
                    <GridTile style={TEST_STYLE}>
                        <p>テスト</p>
                        <p>１３ページ</p>
                        <p>2017/8/20</p>
                        <p>前納先生</p>
                        <p>火曜日 9時30分〜11時00分</p>
                    </GridTile>
                    <GridTile style={TEST_STYLE}>
                        <p>テスト</p>
                        <p>１３ページ</p>
                        <p>2017/8/20</p>
                        <p>前納先生</p>
                        <p>火曜日 9時30分〜11時00分</p>
                    </GridTile>

                </GridList>
            </div>
        )
    }
}