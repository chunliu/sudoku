import {createStore, Store, applyMiddleware, Dispatch} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./sudokuReducer";
import {devToolsEnhancer, composeWithDevTools} from "redux-devtools-extension";
import {ISudoku, ROWS, COLS, Sudoku} from "../core/sudokuClass";
import {loadGridSuccess, statusUpdate,
    updateFillingCount, loadPuzzleAction} from "./sudokuAction";
import {GameStatus, ISudokuState, ISudokuReducerState} from "./types";

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
        ),
    );
};
export const loadPuzzle = (puzzle: string) => {
    return (dispatch: Dispatch<{}>) => {
        dispatch(loadPuzzleAction(puzzle));
    };
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
export const CheckWin = () => {
    return (dispatch: Dispatch<{}>, getState: () => ISudokuReducerState) => {
        const count = getState().fillingCountReducer;
        if (count === 0) {
            const result = getState().sudokuReducer;
            const sudoku = new Sudoku();
            let status: GameStatus = GameStatus.Failed;
            if (sudoku.IsSolved(getState().loadPuzzleReducer, result)) {
                status = GameStatus.Solved;
            }
            dispatch(statusUpdate(status));
        }
    };
};
