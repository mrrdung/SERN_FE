import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils'
class Header extends Component {
    handleChanLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        console.log('check language', language);

        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='language'>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.handleChanLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleChanLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
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
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
