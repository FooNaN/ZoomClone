import './index.scss'
import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import Camera from "./components/Camera";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{}}>
        <App />
        {/*<Camera/>*/}
    </Context.Provider>,
    document.getElementById('root')
);