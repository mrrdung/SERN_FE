import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
class MedicalFactory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : [],
            });
        }
        console.log("check res", res);
    }
    handleViewDetailClinic = clinic => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };
    render() {
        let { dataClinic } = this.state;
        return (
            <div className="section-share  section-medical">
                <div className="section-container">
                    <div className="section-header">
                        <span className="tex-section-header">
                            <FormattedMessage id="home-page.Outstan-m-f" />
                        </span>
                        <button className="btn-header-spe">
                            <FormattedMessage id="home-page.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic &&
                                dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div
                                                className="bg-image section-medical"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div>{item.name}</div>
                                        </div>
                                    );
                                })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFactory));
