import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";



class HandBook extends Component {


    render() {

        return (
            <div className='section-share  section-handlebook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='tex-section-header'>Cẩm nang</span>
                        <button className='btn-header-spe'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >6 địa chỉ mạnh về Nội Thần kinh tại Hà Nội</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >3 Bác sĩ chuyên khoa nội tiết trẻ em giỏi tại Hà Nội  </div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >Co xuong khop 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handlebook'></div>
                                <div >Co xuong khop 1</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
