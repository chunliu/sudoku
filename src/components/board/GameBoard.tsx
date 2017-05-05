import * as React from "react";
import {Square} from "./Square";
import "../../scss/main.scss";

interface GameBoardProps {};

interface GameBoardState {};

export class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
    render() {
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square />
                    <Square />
                    <Square />
                </div>
                <div className="board-row">
                    <Square />
                    <Square />
                    <Square />
                </div>
                <div className="board-row">
                    <Square />
                    <Square />
                    <Square />
                </div>
            </div>
        );
    }
}