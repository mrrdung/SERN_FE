import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientDordoctor, postSendRemedy } from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import HistoryModal from "./HistoryModal";
import { getDetailHistory } from "../../../services/userService";
import { toast } from "react-toastify";
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            isOpenHistoryModal: false,
            dataModal: {},
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime(); //valueod:convert unix date
        let res = await getAllPatientDordoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    componentDidUpdate(prevprops, prevState, snapshot) {}
    handleOnchangeDate = date => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };

    handleBtnConfirm = item => {
        console.log("item", item);

        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    handleBtnViewHistory = async item => {
        let id = item.patientId;
        let info = await getDetailHistory(id);

        let note = info.data;
        console.log("arr", note);
        this.setState({
            isOpenHistoryModal: true,
            dataModal: note,
        });
    };
    sendRemedy = async dataChild => {
        let { dataModal, currentDate } = this.state;
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            notePar: dataChild.note,
            date: currentDate,
        });
        if (res && res.errCode === 0) {
            toast.success("Send Redemedy success");
            this.handlToggle();
            await this.getDataPatient();
        } else {
            toast.error("Some thing wrongs...");
            console.log("err send remedy", res);
        }
    };
    handlToggle = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    handlToggleHis = () => {
        this.setState({
            isOpenHistoryModal: false,
            dataModal: {},
        });
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, isOpenHistoryModal } = this.state;

        return (
            <>
                <div className="manage-patient-container">
                    <div className="title">Quản lý bệnh nhân khám bệnh</div>
                    <div className="manage-patient-body row">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDate}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Thời gian</th>
                                        <th>Giới tính</th>
                                        <th>Lịch sử </th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.timeTypeDataPatient.valueVi}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td className="btn-action">
                                                        <button
                                                            onClick={() => this.handleBtnViewHistory(item)}
                                                            className="btn-confirm"
                                                        >
                                                            Xem
                                                        </button>
                                                    </td>
                                                    <td className="btn-action">
                                                        <button
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                            className="btn-confirm"
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                style={{ textAlign: "center" }}
                                            >
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <HistoryModal
                    isOpenModal={isOpenHistoryModal}
                    closeModalPatient={this.handlToggleHis}
                    dataModal={dataModal}
                />
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    closeModalPatient={this.handlToggle}
                    dataModal={dataModal}
                    sendRemedy={this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
