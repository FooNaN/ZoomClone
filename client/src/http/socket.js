import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

function joinIn(userId, roomId) {
    socket.emit('join-room', userId, roomId)
}

export { joinIn };