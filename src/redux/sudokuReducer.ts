import {combineReducers, Reducer} from "redux";
import {ISudokuState, ISudokuAction, ActionType, initState,
    IStatusAction, INumberSelectedAction} from "./types";

const sudokuReducer = (state = initState.sudoku, action: ISudokuAction) => {
    switch (action.type) {
        case ActionType.LOAD_GRID_SUCCESS:
            return action.sudoku;
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
export const rootReducer = combineReducers({
    sudokuReducer,
    statusReducer,
    numberSelectedReducer,
});
