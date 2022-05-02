import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import './index.less';
import App from './App';
import history from "./history";

ReactDOM.render(
    <StrictMode>
        <HashRouter history={history}>
            <App />
        </HashRouter>
    </StrictMode>
    ,document.getElementById('root')
);
