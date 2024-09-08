import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/';
import * as action from '../../../store/actions';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            priviewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        this.props.createNewUser()

    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevprops.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevprops.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }
        if (prevprops.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }
    handleChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                priviewImgUrl: objectUrl,
                avatar: file
            }, () => { console.log('check data file is found', this.state.priviewImgUrl) })

        } else {
            console.log('check data file not found');
        }
    }
    openPriviewImg = () => {
        this.setState({
            isOpen: true
        })
    }
    handleOnchangeInput = (event, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState
        })

    }
    checkVlidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('missing require input paramer' + arrCheck[i])
                break;
            }

        }
        return isValid;

    }
    handleOnClickSave = () => {
        let isValid = this.checkVlidateInput();
        if (isValid === false) return;
        // fire redux action

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            postionId: this.state.position
        })
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isGender = this.props.isLoadingGender
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className="user-redux-container" >
                <div className='title'>
                    User Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control'
                                    value={email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}

                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.Password" /></label>
                                <input className='form-control'
                                    value={password}
                                    onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control'
                                    value={firstName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control'
                                    value={lastName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control'
                                    value={address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => this.handleOnchangeInput(event, 'gender')} >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key} >
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}


                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control" onChange={(event) => this.handleOnchangeInput(event, 'position')}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control" onChange={(event) => this.handleOnchangeInput(event, 'role')}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' className='form-control' hidden
                                        onChange={(event) => { this.handleChangeImage(event) }}

                                    />
                                    <label className='upload-img' htmlFor='previewImg'>Tải Ảnh<i class="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.priviewImgUrl})` }}
                                        onClick={() => this.openPriviewImg()}
                                    ></div>

                                </div>

                            </div>
                            <div className='col-12'>
                                <button
                                    onClick={() => this.handleOnClickSave()}
                                    className='btn btn-primary my-3'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                            <div >
                                <TableManageUser />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.priviewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    ></Lightbox>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // increment: () => dispatch({ type: 'INCREMENT' }),
        getGenderStart: () => dispatch(action.fecthGenderStart()),
        getPositionStart: () => dispatch(action.fecthPositionStart()),
        getRoleStart: () => dispatch(action.fecthRoleStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        fetchAllUserStart: () => dispatch(action.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
