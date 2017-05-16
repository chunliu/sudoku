import * as Redux from "redux";
import {ISudoku} from "../core/sudokuClass";
export const ActionType = {
    LOAD_PUZZLE: "LOAD_PUZZLE",
    LOAD_GRID_SUCCESS: "LOAD_GRID_SUCCESS",
    SOLVE_GRID: "SOLVE_GRID",
    STATUS_UPDATE: "STATUS_UPDATE",
    NUMBER_SELECTED: "NUMBER_SELECTED",
    UPDATE_SUDOKU_GRID: "UPDATE_SUDOKU_GRID",
    UPDATE_FILLING_COUNT: "UPDATE_FILLING_COUNT",
    INIT_FILLING_COUNT: "INIT_FILLING_COUNT",
    FILLED_CELLS_UPDATE: "FILLED_CELLS_UPDATE",
    FAILED_CELLS_UPDATE: "FAILED_CELLS_UPDATE",
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
    solvedSudoku: ISudoku;
    status: GameStatus;
    numberSelected: string;
    fillingCount: number;
    filledCells: string[];
    failedCells: string[];
}
export interface ISudokuReducerState {
    loadPuzzleReducer: string;
    sudokuReducer: ISudoku;
    solveSudokuReducer: ISudoku;
    statusReducer: GameStatus;
    numberSelectedReducer: string;
    fillingCountReducer: number;
    filledCellsReducer: string[];
    failedCellsReducer: string[];
}
export interface ISudokuAction extends Redux.Action {
    sudoku: ISudoku;
}
export const initState: ISudokuState = {
    puzzle: "",
    sudoku: {},
    solvedSudoku: {},
    status: GameStatus.Initializing,
    numberSelected: "0",
    fillingCount: 0,
    filledCells: [],
    failedCells: [],
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
export interface IFilledCellsAction extends Redux.Action {
    fill: boolean;
    filledCells: string[];
}
