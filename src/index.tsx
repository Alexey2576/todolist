import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './Components/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from "react-redux";
import {store} from "./Redux/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
   <React.StrictMode>
      <HashRouter>
         <Provider store={store}>
            <CssBaseline/>
            <App/>
         </Provider>
      </HashRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

reportWebVitals();
