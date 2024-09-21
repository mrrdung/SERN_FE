import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "./ProfileDoctor";
import { postBookAppoitment } from "../../../services/userService";
import _ from "lodash";
import { toast } from "react-toastify";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import moment from "moment";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            gender: "",
            doctorId: "",
            selectedGender: "",
            genders: "",
        };
    }

    componentDidMount() {
        this.props.getGenders();
    }

    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.language !== this.props.language) {
            this.setState({
                genders: this.builtDataGender(this.props.genders),
            });
        }
        if (prevprops.genders !== this.props.genders) {
            this.setState({
                genders: this.builtDataGender(this.props.genders),
            });
        }
        if (prevprops.dataTime !== this.props.dataTime) {
            let doctorId = this.props.dataTime.doctorId;
            let timeType = this.props.dataTime.timeType;
            let date = this.props.dataTime.date;
            console.log("checkcdatatime", this.props.dataTime);
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
                date: date,
            });
        }
    }
    toggle = () => this.props.handlToggle();

    builtDataGender = data => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                console.log(item);

                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    handleOnchangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCoppy = { ...this.state };
        stateCoppy[id] = valueInput;
        this.setState({
            ...stateCoppy,
        });
    };
    handleChangeSelect = selectedOption => {
        this.setState({ selectedGender: selectedOption });
    };
    renderTimeString = dataTime => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            return `${time}-${date}`;
        }
        return "";
    };
    builtDoctorName = dataTime => {
        let { language } = this.props;
        if (dataTime.doctorData && !_.isEmpty(dataTime.doctorData)) {
            let name = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
        return "";
    };
    handlConfirmBooking = async () => {
        let doctorName = this.builtDoctorName(this.props.dataTime);
        let timeString = this.renderTimeString(this.props.dataTime);
        let birthday = new Date(this.state.birthday).getTime();
        let date = this.props.dataTime.date;
        console.log("this.props.dataTime", this.props.dataTime);
        let res = await postBookAppoitment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            timeString: timeString,
            address: this.state.address,
            reason: this.state.reason,
            birthday: birthday,
            date: date,

            doctorId: this.state.doctorId,
            gender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success("Tạo lịch hẹn thành công!");
        } else {
            toast.success("Tạo lịch hẹn thất bại!");
        }
    };
    handleOnchangeBirthday = date => {
        this.setState({
            birthday: date[0],
        });
    };
    render() {
        let { isOpenModal, handlToggle, dataTime } = this.props;

        let doctorId = "";
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        return (
            <>
                {/* fullName: "", phoneNumber: "", email: "", address: "", reason: "", birthday: "", gender: "", doctorId:
                "", */}
                <Modal
                    isOpen={isOpenModal}
                    // toggle={() => this.toggle()}
                    className="booking-modal-container"
                    size="xl"
                    backdrop={true}
                    centered={true}
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        <FormattedMessage id="patient.booKing-modal.title" />
                    </ModalHeader>
                    <ModalBody>
                        <div className="bookinh-content-container">
                            <div className="info-doctor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDesciptionProfile={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className="price"></div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="patient.booKing-modal.fullName" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={event => this.handleOnchangInput(event, "fullName")}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        {" "}
                                        <FormattedMessage id="patient.booKing-modal.phoneNumber" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={event => this.handleOnchangInput(event, "phoneNumber")}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booKing-modal.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={event => this.handleOnchangInput(event, "email")}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booKing-modal.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={event => this.handleOnchangInput(event, "address")}
                                    ></input>
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booKing-modal.reason" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={event => this.handleOnchangInput(event, "reason")}
                                    ></input>
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booKing-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnchangeBirthday}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booKing-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                        // placeholder={<FormattedMessage id="admin.manage-doctor.seclect-doctor" />}
                                        name="selectedDoctor"
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="btn-modal-booking-save"
                            color="primary"
                            // onClick={() => this.toggle()}
                            onClick={() => this.handlConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booKing-modal.save" />
                        </Button>{" "}
                        <Button
                            className="btn-modal-booking-cancel"
                            color="secondary"
                            onClick={() => this.toggle()}
                        >
                            <FormattedMessage id="patient.booKing-modal.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(action.fecthGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
