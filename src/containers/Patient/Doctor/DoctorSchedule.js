import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
        };
    }
    getArrDays = language => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, "days")
                        .format("dddd - DD/MM")
                        .replace(/^[a-z]/, m => {
                            return m.toUpperCase();
                        });
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
                }
            }
            object.value = moment(new Date()).add(i, "days").startOf("day").valueOf(); //valueod:convert unix date
            allDays.push(object);
        }

        return allDays;
    };
    componentDidMount() {
        let { language } = this.props;
        // console.log(moment(new Date()).format("dddd-DD/MM"));
        // console.log(moment(new Date()).locale("en").format("ddd-DD/MM"));
        let allDays = this.getArrDays(language);
        console.log("allday", allDays);
        this.setState({
            allDays: allDays,
        });
    }

    async componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.language !== this.props.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (prevprops.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
                if (res && res.errCode === 0) {
                    this.setState({
                        allAvalableTime: res.data ? res.data : [],
                    });
                }
            }
        }
    }
    handleOnChangeSelect = async event => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let id = this.props.doctorIdFromParent;
            let date = event.target.value;

            let res = await getScheduleDoctorByDate(id, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                });
            }
            console.log("allAvalableTime", this.state.allAvalableTime);
        }
    };

    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props;
        console.log("allday", allDays);

        return (
            <div className="doctor-shedule-container">
                <div className="all-schedule">
                    <select onChange={event => this.handleOnChangeSelect(event)}>
                        {allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i class="fas fa-calendar-alt">
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </i>
                    </div>
                    <div className="time-content">
                        {allAvalableTime && allAvalableTime.length > 0 ? (
                            <>
                                <div className="time-content-btns">
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay =
                                            language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn;
                                        return <button key={index}>{timeDisplay}</button>;
                                    })}
                                </div>
                                <div className="booking-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="empty-calendar">
                                <FormattedMessage id="patient.detail-doctor.no-shedule" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
