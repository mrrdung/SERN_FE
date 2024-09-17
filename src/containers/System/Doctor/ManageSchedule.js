import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import { LANGUAGES, dateFormat } from "../../../utils";
import Select from "react-select";
import * as action from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            // currentDate: new Date(),
            currentDate: "",
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllCodeTimeStart();
    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.listDoctorredux !== this.props.listDoctorredux) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevprops.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevprops.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }));
            }

            this.setState({
                rangeTime: data,
            });
        }
    }
    buildDataInputSelect = inputData => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };
    handleChangeSelect = async selectedOption => {
        this.setState({
            selectedDoctor: selectedOption,
        });
    };
    handleOnchangeDate = date => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleBtnTime = time => {
        console.log("check time", time);
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let rangeTimeNew = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            this.setState({
                rangeTime: rangeTimeNew,
            });
        }
    };
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid date!");
            return;
        }
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => item.isSelected === true);
            if (selectTime && selectTime.length > 0) {
                selectTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.timeType = schedule.keyMap;
                    object.date = formatDate;
                    result.push(object);
                });
            } else {
                toast.error("Invalid Select Time");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatDate: formatDate,
        });

        console.log("check result", result);
        console.log("check res", res);
    };
    render() {
        // console.log("checks allScheduleTime", this.state);
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    {" "}
                                    <FormattedMessage id="manage-schedule.Choose-doctor"></FormattedMessage>
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    {" "}
                                    <FormattedMessage id="manage-schedule.Choose-date"></FormattedMessage>
                                </label>

                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchangeDate}
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 chose-time-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={
                                                    item.isSelected === true
                                                        ? "btn-schedule-time active"
                                                        : "btn-schedule-time"
                                                }
                                                key={index}
                                                onClick={() => this.handleBtnTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>

                            <button
                                className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save"></FormattedMessage>
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctorredux: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctorStart()),
        fetchAllCodeTimeStart: () => dispatch(action.fetchAllCodeTimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
