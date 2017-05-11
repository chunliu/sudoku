import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import {Square} from "./Square";
import {COLS, ROWS, ISudoku} from "../../core/sudokuClass";
import {ISudokuState, GameStatus} from "../../redux/types";
import {actionCreators} from "../../redux/sudokuAction";
import "../../scss/main.scss";

interface IBoardProps {
    sudoku: ISudoku;
    status: GameStatus;
    numberSelected: string;
    actions: any;
}

class GameBoardClass extends React.Component<IBoardProps, ISudokuState> {
    constructor() {
        super();
        this.handleGridClick = this.handleGridClick.bind(this);
        this.handleNumberClick = this.handleNumberClick.bind(this);
    }
    public componentDidMount() {
        this.props.actions.statusUpdate(GameStatus.Playing);
    }
    public render() {
        const {sudoku} = this.props;
        return (
            <div>
                {this.renderSudokuGrid(sudoku)}
                <br />
                {this.renderNumberSelection()}
            </div>
        );
    }
    private renderSudokuGrid(sudoku: ISudoku) {
        return (
            <div>
                <div className="status">{this.props.numberSelected}</div>
                {ROWS.map((r) => {
                    return (
                        <div key={r} className="board-row">
                            {COLS.map((c) => {
                                const value = sudoku[r + c];
                                return (
                                    <Square key={r + c}
                                        onSquareClick={this.handleGridClick}
                                        status={this.props.status} squareKey={r + c}
                                        value={value} />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
    private renderNumberSelection() {
        return (
            <div className="board-row">
                {COLS.map((c) => {
                    return (
                        <Square key={c} onSquareClick={this.handleNumberClick}
                            isPressed={this.props.numberSelected === c} squareKey={c} value={c} />
                    );
                })}
            </div>
        );
    }
    private handleGridClick(key: string) {
        this.props.sudoku[key] = this.props.sudoku[key] === ""
            ? this.props.numberSelected : "";

        this.props.actions.loadGridSuccess(this.props.sudoku);
    }
    private handleNumberClick(key: string) {
        this.props.actions.updateNumberSelected(key);
    }
}
interface IStateFromStore {
    sudokuReducer: ISudoku;
    statusReducer: GameStatus;
    numberSelectedReducer: string;
}

const mapStateToProps = (state: IStateFromStore) => {
    return {
        sudoku: state.sudokuReducer,
        status: state.statusReducer,
        numberSelected: state.numberSelectedReducer,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<ISudokuState>) => {
    return {
        actions: Redux.bindActionCreators(actionCreators, dispatch),
    };
};

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoardClass);
