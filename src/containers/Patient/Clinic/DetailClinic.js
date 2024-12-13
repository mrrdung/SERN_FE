import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./DetailClinic.scss";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { LANGUAGES } from "../../../utils";
import { getDetailClinicById, getAllcodesService } from "../../../services/userService";
import _, { assign, iteratee } from "lodash";
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let arrDoctorId = [];
                let data = res.data;
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
            // console.log("chek resss", res);
        }
    }

    componentDidUpdate(prevprops, prevState, snapshot) {}

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        console.log("check state", this.state);
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="desciption-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                            <div>
                                <span className="dt-name-specialty">{dataDetailClinic.name}</span>
                                <div>{dataDetailClinic.address}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            </div>
                        )}
                    </div>

                    <div className="content-specialty">
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
                                                isShowlinkDetail={true}
                                                isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
