import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { DistrictNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../../Redux/DDLSlice';
import { FarmerInsertUpdatePostAPI, FarmerPostAPI } from '../../../../../Redux/ClientAdminSlice/FarmerMasterSlice';
import { Loading } from '../../../../../Helper/Loading';
import { AstricSign } from '../../../../../Helper/AstricSign';
import { convertAfterImageBase64 } from '../../../../../Helper/convertAfterImageBase64';
import { RegExMobile, RegExOnlyText } from '../../../../../Helper/regEx/RegExOnlyText';

export default function FarmerMasterPopUp({ open, handleAddCloseClick, PopUpField, handlePost, StateDDLData, imageButtonClick,YearValue }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    // console.log(rowData?.plotPhoto)

    const dispatch = useDispatch()
    const [afterImage, setafterImage] = useState(apiFlag === "Insert" ? "" : rowData?.plotPhoto)
    const [IsMobileValidate, setIsMobileValidate] = useState("")
    const [IsClear, setIsClear] = useState(false)

    const [onGoingImageSizeError, setonGoingImageSizeError] = useState("")

    // useEffect(()=>{
    //     checkExists()
    // },[])

    // function checkExists() {
    //     var img = new Image();
    //     img.onerror = function() {
    //         console.log(false);
    //     };
    //     img.onload = function() {
    //         getBase64FromUrl(rowData && rowData.plotPhoto)
    //         console.log(true);
    //     };
    //     img.src = rowData?.plotPhoto;
    // }

    // const getBase64FromUrl = async (url) => {
    //     var requestOptions = {
    //         mode : 'no-cors'
    //       };
    //     const data = await fetch(rowData?.plotPhoto , requestOptions);
    //     const blob = await data.blob();
    //     // console.log(blob)
    //     return new Promise((resolve) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(blob);
    //         reader.onloadend = () => {
    //             const base64data = reader.result;
    //             console.log(reader)
    //             // console.log(reader.result.split(',')[1])

    //             resolve(base64data);
    //         }
    //     });
    // }

    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.stateNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.districtNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.talukaNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.villageNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.villageName,
    })

    const [FarmerNameDDL, setFarmerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const Photo = async (e) => {
        console.log(e);
        const file = e.target.files[0]
        // console.log(file);
        const base64 = await convertAfterImageBase64(file)
        setafterImage(base64.split(',')[1])
    }


    const [FarmerTextField, setFarmerTextField] = useState({
        FarmerName: apiFlag === " Insert" ? '' : rowData?.fullName,
        MobileNumber: apiFlag === " Insert" ? '' : rowData?.mobileNumber,
        FarmerLandDetails: apiFlag === " Insert" ? '' : rowData?.farmerLandDetails,
    })

    const handleInputChange = (e) => {
        setFarmerTextField({ ...FarmerTextField, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        })
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select...",
        })

        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select...",
        })
        setFarmerTextField({
            FarmerName: '',
            MobileNumber: '',
            FarmerLandDetails: ''
        })
    }

    const handleMobileValidation = (e) => {
        if (e.target.value && e.target.value?.length !== 10) {
            setIsMobileValidate(true)
        } else {
            setIsMobileValidate(false)
        }
    }

    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExOnlyText(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckMobileNo = (e) => {
        handleInputChange(e)
        const IsValid = RegExMobile(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    useEffect(() => {
        handleStateDDL()
    }, [StateDDLData])

    const handleStateDDL = () => {
        if (StateDDLData && StateDDLData.table && StateDDLData.table.length > 0) {
            let list = StateDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.stateName,
            }))

            setStateDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.stateNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
            })
        }
        else {
            setStateDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token, StateDDL }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [StateDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)
    useEffect(() => {
        handleDeptDDL()
    }, [DistrictDDLData])

    const handleDeptDDL = () => {
        if (DistrictDDLData && DistrictDDLData.table && DistrictDDLData.table.length > 0) {
            let list = DistrictDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.districtName,
            }))

            setDistrictDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.districtNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
            })
        }
        else {
            setDistrictDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [StateDDL.ID, DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    useEffect(() => {
        handleTalukaDDL()
    }, [TalukaDDLData])

    const handleTalukaDDL = () => {
        if (TalukaDDLData && TalukaDDLData.table && TalukaDDLData.table.length > 0) {
            let list = TalukaDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.talukaName,
            }))

            setTalukaDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.talukaNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
            })
        }
        else {
            setTalukaDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // -----------Village Name DDL--------
    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL }
        dispatch(VillageDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID])

    const { VillageData } = useSelector(state => state.VillageDDLData)
    useEffect(() => {
        handleVillageDDL()
    }, [VillageData])

    const handleVillageDDL = () => {
        if (VillageData && VillageData.table && VillageData.table.length > 0) {
            let list = VillageData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_VillageNameID,
                label: item.villageName,
            }))

            setVillageDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.villageNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.villageName,
            })
        }
        else {
            setVillageDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleInsertUpdate = () => {
        const addData = {
            M_FarmerID: apiFlag === 'Insert' ? '0' : rowData?.m_FarmerID,
            M_FinancialYearID: YearValue,
            M_MonthID: '0',
            FarmerTextField: FarmerTextField,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageNameID: VillageDDL.ID,
            PlotPhoto: afterImage,
            M_UserID: UserID,
            Flag: apiFlag,
            token: token,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick,
            handleClear:handleClear
        }
        dispatch(FarmerInsertUpdatePostAPI({ addData }))
    }

    const { isLoading } = useSelector(state => state.FarmerInsertUpdatePostData)

    // const IsValidate = () => {
    //     if (StateDDL.ID == 0 || DistrictDDL.ID == 0 || TalukaDDL.ID == 0 || VillageDDL.ID == 0 || FarmerTextField.FarmerName == '' ||
    //         FarmerTextField.FarmerLandDetails == '' || FarmerTextField.MobileNumber == '' || afterImage == '') {
    //         return false
    //     } else {
    //         return true
    //     }
    // }

    return (
        <>
            {isLoading && <Loading />}
            <Popup
                open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
                <span className="close" onClick={handleAddCloseClick}>
                    &times;
                </span>
                <div className="call"> Farmer Master </div>
                <div className="modal-body">
                    <div className="row details-row">

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">State<AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: StateDDL.ID, label: StateDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setStateDDL({ ...StateDDL, ID: e.value, Label: e.label })
                                            :
                                            setStateDDL({ ...StateDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={StateDDL.DDL}
                                // isDisabled
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">District<AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: DistrictDDL.ID, label: DistrictDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setDistrictDDL({ ...DistrictDDL, ID: e.value, Label: e.label })
                                            :
                                            setDistrictDDL({ ...DistrictDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={DistrictDDL.DDL}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Taluka<AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: TalukaDDL.ID, label: TalukaDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setTalukaDDL({ ...TalukaDDL, ID: e.value, Label: e.label })
                                            :
                                            setTalukaDDL({ ...TalukaDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={TalukaDDL.DDL}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Village<AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: VillageDDL.ID, label: VillageDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setVillageDDL({ ...VillageDDL, ID: e.value, Label: e.label })
                                            :
                                            setVillageDDL({ ...VillageDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={VillageDDL.DDL}
                                />
                            </div>

                        </div>

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Farmer Name<AstricSign /></label>
                                <input
                                    className="form-control"
                                    id="FarmerName"
                                    type="text"
                                    name="FarmerName"
                                    value={FarmerTextField.FarmerName}
                                    onChange={(e) => handleCheckText(e)}
                                />
                                {
                                    IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                                }
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Mobile No</label>
                                <input
                                    className="form-control"
                                    id="MobileNumber"
                                    type="text"
                                    name="MobileNumber"
                                    value={FarmerTextField.MobileNumber}
                                    onChange={(e) => {
                                        handleCheckMobileNo(e);
                                        // handleMobileValidation(e)
                                    }}
                                />
                                {
                                    IsValidNumbers && <text style={{ color: 'red' }}>Please enter Valid Mobile Number</text>
                                }
                            </div>
                        </div>



                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Farmer land details(Acre)</label>
                                <input
                                    className="form-control"
                                    id="FarmerLandDetails"
                                    type="text"
                                    name="FarmerLandDetails"
                                    value={FarmerTextField.FarmerLandDetails}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-5 col-lg-5">
                            <div className="form-group">
                                <label className="d-block" for="NameofDepartment">Plot Photo</label>
                                <input type="file" className="form-control"
                                    name="filename"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) => {
                                        Photo(e)
                                    }}
                                />
                                {/* <span style={{ color: "red", fontSize: "13px" }}>{onGoingImageSizeError}</span> */}
                            </div>
                        </div>
                        {
                            apiFlag === "Update" &&
                            <div className="col-12 col-md-1 col-lg-1 mt-4 pt-2">
                                <span className='tableIcon' title='View Photo'
                                    onClick={() => imageButtonClick(rowData?.plotPhoto)}
                                >
                                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                                </span>
                            </div>
                        }

                        {/* <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" for="NameofDepartment"> Video</label>
                            <input type="file" className="form-control"
                                name="filename"
                                accept="video/*"
                                onChange={(e) => {
                                    Video(e)
                                }}
                            />
                            <span style={{ color: "red", fontSize: "13px" }}>{workVideoError}</span>
                        </div>
                    </div> */}


                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    onClick={handleInsertUpdate}
                                    disabled={
                                        StateDDL.ID == 0 || DistrictDDL.ID == 0 || TalukaDDL.ID == 0 ||
                                        VillageDDL.ID == 0 || IsValidNumbers || IsValidText ||
                                        FarmerTextField.FarmerName == '' 
                                        //  FarmerTextField.FarmerLandDetails == '' ||
                                        // FarmerTextField.MobileNumber == '' ||
                                        // FarmerTextField.MobileNumber?.length !== 10 || 
                                        // afterImage == ''
                                    }
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    {popupFlag}
                                </button>

                                <button
                                    type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                    onClick={() => { popupBtn === 'Clear' ? handleClear() : handleAddCloseClick() }}
                                >
                                    {popupBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </Popup>
        </>
    )
}
