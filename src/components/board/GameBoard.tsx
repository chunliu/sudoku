import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import {Square} from "./Square";
import {COLS, ROWS, ISudoku} from "../../core/sudokuClass";
import {ISudokuState, GameStatus} from "../../redux/types";
import {statusUpdate} from "../../redux/sudokuAction";
import "../../scss/main.scss";

interface IBoardProps {
    sudoku: ISudoku;
    status: GameStatus;
    actions: any;
}

class GameBoardClass extends React.Component<IBoardProps, ISudokuState> {
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
                <div className="status">{this.props.status.toString()}</div>
                {ROWS.map((r) => {
                    return (
                        <div key={r} className="board-row">
                            {COLS.map((c) => {
                                const value = sudoku[r + c];
                                return (
                                    <Square key={r + c}
                                    onSquareClick={(key: string) => {alert(key + " is clicked"); }}
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
                        <Square key={c} onSquareClick={(key: string) => {alert(key + " is clicked"); }}
                            squareKey={c} value={c} />
                    );
                })}
            </div>
        );
    }
}
interface IStateFromStore {
    sudokuReducer: ISudoku;
    statusReducer: GameStatus;
}

const mapStateToProps = (state: IStateFromStore) => {
    return {
        sudoku: state.sudokuReducer,
        status: state.statusReducer,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<ISudokuState>) => {
    return {
        actions: Redux.bindActionCreators({
            statusUpdate,
        }, dispatch),
    };
};

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(GameBoardClass);
