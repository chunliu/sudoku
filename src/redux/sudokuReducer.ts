import {combineReducers, Reducer} from "redux";
import {ISudokuState, ISudokuAction, ActionType, initState, IStatusAction} from "./types";

const sudokuReducer = (state: ISudokuState = initState, action: ISudokuAction) => {
    switch (action.type) {
        case ActionType.LOAD_GRID_SUCCESS:
            return Object.assign({}, state, {sudoku: action.sudoku});
        default:
            return state;
    }
};
const statusReducer = (state: ISudokuState = initState, action: IStatusAction) => {
    switch (action.type) {
        case ActionType.STATUS_UPDATE:
            return Object.assign({}, state, {status: action.status});
        default:
            return state;
    }
};
export const rootReducer = combineReducers({
    sudokuReducer,
    statusReducer,
});
