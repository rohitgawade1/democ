
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, TalukaEmployeeWiseAssignDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice';
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL';
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL';
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL';
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL';
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL';
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL';
import { AssignFarmerMeetingPopUpPostAPI, AssignFarmerMeetingPopUpUpdatePostAPI, AssignFarmerMeetingTargePopUpDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFarmerMeetingTargetSlice';
import { Year } from '../../../../Helper/Year';
import { Loading } from '../../../../Helper/Loading';
import { toastErrorr } from '../../../../Helper/ToastMessage';
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL';
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL';


export default function UpdateAssignFarmerMeeting({ open, handleCloseClick, PopUpField, handlePost, YearValue }) {

    const { popupFlag, assignPopUp, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    // console.log(rowData)
    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [IsAssignQtybtn, setIsAssignQtybtn] = useState(false)
    const [IsAssignQty, setIsAssignQty] = useState('0')

    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const dispatch = useDispatch()

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_CropTypeID : 0,
        Label: popupFlag === "Update" ? rowData?.cropTypeName : "Select..."
    })

    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_VillageNameID : 0,
        Label: popupFlag === "Update" ? rowData?.villageName : "Select..."
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_TalukaNameID : 0,
        Label: popupFlag === "Update" ? rowData?.talukaName : "Select..."
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
        // ID: popupFlag === "Update" ? rowData?.districtOfficerID : 0,
        // Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
    })

    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.assignOfficerIndicatorID : 0,
        Label: popupFlag === "Update" ? rowData?.assignOfficerIndicatorName : "Select..."
    })
    const [SalesTraineeDDL, setSalesTraineeDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
        dispatch(MonthDDLAPI({ data }))
        // dispatch(TalukaNameDDLAPI({ data }))
        // dispatch(VillageDDLAPI({ data }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))

        dispatch(AssignToDDLAPI({ data, Flag: 'Target' }))
        // SalesDistrictDDLAPI({
        //     DDLData: SalesTraineeDDL,
        //     setDDLData: setSalesTraineeDDL,
        //     UserID: UserID,
        //     token: token,
        //     Flag: 'Order'
        // })
    }, [])


       // ------sales trainee---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SalesTraineeDDLDDLAPI({ data, Flag: 'Order' }))
    }, [AssignToDDL.ID])

    // ------Field Assistant---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [AssignToDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SalesTraineeDDL }
        dispatch(TalukaEmployeeWiseAssignDDLAPI({ data, Flag: 'District' }))
    }, [SalesTraineeDDL.ID])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID])

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
    }, [CropTypeDDL.ID])

    const { VillageData } = useSelector(state => state.VillageDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const ClearFilter = () => {
        // setCurrentPage(0)
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })
        setSalesTraineeDDL({
            ...SalesTraineeDDL,
            ID: 0,
            Label: "Select..."
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })
    }



    const { isLoading, tableData } = useSelector(state => state.AssignFarmerMeetingTargePopUpData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const handelUpdateAssign = () => {
        const data = {
            T_FarmerMeeting_AssignID: rowData?.t_FarmerMeeting_AssignID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            OrderAssignToUserID: AssignToDDL.ID === 5 ? SalesTraineeDDL.m_UserID : DistrictOfficerDDL.m_UserID ,
            M_VillageNameID: VillageDDL.ID ? VillageDDL.ID : '0',
            M_TalukaNameID:TalukaDDL.ID ? TalukaDDL.ID : '0',
            M_UserID: UserID,
            AssignMeeting: IsAssignQty,
            token: token,
            Flag: 'Update',
            handlePost: handlePost,
            handleCloseClick: handleCloseClick
        }
        dispatch(AssignFarmerMeetingPopUpUpdatePostAPI({ data }))
    }

    useEffect(() => {
        if (gridData && gridData.length > 0) {
            let count = 0
            gridData.every((item) => {
                if (item.ischecked) {
                    count = count + 1

                    return false
                }
                return true
            })
            if (count > 0) {
                setAssignBtnValidation(false)
            } else {
                setAssignBtnValidation(true)

            }
        } else {
            setAssignBtnValidation(true)

        }

    }, [gridData])

    const isValidate = () => {
        if (AssignToDDL.ID == 3 || Disabled) {

            if (AssignBtnValidation) {
                setValidation(true)
            } else {
                setValidation(false)
            }
        } else if (AssignToDDL.ID == 5 || Disabled) {
            if (SalesTraineeDDL.ID == 0 || TalukaDDL.ID == 0) {
                setValidation(true)
            } else {
                setValidation(false)

            }
        } else if (AssignToDDL.ID == 6 || Disabled) {
            if (DistrictOfficerDDL.ID == 0 || VillageDDL.ID == 0) {
                setValidation(true)
            } else {
                setValidation(false)

            }
        }
    }

    useEffect(() => {
        isValidate()
    }, [AssignToDDL.ID, AssignBtnValidation, SalesTraineeDDL.ID, TalukaDDL.ID, DistrictOfficerDDL.ID, VillageDDL.ID,Disabled])

    return (
        <>
            {isLoading && <Loading />}


            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Update Farmer Meeting Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-2">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}

                            />
                        </div>

                        <div className="col-md-6 col-lg-2">
                            <MonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthData={MonthData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <AssignToDataDDL
                                AssignToDDL={AssignToDDL}
                                setAssignToDDL={setAssignToDDL}
                                AssignToData={AssignToData}
                                PopUpField={PopUpField}
                                mandatory={true}

                            />
                        </div>
                        {
                            AssignToDDL.ID === 3 ?
                                <>
                                </>
                                : AssignToDDL.ID === 5 ?
                                    <>
                                        <div className="col-md-6 col-lg-4">
                                            <DistrictOfficerDataDDL
                                                DistrictOfficerDDL={SalesTraineeDDL}
                                                setDistrictOfficerDDL={setSalesTraineeDDL}
                                                DistrictOfficerDDLData={SalesTraineeDDLDDLData}
                                                PopUpField={PopUpField}
                                                mandatory={false}
                                                name="Sales Trainee Name"
                                            />
                                        </div>
                                        <div className="col-md-6 col-lg-3">
                                            <DTVWiseEmployeeAssignDDL
                                                DTVWiseEmployeeDDL={TalukaDDL}
                                                setDTVWiseEmployeeDDL={setTalukaDDL}
                                                DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                PopUpField={PopUpField}
                                                mandatory={false}
                                                name="Taluka Name"
                                            />
                                        </div>

                                    </>
                                    : AssignToDDL.ID === 6 ?
                                        <>
                                            <div className="col-md-6 col-lg-4">
                                                <DistrictOfficerDataDDL
                                                    DistrictOfficerDDL={DistrictOfficerDDL}
                                                    setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                    DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                    PopUpField={PopUpField}
                                                    mandatory={true}
                                                    name="Field Assistant Name"
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                                <DTVWiseEmployeeAssignDDL
                                                    DTVWiseEmployeeDDL={VillageDDL}
                                                    setDTVWiseEmployeeDDL={setVillageDDL}
                                                    DTVEmployeeWiseAssignData={VillageEmployeeWiseAssignData}
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Village Name"
                                                />
                                            </div>

                                        </>
                                        :
                                        <>
                                            <div className="col-md-6 col-lg-4">
                                                <DistrictOfficerDataDDL
                                                    DistrictOfficerDDL={SalesTraineeDDL}
                                                    setDistrictOfficerDDL={setSalesTraineeDDL}
                                                    DistrictOfficerDDLData={SalesTraineeDDLDDLData}
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Sales Trainee Name"
                                                />
                                            </div>
                                            {/* <div className="col-md-6 col-lg-3">
                                                <TalukaNameDataDDL
                                                    TalukaDDL={TalukaDDL}
                                                    setTalukaDDL={setTalukaDDL}
                                                    TalukaDDLData={TalukaDDLData}
                                                    mandatory={true}
                                                />
                                            </div> */}
                                            <div className="col-md-6 col-lg-3">
                                                <DTVWiseEmployeeAssignDDL
                                                    DTVWiseEmployeeDDL={TalukaDDL}
                                                    setDTVWiseEmployeeDDL={setTalukaDDL}
                                                    DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Taluka Name"

                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-4">
                                                <DistrictOfficerDataDDL
                                                    DistrictOfficerDDL={DistrictOfficerDDL}
                                                    setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                    DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                    PopUpField={PopUpField}
                                                    mandatory={true}
                                                    name="Field Assistant Name"
                                                />
                                            </div>
                                            {/* <div className="col-md-6 col-lg-3">
                                                <VillageDataDDL
                                                    VillageDDL={VillageDDL}
                                                    setVillageDDL={setVillageDDL}
                                                    VillageData={VillageData}
                                                    mandatory={true}
                                                />
                                            </div> */}
                                            <div className="col-md-6 col-lg-3">
                                                <DTVWiseEmployeeAssignDDL
                                                    DTVWiseEmployeeDDL={VillageDDL}
                                                    setDTVWiseEmployeeDDL={setVillageDDL}
                                                    DTVEmployeeWiseAssignData={VillageEmployeeWiseAssignData}
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Village Name"
                                                />
                                            </div>
                                        </>
                        }
                        {/* <div className="col-12 col-lg-2 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div> */}



                        <div className="table-responsive mt-2">
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>#</th>

                                        <th style={{ textAlign: "center" }}>Crop Name</th>
                                        <th style={{ textAlign: "center" }}>Total Farmer Meeting Count</th>
                                        <th style={{ textAlign: "center" }}> Assign Farmer Meeting Count </th>
                                        <th style={{ textAlign: "center" }}>Remaining Farmer Meeting Count</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr style={{ textAlign: "center" }}>
                                        <td className="text-center">1</td>
                                        <td>{rowData?.cropName}</td>
                                        <td>{rowData?.farmerMeetingCount}</td>

                                        <td>
                                            <div className="col-8 text-center mx-auto">
                                                <div className="input-box">
                                                    {/* <input
                                                                type="text"
                                                                className='input-boxes'
                                                                name='Password'
                                                            // value={UserTextField.Password}
                                                            // onChange={(e) => handleInputChange(e)}
                                                            /> */}

                                                    <input
                                                        name='assignedQty'
                                                        type="text"
                                                        className="form-control p-0 px-2"
                                                        placeholder={rowData?.assignMeetingCount}
                                                        // value={}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');
                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData?.farmerMeetingCount) && parseInt(e.target.value) >= 0) {
                                                                    // handleQuantityInputChange(e)
                                                                    setAssignBtnValidation(false)
                                                                    setAssignBtnValidation1(false)
                                                                    setIsAssignQty(e.target.value)
                                                                    // setAssignQty(e.target.value)
                                                                }
                                                                else {
                                                                    // handleDisableCheckbox(e)
                                                                    setIsAssignQty('0')
                                                                    toastErrorr('Please Enter Valid Quantity')
                                                                    setAssignBtnValidation(true)
                                                                    setAssignBtnValidation1(true)
                                                                }
                                                            }
                                                        }}
                                                    />

                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            {
                                                IsAssignQty == '0' ?
                                                    (rowData?.farmerMeetingCount) - (rowData?.assignMeetingCount)
                                                    :
                                                    (rowData?.farmerMeetingCount) - IsAssignQty
                                            }
                                        </td>

                                        {/* <td>{rowData?.remainMeetingCount}</td> */}

                                    </tr>
                                </tbody>
                            </table>
                            <div className="col-12  clear">
                                <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                    // disabled={AssignBtnValidation}
                                    disabled={Validation}
                                    onClick={handelUpdateAssign}
                                >
                                    Update
                                </button>
                            </div>
                        </div>



                        {/* <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                               

                                <button
                                    type="button" className="btn addBtn allBtn float-right"
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    Save
                                </button>

                                <button
                                    type="button" className="btn btn-clear text-white mr-2 mx-2 allBtn float-right"
                                >
                                    Clear
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>


            </Popup>
            {/* {
                PopUpField.assignPopUp ? <AssignOrderTargetPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


