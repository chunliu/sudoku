import * as React from 'react';

interface SquareProps {
    key: string;
    value: string;
};

interface SquareState {};

export class Square extends React.Component<SquareProps, SquareState> {
    public render(): JSX.Element {
        return (
            <button className="square">{this.props.value}</button>
        );
    }
}
