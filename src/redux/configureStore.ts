import {createStore, Store, applyMiddleware, Dispatch} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./sudokuReducer";
import {devToolsEnhancer, composeWithDevTools} from "redux-devtools-extension";
import {ISudoku, ROWS, COLS} from "../core/sudokuClass";
import {loadGridSuccess, statusUpdate, updateFillingCount} from "./sudokuAction";
import {GameStatus} from "./types";

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
        ),
    );
};
export const loadGrid = (grid: string) => {
    return (dispatch: Dispatch<{}>) => {
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
        dispatch(loadGridSuccess(result));
    };
};
export const initializeStatue = () => {
    return (dispatch: Dispatch<{}>) => {
        statusUpdate(GameStatus.Initializing);
    };
};
export const initFillingCount = (grid: string) => {
    return (dispatch: Dispatch<{}>) => {
        let count = 0;
        for (const c of grid) {
            if (c === "0") {
                count++;
            }
        }
        dispatch(updateFillingCount(count));
    };
};
