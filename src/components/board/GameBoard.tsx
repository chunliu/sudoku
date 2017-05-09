import * as React from "react";
import {connect} from "react-redux";
import {Square} from "./Square";
import {COLS, ROWS, ISudoku} from "../../core/sudokuClass";
import {ISudokuState, GameStatus} from "../../redux/types";
import "../../scss/main.scss";

class GameBoardClass extends React.Component<ISudokuState, ISudokuState> {
    public render() {
        const {sudoku} = this.props;
        return (
            <div>
                <div className="status">{status}</div>
                {ROWS.map((r) => {
                    return (
                        <div key={r} className="board-row">
                            {COLS.map((c) => {
                                let disabled = false;
                                const value = sudoku[r + c];
                                if (this.props.status === GameStatus.Initializing) {
                                    disabled = value !== "";
                                }
                                return <Square key={r + c}
                                    disabled={disabled} squareKey={r + c}
                                    value={value} />;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
interface IBoardState {
    sudokuReducer: ISudokuState;
    statusReducer: ISudokuState;
}

const mapStateToProps = (state: IBoardState) => {
    return {
        sudoku: state.sudokuReducer.sudoku,
        status: state.statusReducer.status,
    };
};

export const GameBoard = connect(mapStateToProps)(GameBoardClass);
