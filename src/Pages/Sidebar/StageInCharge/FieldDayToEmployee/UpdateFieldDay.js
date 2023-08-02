import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import CommonAssignFieldVisitPopUp from '../FieldVisitToEmployee/CommonAssignFieldVisitPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { AssignToDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { DefineFieldDayDataAPI, FieldDayUpdatePostAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFieldDaySlice'
import { Loading } from '../../../../Helper/Loading'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { Year } from '../../../../Helper/Year'
import { User } from 'react-feather'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function UpdateFieldDay({ open, handleCloseClick, PopUpField, handlePost, UserID, token, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, assignPopUp, rowData } = PopUpField
    // console.log(rowData)
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [IsAssignQty, setIsAssignQty] = useState(0)

    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_MonthID : 0,
        Label: popupFlag === "Update" ? rowData?.month_Name : "Select..."
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_VillageNameID : 0,
        Label: popupFlag === "Update" ? rowData?.villageName : "Select..."
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
    })

    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.assignOfficerIndicatorID : 0,
        Label: popupFlag === "Update" ? rowData?.assignOfficerIndicatorName : "Select..."
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'Field' }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [])

     // ------Field Assistant---
     useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID]) 

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { VillageData } = useSelector(state => state.VillageDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handleIsPost = () => {
        setIsPost(!IsPost)
    }

    const ClearFilter = () => {
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select..."
        })
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            Flag: 'FieldDayDefine',
            From: From,
            To: To
        }

        dispatch(DefineFieldDayDataAPI({ data }))
    }, [IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.DefineFieldDayData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const handleUpdate = () => {
        const data = {
            T_FieldDay_AssignID: rowData?.t_FieldDay_AssignID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            AssignVisit: IsAssignQty,
            AssignToOfficerID:AssignToDDL.ID,
            M_VillageNameID:VillageDDL.ID ? VillageDDL.ID : '0',
            M_TalukaNameID:'0',
            OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
            M_UserID: UserID,
            token: token,
            Flag: 'Update',
            handlePost,
            handleCloseClick
        }
        dispatch(FieldDayUpdatePostAPI({ data }))
    }

    const { isPostLoading } = useSelector(state => state.FieldDayUpdatePostData)

    const isValidate = () => {
        if (AssignToDDL.ID == 3 || Disabled) {

            if (AssignBtnValidation) {
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
    }, [AssignToDDL.ID, AssignBtnValidation, DistrictOfficerDDL.ID, VillageDDL.ID,Disabled])

    return (
        <>
            {isLoading && <Loading />}
            {isPostLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Update Assign Field Day Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-3">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <SeasonWiseMonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                SeasonWiseMonthData={SeasonWiseMonthData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>

                        <div className="col-md-6 col-lg-3">
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
                                :
                                <>
                                    <div className="col-md-6 col-lg-3">
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
                                        <TalukaNameDataDDL
                                            TalukaDDL={TalukaDDL}
                                            setTalukaDDL={setTalukaDDL}
                                            TalukaDDLData={TalukaDDLData}
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
                        <div className="col-12 col-lg-4 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div>


                        {/* <div className="col-12 mt-1 text-end">

                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Field Day Count  :- 00  </span>

                        </div> */}
                        <div className="table-responsive mt-1">
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>Sr No.</th>

                                        <th style={{ textAlign: "center" }}>Crop Name </th>
                                        <th style={{ textAlign: "center" }}>Total Field Day Count</th>
                                        <th style={{ textAlign: "center" }}>Assigned Field Day Count</th>
                                        <th style={{ textAlign: "center" }}>Remaining Field Day Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                        <td className="text-center">1</td>
                                        <td>{rowData?.cropName}</td>
                                        <td>{rowData?.total_FieldDay_Count}</td>

                                        <td>
                                            <div className="col-8 text-center mx-auto">
                                                <div className="input-box">
                                                    <input
                                                        name='assignedQty'
                                                        type="text"
                                                        className="form-control p-0 px-2 text-center"
                                                        placeholder={rowData?.assignDayCount}
                                                        // value={}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');
                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData?.total_FieldDay_Count) && parseInt(e.target.value) >= 0) {
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
                                        <td>{
                                            // rowData?.assingQuantity
                                            IsAssignQty == '0' ?
                                                (rowData?.total_FieldDay_Count) - (rowData?.assignDayCount)
                                                :
                                                (rowData?.total_FieldDay_Count) - IsAssignQty}</td>

                                        {/* <td>{rowData?.remainDayCount}</td> */}

                                    </tr>
                                </tbody>
                            </table>
                            <div className="col-12 clear">
                                <button type="button" className="btn addBtn float-end text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn"
                                    onClick={() => handleUpdate()}
                                    disabled={Validation}
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
                PopUpField.assignPopUp ? <CommonAssignFieldVisitPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


