import * as React from "react";
import styled from "styled-components";
interface IClockProps {
    start: boolean;
}
interface IClockState {
    startTime: number;
    timerId: number;
    intervals: number;
}
export class Clock extends React.Component<IClockProps, IClockState> {
    constructor() {
        super();
        this.state = {
            startTime: 0,
            timerId: 0,
            intervals: 0,
        };
    }
    public render() {
        return <div>{this.getFormattedIntervals()}</div>;
    }
    private componentDidMount() {
        if (this.props.start) {
            this.setState({startTime: Date.now()});
            this.toggleTimer(true);
        }
    }
    private componentWillReceiveProps(nextProps: IClockProps) {
        if (this.props.start !== nextProps.start) {
            if (nextProps.start) {
                this.setState({startTime: Date.now()});
                this.toggleTimer(true);
            } else {
                this.toggleTimer(false);
            }
        }
    }
    private toggleTimer(start: boolean) {
        if (start) {
            const timerId = window.setInterval(() => {
                this.tick();
            }, 1000);
            this.setState({timerId});
        } else {
            console.log("stop timer");
            window.clearInterval(this.state.timerId);
        }
    }
    private tick() {
        const interval = Date.now() - this.state.startTime;
        const totalSeconds = Math.round(interval / 1000);
        this.setState({intervals: totalSeconds});
    }
    private getFormattedIntervals() {
        const totalSeconds = this.state.intervals;
        const s = parseInt((totalSeconds % 60).toString(), 10);
        const m = parseInt((totalSeconds / 60).toString(), 10) % 60;
        const h = parseInt((totalSeconds / 3600).toString(), 10);

        const seconds = s < 10 ? "0" + s : s;
        const minutes = m < 10 ? "0" + m : m;
        const hours = h < 10 ? (h === 0 ? "" : "0" + h) : h;

        return (hours === "" ? "" : hours + ":") + minutes + ":" + seconds;
    }
}
