import * as React from "react";
import {GameBoard} from "./board/GameBoard";
import {COLS, ROWS} from "../core/sudokuClass";

interface GameProps {}

interface GameState {}

export class Game extends React.Component<GameProps, GameState> {
    public render(): JSX.Element {
        return (
            <div>
                <h1>Sukodu</h1>
                <hr />
                <GameBoard />
            </div>
        );
    }
}
