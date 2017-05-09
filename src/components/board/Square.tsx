import * as React from "react";
import {GameStatus} from "../../redux/types";
interface ISquareProps {
    squareKey: string;
    value: string;
    status?: GameStatus;
    onSquareClick(key: string): void;
}

interface ISquareState {
    disabled: boolean;
}

export class Square extends React.Component<ISquareProps, ISquareState> {
    constructor() {
        super();
        this.state = {disabled: false};
    }
    public componentWillMount() {
        if (this.props.status === GameStatus.Initializing) {
            this.setState({disabled: this.props.value !== ""});
        }
    }
    public render(): JSX.Element {
        return (
            <button key={this.props.squareKey} className="square"
                disabled={this.state.disabled}
                onClick={() => {this.props.onSquareClick(this.props.squareKey); }}>
                {this.props.value}
            </button>
        );
    }
}
