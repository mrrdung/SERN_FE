import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Homeheader.scss";
import logo from "../../assets/logo4.png";
import homeimg1 from "../../assets/homeimg1.jpg";
import homeimg2 from "../../assets/homeimg2.jpg";
import homeimg3 from "../../assets/homeimg3.jpg";
import homeimg4 from "../../assets/homeimg4.jpg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import "./HomePage.scss";
import { withRouter } from "react-router";
class HomeHeader extends Component {
    handleChangeLanguage = language => {
        this.props.changeLanguageAppRedux(language);
    };
    returnHomepage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="headerlogo">
                                <img
                                    src={logo}
                                    onClick={() => this.returnHomepage()}
                                ></img>
                            </div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.speciality" />
                                    </b>
                                    <div className="child-sub">
                                        <FormattedMessage id="homeheader.searcdoctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.health-facility" />
                                    </b>
                                    <div className="child-sub">
                                        <FormattedMessage id="homeheader.select-room" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.doctor" />
                                    </b>
                                    <div className="child-sub">
                                        <FormattedMessage id="homeheader.select-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeheader.fee" />
                                    </b>
                                    <div className="child-sub">
                                        <FormattedMessage id="homeheader.check-health" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="child-content-appointment">
                                <i className="fas fa-history"></i>
                                <span>
                                    <FormattedMessage id="homeheader.appointment" />
                                </span>
                            </div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-vi"}>
                                <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <>
                        <div className="home-header-banner">
                            <div className="upbanner">
                                <div className="title1">
                                    <FormattedMessage id="banner.title1" />
                                </div>
                                <div className="title2">
                                    <FormattedMessage id="banner.title2" />
                                </div>
                                <div className="search">
                                    <i className="fas fa-search"></i>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="home-body-banner">
                            <div className="banner-body-text">
                                <div className="text-title-bn">
                                    <FormattedMessage id="banner.text-title" />
                                </div>
                                <p>
                                    <FormattedMessage id="banner.text-title2" />
                                </p>
                            </div>
                            <div className="banner-body-content">
                                <div className="banner-child">
                                    <div className="imghome">
                                        <img src={homeimg1} />
                                    </div>
                                    <div className="child-content">
                                        <h4>
                                            <FormattedMessage id="banner.chidl2" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="banner.pchidl2" />
                                        </p>
                                        <button className="btn-home-header">
                                            <FormattedMessage id="banner.btnchidl2" />
                                        </button>
                                    </div>
                                </div>
                                <div className="banner-child">
                                    <div className="imghome">
                                        <img src={homeimg2} />
                                    </div>
                                    <div className="child-content">
                                        <h4>
                                            <FormattedMessage id="banner.chidl3" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="banner.pchidl3" />
                                        </p>
                                        <button className="btn-home-header">
                                            <FormattedMessage id="banner.btnchidl3" />
                                        </button>
                                    </div>
                                </div>
                                <div className="banner-child">
                                    <div className="imghome">
                                        <img src={homeimg3} />
                                    </div>
                                    <div className="child-content">
                                        <h4>
                                            <FormattedMessage id="banner.chidl4" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="banner.pchidl4" />
                                        </p>
                                        <button className="btn-home-header">
                                            <FormattedMessage id="banner.btnchidl4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="banner-child">
                                    <div className="imghome">
                                        <img src={homeimg4} />
                                    </div>
                                    <div className="child-content">
                                        <h4>
                                            <FormattedMessage id="banner.chidl5" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="banner.pchidl5" />
                                        </p>
                                        <button className="btn-home-header">
                                            <FormattedMessage id="banner.btnchidl5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: language => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
