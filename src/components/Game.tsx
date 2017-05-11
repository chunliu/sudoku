import * as React from "react";
import {GameBoard} from "./board/GameBoard";
import {StyledLeftSideBar} from "./board/LeftSideBar";

export class Game extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <h1>Sukodu</h1>
                <hr />
                <StyledLeftSideBar />
                <GameBoard />
            </div>
        );
    }
}
