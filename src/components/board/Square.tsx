import * as React from "react";
import styled from "styled-components";
import {GameStatus} from "../../redux/types";
interface ISquareProps {
    squareKey: string;
    value: string;
    status?: GameStatus;
    numberPressed?: string;
    onSquareClick(key: string): void;
}

interface ISquareState {
    disabled: boolean;
    pressed: boolean;
    inGrid: boolean;
}

const Button = styled.button`
    background: ${(props) => props.default ? "" : "#fff"};
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 48px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 48px;
    &:focus {
        outline: none;
        /*background: #ddd;*/
    }
    &:hover {
        background: ${(props) => props.disabled ? "white" : "#0388ca"};
    }
`;

export class Square extends React.Component<ISquareProps, ISquareState> {
    constructor() {
        super();
        this.state = {
            disabled: false,
            pressed: false,
            inGrid: true,
        };
    }
    public componentWillMount() {
        if (this.props.status === GameStatus.Initializing) {
            this.setState({disabled: this.props.value !== ""});
        }
        this.setState({inGrid: this.props.status !== undefined});
    }
    public render(): JSX.Element {
        return (
            <Button key={this.props.squareKey}
                disabled={this.state.disabled}
                default={this.state.pressed}
                onClick={() => {
                    if (!this.state.inGrid) {
                        this.setState({pressed: this.props.squareKey === this.props.numberPressed});
                    }
                    this.props.onSquareClick(this.props.squareKey);
                }}>
                {this.props.value}
            </Button>
        );
    }
}
