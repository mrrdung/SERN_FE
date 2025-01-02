import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./RemedyModal.scss";
import _, { every } from "lodash";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { CommonUtils } from "../../../utils";
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: "",
            note: "",
        };
    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    handleOnchangeEmail = event => {
        this.setState({
            email: event.target.email,
        });
    };
    handleChangeNote = event => {
        this.setState({
            note: event.target.value,
        });
    };
    handleChangeImage = async event => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: base64,
            });
        } else {
            console.log("check data file not found");
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };
    render() {
        let { isOpenModal, dataModal, closeModalPatient, sendRemedy } = this.props;
        console.log("state data:", this.state);

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
                        <div className="row">
                            <div className="col-4 form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    onChange={event => this.handleOnchangeEmail(event)}
                                    value={this.state.email}
                                ></input>
                            </div>
                            <div className="col-3 form-group">
                                <label>Chọn file đơn thuốc </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={event => this.handleChangeImage(event)}
                                ></input>
                            </div>
                            <div className="col-4 form-group">
                                <label>Ghi chú </label>
                                <input
                                    className="form-control"
                                    value={this.state.note}
                                    onChange={event => this.handleChangeNote(event)}
                                ></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleSendRemedy()}
                        >
                            Gửi
                        </Button>{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
