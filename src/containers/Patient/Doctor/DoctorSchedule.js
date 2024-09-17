import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        };
    }
    setArrDays = language => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
            } else {
                object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
            }

            object.value = moment(new Date()).add(i, "days").startOf("day").valueOf(); //valueod:convert unix date
            allDays.push(object);
        }

        this.setState({
            allDays: allDays,
        });
    };
    componentDidMount() {
        let { language } = this.props;
        // console.log(moment(new Date()).format("dddd-DD/MM"));
        // console.log(moment(new Date()).locale("en").format("ddd-DD/MM"));
        this.setArrDays(language);
    }

    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.language !== this.props.language) {
            this.setArrDays(this.props.language);
        }
    }
    handleOnChangeSelect = async event => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let id = this.props.doctorIdFromParent;
            let date = event.target.value;

            let res = await getScheduleDoctorByDate(id, date);
            console.log("getScheduleDoctorByDate", res);
        }
        console.log("onchange", event.target.value);
    };

    render() {
        let { allDays } = this.state;
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
                <div className="all-available-time"></div>
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
