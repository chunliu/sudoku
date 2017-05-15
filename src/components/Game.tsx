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
                    <Col xs={12} md={12}>
                        <HeaderNav />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} smOffset={4} md={4} mdOffset={4}>
                        <GameBoard />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
