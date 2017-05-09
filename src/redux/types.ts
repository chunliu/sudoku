import * as Redux from "redux";
import {ISudoku} from "../core/sudokuClass";
export const ActionType = {
    LOAD_GRID_SUCCESS: "LOAD_GRID_SUCCESS",
    STATUS_UPDATE: "STATUS_UPDATE",
};
export const enum GameStatus {
    Initializing = 0,
    Playing,
    Solved,
}
export interface ISudokuState {
    sudoku: ISudoku;
    status: GameStatus;
}
export interface ISudokuAction extends Redux.Action {
    sudoku: ISudoku;
}
export const initState: ISudokuState = {
    sudoku: {},
    status: GameStatus.Initializing,
};
export interface IStatusAction extends Redux.Action {
    status: GameStatus;
}
