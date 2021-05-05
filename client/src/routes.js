import Room from "./components/Room";
import Main from "./components/Main";


export const publicRoutes = [
    {
        path: '/main',
        Component: Main
    },
    {
        path: '/room/' + ':id',
        Component: Room
    },
]