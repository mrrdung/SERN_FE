import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManager.scss";
import { getAllUsers, addNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser'
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenToggle: false,
            isOpenToogleEdit: false,
            userEdit: {}

        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();

    }
    getAllUserFromReact = async () => {
        let responsive = await getAllUsers('ALL');
        if (responsive && responsive.errCode === 0) {
            this.setState({
                arrUsers: responsive.users
            })
        }
    }

    addNewUser = async (data) => {
        try {
            let repose = await addNewUserService(data);

            if (repose && repose.errCode === 0) {
                this.getAllUserFromReact();
                this.setState({
                    isOpenToggle: false
                })
                emitter.emit('EVENT_CLAER_MODAL_DATA')//, { "id": 'your id' } them de truyen data 
            }
        } catch (e) {
            console.log(e);

        }


    }

    /** Life cycle
     * Run CompOnent:
     * 1.Run constructor -> init state
     * 3.Didmount(set state)
     * 2.Render
     */
    handleBntCreateNewUser = () => {
        this.setState({
            isOpenToggle: true
        })
    }
    handleDeleteUser = async (user) => {
        let res = await deleteUserService(user.id)
        if (res && res.errCode === 0) {
            this.getAllUserFromReact();
        }
        else {
            alert(res.errMessage)
        }

    }

    handleEditUser = (user) => {
        this.setState({
            isOpenToogleEdit: true,
            userEdit: user
        })
    }
    handletoDoEditUser = async (data) => {
        try {
            let res = await editUserService(data);
            if (res.errCode === 0) {

                this.setState({
                    isOpenToogleEdit: false
                })
                await this.getAllUserFromReact();
            } else {
                alert('err')
            }
        } catch (e) {
            console.log(e);

        }
    }
    handleToggle = () => {
        this.setState({
            isOpenToggle: !this.state.isOpenToggle
        })
    }
    handleToggleEdit = () => {
        this.setState({
            isOpenToogleEdit: !this.state.isOpenToogleEdit
        })
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenToggle}
                    toggleHandle={this.handleToggle}
                    addNewUser={this.addNewUser}
                />
                <div className="title text-center">Manage users with me</div>
                <div className='mx-3 mt-4'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleBntCreateNewUser()}
                    ><i className="fas fa-plus"></i> Add new user</button>
                </div>
                {this.state.isOpenToogleEdit && <ModalEditUser
                    isOpen={this.state.isOpenToogleEdit}
                    handleEditUser={this.handleEditUser}
                    toggleHandle={this.handleToggleEdit}
                    currentUser={this.state.userEdit}
                    editUser={this.handletoDoEditUser}
                />
                }

                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Phonenumber</th>
                            <th>Action</th>
                        </tr>
                        {
                            (arrUsers && arrUsers.map((item, index) => {

                                return (
                                    <><tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>
                                            <button className='edit-btn'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='delete-btn'
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                    </>)

                            }))
                        }


                    </table>
                </div>
            </div>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
