import React from "react";
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default function Subject(props) {
    return(
        <TableRow>
            <TableRowColumn>{ props.subjectName }</TableRowColumn>
            <TableRowColumn>{ props.pageTotal }</TableRowColumn>
            <TableRowColumn>{ props.lastWriteDay }</TableRowColumn>
            <TableRowColumn>{ props.teacher }</TableRowColumn>
            <TableRowColumn>{ props.timeTable }</TableRowColumn>
        </TableRow>
    );
}

