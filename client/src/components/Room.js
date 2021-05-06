import React, {useState,useEffect} from 'react';
import {joinIn} from '../http/socket';
import {useParams} from 'react-router-dom'
import Peer from "peerjs";

const Room = () => {
    var callOptions={'iceServers': [
            {url: 'stun:95.xxx.xx.x9:3479',
                username: "user",
                credential: "xxxxxxxxxx"},
            { url: "turn:95.xxx.xx.x9:3478",
                username: "user",
                credential: "xxxxxxxx"}]
    };
    const peer = new Peer({config: callOptions});
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        peer.on('open', function(peerID) {
            setUserId(peerID);
        });
    }, [peer.on])

    const {id} = useParams(); //room_id
    useEffect(() => {
        joinIn(id, userId)
    }, [peer.on]);
    return (
        <div>
            Room
        </div>
    );
};

export default Room;