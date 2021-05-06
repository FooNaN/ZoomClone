import React, {useEffect,useContext} from 'react';
import {joinIn} from '../http/socket';
import {useParams} from 'react-router-dom'
import {Context} from "../index";

const Room = () => {
    const {user} = useContext(Context);

    const {id} = useParams(); // roomId
    useEffect(() => {
        joinIn(id, user.id)
    }, [])
    return (
        <div>
            Room
        </div>
    );
};

export default Room;