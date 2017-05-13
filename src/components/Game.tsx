import * as React from "react";
import styled from "styled-components";
import {GameBoard} from "./board/GameBoard";
import {LeftSideBar} from "./board/LeftSideBar";
import {RightSideBar} from "./board/RightSideBar";

interface GameProps {
    className?: string;
}
export class Game extends React.Component<GameProps, {}> {
    public render(): JSX.Element {
        if (window.matchMedia("(max-width: 768px)").matches) {
            return (
                <div className={this.props.className}>
                    <h1>Sukodu</h1>
                    <hr />
                    <LeftSideBar />
                    {/*<RightSideBar floatToLeft />*/}
                    <GameBoard />
                </div>
            );
        } else {
            // console.log("not match");
            return (
                <div className={this.props.className}>
                    <h1>Sukodu</h1>
                    <hr />
                    <LeftSideBar />
                    <GameBoard />
                    <RightSideBar />
                </div>
            );
        }
    }
}
export const StyledGame = styled(Game)`
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #4d4d4d;
    min-width: 550px;
    max-width: 900px;
    margin: 0 auto;
`;
