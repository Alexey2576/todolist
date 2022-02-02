import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from "react-redux";
import {store} from "./Reducers/store";

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <CssBaseline/>
         <App/>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

reportWebVitals();
