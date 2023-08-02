import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import AssignOnclickPopUp from '../AssignOrder/AssignOnclickPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { AssignOrderTargetDefineTableDataAPI } from '../../../../Redux/StateInChargeSlice/AssignOrderTargetSlice'
import { Year } from '../../../../Helper/Year'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'
import { AssignToDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictEmployeeWiseAssignDDLAPI, DistrictNameDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, ProductCategoryDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { AssignFinancialDefineTableDataAPI, AssignFinancialTargetAddPostAPI, AssignFinancialTargetUpdateAPI } from '../../../../Redux/StateInChargeSlice/AssignFinancialTargetSlice'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function AssignPaymentCollectTargetPop({ open, handleCloseClick, PopUpField, setPopUpField, UserID, token, handleIsPost, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, assignPopUp } = PopUpField

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [gridData, setgridData] = useState([])
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
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

    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
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

    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        // dispatch(MonthDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
        // dispatch(DistrictNameDDLAPI({ data }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'State' }))
    }, [])
    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    // ------District Officer---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(DistrictEmployeeWiseAssignDDLAPI({ data, Flag: 'State' }))
    }, [DistrictOfficerDDL.ID])


    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)
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
            Year: YearValue,
            Flag: 'PaymentDefine',
            From: From,
            To: '99999'
        }
        dispatch(AssignFinancialDefineTableDataAPI({ data }))
    }, [IsPost, From, MonthDDL.ID, SeasonDDL.ID, YearValue])

    const { tableData, isLoading } = useSelector(state => state.AssignFinancialDefineTableData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const ClearAssignInput = () => {
        gridData &&  gridData.length > 0 && gridData.map(function (item) {
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
        setProductCategoryDDL({
            ...ProductCategoryDDL,
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

    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].remainFinancialTargetAmt === 0) {
                data[index].isDisable = (data[index].remainFinancialTargetAmt >= a)
            } else {
                data[index].isDisable = (data[index].remainFinancialTargetAmt >= a)
            }
        }
        setgridData(data)
        setAssignDataErr(false)
        handleQtyInputChange(index, event)
    }

    const handleQtyInputChange = (index, event) => {
        let allCheckData = ""
        gridData.forEach((item) => {
            if (item.assignedQty > 0 && item.assignedQty <= item.remainFinancialTargetAmt) {
                allCheckData = allCheckData + item.t_PaymentTarget_DefineID + "|" + item.assignedQty + ","
            }
        })
        setAssignData(allCheckData)
        // console.log(allCheckData)
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].remainFinancialTargetAmt === 0) {
            data[index].isDisable = (data[index].remainFinancialTargetAmt >= a)
        } else {
            if (parseInt(event.target.value) > data[index].remainFinancialTargetAmt) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].remainFinancialTargetAmt)
            } else {
                data[index].isDisable = !(data[index].remainFinancialTargetAmt >= a)
            }
        }
        // setgridData(data)
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

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // gridData.forEach((item) => {
        //     if (item.ischecked) {
        //         allCheckData = allCheckData + item.t_PaymentTarget_DefineID + "|" + item.assignedQty + ","
        //     }

        // })
        // console.log(allCheckData)

        if (MonthDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            setDDLInfo(false)
            const data = {
                PaymentTarget_Define: AssignData,
                Year: YearValue,
                M_MonthID: MonthDDL.ID,
                AssignToOfficerID: AssignToDDL.ID,
                TargetAssignToUserID: DistrictOfficerDDL.m_UserID,
                M_DistrictID: '0',
                M_UserID: UserID,
                Flag: 'StateToDistrict',
                token: token,
                handlePost,
                handleCloseClick,
                handleClearPopUp:ClearPopUpFilter
            }
            dispatch(AssignFinancialTargetAddPostAPI({ data }))
        }

        
    }

    const { isAddLoading } = useSelector(state => state.AssignFinancialTargetAddPostData)

    const handelUpdateAssign = (id, isAssignQTY) => {
        const data = {
            T_PaymentTarget_AssingID: id,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            AssignQty: isAssignQTY,
            AssignToUserID: DistrictOfficerDDL.m_UserID,
            M_UserID: UserID,
            Flag: 'Update',
            token: token,
            handlePost,
            handleCloseClick
        }
        dispatch(AssignFinancialTargetUpdateAPI({ data }))
    }

    const { isUpdateLoading } = useSelector(state => state.AssignFinancialTargetUpdateData)

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
            {isUpdateLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}
                contentStyle={{ overflowY: 'auto', overflowX: 'hidden', height: '99vh' }}
            >
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Financial Target </div>
                <div className="modal-body" >
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
                            <ProductCategoryDataDDL
                                ProductCategoryDDL={ProductCategoryDDL}
                                setProductCategoryDDL={setProductCategoryDDL}
                                ProductCatDDLData={ProductCatDDLData}
                            />
                        </div> */}

                        <div className="col-12 col-lg-2 clear">
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

                        {/* <div className="col-12 col-lg-6 mt-4 text-end">
                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Financial Target (Rs) :- 00  </span>
                        </div> */}

                        <div className="table-responsive mt-2"style={{height:'400px'}}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        {/* {
                                            popupFlag === "Update" ? */}
                                                <th style={{ textAlign: "center" }}>Sr.No</th>
                                                {/* :
                                                <th style={{ textAlign: "center", width: "5%" }}>#</th>
                                        } */}

                                        <th style={{ textAlign: "center" }}>Product Name</th>
                                        <th style={{ textAlign: "center" }}>Total Amount</th>
                                        <th style={{ textAlign: "center" }}>Assign Amount(Rs)</th>
                                        <th style={{ textAlign: "center" }}>Remaining Amount(Rs)</th>
                                        {
                                            popupFlag === "Update" &&
                                            <th style={{ textAlign: "center" }}>Action </th>
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr style={{ textAlign: "center" }} >
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
                                                <td>{item?.product_Name}</td>
                                                <td>{item?.totalFinancialTargetAmt.toFixed(2)}</td>


                                                <td>
                                                    <div className="col-8 text-center mx-auto" >
                                                        <div className="input-box">
                                                            <input
                                                                name='assignedQty'
                                                                qtyerr='assignedQtyErr'
                                                                type="text"
                                                                className="form-control p-0 px-2 text-center"
                                                                style={{ background: 'whitesmoke', borderColor: '#777777', borderWidth: '0.5px', textAlign: 'center' }}
                                                                onChange={(e) => {
                                                                    const reg = new RegExp('^[0-9]+$');
                                                                    if (e.target.value === "") {
                                                                        handleQuantityInputChange(i, e)

                                                                    } else {
                                                                        if (reg.test(e.target.value)) {
                                                                            if (parseInt(e.target.value) <= parseInt(item.remainFinancialTargetAmt) && parseInt(e.target.value) >= 0) {
                                                                                handleQuantityInputChange(i, e)
                                                                                setAssignBtnValidation(false)
                                                                                setAssignBtnValidation1(false)                                          
                                                                                // setAssignDataErr(false)
                                                                                // setAssignQty(e.target.value)
                                                                            }
                                                                            else {
                                                                               
                                                                                handleDisableCheckbox(i, e)
                                                                                // toastErrorr('Please Enter Valid Quantity')
                                                                                // setAssignDataErr(true)
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
                                                <td>{item?.remainFinancialTargetAmt.toFixed(2)}</td>

                                                {
                                                    popupFlag === "Update" &&
                                                    <td>
                                                        <button type="button"
                                                            className="btn addBtn float-end text-white mx-2 my-1"
                                                            disabled={item.isAssignQTY == 0}
                                                            onClick={() => handelUpdateAssign(item.t_PaymentTarget_DefineID, item.isAssignQTY)}
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
                                <div className="col-12  clear">
                                    <button type="button" className="btn addBtn float-end text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                        onClick={() => handelAssignClicked()}
                                        // disabled={Validation}
                                        disabled={AssignDataErr}
                                        // disabled={AssignBtnValidation || AssignToDDL.ID == 0 || DistrictOfficerDDL.ID == 0 || DistrictDDL.ID == 0}
                                    >
                                        Assign
                                    </button>
                                </div>
                            }

                        {/* {tableData && tableData.table && tableData.table.length > 0 &&
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
            {
                PopUpField.assignPopUp ? <AssignOnclickPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            }
        </>
    )
}


