import {$authHost, $host} from "./index";

export const create_room = async (user_id) => {
    const {data} = await $host.post('/api/main/create_room', {"user_id": user_id})
    return data;
}

export const connect_user = async (user_id, room_id) => {
    const {data} = await $host.post('/api/main/connect_user', {"user_id": user_id, "room_id": room_id})
    return data
}
