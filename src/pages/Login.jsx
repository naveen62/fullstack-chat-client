import React from "react";

// styles
import css from '../styles/pages/Login.module.css';
import UserForm from "../components/UserForm";

const Login = () => {

    return(
        <div className={css.container}>
            <div className={css.flexContainer}> 
                <UserForm />
            </div>
        </div>  
    )
}
export default Login;