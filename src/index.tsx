import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {Provider} from "react-redux";
import { AppContainer } from "react-hot-loader";
import {StyledGame} from "./components/Game";
import {configureStore, initializeGame} from "./redux/configureStore";

const store = configureStore();
store.dispatch(initializeGame());

ReactDOM.render(
    <Provider store={store}>
        <StyledGame />
    </Provider>,
    document.getElementById("app"),
);
