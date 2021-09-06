import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id: id,
            })

            // console.log('check res from DetailClinic: ', res);

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    buidlDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                let value = item.keyMap;

                object.label = label;
                object.value = value;

                result.push(object);
            })
        }

        return result;
    }

    // handleChangeSelect = async (selectedProvince) => {
    //     // console.log(selectedProvince.value)
    //     let province = selectedProvince.value
    //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //         let id = this.props.match.params.id;
    //         let res = await getAllDetailSpecialtyById({
    //             id: id,
    //             location: province
    //         })

    //         if (res && res.errCode === 0) {
    //             let data = res.data;
    //             let arrDoctorId = [];
    //             if (data && !_.isEmpty(res.data)) {
    //                 let arr = data.doctorSpecialty;
    //                 if (arr && arr.length > 0) {
    //                     arr.map(item => {
    //                         arrDoctorId.push(item.doctorId);
    //                     })
    //                 }
    //             }

    //             this.setState({
    //                 dataDetailSpecialty: res.data,
    //                 arrDoctorId: arrDoctorId,
    //                 selectedProvince: selectedProvince
    //             })
    //         }

    //     }
    // }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        // console.log("Check length: ", arrDoctorId.length, arrDoctorId[0])
        // console.log('check state from arrDoctorId: ', arrDoctorId);
        console.log('Check state render', this.state)

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                                </div>
                            </>
                        }

                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            // console.log('aray doctor to profile doctor', item);
                            return (

                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
