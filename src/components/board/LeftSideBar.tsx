import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import {initializeGame, resetGame} from "../../redux/configureStore";

interface ILeftSideBarProps {
    children?: React.ReactChildren;
    className?: string;
    actions: any;
}

class LeftSideBarComponent extends React.Component<ILeftSideBarProps, {}> {
    constructor() {
        super();
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    public render() {
        return (
            <div className={this.props.className}>
                <StyledButton onClick={this.handleNewGame}>New Game</StyledButton>
                <StyledButton onClick={this.handleReset}>Reset</StyledButton>
            </div>
        );
    }
    private handleNewGame() {
        this.props.actions.initializeGame();
    }
    private handleReset() {
        this.props.actions.resetGame();
    }
}

const StyledLeftSideBar = styled(LeftSideBarComponent)`
    width: 150px;
    height: 500px;
	float: left;
	padding: 5px 15px;
`;
const StyledButton = styled.button`
    font: 20px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.8;
    appearance: none;
    box-shadow: none;
    border-radius: 10px;
    color: #fff;
    background-color: #6496c8;
    text-shadow: -1px 1px #417cb8;
    border: none;
    width: 120px;
    margin: 5px;
    &:focus {
        outline: none
    }
    &:hover {
        background-color: #346392;
        text-shadow: -1px 1px #27496d;
    }
    &:active {
        background-color: #27496d;
        text-shadow: -1px 1px #193047;
    }
`;
const mapDispatchToProps = (dispatch: Redux.Dispatch<{}>) => {
    return {
        actions: Redux.bindActionCreators({
            initializeGame,
            resetGame,
        }, dispatch),
    };
};
export const LeftSideBar = connect(null, mapDispatchToProps)(StyledLeftSideBar);
