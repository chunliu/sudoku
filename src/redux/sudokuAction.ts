import * as Redux from "redux";
import {ActionType, ISudokuAction, GameStatus,
    IStatusAction, INumberSelectedAction,
    IFillingCountAction} from "./types";
import {ISudoku} from "../core/sudokuClass";

export const loadGridSuccess = (grid: ISudoku): ISudokuAction => {
    return {type: ActionType.LOAD_GRID_SUCCESS, sudoku: grid};
};

export const statusUpdate = (status: GameStatus): IStatusAction => {
    return {type: ActionType.STATUS_UPDATE, status};
};

export const updateNumberSelected = (numberSelected: string): INumberSelectedAction => {
    return {type: ActionType.NUMBER_SELECTED, numberSelected};
};
export const updateFillingCount = (fillingCount: number): IFillingCountAction => {
    return {type: ActionType.UPDATE_FILLING_COUNT, fillingCount};
};
export const actionCreators = {
    loadGridSuccess,
    statusUpdate,
    updateNumberSelected,
    updateFillingCount,
};
