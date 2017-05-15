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
                <HeaderNav />
                <Row>
                    <Col md={4} mdOffset={4}>
                        <GameBoard />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
// export const StyledGame = styled(Game)`
//     min-width: 480px;
//     max-width: 900px;
//     margin: 0 auto;
//     text-align: center;
// `;
