import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader.js'
import Specialty from './Section/Specialty.js';
import MedicalFactory from './Section/MedicalFactory.js'
import OutStandingdoctor from './Section/OutStandingdoctor.js'
import About from './Section/About.js';
import HomeFooter from './Section/HomeFooter.js'
import HandBook from './Section/HandBook.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (

            <div>
                <HomeHeader />

                <Specialty
                    settings={settings} />
                <MedicalFactory
                    settings={settings} />
                <OutStandingdoctor
                    settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
