
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import CommonAssignFieldVisitPopUp from './CommonAssignFieldVisitPopUp'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { DefineFieldVisiDataAPI, FieldVisitUpdatePostAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFieldVisitSlice'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { Year } from '../../../../Helper/Year'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { Loading } from '../../../../Helper/Loading'

export default function UpdateFieldVisit({ open, handleUpdateCloseClick, PopUpField, handlePost, UserID, token, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, assignPopUp, rowData } = PopUpField
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


    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.tragetAssignToUser : "Select..."
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
    }, [])

    // useEffect(() => {
    //     console.log('DistrictOfficerDDLData', DistrictOfficerDDL)
    // }, [DistrictOfficerDDL])

    // ------Field Assistant---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [])

    useEffect(() => {
        // console.log('rowData',rowData)
        // console.log(DistrictOfficerDDL)

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
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handleIsPost = () => {
        setIsPost(!IsPost)
    }

    const ClearFilter = () => {
        setAssignToDDL({
            ...AssignToDDL,
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

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            Flag: 'FieldVisitAssign',
            From: From,
            To: To
        }

        dispatch(DefineFieldVisiDataAPI({ data }))
    }, [IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.DefineFieldVisitData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const handleUpdate = () => {
        const data = {
            T_FieldVisit_AssignID: rowData?.t_FieldVisit_AssignID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            AssignVisit: IsAssignQty,
            OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
            M_VillageNameID:VillageDDL.ID ? VillageDDL.ID : '0',
            M_TalukaNameID:'0',
            M_UserID: UserID,
            token: token,
            Flag: 'Update',
            handlePost,
            handleUpdateCloseClick
        }
        dispatch(FieldVisitUpdatePostAPI({ data }))
    }
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
        // console.log(VillageDDL)
        // console.log(DistrictOfficerDDL)
    }, [VillageDDL])

    useEffect(() => {
        isValidate()
    }, [AssignToDDL.ID, AssignBtnValidation, TalukaDDL.ID, DistrictOfficerDDL.ID, VillageDDL.ID, Disabled])

    return (
        <>
         {isLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleUpdateCloseClick}>
                <span className="close" onClick={handleUpdateCloseClick}>
                    &times;
                </span>
                <div className="call">Update Assign Field Visit Target</div>
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
                                mandatory={true}
                                PopUpField={PopUpField}
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

                        {/* <div className="col-md-6 col-lg-3">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Crop Name</label>
                                <Select
                                    isClearable
                                    isSearchable
                                />
                            </div>
                        </div> */}
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
                                            AssignToDDL={AssignToDDL}
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
                                            mandatory={true}
                                            name="Village Name"
                                        />
                                    </div>
                                </>
                        }
{/* 
                        <div className="col-12 col-lg-4 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div> */}



                        {/* <div className="col-12 mt-2 text-end">
                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Field Visit Count :- 00  </span>

                        </div> */}

                        <div className="table-responsive mt-2">
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>Sr No.</th>

                                        <th style={{ textAlign: "center" }}>Crop Name </th>
                                        <th style={{ textAlign: "center" }}>Total Count</th>
                                        <th style={{ textAlign: "center" }}>Assigned Field visit count</th>
                                        <th style={{ textAlign: "center" }}>Remaining Field Visit Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td className="text-center">1</td>
                                        <td>{rowData.cropName ? rowData.cropName : '-'}</td>
                                        <td>{rowData.defineVisitCount ? rowData.defineVisitCount : '-'}</td>
                                        <td>
                                            <div className="col-8 text-center mx-auto">
                                                <div className="input-box">
                                                    <input
                                                        name='assignedQty'
                                                        type="text"
                                                        className="form-control p-0 px-2 text-center"
                                                        placeholder={rowData?.assignVisitCount}
                                                        // value={}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');
                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData?.defineVisitCount) && parseInt(e.target.value) >= 0) {
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
                                                (rowData?.defineVisitCount) - (rowData?.assignVisitCount)
                                                :
                                                (rowData?.defineVisitCount) - IsAssignQty}</td>


                                        {/* <td>{rowData.remainVisitCount ? rowData.remainVisitCount : '-'}</td> */}

                                    </tr>
                                </tbody>
                            </table>
                            <div className="col-12 clear">
                                <button type="button" className="btn addBtn text-white float-end mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn"
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


