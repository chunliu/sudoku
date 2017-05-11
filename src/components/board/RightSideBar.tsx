import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import styled from "styled-components";
import {ISudokuState, GameStatus} from "../../redux/types";

interface IRightSideBarProps {
    children?: React.ReactChildren;
    className?: string;
    fillingCount: number;
}

class RightSideBarComponent extends React.Component<IRightSideBarProps, {}> {
    public render() {
        return (
            <div className={this.props.className}>
                <h2>Count: {this.props.fillingCount}</h2>
            </div>
        );
    }
}

export const StyledRightSideBar = styled(RightSideBarComponent)`
    width: 150px;
    height: 500px;
	float: left;
    border-left: 1px solid #999;
    padding: 10px;
`;
const mapStateToProps = (state: {fillingCountReducer: number; }) => {
    return {
        fillingCount: state.fillingCountReducer,
    };
};
export const RightSideBar = connect(mapStateToProps)(StyledRightSideBar);
