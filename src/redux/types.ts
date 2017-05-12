import * as Redux from "redux";
import {ISudoku} from "../core/sudokuClass";
export const ActionType = {
    LOAD_PUZZLE: "LOAD_PUZZLE",
    LOAD_GRID_SUCCESS: "LOAD_GRID_SUCCESS",
    STATUS_UPDATE: "STATUS_UPDATE",
    NUMBER_SELECTED: "NUMBER_SELECTED",
    UPDATE_SUDOKU_GRID: "UPDATE_SUDOKU_GRID",
    UPDATE_FILLING_COUNT: "UPDATE_FILLING_COUNT",
};
export const enum GameStatus {
    Initializing = 0,
    Playing,
    Solved,
    Failed,
}
export interface ISudokuState {
    puzzle: string;
    sudoku: ISudoku;
    status: GameStatus;
    numberSelected: string;
    fillingCount: number;
}
export interface ISudokuReducerState {
    loadPuzzleReducer: string;
    sudokuReducer: ISudoku;
    statusReducer: GameStatus;
    numberSelectedReducer: string;
    fillingCountReducer: number;
}
export interface ISudokuAction extends Redux.Action {
    sudoku: ISudoku;
}
export const initState: ISudokuState = {
    puzzle: "",
    sudoku: {},
    status: GameStatus.Initializing,
    numberSelected: "0",
    fillingCount: 0,
};
export interface IPuzzleAction extends Redux.Action {
    puzzle: string;
}
export interface IStatusAction extends Redux.Action {
    status: GameStatus;
}
export interface INumberSelectedAction extends Redux.Action {
    numberSelected: string;
}
export interface IFillingCountAction extends Redux.Action {
    fillingCount: number;
}
