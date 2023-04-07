import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {socket} from '../socket'

// styles 
import css from '../styles/pages/Chat.module.css'
import GroupItem from "../components/GroupItem";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Chat = () => {
    const [message,setMessage] = useState('')
    const [groups,setGroups] = useState([]);
    const [newGroup,setNewGroup] = useState('');
    const [groupChat,setGroupChat] = useState({});
    const [selectGroup,setGroupSelect] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state.username) {
            navigate('/');
            return
        }
        socket.connect();

        socket.emit('join',location.state.username,(data) => {
            socket.emit('getGroupsList');
        })

        socket.on('sendGroupList',(groups) => {
            setGroups(groups);
            const groupChat = {};
            groups.forEach((group) => {
                groupChat[group] = {
                    unread:0,
                    online:0,
                    messages:[]
                }
            })
            setGroupChat({...groupChat})
        })
        socket.on('groupCreated',(groupCreated) => {
            socket.emit('joinCreatedGroup',groupCreated,(err) => {
                if(!err) {
                    setGroups((prev) => [...prev,groupCreated]);
                    setGroupChat((prev) => ({
                        ...prev,
                        [groupCreated]:{
                            unread:0,
                            online:0,
                            messages:[]
                        }
                    }))
                }
            })
        })

        socket.on('newMessage',(message) => {
            console.log(message);
            setGroupChat((groupChat) => ({
                ...groupChat,
                [message.group]:{
                    ...groupChat[message.group],
                    messages:[...groupChat[message.group].messages,{
                        username:message.username,
                        message:message.text,
                        createdAt:message.createdAt
                    }]
                }
            }))
        })

    },[])

    const handleGroupCreate = e => {
        e.preventDefault();
        socket.emit('createGroup', newGroup,(err) => {
            if(err) {
                return toast.error(err);
            }
        });
        setNewGroup('')
    }
    const handleMessageEmit = (e) => {
        e.preventDefault();
        if(location.state.username) {
            socket.emit('newMessage',{
                username:location.state.username,
                message:message,
                group:selectGroup,
                createdAt:new Date()
            })
        }
        setMessage('')
    }
    const handleSelectGroup = (group) => {
        setGroupSelect(group);
    }
    return(
        <div className={css.container}>
            <div className={css.flexContainer}>
                <div className={css.groupContainer}>
                    <div className={css.groupFlex}>
                        <form onSubmit={handleGroupCreate} className={css.addRoomContainer}>
                            <TextField
                            sx={{backgroundColor:'white'}}
                            variant="outlined" 
                            label="Room Name"
                            size="small"
                            placeholder="Type new room name"
                            value={newGroup}
                            onChange={(e) => setNewGroup(e.target.value)}
                            />
                            <Button variant="contained" type="submit">Create Group</Button>
                        </form>
                        <div className={css.groupList}>
                            {groups.map((group,index) => (
                                <div className={css.listHolder} key={index} onClick={() => handleSelectGroup(group)}>
                                    <GroupItem groupName={group} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={css.chatContainer}>
                    <div>
                        {selectGroup && groupChat[selectGroup].messages.map((msg,index) => (
                            <div key={index}>
                                <div>{msg.username}</div>
                                <div>{msg.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className={css.messageSender}>
                        <form onSubmit={handleMessageEmit}>
                            <TextField 
                            label='message'
                            sx={{backgroundColor:'white'}}
                            variant="outlined"
                            size="small"
                            placeholder="Type new room name"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button type="submit" variant="contained">Send</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;