import {createStore, Store, applyMiddleware} from "redux";
import {rootReducer} from "./sudokuReducer";
import {devToolsEnhancer} from "redux-devtools-extension";
import {ISudoku, ROWS, COLS} from "../core/sudokuClass";
import {loadGridSuccess, statusUpdate} from "./sudokuAction";
import {GameStatus} from "./types";

export const configureStore = () => {
    return createStore(rootReducer, devToolsEnhancer({}));
};
export const loadGrid = (grid: string) => {
    let index = 0;
    const result: ISudoku = {};
    for (const r of ROWS) {
        for (const c of COLS) {
            let v = grid.charAt(index);
            if ("0.".indexOf(v) >= 0) {
                v = "";
            }
            result[r + c] = v;
            index++;
        }
    }
    return loadGridSuccess(result);
};
export const initializeStatue = () => {
    return statusUpdate(GameStatus.Initializing);
};
