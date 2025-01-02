import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
    render() {
        return (
            <div className="section-share  section-about">
                <div className="section-about-header">
                    <FormattedMessage id="home-page.quickbooks" />
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/H9wtp-85ivc?si=Y5CPhI7_HZjKZsXL"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className="content-right"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
