import * as React from "react";
import {ISudoku} from "../core/sudokuClass";
import * as ActionTypes from "./actionTypes";

export function loadSudokuSuccess(sudokuGrid: ISudoku) {
    return {type: ActionTypes.LOAD_SUDOKU_SUCCESS, sudokuGrid};
}