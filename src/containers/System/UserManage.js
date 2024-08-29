import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManager.scss";
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []

        }
    }

    async componentDidMount() {
        let responsive = await getAllUsers('ALL');
        if (responsive && responsive.errCode === 0) {
            this.setState({
                arrUsers: responsive.users
            })
        }

    }

    /** Life cycle
     * Run CompOnent:
     * 1.Run constructor -> init state
     * 3.Didmount(set state)
     * 2.Render
     */

    render() {
        let arrUsers = this.state.arrUsers;
        console.log('aaa,', arrUsers);

        return (
            <div className='users-container'>
                <div className="title text-center">Manage users with me</div>
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
                                            <button className='edit-btn' ><i class="fas fa-pencil-alt"></i></button>
                                            <button className='delete-btn'><i class="fas fa-trash-alt"></i></button>
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
