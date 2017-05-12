import {combineReducers, Reducer} from "redux";
import {ISudokuState, ISudokuAction, ActionType, initState,
    IStatusAction, INumberSelectedAction,
    IFillingCountAction, IPuzzleAction} from "./types";

const sudokuReducer = (state = initState.sudoku, action: ISudokuAction) => {
    switch (action.type) {
        case ActionType.LOAD_GRID_SUCCESS:
            return Object.assign({}, state, action.sudoku);
        default:
            return state;
    }
};
const statusReducer = (state = initState.status, action: IStatusAction) => {
    switch (action.type) {
        case ActionType.STATUS_UPDATE:
            return action.status;
        default:
            return state;
    }
};
const numberSelectedReducer = (state = initState.numberSelected, action: INumberSelectedAction) => {
    switch (action.type) {
        case ActionType.NUMBER_SELECTED:
            return action.numberSelected;
        default:
            return state;
    }
};
const fillingCountReducer = (state = initState.fillingCount, action: IFillingCountAction) => {
    switch (action.type) {
        case ActionType.UPDATE_FILLING_COUNT:
            return state + action.fillingCount;
        default:
            return state;
    }
};
const loadPuzzleReducer = (state = initState.puzzle, action: IPuzzleAction) => {
    switch (action.type) {
        case ActionType.LOAD_PUZZLE:
            return action.puzzle;
        default:
            return state;
    }
};
export const rootReducer = combineReducers({
    sudokuReducer,
    statusReducer,
    numberSelectedReducer,
    fillingCountReducer,
    loadPuzzleReducer,
});
