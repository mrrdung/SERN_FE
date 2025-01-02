import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";
import { LANGUAGES } from "../../../utils";
class HomeFooter extends Component {
    render() {
        let { language } = this.props;
        return language === LANGUAGES.EN ? (
            <footer className="footer">
                <div className="footer-container">
                    {/* Logo and Description */}
                    <div className="footer-section">
                        <h2 className="footer-logo">Quickobook</h2>
                        <p>
                            QuickoBook is a registered startup company empaneled with over 10,000 doctors and 500
                            hospitals, touching the lives of more than 2 million patients.
                        </p>
                        <div className="footer-social">
                            <a href="#">
                                <i class="fab fa-facebook-f"> Facebook</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter">Twitter</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-linkedin">LinkedIn</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram">Instagram</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-youtube">YouTube</i>
                            </a>
                        </div>
                    </div>

                    {/* Information Links */}
                    <div className="footer-section">
                        <h3>For Information</h3>
                        <ul>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Booking Guide</a>
                            </li>
                            <li>
                                <a href="#">Pharmacy</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                            <li>
                                <a href="#">Press Release</a>
                            </li>
                            <li>
                                <a href="#">FAQ's</a>
                            </li>
                        </ul>
                    </div>

                    {/* Helpful Links */}
                    <div className="footer-section">
                        <h3>Helpful Links</h3>
                        <ul>
                            <li>
                                <a href="#">Book Appointment</a>
                            </li>
                            <li>
                                <a href="#">Search for Doctors</a>
                            </li>
                            <li>
                                <a href="#">Search for Hospitals</a>
                            </li>
                            <li>
                                <a href="#">Book Lab/Diagnostics Test</a>
                            </li>
                            <li>
                                <a href="#">Franchisee Register</a>
                            </li>
                            <li>
                                <a href="#">SMS Booking</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>
                            📍 QWKPRO CONSULTANCY PVT LTD,
                            <br /> Silchar, Assam
                        </p>
                        <p>📞 +91 943 520 0024</p>
                        <p>
                            ✉ Customer Support: <a href="mailto:support@quickobook.com">support@quickobook.com</a>
                        </p>
                        <p>
                            ✉ Official Queries: <a href="mailto:info@quickobook.com">info@quickobook.com</a>
                        </p>
                    </div>
                </div>
            </footer>
        ) : (
            <footer className="footer">
                <div className="footer-container">
                    {/* Logo và Giới thiệu */}
                    <div className="footer-section">
                        <h2 className="footer-logo">Quickobook</h2>
                        <p>
                            QuickoBook là một công ty khởi nghiệp đã đăng ký với hơn 10.000 bác sĩ và 500 bệnh viện,
                            phục vụ hơn 2 triệu bệnh nhân.
                        </p>
                        <div className="footer-social">
                            <a href="#">
                                <i class="fab fa-facebook-f"> Facebook</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter">Twitter</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-linkedin">LinkedIn</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram">Instagram</i>
                            </a>
                            <a href="#">
                                <i class="fab fa-youtube">YouTube</i>
                            </a>
                        </div>
                    </div>

                    {/* Thông tin */}
                    <div className="footer-section">
                        <h3>Thông Tin</h3>
                        <ul>
                            <li>
                                <a href="#">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="#">Hướng dẫn đặt lịch</a>
                            </li>
                            <li>
                                <a href="#">Nhà thuốc</a>
                            </li>
                            <li>
                                <a href="#">Tuyển dụng</a>
                            </li>
                            <li>
                                <a href="#">Thông cáo báo chí</a>
                            </li>
                            <li>
                                <a href="#">Câu hỏi thường gặp</a>
                            </li>
                        </ul>
                    </div>

                    {/* Liên kết hữu ích */}
                    <div className="footer-section">
                        <h3>Liên Kết Hữu Ích</h3>
                        <ul>
                            <li>
                                <a href="#">Đặt lịch hẹn</a>
                            </li>
                            <li>
                                <a href="#">Tìm kiếm bác sĩ</a>
                            </li>
                            <li>
                                <a href="#">Tìm kiếm bệnh viện</a>
                            </li>
                            <li>
                                <a href="#">Đặt lịch xét nghiệm</a>
                            </li>
                            <li>
                                <a href="#">Đăng ký nhượng quyền</a>
                            </li>
                            <li>
                                <a href="#">Đặt lịch qua SMS</a>
                            </li>
                            <li>
                                <a href="#">Dịch vụ</a>
                            </li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div className="footer-section">
                        <h3>Liên Hệ</h3>
                        <p>
                            📍 QWKPRO CONSULTANCY PVT LTD,
                            <br /> Silchar, Assam
                        </p>
                        <p>📞 +91 943 520 0024</p>
                        <p>
                            ✉ Hỗ trợ khách hàng: <a href="mailto:support@quickobook.com">support@quickobook.com</a>
                        </p>
                        <p>
                            ✉ Thắc mắc chính thức: <a href="mailto:info@quickobook.com">info@quickobook.com</a>
                        </p>
                    </div>
                </div>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
