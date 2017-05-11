import * as React from "react";
import styled from "styled-components";

interface ILeftSideBarProps {
    children?: React.ReactChildren;
    className?: string;
}

const LeftSideBar: React.StatelessComponent<ILeftSideBarProps> = (props) => (
    <div className={props.className}>
        <StyledButton>New Game</StyledButton>
        <StyledButton>Reset</StyledButton>
    </div>
);

export const StyledLeftSideBar = styled(LeftSideBar)`
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
