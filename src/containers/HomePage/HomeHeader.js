import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Homeheader.scss'
import logo from '../../assets/logo.svg'
class HomeHeader extends Component {

    render() {

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
                                    <b>Chuyên khoa</b>
                                    <div className='child-sub'>
                                        Tìm bác sĩ theo chuyên khoa
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Cơ sở y tế</b>
                                    <div className='child-sub'>
                                        Chọn bệnh viện phòng khám
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Bác sĩ</b>
                                    <div className='child-sub'>
                                        Chọn bác sĩ giỏi
                                    </div>
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Gói khám</b>
                                    <div className='child-sub'>
                                        Khám sức khỏe tổng quát
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='child-content-appointment'>
                                <i class="fas fa-history"></i>
                                <span>Lịch Hẹn</span>
                            </div>
                            <div className='language-vi'>VN</div>
                            {/* <div className='language-en'>EN</div> */}

                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='upbanner'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' className='search-input' placeholder='Search' />
                        </div>
                    </div>
                    <div className='downbanner'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="fas fa-hospital"></i>
                                </div>
                                <div className='text-child'>
                                    Khám chuyên khoa
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="fas fa-mobile-alt"></i>
                                </div>
                                <div className='text-child'>
                                    Khám từ xa
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="fas fa-user-md"></i>
                                </div>
                                <div className='text-child'>
                                    Khám tổng quát
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="fas fa-stethoscope"></i>
                                </div>
                                <div className='text-child'>
                                    Xét nghiệm y học
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="far fa-circle"></i>
                                </div>
                                <div className='text-child'>
                                    Sức khỏe tinh thần
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i class="fas fa-venus-double"></i>
                                </div>
                                <div className='text-child'>
                                    Khám nha khoa
                                </div>
                            </div>



                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
