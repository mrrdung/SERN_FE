import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./RemedyModal.scss";
import _, { every } from "lodash";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { CommonUtils } from "../../../utils";
class HistoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [],
        };
    }

    componentDidMount() {
        // if (this.props.dataModal) {
        //     this.setState({
        //         note: this.props.dataModal.description,
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                note: this.props.dataModal || [],
            });
        }
    }
    convertToReadableTime(isoString) {
        return new Date(isoString).toLocaleDateString();
    }

    render() {
        let { isOpenModal, dataModal, closeModalPatient } = this.props;

        let notes = this.state.note || [];
        console.log(" data note", notes);
        console.log(" dataModal", dataModal);

        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    className="booking-modal-container"
                    size="lg"
                    backdrop={true}
                    centered={true}
                >
                    <ModalHeader toggle={closeModalPatient}>
                        {/* <FormattedMessage id="patient.booKing-modal.title" /> */}
                    </ModalHeader>
                    <ModalBody>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col-3">Thời gian</th>
                                    <th className="col-5">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes && notes.length > 0 ? (
                                    notes.map((item, index) => (
                                        <tr key={index}>
                                            <td>{this.convertToReadableTime(item.files)}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="secondary"
                            onClick={closeModalPatient}
                        >
                            Thoát
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModal);
