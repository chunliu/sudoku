import * as React from "react";
import {Modal, Button} from "react-bootstrap";

interface IResultModalProps {
    showModal: boolean;
    solved: boolean;
    handleNewGame(): void;
    handleRestart(): void;
}
interface IResultModalState {
    showModal: boolean;
}

export class ResultModal extends React.Component<IResultModalProps, IResultModalState> {
    constructor() {
        super();
        this.state = {showModal: false};
        this.close = this.close.bind(this);
        this.clickOK = this.clickOK.bind(this);
    }
    public render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                    {this.modalTitle()}
                </Modal.Header>
                <Modal.Body>
                    {this.modalBody()}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.clickOK}>OK</Button>
                    <Button onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    private componentWillReceiveProps(nextProps: IResultModalProps) {
        this.setState({showModal: nextProps.showModal});
    }
    private close() {
        this.setState({showModal: false});
    }
    private clickOK() {
        if (this.props.solved) {
            this.props.handleNewGame();
        } else {
            this.props.handleRestart();
        }
    }
    private modalTitle() {
        if (this.props.solved) {
            return <Modal.Title><span className="text-success">Solved</span></Modal.Title>;
        } else {
            return <Modal.Title><span className="text-danger">Failed</span></Modal.Title>;
        }
    }
    private modalBody() {
        if (this.props.solved) {
            return <p>You have solved the puzzle. Wanna try a new puzzle?</p>;
        } else {
            return <p>You failed to solve the puzzle. Wanna try it again?</p>;
        }
    }
}
