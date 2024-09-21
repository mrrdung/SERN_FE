import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./verifyEmail.scss";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errCode: 0,
            statusVeryfy: false,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVeryfy: true,
                });
            } else {
                this.setState({
                    statusVeryfy: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    componentDidUpdate(prevprops, prevState, snapshot) {}

    render() {
        let { statusVeryfy, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-emai-container">
                    {statusVeryfy === false ? (
                        <div>Loading data...</div>
                    ) : (
                        <div>
                            {errCode === 0 ? (
                                <div className="info-booking">Xác nhận lịch hẹn thành công!</div>
                            ) : (
                                <div className="info-booking">Lịch hẹn khôn tồn tại hoặc đã được xác nhận!</div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
