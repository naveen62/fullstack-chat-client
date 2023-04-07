import React from "react";
import {Route, Routes} from 'react-router-dom'
import Login from "../pages/Login";
import Chat from "../pages/Chat";

const AppRouter = () => {

    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    )
}
export default AppRouter;