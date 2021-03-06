import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        }
    }

    async componentDidMount() {
        // console.log('check props: ', this.props)
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }


        // console.log('check query:', token, doctorId);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        console.log('Check state: ', this.state)
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className="infor-booking">X??c nh???n l???ch h???n th??nh c??ng</div> :
                                <div className="infor-booking">L???ch h???n kh??ng t???n t???i ho???c ???? ???????c x??c nh???n</div>
                            }
                        </div>
                    }
                </div>
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
