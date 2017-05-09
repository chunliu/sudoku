import * as React from "react";

interface SquareProps {
    squareKey: string;
    value: string;
    disabled: boolean;
    onSquareClick(key: string): void;
}

export class Square extends React.Component<SquareProps, {}> {
    public render(): JSX.Element {
        return (
            <button key={this.props.squareKey} className="square"
                disabled={this.props.disabled}
                onClick={() => {this.props.onSquareClick(this.props.squareKey); }}>
                {this.props.value}
            </button>
        );
    }
}
