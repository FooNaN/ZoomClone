import React, {useState} from 'react';
import {connect_user, create_room} from "../http/api";

const Main = () => {
    const [roomId, setRoomId] = useState(10);
    const [userId, setUserId] = useState(10);
    function handleChange(event) {
        event.preventDefault();
        setRoomId(event.target.value);
    }
    async function room_in() {
        let resp = await connect_user(userId, roomId);
    }
    async function room_create() {
        let resp = await create_room(userId);
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
            <h2> Или же можете создать комнату!</h2>
            <div className='createroom'>
                <button className='btn-in' onClick={room_create}>
                    Создать комнату
                </button>
            </div>
        </div>

    );
};

export default Main;