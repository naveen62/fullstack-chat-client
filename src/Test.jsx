import React, { useEffect } from "react";
import {socket} from './socket';

const Test = () => {
    useEffect(() => {
        socket.connect();
    },[])
    return(
        <h1>nccnsdlkn</h1>
    )
}
export default Test;