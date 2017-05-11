import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {Provider} from "react-redux";
import { AppContainer } from "react-hot-loader";
import {StyledGame} from "./components/Game";
import {loadGrid, initializeStatue, configureStore} from "./redux/configureStore";

const store = configureStore();
const grid = "003020600900305001001806400008102900700000008006708200002609500800203009005010300";
store.dispatch(loadGrid(grid));
store.dispatch(initializeStatue());

ReactDOM.render(
    <Provider store={store}>
        <StyledGame />
    </Provider>,
    document.getElementById("app"),
);
