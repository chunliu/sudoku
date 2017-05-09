import * as React from "react";
import {GameBoard} from "./board/GameBoard";
import {COLS, ROWS} from "../core/sudokuClass";

export class Game extends React.Component<{}, {}> {
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
