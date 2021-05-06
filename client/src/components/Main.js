import React, {useState,useEffect,useContext} from 'react';
import {connect_user, create_room} from "../http/api";
import Peer from "peerjs";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {Context} from "../index";

const Main = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory()
    var callOptions={'iceServers': [
            {url: 'stun:95.xxx.xx.x9:3479',
                username: "user",
                credential: "xxxxxxxxxx"},
            { url: "turn:95.xxx.xx.x9:3478",
                username: "user",
                credential: "xxxxxxxx"}]
    };
    const [roomId, setRoomId] = useState(0);
    const peer = new Peer({config: callOptions});

    useEffect(() => {
        peer.on('open', function(peerID) {
            user.setId(peerID);
        });
    }, [peer.on])

    function handleChange(event) {
        event.preventDefault();
        setRoomId(event.target.value);
    }
    async function room_in() {
        let resp = await connect_user(user.id, roomId);
        if (resp.operation_status === 0) {
            history.push(`/room/${roomId}`)
        } else {
            alert('проверьте номер комнаты')
        }
    }
    async function room_create() {
        let resp = await create_room(user.id).then( (resp) => {history.push(`/room/${resp.room_id}`)});
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
            <h3>{user.id}</h3>
            <h2> Или же можете создать комнату!</h2>
            <div className='createroom'>
                <button className='btn-in' onClick={room_create}>
                    Создать комнату
                </button>
            </div>
        </div>
    );
});

export default Main;