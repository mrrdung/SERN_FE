import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileInforDoctorById } from "../../../services/userService";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDataDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInforDataDoctor = async id => {
        let result = {};
        if (id) {
            let res = await getProfileInforDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }

            return result;
        }
    };
    componentDidUpdate(prevprops, prevState, snapshot) {
        // let data = await this.getInforDataDoctor(this.props.doctorId);
    }

    renderTimeProfile = dataTime => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            let timeBooking = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            return (
                <>
                    <div>
                        {timeBooking}-{date}
                    </div>
                </>
            );
        }
    };

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDesciptionProfile, dataTime } = this.props;

        let nameVi = "";
        let nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <>
                {" "}
                <div className="profile-doctor-container">
                    <div className="intro-doctor">
                        <div
                            className="left-Content"
                            style={{ backgroundImage: `url(${dataProfile.image})` }}
                        ></div>
                        {isShowDesciptionProfile === true && (
                            <div className="right-Content">
                                <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>

                                <div className="down">
                                    {dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                </div>
                            </div>
                        )}
                        {isShowDesciptionProfile === false && (
                            <div className="right-Content">
                                <div className="text-booking">
                                    <FormattedMessage id="patient.profile-schedule.make-schedule" />
                                </div>
                                <div className="text-name">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                <div className="text-time">{this.renderTimeProfile(dataTime)}</div>
                                <div className="text-address">
                                    <div className="name-clinic">
                                        {dataProfile && dataProfile.Doctor_Infor
                                            ? dataProfile.Doctor_Infor.nameClinic
                                            : ""}
                                    </div>
                                    <div className="detail-address">
                                        {" "}
                                        {dataProfile && dataProfile.Doctor_Infor
                                            ? dataProfile.Doctor_Infor.addressClinic
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="price">
                        <label className="price-option">
                            <FormattedMessage id="patient.profile-schedule.price" />
                            {
                                dataProfile &&
                                    dataProfile.Doctor_Infor &&
                                    dataProfile.Doctor_Infor.priceData &&
                                    language === LANGUAGES.VI && (
                                        <NumberFormat
                                            value={dataProfile.Doctor_Infor.priceData.valueVi}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={"VND"}
                                        />
                                    )
                                // ? dataProfile.Doctor_Infor.priceData.valueVi
                                // : ""
                            }

                            {dataProfile &&
                                dataProfile.Doctor_Infor &&
                                dataProfile.Doctor_Infor.priceData &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={dataProfile.Doctor_Infor.priceData.valueEn}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"$"}
                                    />
                                )}
                        </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
