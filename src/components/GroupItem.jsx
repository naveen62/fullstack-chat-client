import React from "react";
import Paper from '@mui/material/Paper';

// styles
import css from '../styles/components/GroupItem.module.css';

const GroupItem = (props) => {

    return(
        <Paper elevation={2} className={css.paper}>
            <div className={css.groupName}>{props.groupName}</div>
        </Paper>
    )
}

export default GroupItem;