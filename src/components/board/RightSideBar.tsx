import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import {ISudokuState, GameStatus, ISudokuReducerState} from "../../redux/types";
import {CheckWin} from "../../redux/configureStore";
import {statusUpdate} from "../../redux/sudokuAction";

interface IRightSideBarProps {
    children?: React.ReactChildren;
    className?: string;
    fillingCount: number;
    gameStatus: GameStatus;
    dispatch?: Redux.Dispatch<{}>;
}

class RightSideBarComponent extends React.Component<IRightSideBarProps, {}> {
    public render() {
        return (
            <div className={this.props.className}>
                <StyledDiv>Blank Cells: {this.props.fillingCount}</StyledDiv>
                <StyledDiv>Status: {this.printGameStatus(this.props.gameStatus)}</StyledDiv>
            </div>
        );
    }
    private printGameStatus(status: GameStatus) {
        switch (status) {
            case GameStatus.Initializing:
                return "Initializing";
            case GameStatus.Playing:
                return "Playing";
            case GameStatus.Solved:
                return "Solved";
            case GameStatus.Failed:
                return "Failed";
        }
    }
    private componentWillReceiveProps(nextProps: IRightSideBarProps) {
        if (nextProps.fillingCount === 0) {
            this.props.dispatch(CheckWin());
        } else if  (this.props.fillingCount === 0 && nextProps.fillingCount > 0) {
            this.props.dispatch(statusUpdate(GameStatus.Playing));
        }
    }
}

const StyledRightSideBar = styled(RightSideBarComponent)`
    width: 150px;
    height: 500px;
	float: left;
    border-left: 1px solid #999;
    padding: 10px;
`;
const StyledDiv = styled.div`
    font: bold 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 20px;
`;

const mapStateToProps = (state: ISudokuReducerState) => {
    return {
        fillingCount: state.fillingCountReducer,
        gameStatus: state.statusReducer,
    };
};
export const RightSideBar = connect(mapStateToProps)(StyledRightSideBar);
