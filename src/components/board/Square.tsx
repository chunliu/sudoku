import * as React from "react";

interface SquareProps {
    squareKey: string;
    value: string;
    disabled: boolean;
}

export class Square extends React.Component<SquareProps, {}> {
    public render(): JSX.Element {
        return (
            <button key={this.props.squareKey} className="square" disabled={this.props.disabled}>
                {this.props.value}
            </button>
        );
    }
}
