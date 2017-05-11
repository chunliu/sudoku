import * as Redux from "redux";
import {ISudoku} from "../core/sudokuClass";
export const ActionType = {
    LOAD_GRID_SUCCESS: "LOAD_GRID_SUCCESS",
    STATUS_UPDATE: "STATUS_UPDATE",
    NUMBER_SELECTED: "NUMBER_SELECTED",
    UPDATE_SUDOKU_GRID: "UPDATE_SUDOKU_GRID",
};
export const enum GameStatus {
    Initializing = 0,
    Playing,
    Solved,
}
export interface ISudokuState {
    sudoku: ISudoku;
    status: GameStatus;
    numberSelected: string;
}
export interface ISudokuAction extends Redux.Action {
    sudoku: ISudoku;
}
export const initState: ISudokuState = {
    sudoku: {},
    status: GameStatus.Initializing,
    numberSelected: "0",
};
export interface IStatusAction extends Redux.Action {
    status: GameStatus;
}
export interface INumberSelectedAction extends Redux.Action {
    numberSelected: string;
}
