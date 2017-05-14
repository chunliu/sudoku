import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {Provider} from "react-redux";
import { AppContainer } from "react-hot-loader";
import {Game} from "./components/Game";
import {configureStore, initializeGame} from "./redux/configureStore";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

const store = configureStore();
store.dispatch(initializeGame());

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById("app"),
);
