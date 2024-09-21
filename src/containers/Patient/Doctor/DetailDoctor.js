import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./DoctorDetail.scss";
import { times } from "lodash";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id,
            });
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
            // console.log("chek resss", res);
        }
    }

    componentDidUpdate(prevprops, prevState, snapshot) {}

    render() {
        let { detailDoctor } = this.state;
        // console.log("check detailDoctor", detailDoctor);
        let nameVi = "";
        let nameEn = "";
        let { language } = this.props;
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="left-Content"
                            style={{ backgroundImage: `url(${detailDoctor.image})` }}
                        ></div>
                        <div className="right-Content">
                            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                    <span>{detailDoctor.Markdown.description}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentMarkdown && (
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        )}
                    </div>
                    <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
