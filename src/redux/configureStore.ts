import {createStore, Store, applyMiddleware, Dispatch} from "redux";
import thunk from "redux-thunk";
import "whatwg-fetch";
import {random} from "lodash";
import {rootReducer} from "./sudokuReducer";
import {devToolsEnhancer, composeWithDevTools} from "redux-devtools-extension";
import {ISudoku, ROWS, COLS, Sudoku} from "../core/sudokuClass";
import {sudokuGrids} from "../core/sudokuGrids";
import {loadGridSuccess, statusUpdate,
    updateFillingCount, loadPuzzleAction, filledCellsAction} from "./sudokuAction";
import {GameStatus, ISudokuState, ISudokuReducerState} from "./types";

export const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
        ),
    );
};
export const loadPuzzle = () => {
    return (dispatch: Dispatch<{}>) => {
        const p = sudokuGrids[random(0, 49)];
        return dispatch(loadPuzzleAction(p));
    };
};
export const loadGrid = () => {
    return (dispatch: Dispatch<{}>, getState: () => ISudokuReducerState) => {
        const grid = getState().loadPuzzleReducer;
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
        return dispatch(loadGridSuccess(result));
    };
};
export const initializeStatue = (status: GameStatus) => {
    return (dispatch: Dispatch<{}>) => {
        return dispatch(statusUpdate(status));
    };
};
export const initFillingCount = () => {
    return (dispatch: Dispatch<{}>, getState: () => ISudokuReducerState) => {
        const grid = getState().loadPuzzleReducer;
        let count = 0;
        for (const c of grid) {
            if (c === "0") {
                count++;
            }
        }
        return dispatch(updateFillingCount(count));
    };
};
export const cleanFilledCells = () => {
    return (dispatch: Dispatch<{}>, getState: () => ISudokuReducerState) => {
        const filledCells = {
            fill: false,
            filledCells: getState().filledCellsReducer,
        };
        return dispatch(filledCellsAction(filledCells));
    };
};

export const initializeGame = () => {
    return (dispatch: Dispatch<{}>) => Promise.all([
        dispatch(initializeStatue(GameStatus.Initializing)),
        dispatch(loadPuzzle()),
        dispatch(loadGrid()),
        dispatch(initFillingCount()),
        dispatch(cleanFilledCells()),
    ]).then(() =>
        // Use promise here to allow the status of Square to sink.
        dispatch(initializeStatue(GameStatus.Playing)),
    );
};
export const resetGame = () => {
    return (dispatch: Dispatch<{}>) => Promise.all([
        dispatch(initializeStatue(GameStatus.Initializing)),
        dispatch(loadGrid()),
        dispatch(initFillingCount()),
        dispatch(cleanFilledCells()),
    ]).then(() =>
        dispatch(initializeStatue(GameStatus.Playing)),
    );
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
            return dispatch(statusUpdate(status));
        }
    };
};
export async function fetchSudoku() {
    // Cannot overcome the CORS of the resource site.
    const res = await fetch("http://norvig.com/easy50.txt", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
        },
    });
    return res;
}
