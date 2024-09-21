import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorById } from "../../../services/userService";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
        };
    }

    componentDidMount() {}

    async componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.language !== this.props.language) {
        }
        if (prevprops.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
            }

            this.setState({
                extraInfor: res.data,
            });
        }
    }

    handleShowHidentDetail = status => {
        this.setState({ isShowDetail: status });
    };

    render() {
        let { isShowDetail, extraInfor } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className="doctor-extar-container">
                    <div className="content-up">
                        <div className="text-address">
                            <FormattedMessage id="patient.extral-infor-doctor.text-price" />
                        </div>
                        <div className="name-clinic">
                            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
                        </div>
                        <div className="detail-address">
                            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}
                        </div>
                    </div>
                    <div className="content-down">
                        {isShowDetail === false && (
                            <div>
                                <div className="text-price">
                                    <FormattedMessage id="patient.extral-infor-doctor.text-price" />
                                    {extraInfor && extraInfor.priceData && language === LANGUAGES.VI && (
                                        <NumberFormat
                                            value={extraInfor.priceData.valueVi}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={"VND"}
                                        />
                                    )}
                                    {extraInfor && extraInfor.priceData && language === LANGUAGES.EN && (
                                        <NumberFormat
                                            value={extraInfor.priceData.valueEn}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={"$"}
                                        />
                                    )}
                                    <span onClick={() => this.handleShowHidentDetail(true)}>
                                        <FormattedMessage id="patient.extral-infor-doctor.text-show" />
                                    </span>
                                </div>
                                <div></div>
                            </div>
                        )}
                        {isShowDetail === true && (
                            <div className="">
                                <div className="text-price">
                                    <div>
                                        <FormattedMessage id="patient.extral-infor-doctor.text-price" />{" "}
                                    </div>
                                    <div>
                                        {extraInfor && extraInfor.priceData && language === LANGUAGES.VI && (
                                            <NumberFormat
                                                value={extraInfor.priceData.valueVi}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"VND"}
                                            />
                                        )}
                                        {extraInfor && extraInfor.priceData && language === LANGUAGES.EN && (
                                            <NumberFormat
                                                value={extraInfor.priceData.valueEn}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"$"}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="price">{extraInfor && extraInfor.note ? extraInfor.note : ""}</div>
                                <div className="payment">
                                    <FormattedMessage id="patient.extral-infor-doctor.payment" />
                                    {extraInfor && extraInfor.paymentData && language === LANGUAGES.VI
                                        ? extraInfor.paymentData.valueVi
                                        : ""}
                                    {extraInfor && extraInfor.paymentData && language === LANGUAGES.EN
                                        ? extraInfor.paymentData.valueEn
                                        : ""}
                                </div>
                                <span onClick={() => this.handleShowHidentDetail(false)}>
                                    <FormattedMessage id="patient.extral-infor-doctor.text-hidden" />
                                </span>
                            </div>
                        )}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
