import React, { Component, version } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isEyepassWord: false,
            errMessage: "",
        };
    }
    handleUserName = event => {
        this.setState({
            username: event.target.value,
        });
        console.log(event.target.value);
    };
    handlePassword = event => {
        this.setState({
            password: event.target.value,
        });
    };
    handleClick = async () => {
        this.setState({
            errMessage: "",
        });
        console.log("username", this.state.username, "password", this.state.password);
        console.log("status", this.state);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                //todo
                this.props.userLoginSuccess(data.user);
                console.log("login ok");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
            console.log(error.response);
        }
    };
    handleChangeEye = () => {
        this.setState({
            isEyepassWord: !this.state.isEyepassWord,
        });
    };
    hanldeonKeyDown = event => {
        if (event.key === "Enter") {
            this.handleClick();
        }
    };

    render() {
        //JSX

        return (
            <div className="login-background">
                <div className="login-contain">
                    <div className="login-content row">
                        <div className="col-11 text-center text-login">Login</div>
                        <div className="col-11 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control "
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={event => this.handleUserName(event)}
                            ></input>
                        </div>
                        <div className="col-11 form-group login-input">
                            <label>Password</label>
                            <input
                                type={this.state.isEyepassWord === false ? "password" : "text"}
                                className="form-control"
                                placeholder="Enter your Password"
                                value={this.state.password}
                                onChange={event => this.handlePassword(event)}
                                onKeyDown={event => this.hanldeonKeyDown(event)}
                            ></input>
                            <span
                                className="eye-pass"
                                onClick={() => this.handleChangeEye()}
                            >
                                <i
                                    className={this.state.isEyepassWord === false ? "fas fa-eye" : "fas fa-eye-slash"}
                                ></i>
                            </span>
                        </div>
                        <div
                            className="col-12 "
                            style={{ color: "red" }}
                        >
                            {" "}
                            {this.state.errMessage}{" "}
                        </div>
                        <div>
                            <button
                                className="col-12 btn-login"
                                onClick={() => this.handleClick()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12 ">
                            <span className="for-password ">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-or-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: path => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: userInfo => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
