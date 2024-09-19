import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevprops, prevState, snapshot) {}

    handleShowHidentDetail = status => {
        this.setState({ isShowDetail: status });
    };

    render() {
        let { isShowDetail } = this.state;
        return (
            <>
                <div className="doctor-extar-container">
                    <div className="content-up">
                        <div className="text-address">Địa chỉ Khám</div>
                        <div className="name-clinic">Bệnh viện Đa khoa Bảo Sơn 2</div>
                        <div className="detail-address">Số 52 Nguyễn Chí Thanh - Đống Đa - Hà Nội</div>
                    </div>
                    <div className="content-down">
                        {isShowDetail === false && (
                            <div>
                                <div className="text-price">
                                    GIÁ Khám: 300.000đ - 600.000đ
                                    <span onClick={() => this.handleShowHidentDetail(true)}>Xem chi tiet</span>
                                </div>
                                <div></div>
                            </div>
                        )}
                        {isShowDetail === true && (
                            <div className="">
                                <div className="text-price">
                                    <div> GIÁ Khám: </div>
                                    <div>300.000đ</div>
                                </div>
                                <div className="price">Giá tư vấn 15 phút</div>
                                <div className="payment">
                                    Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻHiện chưa áp dụng bảo
                                    hiểm y tế nhà nước cho dịch vụ khám chuyên gia.
                                </div>
                                <span onClick={() => this.handleShowHidentDetail(false)}>ẩn bang gia</span>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
