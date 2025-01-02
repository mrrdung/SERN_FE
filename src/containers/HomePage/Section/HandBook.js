import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
    render() {
        return (
            <div className="section-share  section-handlebook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="tex-section-header">
                            <FormattedMessage id="home-page.handbook" />
                        </span>
                        <button className="btn-header-spe">
                            <FormattedMessage id="home-page.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>Top 6 địa chỉ mạnh về Nội Thần kinh tại Hà Nội</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>3 Bác sĩ chuyên khoa nội tiết trẻ em giỏi tại Hà Nội </div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>Top 7 Bác sĩ sản phụ khoa giỏi TPHCM (phần 2)</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>Top 4 Bác thần kinh giỏi TPHCM (phần 2)</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>Top 4 bệnh viện, phòng khám giảm cân uy tín tại TP.HCM</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-handlebook"></div>
                                <div>Mẹo ăn uống heotle</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
