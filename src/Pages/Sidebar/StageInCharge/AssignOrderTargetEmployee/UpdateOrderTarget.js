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
import { OrderTargetAssignPostAPI, OrderTargetDefineDataAPI, OrderTargetUpdatePostAPI } from '../../../../Redux/DistrictOfficerSlice/OrderAssignTargetSlice'
import { Loading } from '../../../../Helper/Loading'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { AstricSign } from '../../../../Helper/AstricSign'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function UpdateOrderTarget({ open, handleCloseClick, PopUpField, setPopUpField, handlePost, UserID, token, YearValue }) {

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
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_TalukaNameID : 0,
        Label: popupFlag === "Update" ? rowData?.talukaName : "Select..."
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.districtOfficerID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
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
        Label: popupFlag === "Update" ? rowData?.tragetAssignToUser : "Select..."
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
        dispatch(TalukaNameDDLAPI({ data }))
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

    const ClearFilter = () => {
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
            To: To
        }

        dispatch(OrderTargetDefineDataAPI({ data }))
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.OrderTargetDefineData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])


    const handleUpdate = () => {
        const data = {
            T_OrderTarget_AssingID: rowData?.t_OrderTarget_AssingID,
            M_FinancialYearID: 2022,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            OrderAssignToUserID: SalesTraineeDDL.m_UserID,
            M_DistrictNameID: '0',
            // M_TalukaNameID:TalukaDDL.ID,
            M_TalukaNameID: '0',
            AssignQty: IsAssignQty,
            M_UserID: UserID,
            token: token,
            Flag: 'Update',
            handlePost,
            handleCloseClick

        }
        dispatch(OrderTargetUpdatePostAPI({ data }))
    }

    const { isPostLoading } = useSelector(state => state.OrderTargetUpdatePost)

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
                                PopUpField={PopUpField}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <MonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthData={MonthData}
                                PopUpField={PopUpField}
                            />
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <ProductCategoryDataDDL
                                ProductCategoryDDL={ProductCategoryDDL}
                                setProductCategoryDDL={setProductCategoryDDL}
                                ProductCatDDLData={ProductCatDDLData}
                                PopUpField={PopUpField}
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
                                <> </>
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
                                        <DTVWiseEmployeeAssignDDL
                                            DTVWiseEmployeeDDL={TalukaDDL}
                                            setDTVWiseEmployeeDDL={setTalukaDDL}
                                            DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                            PopUpField={PopUpField}
                                            mandatory={false}
                                            name="Taluka Name"
                                        />
                                    </div> */}
                                </>
                        }

                        {/* <div className="col-12 col-lg-3 clear">
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
                                        <th style={{ textAlign: "center" }}>Crop Name </th>
                                        <th style={{ textAlign: "center" }}>Product Name </th>
                                        <th style={{ textAlign: "center" }}>Pack Size</th>
                                        <th style={{ textAlign: "center" }}>Total Quantity</th>
                                        <th style={{ textAlign: "center" }}> Assign Quantity </th>
                                        <th style={{ textAlign: "center" }}>Remaining Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => ( */}
                                    <tr style={{ textAlign: "center" }}>
                                        <td className="text-center">{rowData.rowNum}</td>
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
                                                        className="form-control p-0 px-2 text-center"
                                                        placeholder={rowData?.assingQuantity}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');

                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData.remainQTY) && parseInt(e.target.value) >= 0) {
                                                                    // handleQuantityInputChange(i, e)
                                                                    setAssignBtnValidation(false)
                                                                    setAssignBtnValidation1(false)
                                                                    setIsAssignQty(e.target.value)
                                                                    // setAssignQty(e.target.value)
                                                                }
                                                                else {
                                                                    setIsAssignQty('0')
                                                                    // handleDisableCheckbox(i, e)
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
                                                console.log((rowData?.totalQuantity))
                                            }
                                            {

                                                IsAssignQty == '0' ?
                                                    (rowData?.totalQuantity) - (rowData?.assingQuantity)
                                                    :
                                                    (rowData?.totalQuantity) - IsAssignQty
                                            }
                                        </td>


                                    </tr>
                                    {/* )) : <tr>No data</tr> */}
                                    {/* } */}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12  clear">
                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                onClick={() => handleUpdate()}
                                disabled={Validation}
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


