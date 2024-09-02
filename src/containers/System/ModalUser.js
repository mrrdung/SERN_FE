import React, { Component } from 'react';
import { dateFilter } from 'react-bootstrap-table2-filter';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter = () => {
        emitter.on('EVENT_CLAER_MODAL_DATA', () => {

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {

        this.props.toggleHandle();

    }

    validateIinput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValidate = true;
        for (let i = 0; i < arrInput.length; i++) {

            if (!this.state[arrInput[i]]) {
                isValidate = false;
                alert("missing requie ipnput" + arrInput[i]);
                break;
            }
        }
        return isValidate;

    }
    handleChangeInput = (event, id) => {

        let coppyState = { ...this.state }
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState
        }, console.log('log value', this.state)
        )
    }
    handleSubmit = () => {
        let isValidate = this.validateIinput();

        if (isValidate === true) {
            // console.log('check props child', this.props);
            this.props.addNewUser(this.state);

        }
    }

    render() {
        // console.log('check chile props', this.props);
        // console.log('check child open modal', this.props.isOpen);

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size="lg"
            // centered
            >


                <ModalHeader toggle={() => this.toggle()}>Add New User</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>
                        <div className='input-container '>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => this.handleChangeInput(event, 'email')}
                                value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container '>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => this.handleChangeInput(event, 'password')}
                                value={this.state.password}></input>
                        </div>
                        <div className='input-container '>
                            <label>FirstName</label>
                            <input type='text'
                                onChange={(event) => this.handleChangeInput(event, 'firstName')}
                                value={this.state.firstName}></input>
                        </div>
                        <div className='input-container '>
                            <label>LastName</label>
                            <input type='text'
                                onChange={(event) => this.handleChangeInput(event, 'lastName')}
                                value={this.state.lastName}></input>
                        </div>
                        <div className='input-container input-with-modal'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => this.handleChangeInput(event, 'address')}
                                value={this.state.address}
                            ></input>
                        </div>
                    </div>




                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-3" onClick={() => this.handleSubmit()}
                    >
                        Add User
                    </Button>{' '}
                    <Button color="secondary px-3" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
