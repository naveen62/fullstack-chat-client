import React from "react";
import Paper from '@mui/material/Paper';

// styles
import css from '../styles/components/GroupItem.module.css';
import { Badge } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';

const GroupItem = (props) => {

    return(
        <Paper sx={{borderLeft: props.selected ? '5px solid #1976D2' : 'none',boxSizing:'border-box'}} elevation={2} className={css.paper}>
            <div className={css.itemContainer}>
                <div className={css.groupDetails}>
                    <div className={css.groupName}>{props.groupName}</div>
                    <div className={css.online}>7 people joined</div>
                </div>
                <div>
                    {props.unread ? (
                    <Badge badgeContent={props.unread} color="primary">
                        <MailIcon color="action" />
                    </Badge>
                    ): ''}
                </div>
            </div>
        </Paper>
    )
}

export default GroupItem;