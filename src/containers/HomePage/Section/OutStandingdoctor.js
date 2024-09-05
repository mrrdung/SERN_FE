import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class OutStandingdoctor extends Component {


    render() {


        return (
            <div className='section-share  section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tex-section-header'>Bác sĩ nổi bật</span>
                        <button className='btn-header-spe'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
                            </div>

                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg ' >
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div >Giáo sư, Tiến sĩ Nam</div>
                                        <div>Co xuong khop 1</div>
                                    </div>

                                </div>
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
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingdoctor);
