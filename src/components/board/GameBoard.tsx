import * as React from "react";
import {Square} from "./Square";
import {COLS, ROWS} from "../../core/sudokuClass";
import "../../scss/main.scss";

interface GameBoardProps {}

interface GameBoardState {}

export class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
    public render() {
        return (
            <div>
                <div className="status">{status}</div>
                {ROWS.map((r) => {
                    return (
                        <div className="board-row">
                            {COLS.map((c) => {
                                return <Square key={r + c} value={r + c} />;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
