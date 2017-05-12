import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import {indexOf} from "lodash";
import {StyledSquare} from "./Square";
import {COLS, ROWS, ISudoku} from "../../core/sudokuClass";
import {ISudokuState, GameStatus, ISudokuReducerState} from "../../redux/types";
import {actionCreators} from "../../redux/sudokuAction";

interface IBoardProps {
    sudoku: ISudoku;
    status: GameStatus;
    numberSelected: string;
    filledCells: string[];
    className?: string;
    actions: any;
}

const BoardRow = styled.div`
    clear: both;
    content: "";
    display: table;
`;
class GameBoardClass extends React.Component<IBoardProps, {}> {
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
            <div className={this.props.className}>
                {this.renderSudokuGrid(sudoku)}
                <br />
                {this.renderNumberSelection()}
            </div>
        );
    }
    private renderSudokuGrid(sudoku: ISudoku) {
        return (
            <div>
                {ROWS.map((r) => {
                    return (
                        <BoardRow key={r}>
                            {COLS.map((c) => {
                                const value = sudoku[r + c];
                                return (
                                    <StyledSquare key={r + c}
                                        borderright={"36".indexOf(c) >= 0}
                                        borderleft={"47".indexOf(c) >= 0}
                                        borderbotton={"CF".indexOf(r) >= 0}
                                        bordertop={"DG".indexOf(r) >= 0}
                                        isFilled={indexOf(this.props.filledCells, r + c) !== -1}
                                        onSquareClick={this.handleGridClick}
                                        status={this.props.status} squareKey={r + c}
                                        value={value} />
                                );
                            })}
                        </BoardRow>
                    );
                })}
            </div>
        );
    }
    private renderNumberSelection() {
        return (
            <BoardRow>
                {COLS.map((c) => {
                    return (
                        <StyledSquare key={c} onSquareClick={this.handleNumberClick}
                            isPressed={this.props.numberSelected === c} squareKey={c} value={c} />
                    );
                })}
            </BoardRow>
        );
    }
    private handleGridClick(key: string) {
        if (this.props.numberSelected === "0") {
            return;
        }
        const s: ISudoku = {};
        s[key] = this.props.sudoku[key] === ""
            ? this.props.numberSelected : "";
        // Update redux store.
        this.props.actions.updateFillingCount(s[key] !== "" ? -1 : 1);
        this.props.actions.filledCellsAction({
            fill: s[key] !== "",
            filledCells: [key],
        });
        this.props.actions.loadGridSuccess(s);
    }
    private handleNumberClick(key: string) {
        this.props.actions.updateNumberSelected(key);
    }
}
const StyledGameBoard = styled(GameBoardClass)`
    width: 450px;
    float: left;
`;

const mapStateToProps = (state: ISudokuReducerState) => {
    return {
        sudoku: state.sudokuReducer,
        status: state.statusReducer,
        numberSelected: state.numberSelectedReducer,
        filledCells: state.filledCellsReducer,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<ISudokuState>) => {
    return {
        actions: Redux.bindActionCreators(actionCreators, dispatch),
    };
};

export const GameBoard = connect(mapStateToProps, mapDispatchToProps)(StyledGameBoard);
