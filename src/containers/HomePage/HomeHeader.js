import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Homeheader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions'
import './HomePage.scss'
class HomeHeader extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;


        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='headerlogo'>
                                <img src={logo}></img>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.speciality" /></b>
                                    <div className='child-sub'>
                                        <FormattedMessage id="homeheader.searcdoctor" />
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.health-facility" /></b>
                                    <div className='child-sub'>
                                        <FormattedMessage id="homeheader.select-room" />
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.doctor" /></b>
                                    <div className='child-sub'>
                                        <FormattedMessage id="homeheader.select-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="homeheader.fee" /></b>
                                    <div className='child-sub'>
                                        <FormattedMessage id="homeheader.check-health" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='child-content-appointment'>
                                <i className="fas fa-history"></i>
                                <span><FormattedMessage id="homeheader.appointment" /></span>
                            </div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} ><span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-vi"}><span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='upbanner'>
                        <div className='title1'> <FormattedMessage id="banner.title1" /></div>
                        <div className='title2'> <FormattedMessage id="banner.title2" /></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' className='search-input' placeholder="OK" />

                        </div>
                    </div>
                    <div className='downbanner'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-hospital"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl1" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl2" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl3" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-stethoscope"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl4" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="far fa-circle"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl5" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className="fas fa-venus-double"></i>
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id="banner.chidl6" />
                                </div>
                            </div>



                        </div>
                    </div>


                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
