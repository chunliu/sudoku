import * as React from "react";
import * as Redux from "redux";
import {connect} from "react-redux";
import {Nav, Navbar, NavbarHeader, NavbarBrand,
    Button, ButtonToolbar, NavItem} from "react-bootstrap";
import {initializeGame, resetGame} from "../../redux/configureStore";

interface INavButtonProps {
    navExpanded: boolean;
    handleNewGame(): void;
    handleReset(): void;
}
const NavButtons: React.StatelessComponent<INavButtonProps> = (props: INavButtonProps) => {
    function onNavItemSelect(eventKey: any, e?: React.SyntheticEvent<{}>) {
        switch (eventKey) {
            case "NEW_GAME":
                return props.handleNewGame();
            case "RESTART":
                return props.handleReset();
            default:
                return;
        }
    }
    if (props.navExpanded) {
        return (
            <Nav pullRight onSelect={(eventKey: any, e?: React.SyntheticEvent<{}>) => onNavItemSelect(eventKey, e)}>
                <NavItem eventKey={"NEW_GAME"} href="#">New Game</NavItem>
                <NavItem eventKey={"RESTART"} href="#">Restart</NavItem>
            </Nav>
        );
    } else {
        return (
            <Nav pullRight>
                <Navbar.Text>
                    <ButtonToolbar>
                        <Button onClick={() => props.handleNewGame()}>New Game</Button>
                        <Button onClick={() => props.handleReset()}>Restart</Button>
                    </ButtonToolbar>
                </Navbar.Text>
            </Nav>
        );
    }
};

interface IHeaderNavProps {
    actions: any;
}
interface IHeaderNavState {
    navExpanded: boolean;
}

export class HeaderNavComponent extends React.Component<IHeaderNavProps, IHeaderNavState> {
    constructor() {
        super();
        this.state = {navExpanded: false};
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    public render() {
        return (
            <Navbar inverse collapseOnSelect
                navExpanded={this.state.navExpanded} onToggle={() => this.toggleNav()}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Sudoku</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <NavButtons navExpanded={this.state.navExpanded}
                        handleNewGame={this.handleNewGame}
                        handleReset={this.handleReset} />
                </Navbar.Collapse>
            </Navbar>
        );
    }
    private toggleNav() {
        this.setState({navExpanded: !this.state.navExpanded});
    }
    private handleNewGame() {
        this.props.actions.initializeGame();
    }
    private handleReset() {
        this.props.actions.resetGame();
    }
}
const mapDispatchToProps = (dispatch: Redux.Dispatch<{}>) => {
    return {
        actions: Redux.bindActionCreators({
            initializeGame,
            resetGame,
        }, dispatch),
    };
};
export const HeaderNav = connect(null, mapDispatchToProps)(HeaderNavComponent);
