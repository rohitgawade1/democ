import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import AssignOnclickPopUp from './AssignOnclickPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { Year } from '../../../../Helper/Year'
import { AssignOrderTargetAddPostAPI, AssignOrderTargetDefineTableDataAPI, AssignOrderTargetPostAPI } from '../../../../Redux/StateInChargeSlice/AssignOrderTargetSlice'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { CropNameDataDDL } from '../../../../Components/CommonDDL/CropNameDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictEmployeeWiseAssignDDLAPI, DistrictNameDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, ProductCategoryDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { Loading } from '../../../../Helper/Loading'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'


export default function AssignOrderUpdatePopUp({ open, handleIsPost, handleCloseClick, PopUpField, setPopUpField, UserID, token, YearValue }) {


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
    const [IsAssignQty, setIsAssignQty] = useState('0')

    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const handleassignCloseClick = () => {
        setPopUpField({ ...PopUpField, assignPopUp: false })
    }

    const assignButtonClick = () => {
        setPopUpField({ ...PopUpField, assignPopUp: true })

    }

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
        // ID: 0,
        // Label: "Select..."
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_MonthID : 0,
        Label: popupFlag === "Update" ? rowData?.month_Name : "Select..."
    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_DistrictID : 0,
        Label: popupFlag === "Update" ? rowData?.districtName : "Select..."
    })
    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.districtOfficerID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
        // ID: popupFlag === "Update" ? rowData?.districtOfficerID : 0,
        // Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
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
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
        // dispatch(DistrictNameDDLAPI({ data }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'State' }))

    }, [])

    // ------District Officer---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(DistrictEmployeeWiseAssignDDLAPI({ data, Flag: 'State' }))
    }, [DistrictOfficerDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictEmployeeWiseAssignData } = useSelector(state => state.DistrictEmployeeWiseAssignDDLData)


    const handlePost = () => {
        setIsPost(!IsPost)
        handleIsPost()
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            Year: Year,
            Flag: 'TargetAssign',
            From: From,
            To: To
        }
        // console.log(data)
        dispatch(AssignOrderTargetDefineTableDataAPI({ data }))
    }, [IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.AssignOrderTargetDefineTableData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const ClearFilter = () => {
        setCurrentPage(0)
        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select..."
        })
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })

    }


    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].totalQuantity === 0) {
                data[index].isDisable = (data[index].totalQuantity >= a)
            } else {
                data[index].isDisable = !(data[index].totalQuantity >= a)
            }
        }
        setgridData(data)
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].totalQuantity === 0) {
            data[index].isDisable = (data[index].totalQuantity >= a)
        } else {
            if (parseInt(event.target.value) > data[index].totalQuantity) {
                data[index].isDisable = !(parseInt(event.target.value) < data[index].totalQuantity)
            } else {
                data[index].isDisable = !(data[index].totalQuantity >= a)
            }
        }
        // setgridData(data)
    }

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }

    const handelAssignClicked = () => {
        let allCheckData = ""
        gridData.forEach((item) => {
            if (item.ischecked) {
                allCheckData = allCheckData + item.t_OrderTarget_DefineID + "|" + item.assignedQty + ","
            }

        })
        // console.log(allCheckData)
        const data = {
            OrderTarget_Define: allCheckData,
            Year: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
            M_DistrictNameID: '0',
            M_UserID: UserID,
            Flag: 'StateToDistrict',
            token: token,
            handlePost,
            handleCloseClick
        }
        dispatch(AssignOrderTargetAddPostAPI({ data }))
    }

    const { isAddLoading } = useSelector(state => state.AssignOrderTargetAddPostData)

    const handelUpdateAssign = () => {
        
        const data = {
            T_OrderTarget_AssingID: rowData?.t_OrderTarget_AssingID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            M_DistrictNameID:'0',
            M_TalukaNameID:'0',
            AssignQty: IsAssignQty,
            OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
            M_UserID: UserID,
            Flag: 'Update',
            token: token,
            handlePost,
            handleCloseClick
        }
        console.log(DistrictOfficerDDL.m_UserID)
        dispatch(AssignOrderTargetPostAPI({ data }))
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
        } else if (AssignToDDL.ID == 4 || Disabled) {
            if (DistrictOfficerDDL.ID == 0 || DistrictDDL.ID == 0) {
                setValidation(true)
            } else {
                setValidation(false)

            }
        }
    }

    useEffect(() => {
        isValidate()
    }, [AssignToDDL.ID, AssignBtnValidation, DistrictOfficerDDL.ID, DistrictDDL.ID, Disabled])

    return (
        <>
            {isLoading && <Loading />}
            {isAddLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}
                contentStyle={{ overflowY: 'auto', overflowX: 'hidden', height: '99vh' }}
            >
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Update Assign Order Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-2">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                mandatory={true}
                                PopUpField={PopUpField}

                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <SeasonWiseMonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                SeasonWiseMonthData={SeasonWiseMonthData}
                                mandatory={true}
                                PopUpField={PopUpField}

                            />
                        </div>
                        {/* <div className="col-md-6 col-lg-3">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                mandatory={true}

                            />
                        </div> */}

                        {/* <div className="col-md-6 col-lg-3">
                            <CropNameDataDDL
                                CropNameDDL={CropNameDDL}
                                setCropNameDDL={setCropNameDDL}
                                CropNameDDLData={CropNameDDLData}
                                mandatory={true}

                            />
                        </div> */}

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
                                :
                                <>
                                    <div className="col-md-6 col-lg-4">
                                        <DistrictOfficerDataDDL
                                            DistrictOfficerDDL={DistrictOfficerDDL}
                                            setDistrictOfficerDDL={setDistrictOfficerDDL}
                                            DistrictOfficerDDLData={DistrictOfficerDDLData}
                                            PopUpField={PopUpField}
                                            mandatory={true}
                                        />
                                    </div>
                                    {/* <div className="col-md-6 col-lg-2">
                                        <DTVWiseEmployeeAssignDDL
                                            DTVWiseEmployeeDDL={DistrictDDL}
                                            setDTVWiseEmployeeDDL={setDistrictDDL}
                                            DTVEmployeeWiseAssignData={DistrictEmployeeWiseAssignData}
                                            PopUpField={PopUpField}
                                            mandatory={false}
                                            name="District"
                                        />
                                    </div> */}
                                </>
                        }
                        {/* <div className="col-md-6 col-lg-3">
                            <DistrictNameDataDDL
                                DistrictDDL={DistrictDDL}
                                setDistrictDDL={setDistrictDDL}
                                DistrictDDLData={DistrictDDLData}
                                mandatory={true}
                                PopUpField={PopUpField}
                            />
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <DistrictOfficerDataDDL
                                DistrictOfficerDDL={DistrictOfficerDDL}
                                setDistrictOfficerDDL={setDistrictOfficerDDL}
                                DistrictOfficerDDLData={DistrictOfficerDDLData}
                                mandatory={true}
                                PopUpField={PopUpField}
                            />
                        </div> */}

                        {/* <div className="col-12 col-lg-2 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div> */}

                        {/* <div className="col-12 col-lg-4 mt-lg-5 text-end">
                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Financial Target (Rs) :- 00  </span>
                        </div> */}

                        <div className="table-responsive mt-2">
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        {
                                            popupFlag === "Update" ?
                                                <th style={{ textAlign: "center" }}>Sr.No</th>
                                                :
                                                <th style={{ textAlign: "center", width: "5%" }}>#</th>
                                        }
                                        <th style={{ textAlign: "center" }}>Crop Name</th>
                                        <th style={{ textAlign: "center" }}>Product Name</th>
                                        <th style={{ textAlign: "center" }}>Pack Size</th>
                                        <th style={{ textAlign: "center" }}>Total Quantity </th>
                                        <th style={{ textAlign: "center" }}>Assigned Quantity </th>
                                        <th style={{ textAlign: "center" }}>Remaining Quantity</th>


                                    </tr>
                                </thead>
                                <tbody>

                                    <tr style={{ textAlign: "center" }}>

                                        <td className="text-center">1</td>
                                        <td>{rowData?.cropName}</td>
                                        <td>{rowData?.product_Name}</td>
                                        <td>{rowData?.packingSize}</td>
                                        <td>{rowData?.totalQuantity}</td>
                                        <td>
                                            <div className="col-8 text-center mx-auto">
                                                <div className="input-box">
                                                    <input
                                                        name='assignedQty'
                                                        type="text"
                                                        className="form-control p-0 px-2"
                                                        placeholder={rowData?.assingQuantity}
                                                        // value={}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');
                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData?.assignTotalAmt) && parseInt(e.target.value) >= 0) {
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
                                                (rowData?.totalQuantity) - (rowData?.assingQuantity)
                                                :
                                                (rowData?.totalQuantity) - IsAssignQty}</td>
                                        {/* <td>{rowData?.remainQTY}</td> */}


                                    </tr>


                                </tbody>
                            </table>
                            <div className="col-12 clear">
                                <button type="button" className="btn addBtn float-end text-white mr-2 mt-4 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light allBtn"
                                    // disabled={AssignBtnValidation}
                                    disabled={Validation}
                                    onClick={() => handelUpdateAssign()}
                                >
                                    Update
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            </Popup>
            {/* {
                PopUpField.assignPopUp ? <AssignOnclickPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


