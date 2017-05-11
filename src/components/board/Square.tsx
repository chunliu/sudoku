import * as React from "react";
import styled from "styled-components";
import {GameStatus} from "../../redux/types";
interface ISquareProps {
    squareKey: string;
    value: string;
    status?: GameStatus;
    isPressed?: boolean;
    onSquareClick(key: string): void;
}

interface ISquareState {
    disabled: boolean;
}

const Button = styled.button`
    background: ${(props) => props.default ? "#0388ca" : "#ffffff"};
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => props.default ? "#ffffff" : "#000000"};
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
    &:hover {
        background: ${(props) => props.disabled ? "#ffffff" : "#0388ca"};
    }
`;

export class Square extends React.Component<ISquareProps, ISquareState> {
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
            <Button key={this.props.squareKey}
                disabled={this.state.disabled}
                default={this.props.isPressed}
                onClick={() => {
                    this.props.onSquareClick(this.props.squareKey);
                }}>
                {this.props.value}
            </Button>
        );
    }
}
