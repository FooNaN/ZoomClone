import Room from "./components/Room";
import Main from "./components/Main";
import Camera from "./components/Camera";

export const publicRoutes = [
    {
        path: '/Main',
        Component: Main
    },
    {
        path: '/Camera',
        Component: Camera
    },
    {
        path: '/room/' + ':id',
        Component: Room
    },
]