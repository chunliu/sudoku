import * as React from "react";
import styled from "styled-components";
import {GameBoard} from "./board/GameBoard";
import {HeaderNav} from "./board/HeaderNav";
import {Grid, Row, Col} from "react-bootstrap";

interface GameProps {
    className?: string;
}

export class Game extends React.Component<GameProps, {}> {
    public render(): JSX.Element {
        return (
            <Grid fluid>
                <Row>
                    <Col>
                        <HeaderNav />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GameBoard />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
