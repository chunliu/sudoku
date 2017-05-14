import * as Redux from "redux";
import {ActionType, ISudokuAction, GameStatus,
    IStatusAction, INumberSelectedAction,
    IFillingCountAction, IPuzzleAction,
    IFilledCellsAction} from "./types";
import {CheckWin} from "./configureStore";
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
export const loadPuzzleAction = (puzzle: string): IPuzzleAction => {
    return {type: ActionType.LOAD_PUZZLE, puzzle};
};
export const filledCellsAction = (filledCells: { fill: boolean; filledCells: string[]; }): IFilledCellsAction => {
    return {
        type: ActionType.FILLED_CELLS_UPDATE,
        filledCells: filledCells.filledCells,
        fill: filledCells.fill,
    };
};
export const actionCreators = {
    loadGridSuccess,
    statusUpdate,
    updateNumberSelected,
    updateFillingCount,
    filledCellsAction,
    CheckWin,
};
