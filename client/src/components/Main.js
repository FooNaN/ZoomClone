import React, {useState} from 'react';
import {connect_user} from "../http/api";

const Main = () => {
    const [roomId, setRoomId] = useState(10);
    const [userId, setUserId] = useState(10);
    function handleChange(event) {
        event.preventDefault();
        setRoomId(event.target.value);
    }
    async function room_in() {
        console.log(roomId)
        let resp = await connect_user(userId, roomId);
    }
    return (
        <div className='page'>
            <div className='main'>
                <input
                    type="text"
                    placeholder='Вставьте номер комнаты'
                    onChange={handleChange}
                />
                <button className='btn-in' onClick={room_in}>
                    войти в комнату
                </button>
            </div>
        </div>

    );
};

export default Main;