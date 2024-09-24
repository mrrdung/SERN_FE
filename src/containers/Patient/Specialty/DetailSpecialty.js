import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./DetailSpecialty.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { LANGUAGES } from "../../../utils";
import { getDetailSpecialtyById, getAllcodesService } from "../../../services/userService";
import _, { iteratee } from "lodash";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialtyById({
                id: id,
                location: "ALL",
            });

            let listProvince = await getAllcodesService("PROVINCE");
            if (res && res.errCode === 0 && listProvince && listProvince.errCode === 0) {
                let arrDoctorId = [];
                let data = res.data;
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpeciatly;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: listProvince.data,
                });
            }
            // console.log("chek resss", res);
        }
    }

    componentDidUpdate(prevprops, prevState, snapshot) {}
    handleOnchangeSelect = event => {
        console.log("event", event.target.value);
    };
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        console.log("check state", this.state);
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="desciption-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        )}
                    </div>

                    <div className="content-specialty">
                        <div className="search-doctor-province">
                            <select onChange={event => this.handleOnchangeSelect(event)}>
                                {listProvince &&
                                    listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        {arrDoctorId &&
                            arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div
                                        className="each-doctor"
                                        key={index}
                                    >
                                        <div className="dt-content-left">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDesciptionProfile={true}
                                            />
                                        </div>
                                        <div className="dt-content-right">
                                            <div className="doctor-schedule">
                                                <DoctorSchedule doctorIdFromParent={item} />
                                            </div>
                                            <div className="doctor-extra-info">
                                                <DoctorExtraInfor doctorIdFromParent={item} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
