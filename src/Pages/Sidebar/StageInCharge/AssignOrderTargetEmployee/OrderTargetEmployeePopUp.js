import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import AssignOrderTargetPopUp from './AssignOrderTargetPopUp'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { useDispatch, useSelector } from 'react-redux'
import { AssignToDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, ProductCategoryDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, TalukaEmployeeWiseAssignDDLAPI, TalukaNameDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { OrderTargetAssignPostAPI, OrderTargetDefineDataAPI } from '../../../../Redux/DistrictOfficerSlice/OrderAssignTargetSlice'
import { Loading } from '../../../../Helper/Loading'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { AstricSign } from '../../../../Helper/AstricSign'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function OrderTargetEmployeePopUp({ open, handleCloseClick, PopUpField, setPopUpField, handleIsPost, UserID, token, YearValue }) {

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
    const [AssignQty, setAssignQty] = useState(0)
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

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

    const [TalukaDDL, setTalukaDDL] = useState({
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

    const [SalesTraineeDDL, setSalesTraineeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
        // dispatch(TalukaNameDDLAPI({ data }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Order' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'Order' }))
    }, [])
    // ------sales trainee---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SalesTraineeDDLDDLAPI({ data, Flag: 'Order' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, SalesTraineeDDL }
        dispatch(TalukaEmployeeWiseAssignDDLAPI({ data, Flag: 'District' }))
    }, [SalesTraineeDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)
    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)

    const handlePost = () => {
        setIsPost(!IsPost)
        handleIsPost()
        // ClearAssign()
        // handleClearPopUp()
    }
    const ClearAssignInput = () => {
        gridData &&  gridData.length > 0 && gridData.map(function (item){
            delete item.bad;
            setgridData(item)
            // console.log(item);
            // return item;
        });
    }

    const ClearFilter = () => {
        // setCurrentPage(0)
        ClearAssignInput()
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select..."
        })
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
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setSalesTraineeDDL({
            ...SalesTraineeDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    const ClearPopUpFilter = () => {
        setCurrentPage(0)
        ClearAssignInput()
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select..."
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setSalesTraineeDDL({
            ...SalesTraineeDDL,
            ID: 0,
            Label: "Select..."
        })
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            ProductCategoryDDL: ProductCategoryDDL.ID,
            Flag: 'AssignByDistrict',
            From: From,
            To: '99999'
        }

        dispatch(OrderTargetDefineDataAPI({ data }))
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.OrderTargetDefineData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

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
    }

    const handleQtyInputChange = (index, event) => {
        let allCheckData = ""
        let m_CropID = ""
        gridData.forEach((item) => {
            if (item.assignedQty > 0 && item.assignedQty <= item.remainQTY) {
                allCheckData = allCheckData + item.t_OrderTarget_DefineID + "|" + item.assignedQty + ","
                m_CropID = item.m_CropID
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

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }
    useEffect(() => {
        for (var i in gridData) {
            if (gridData[i].isDisable === false) {
                setAssignDataErr(true)
                break;
            }
        }
    }, [gridData])

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // // let m_CropID = ""
        // gridData.forEach((item) => {
        //     if (item.ischecked) {
        //         allCheckData = allCheckData + item.t_OrderTarget_DefineID + "|" + item.assignedQty + ","
        //         // m_CropID = item.m_CropID
        //     }

        // })
        // console.log(allCheckData)
        if (ProductCategoryDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            const data = {
                OrderTarget_Define: AssignData,
                M_FinancialYearID: YearValue,
                M_MonthID: MonthDDL.ID,
                M_SeasonID: SeasonDDL.ID,
                AssignToOfficerID: AssignToDDL.ID,
                OrderAssignToUserID: SalesTraineeDDL.m_UserID,
                FieldDayDefineToUserID: DistrictOfficerDDL.ID,
                // M_TalukaNameID: TalukaDDL.ID,
                M_TalukaNameID: '0',
                M_UserID: UserID,
                token: token,
                Flag: 'DistrictToSales',
                handlePost,
                handleCloseClick,
                ClearPopUpFilter: ClearPopUpFilter
            }
            dispatch(OrderTargetAssignPostAPI({ data }))
        }
    }

    const { isPostLoading } = useSelector(state => state.OrderTargetAssignPost)

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
        }
    }

    useEffect(() => {
        isValidate()
    }, [AssignToDDL.ID, AssignBtnValidation, SalesTraineeDDL.ID, TalukaDDL.ID, Disabled])

    return (
        <>
            {isLoading && <Loading />}
            {isPostLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Order Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-3">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <MonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthData={MonthData}
                            />
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <ProductCategoryDataDDL
                                ProductCategoryDDL={ProductCategoryDDL}
                                setProductCategoryDDL={setProductCategoryDDL}
                                ProductCatDDLData={ProductCatDDLData}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <AssignToDataDDL
                                AssignToDDL={AssignToDDL}
                                setAssignToDDL={setAssignToDDL}
                                AssignToData={AssignToData}
                                mandatory={true}

                            />
                        </div>
                        {
                            AssignToDDL.ID === 3 ?
                                <> </>
                                :
                                <>
                                    <div className="col-md-6 col-lg-4">
                                        <DistrictOfficerDataDDL
                                            DistrictOfficerDDL={SalesTraineeDDL}
                                            setDistrictOfficerDDL={setSalesTraineeDDL}
                                            DistrictOfficerDDLData={SalesTraineeDDLDDLData}
                                            mandatory={false}
                                            name="Sales Trainee Name"
                                        />
                                    </div>
                                    {/* <div className="col-md-6 col-lg-3">
                                        <DTVWiseEmployeeAssignDDL
                                            DTVWiseEmployeeDDL={TalukaDDL}
                                            setDTVWiseEmployeeDDL={setTalukaDDL}
                                            DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                            mandatory={false}
                                            name="Taluka Name"
                                        />
                                    </div> */}
                                </>
                        }


                        <div className="col-12 col-lg-3 clear">
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
                                            : AssignToDDL.ID === 6 ?
                                                'Please Select Season, Month,Crop Type, Assign To & Field Assistant Name'
                                                : AssignToDDL.ID === 5 ?
                                                    'Please Select Season, Month,Crop Type, Assign To & Sales Trainee Name'
                                                    :
                                                    'Please Select Season, Month, Assign To & District Officer'
                                    }
                                </span>
                            </div>
                        }


                        <div className="table-responsive mt-2" style={{height:'350px'}}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th >Sr No.</th>
                                        <th>Crop Name </th>
                                        <th>Product Name </th>
                                        <th >Pack Size</th>
                                        <th >Total Quantity</th>
                                        <th > Assign Quantity </th>
                                        <th>Remaining Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>{item.rowNum}</td>
                                                {/* <td>
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
                                                </td> */}
                                                 <td>{item?.cropName}</td>
                                                <td>{item?.product_Name}</td>
                                                <td>{item?.packingSize}</td>
                                                <td>{item?.totalQuantity}</td>

                                                <td>
                                                    <div className="col-8 text-center mx-auto">
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
                                                             {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid Assign Quantity</text>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item?.remainQTY}</td>

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12  clear">
                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                onClick={() => handelAssignClicked()}
                                // disabled={Validation}
                                disabled={AssignDataErr}
                            >
                                Assign
                            </button>

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


