import React, { useState } from "react";
import Paper from '@mui/material/Paper';

// styles
import css from '../styles/components/UserForm.module.css';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {socket} from '../socket'
import { toast } from "react-toastify";

const UserForm = () => {
    const [username,setUsername] = useState('');
    const [showError,setShowError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if(username) {
            socket.connect();
            socket.emit('checkUsername',username,(error,newUserName) => {
                if(error) {
                    return toast.error('Username is already taken, Please again another username')
                }
                navigate('/chat',{state:{username:newUserName}})
            })
        } else {
            setShowError(true);
        }
    }
    return(
        <div className={css.container}>
            <Paper className={css.paper} elevation={2}>
                <div className={css.formContainer}>
                    <header className={css.formHeader}>Join Chat</header>
                    <form onSubmit={handleSubmit} className={css.form}>
                        <TextField 
                        variant="outlined"
                        label="user name"
                        error={showError && !username}
                        helperText={showError && !username && 'This field is required'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        size="small"
                        />
                        <Button type="submit" fullWidth variant="contained">Join</Button>
                    </form>
                </div>
            </Paper>
        </div>
    )
}

export default UserForm;