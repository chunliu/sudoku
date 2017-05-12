import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import {Provider} from "react-redux";
import { AppContainer } from "react-hot-loader";
import {StyledGame} from "./components/Game";
import {loadGrid, initializeStatue, configureStore,
    initFillingCount, loadPuzzle} from "./redux/configureStore";

const store = configureStore();
const grid = "483921657967345821251876493548132976729564138136798245372689514814253769695417080";
store.dispatch(loadPuzzle(grid));
store.dispatch(loadGrid(grid));
store.dispatch(initializeStatue());
store.dispatch(initFillingCount(grid));

ReactDOM.render(
    <Provider store={store}>
        <StyledGame />
    </Provider>,
    document.getElementById("app"),
);
