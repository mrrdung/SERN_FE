import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as action from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUDACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save to markdow table
            selectedOption: "",
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            listDoctors: [],
            hasOldData: false,

            // save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedSpecialty: "",
            selectedClinic: "",

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        };
    }
    async componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.getRequireDoctorInfo();
    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.listDoctorredux !== this.props.listDoctorredux) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux, "USERS");

            this.setState({
                listDoctors: dataSelect,
            });
        }
        if (prevprops.language !== this.props.language) {
            let { resPrice, resPayment, resPovince, resSpecialty } = this.props.allRequireDoctorInfo;
            let dataSelect = this.buildDataInputSelect(this.props.listDoctorredux, "USERS");

            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataSelectPovince = this.buildDataInputSelect(resPovince, "PROVINCE");
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectPovince,
                listSpecialty: dataSelectSpecialty,
            });
        }
        if (prevprops.allRequireDoctorInfo !== this.props.allRequireDoctorInfo) {
            let { resPrice, resPayment, resPovince, resSpecialty } = this.props.allRequireDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataSelectPovince = this.buildDataInputSelect(resPovince, "PROVINCE");
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
            console.log("dataselect", dataSelectPrice, dataSelectPayment, dataSelectPovince, dataSelectSpecialty);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectPovince,
                listSpecialty: dataSelectSpecialty,
            });
        }
    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        console.log("inputData", inputData);

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                if (type === "USERS") {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                }
                if (type === "PRICE") {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                }
                if (type === "PAYMENT" || type === "PROVINCE") {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                }
                if (type === "SPECIALTY") {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                }
            });
        }
        return result;
    };
    handleSaveContentMarkdown = () => {
        this.props.saveInfoDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: this.state.hasOldData === true ? CRUDACTIONS.EDIT : CRUDACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId:
                this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
            specialtyId: this.state.selectedSpecialty.value,
        });
    };

    handleChangeSelect = async selectedOption => {
        this.setState({ selectedOption });
        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = "",
                nameClinic = "",
                note = "",
                paymentId = "",
                priceId = "",
                provinceId = "",
                selectedPrice = "",
                selectedPayment = "",
                selectedProvince = "",
                selectedSpecialty = "";
            if (res.data.Doctor_Infor) {
                let { listPayment, listPrice, listProvince, listSpecialty } = this.state;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                let paymentId = res.data.Doctor_Infor.paymentId;
                let priceId = res.data.Doctor_Infor.priceId;
                let provinceId = res.data.Doctor_Infor.provinceId;
                let specialtyId = res.data.Doctor_Infor.specialtyId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                });
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                });
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                contentHTML: markdown.contentHTML,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                contentMarkdown: "",
                description: "",
                contentHTML: "",
                hasOldData: false,
                addressClinic: "",
                nameClinic: "",
                note: "",
                selectedPrice: "",
                selectedPayment: "",
                selectedProvince: "",
                selectedSpecialty: "",
            });
        }
    };
    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name;
        let stateCoppy = { ...this.state };
        stateCoppy[stateName] = selectedOption;
        this.setState({
            ...stateCoppy,
        });
    };
    handleOnchangeText = (event, id) => {
        let stateCoppy = { ...this.state };
        stateCoppy[id] = event.target.value;
        this.setState({
            ...stateCoppy,
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    render() {
        let { hasOldData } = this.state;
        console.log("check statestatestate", this.state);

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="left-contenr">
                        <label>
                            {" "}
                            <FormattedMessage id="admin.manage-doctor.seclect-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-doctor" />}
                            name="selectedDoctor"
                        />
                    </div>
                    <div className="right-contenr">
                        <label>
                            {" "}
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={this.state.description}
                            onChange={event => this.handleOnchangeText(event, "description")}
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-detail row">
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.seclect-price" />
                        </label>

                        <Select
                            name="selectedPrice"
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-price" />}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.seclect-pay" />
                        </label>

                        <Select
                            name="selectedPayment"
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-pay" />}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.seclect-province" />
                        </label>

                        <Select
                            name="selectedProvince"
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-province" />}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.clinic-name" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.nameClinic}
                            onChange={event => this.handleOnchangeText(event, "nameClinic")}
                        ></input>
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.clinic-address" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.addressClinic}
                            onChange={event => this.handleOnchangeText(event, "addressClinic")}
                        ></input>
                    </div>
                    <div className="col-3 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            value={this.state.note}
                            onChange={event => this.handleOnchangeText(event, "note")}
                        ></input>
                    </div>
                    <div className="col-3 form-group">
                        <label>Chuyen khoa</label>
                        <Select
                            name="selectedSpecialty"
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-price" />}
                        />
                    </div>
                    <div className="col-3 form-group">
                        <label>phong kham </label>
                        <Select
                            name="selectedClinic"
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.seclect-price" />}
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "350px" }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? "save-contenr-doctor" : "create-content-doctor"}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctorredux: state.admin.allDoctors,
        allRequireDoctorInfo: state.admin.allRequireDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctorStart()),
        getRequireDoctorInfo: () => dispatch(action.getRequireDoctorInfo()),
        saveInfoDoctorRedux: data => dispatch(action.saveInfoDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
