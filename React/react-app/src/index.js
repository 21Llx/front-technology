import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeContext from './context';
// import store from "./store/index"
import store from "./store/indexStore"
// import storeToolkit from "./store-toolkit/index"
import storeToolkit from "./store/indexToolkit"
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ThemeContext.Provider value={{
        type: "Main",
        store  //不用react-redux
    }}>
        {/* <Provider store={store}> */}
        <Provider store={storeToolkit}>
            <App />
        </Provider>
    </ThemeContext.Provider >
);
