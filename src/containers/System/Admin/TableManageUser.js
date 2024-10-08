import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss";
import * as action from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: []


        }
    }
    async componentDidMount() {
        this.props.fetchAllUserStart();
    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleEditUser = (user) => {
        this.props.handleEditInputFromParentkey(user);

    }
    handleDeleteUser = (user) => {

        this.props.deleteUserStart(user.id);
    }
    render() {
        let arrUser = this.state.userRedux;
        return (
            <React.Fragment>
                <div className='users-container'>
                    <div className='users-table mt-3 mx-1'>
                        <table id="TableManageUser">

                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Phonenumber</th>
                                <th>Action</th>
                            </tr>
                            {arrUser && arrUser.length > 0 &&
                                arrUser.map((item, index) => {
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
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>


        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserStart: () => dispatch(action.fetchAllUserStart()),
        deleteUserStart: (id) => dispatch(action.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
