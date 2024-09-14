import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom'

class OutStandingdoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorRedux()
    }
    componentDidUpdate(prevprops, prevState, snapshot) {
        if (prevprops.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        console.log('doctor', doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);

    }

    render() {

        let arrDoctors = this.state.arrDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors)
        let { language } = this.props;
        return (
            <div className='section-share  section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tex-section-header'>
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className='btn-header-spe'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName}, ${item.lastName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName}, ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg ' >
                                                    <div className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}>

                                                    </div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>fssa</div>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                )
                            }

                        </Slider>
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingdoctor));
