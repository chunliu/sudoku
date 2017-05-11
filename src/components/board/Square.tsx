import * as React from "react";
import styled from "styled-components";
import {GameStatus} from "../../redux/types";
interface ISquareProps {
    squareKey: string;
    value: string;
    status?: GameStatus;
    isPressed?: boolean;
    borderleft?: boolean;
    bordertop?: boolean;
    borderright?: boolean;
    borderbotton?: boolean;
    className?: string;
    onSquareClick(key: string): void;
}

interface ISquareState {
    disabled: boolean;
}

class Square extends React.Component<ISquareProps, ISquareState> {
    constructor() {
        super();
        this.state = {
            disabled: false,
        };
    }
    public componentWillMount() {
        if (this.props.status === GameStatus.Initializing) {
            this.setState({disabled: this.props.value !== ""});
        }
    }
    public render(): JSX.Element {
        return (
            <button className={this.props.className} key={this.props.squareKey}
                disabled={this.state.disabled}
                default={this.props.isPressed}
                onClick={() => {
                    this.props.onSquareClick(this.props.squareKey);
                }}>
                {this.props.value}
            </button>
        );
    }
}
export const StyledSquare = styled(Square)`
    background: ${(props) => props.isPressed ? "#0388ca" : "#ffffff"};
    border-left: ${(props) => props.borderleft ? "2px solid #4e535b" : "1px solid #999"};
    border-top: ${(props) => props.bordertop ? "2px solid #4e535b" : "1px solid #999"};
    border-right: ${(props) => props.borderright ? "2px solid #4e535b" : "1px solid #999"};
    border-bottom: ${(props) => props.borderbotton ? "2px solid #4e535b" : "1px solid #999"};
    float: left;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.isPressed ? "#ffffff" : "#000000"};
    line-height: 34px;
    height: 48px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 48px;
    &:focus {
        outline: none;
    }
    &:hover:enabled {
        background: #0388ca;
    }
`;
