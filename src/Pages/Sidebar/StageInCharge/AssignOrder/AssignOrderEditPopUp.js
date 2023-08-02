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
import { toastErrorr, toastInfo } from '../../../../Helper/ToastMessage'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function AssignOrderEditPopUp({ open, handleCloseClick, PopUpField, setPopUpField, UserID, token, handleIsPost, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, assignPopUp } = PopUpField

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)

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
        ID: 0,
        Label: "Select..."
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
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

    // useEffect(() => {
    //     const data = { UserID, token, DistrictOfficerDDL }
    //     dispatch(DTVEmployeeWiseAssignDDLAPI({ data, Flag: 'State' }))
    // }, [DistrictOfficerDDL.ID])

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
        ClearAssign()
        // handleClearPopUp()
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            Year: YearValue,
            Flag: 'TargetAssign',
            From: From,
            To: '99999'
        }
        // console.log(data)
        dispatch(AssignOrderTargetDefineTableDataAPI({ data }))
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.AssignOrderTargetDefineTableData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const ClearAssignInput = () => {
        gridData && gridData.length > 0 && gridData.map(function (item) {
            delete item.bad;
            setgridData(item)
            // console.log(item);

            // return item;
        });
    }

    const ClearFilter = () => {
        setCurrentPage(0)
        ClearAssignInput()
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
        setCropTypeDDL({
            ...CropTypeDDL,
            ID: 0,
            Label: "Select..."
        })
        setCropNameDDL({
            ...CropNameDDL,
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

    const ClearPopUpFilter = () => {
        setCurrentPage(0)
        ClearAssignInput()
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

    const ClearAssign = () => {
        // setCurrentPage(0)
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


    // ################################################################################################

    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].remainQTY === 0) {
                data[index].isDisable = (data[index].remainQTY >= a)
            } else {
                data[index].isDisable = (data[index].remainQTY >= a)
            }

        }
        setgridData(data)
        setAssignDataErr(false)
        handleQtyInputChange(index, event)
        // console.log(data)
    }

    const handleQtyInputChange = (index, event) => {
        let allCheckData = ""
        gridData.forEach((item) => {
            if (item.assignedQty > 0 && item.assignedQty <= item.remainQTY) {
                allCheckData = allCheckData + item.t_OrderTarget_DefineID + "|" + item.assignedQty + ","
            }
        })
        setAssignData(allCheckData)
        // console.log(allCheckData)
    }


    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].remainQTY === 0) {
            data[index].isDisable = (data[index].remainQTY >= a)
        } else {
            if (parseInt(event.target.value) > data[index].remainQTY) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].remainQTY)
            } else {
                data[index].isDisable = !(data[index].remainQTY >= a)
            }
        }
        setgridData(data)
        setAssignDataErr(true)
    }

    useEffect(() => {
        for (var i in gridData) {
            if (gridData[i].isDisable === false) {
                setAssignDataErr(true)
                break;
            }
        }
    }, [gridData])

    // ################################################################################################

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // gridData.forEach((item) => {
        //     if (item.ischecked) {
        //         allCheckData = allCheckData + item.t_OrderTarget_DefineID + "|" + item.assignedQty + ","
        //     }

        // })
        // console.log(allCheckData)
        if (MonthDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            setDDLInfo(false)
            const data = {
                OrderTarget_Define: AssignData,
                Year: YearValue,
                M_MonthID: MonthDDL.ID,
                AssignToOfficerID: AssignToDDL.ID,
                OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
                M_DistrictNameID: '0',
                M_UserID: UserID,
                Flag: 'StateToDistrict',
                token: token,
                handlePost,
                handleCloseClick,
                ClearPopUpFilter: ClearPopUpFilter,
            }
            dispatch(AssignOrderTargetAddPostAPI({ data }))
        }
    }



    const { isAddLoading } = useSelector(state => state.AssignOrderTargetAddPostData)

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }


    const handelUpdateAssign = (id, isAssignQTY) => {
        const data = {
            T_OrderTarget_AssingID: id,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            AssignQty: isAssignQTY,
            OrderAssignToUserID: DistrictOfficerDDL.m_UserID,
            M_UserID: UserID,
            Flag: 'Update',
            token: token,
            handlePost,
            handleCloseClick
        }
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
                <div className="call">Assign Order Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-2">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <SeasonWiseMonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                SeasonWiseMonthData={SeasonWiseMonthData}
                                mandatory={true}

                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <AssignToDataDDL
                                AssignToDDL={AssignToDDL}
                                setAssignToDDL={setAssignToDDL}
                                AssignToData={AssignToData}
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
                                            mandatory={true}
                                        />
                                    </div>
                                    {/* <div className="col-md-6 col-lg-2">
                                        <DTVWiseEmployeeAssignDDL
                                            DTVWiseEmployeeDDL={DistrictDDL}
                                            setDTVWiseEmployeeDDL={setDistrictDDL}
                                            DTVEmployeeWiseAssignData={DistrictEmployeeWiseAssignData}
                                            mandatory={false}
                                            name="District"
                                        />
                                    </div> */}
                                </>
                        }
                        {/* <div className="col-md-6 col-lg-3">
                            <CropNameDataDDL
                                CropNameDDL={CropNameDDL}
                                setCropNameDDL={setCropNameDDL}
                                CropNameDDLData={CropNameDDLData}
                                mandatory={true}

                            />
                        </div> */}



                        <div className="col-12 col-lg-1 clear">
                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => addButtonClick()}
                                                            >
                                                                Assign
                                                            </button> */}
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div>

                        {DDLInfo &&
                            <div className="col-12 col-lg-12 text-end">
                                <span className='px-2 fw-bold' style={{ color: "blue" }}>
                                    {
                                        AssignToDDL.ID === 3 ?
                                            'Please Select Season, Month, Assign To'
                                            :
                                            'Please Select Season, Month, Assign To & District Officer'
                                    }
                                </span>
                            </div>
                        }

                        <div className="table-responsive mt-2" style={{ height: '400px' }}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        {/* {
                                            popupFlag === "Update" ? */}
                                        <th style={{ textAlign: "center" }}>Sr.No</th>
                                        {/* :
                                                <th style={{ textAlign: "center", width: "5%" }}>#</th>
                                        } */}
                                        <th style={{ textAlign: "center" }}>Crop Name</th>
                                        <th style={{ textAlign: "center" }}>Product Name</th>
                                        <th style={{ textAlign: "center" }}>Pack Size</th>
                                        <th style={{ textAlign: "center" }}>Total Quantity </th>
                                        <th style={{ textAlign: "center" }}>Assign Quantity </th>
                                        <th style={{ textAlign: "center" }}>Remaining Quantity</th>
                                        {
                                            popupFlag === "Update" &&
                                            <th style={{ textAlign: "center" }}>Action</th>
                                        }


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr>

                                                {/* {
                                                    popupFlag === "Update" ? */}
                                                <td className="text-center">{i + 1}</td>
                                                {/* :
                                                        <td className="text-center">
                                                            <input
                                                                disabled={item.isDisable}
                                                                value={item.ischecked}
                                                                checked={item.ischecked}
                                                                onChange={(e) => {
                                                                    if (AssignBtnValidation1) {
                                                                        toastErrorr('Please Enter Valid Quantity')
                                                                    } else {
                                                                        handleOnCheckClick(item, i, !item.ischecked)
                                                                    }
                                                                }}

                                                                type="checkbox" />
                                                        </td>
                                                } */}
                                                <td>{item?.cropName}</td>
                                                <td>{item?.product_Name}</td>
                                                <td>{item?.packingSize}</td>
                                                <td align='center'>{item?.totalQuantity}</td>
                                                <td>
                                                    <div className="col-8 text-center mx-auto">
                                                        <div className="input-box">
                                                            <input
                                                                name='assignedQty'
                                                                id='assignInput'
                                                                qtyerr='assignedQtyErr'
                                                                type="text"
                                                                className="form-control p-0 px-2"
                                                                style={{ background: 'whitesmoke', borderColor: '#777777', borderWidth: '0.5px', textAlign: 'center' }}
                                                                onChange={(e) => {
                                                                    const reg = new RegExp('^[0-9]+$');
                                                                    if (e.target.value === "") {
                                                                        handleQuantityInputChange(i, e)

                                                                    } else {
                                                                        if (reg.test(e.target.value)) {
                                                                            if (parseInt(e.target.value) <= parseInt(item.remainQTY) && parseInt(e.target.value) >= 0) {
                                                                                handleQuantityInputChange(i, e)
                                                                                setAssignBtnValidation(false)
                                                                                setAssignBtnValidation1(false)
                                                                                setAssignDataErr(false)
                                                                                // setAssignQty(e.target.value)
                                                                            }
                                                                            else {
                                                                                handleDisableCheckbox(i, e)
                                                                                // toastErrorr('Please Enter Valid Quantity')
                                                                                setAssignDataErr(true)
                                                                                setAssignBtnValidation(true)
                                                                                setAssignBtnValidation1(true)
                                                                                handleQtyInputChange(i, e)
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid Assign Qty</text>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align='center'>{item?.remainQTY}</td>
                                                {
                                                    popupFlag === "Update" &&
                                                    <td>
                                                        <button type="button"
                                                            className="btn addBtn float-end text-white mx-2 my-1"
                                                            disabled={item.isAssignQTY == 0}
                                                            onClick={() => handelUpdateAssign(item.t_OrderTarget_DefineID, item.isAssignQTY)}
                                                        >
                                                            Update
                                                        </button>
                                                    </td>
                                                }

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }


                                </tbody>
                            </table>
                        </div>
                        {
                            popupFlag !== "Update" &&
                            <div className="col-12 clear">
                                <button type="button" className="btn addBtn float-end text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                    // disabled={AssignBtnValidation || AssignToDDL.ID == 0 || DistrictOfficerDDL.ID == 0 || DistrictDDL.ID == 0}
                                    disabled={AssignDataErr}
                                    onClick={handelAssignClicked}
                                >
                                    Assign
                                </button>
                            </div>
                        }

                        {/*
                        {tableData && tableData.table && tableData.table.length > 0 &&
                            <Pegination
                                PerPageCount={PerPageCount}
                                TotalCount={tableData.table[0].totalCount}
                                setFrom={setFrom}
                                setTo={setTo}
                                setrowNo={setrowNo}
                                CurrentPage={CurrentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        } */}
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
                PopUpField.assignPopUp ? <AssignOnclickPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


