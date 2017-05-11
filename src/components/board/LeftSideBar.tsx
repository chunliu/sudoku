import * as React from "react";
import styled from "styled-components";

interface ILeftSideBarProps {
    children?: React.ReactChildren;
    className?: string;
}

const LeftSideBar: React.StatelessComponent<ILeftSideBarProps> = (props) => (
    <div className={props.className}>
        <ul>
            <li>New Game</li>
        </ul>
    </div>
);

export const StyledLeftSideBar = styled(LeftSideBar)`
    width: 200px;
    height: 500px;
	float: left;
	padding: 5px 15px;
    border-right: 1px solid #999;
    margin-right: 30px;
`;
