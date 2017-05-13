import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import {GameStatus, ISudokuReducerState} from "../../redux/types";
import {CheckWin} from "../../redux/configureStore";
import {statusUpdate} from "../../redux/sudokuAction";
import {Clock} from "./Clock";

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
                <StyledTimerDiv><Clock start={this.props.gameStatus === GameStatus.Playing} /></StyledTimerDiv>
                <StyledTable>
                    <tbody>
                        <tr>
                            <StyledTd>Cells:</StyledTd>
                            <td>{this.props.fillingCount}</td>
                        </tr>
                        <tr>
                            <StyledTd>Status:</StyledTd>
                            <td>{this.printGameStatus(this.props.gameStatus)}</td>
                        </tr>
                    </tbody>
                </StyledTable>
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
    width: 15%;
    height: 500px;
	float: left;
    border-left: 1px solid #999;
    margin-left: 10px;
`;
const StyledTable = styled.table`
    font-weight: bold;
    font-size: 14px;
`;
const StyledTd = styled.td`
    text-align: right;
    line-height: 20px;
`;
const StyledTimerDiv = styled.div`
    font-weight: bold;
    font-size: 36px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 15px;
`;
const mapStateToProps = (state: ISudokuReducerState) => {
    return {
        fillingCount: state.fillingCountReducer,
        gameStatus: state.statusReducer,
    };
};
export const RightSideBar = connect(mapStateToProps)(StyledRightSideBar);
