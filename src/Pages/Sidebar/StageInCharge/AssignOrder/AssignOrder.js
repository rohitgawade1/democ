import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import OrderTargetDecidePopUp from '../OrderTargetDecide/OrderTargetDecidePopUp'
import AssignOrderEditPopUp from './AssignOrderEditPopUp'
import { CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictEmployeeWiseAssignDDLAPI, DistrictNameDDLAPI, DistrictOfficerDDLAPI, EmployeeNameDDLAPI, MonthDDLAPI, ProductCategoryDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { CropNameDataDDL } from '../../../../Components/CommonDDL/CropNameDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { AssignOrderTargetExcelTableDataAPI, AssignOrderTargetTableDataAPI } from '../../../../Redux/StateInChargeSlice/AssignOrderTargetSlice'
import { Year } from '../../../../Helper/Year'
import { Loading } from '../../../../Helper/Loading'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { ExportAssignOrder } from './ExportAssignOrder'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import AssignOrderUpdatePopUp from './AssignOrderUpdatePopUp'
import { EmployeeNameDataDDL } from '../../../../Components/CommonDDL/EmployeeNameDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function AssignOrder() {
    const dispatch = useDispatch()
    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [YearValue, setYearValue] = useState(0)

    const [IsPost, setIsPost] = useState(false)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        assignPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        UpdatePopUp: false,
        rowData: ''
    })
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
    const [EmployeeNameDDL, setEmployeeNameDDL] = useState({
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
        // dispatch(MonthDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'AssignTarget' }))
        // dispatch(DistrictNameDDLAPI({ data, }))
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

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
    }, [CropTypeDDL.ID])

    // useEffect(() => {
    //     const data = { UserID, token }
    //     dispatch(EmployeeNameDDLAPI({ data }))
    // }, [])


    // const { EmployeeNameData } = useSelector(state => state.EmployeeNameDDLData)
    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    // const { MonthData } = useSelector(state => state.MonthDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { DistrictEmployeeWiseAssignData } = useSelector(state => state.DistrictEmployeeWiseAssignDDLData)
    
    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            ProductCategoryDDL: ProductCategoryDDL.ID,
            DistrictDDL: DistrictOfficerDDL.m_UserID,
            Year: YearValue,
            Flag: 'TargetAssign',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(AssignOrderTargetTableDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, ProductCategoryDDL.ID, DistrictOfficerDDL.m_UserID, From, YearValue])


    const { tableData, isLoading } = useSelector(state => state.AssignOrderTargetTableData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            ProductCategoryDDL: ProductCategoryDDL.ID,
            DistrictDDL: DistrictOfficerDDL.m_UserID,
            Year: YearValue,
            Flag: 'TargetAssign',
            From: From,
            To: '99999'
        }
        if (YearValue !== 0) {
            dispatch(AssignOrderTargetExcelTableDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, ProductCategoryDDL.ID, DistrictOfficerDDL.m_UserID, From, YearValue])

    const { ExceltableData, isExcelLoading } = useSelector(state => state.AssignOrderTargetExcelTableData)

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleDeleteData = () => {
        handleDeleteCloseClick()
        // dispatch(CropNameDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Add" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, UpdatePopUp: true, popupFlag: "Update", rowData: item })
    }

    const deleteButtonClick = () => {
        setPopUpField({ ...PopUpField, deletePopUp: true })
    }

    const ClearFilter = () => {
        setCurrentPage(0)
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
        setEmployeeNameDDL({
            ...EmployeeNameDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="assignorder" listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Assign Order Target</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}
                                                <button type="button" className="btn addBtn text-white mr-2 mt-2 mt-md-0 mt-lg-0 mx-2 waves-effect waves-light allBtn" style={{ float: "right" }}
                                                    onClick={() => addButtonClick()}
                                                >
                                                    Assign
                                                </button>

                                                {
                                                    isExcelLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        ExceltableData && ExceltableData.table && ExceltableData.table.length > 0 &&
                                                        <ExportAssignOrder
                                                            ExcelData={ExceltableData}
                                                            name='Assign Order Target'
                                                        />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow table-card mt-2 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-3">
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            {/* <MonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthData={MonthData}
                                                            /> */}
                                                            <SeasonWiseMonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                SeasonWiseMonthData={SeasonWiseMonthData}
                                                                mandatory={false}

                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <CropTypeDataDDL
                                                                CropTypeDDL={CropTypeDDL}
                                                                setCropTypeDDL={setCropTypeDDL}
                                                                CropTypeDDLData={CropTypeDDLData}
                                                            />
                                                        </div>
                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <CropNameDataDDL
                                                                CropNameDDL={CropNameDDL}
                                                                setCropNameDDL={setCropNameDDL}
                                                                CropNameDDLData={CropNameDDLData}
                                                            />
                                                        </div> */}

                                                        <div className="col-md-6 col-lg-3">
                                                            <ProductCategoryDataDDL
                                                                ProductCategoryDDL={ProductCategoryDDL}
                                                                setProductCategoryDDL={setProductCategoryDDL}
                                                                ProductCatDDLData={ProductCatDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-12 col-md-6 col-lg-4">
                                                            {/* <EmployeeNameDataDDL
                                                                EmployeeNameDDL={EmployeeNameDDL}
                                                                setEmployeeNameDDL={setEmployeeNameDDL}
                                                                EmployeeNameData={EmployeeNameData}
                                                            /> */}
                                                            <DistrictOfficerDataDDL
                                                                DistrictOfficerDDL={DistrictOfficerDDL}
                                                                setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                                DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                                mandatory={false}
                                                            />
                                                        </div>
                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <DTVWiseEmployeeAssignDDL
                                                                DTVWiseEmployeeDDL={DistrictDDL}
                                                                setDTVWiseEmployeeDDL={setDistrictDDL}
                                                                DTVEmployeeWiseAssignData={DistrictEmployeeWiseAssignData}
                                                                mandatory={false}
                                                                name="District"
                                                            />
                                                        </div> */}
                                                        <div className="col-12 ps-0 col-lg-1 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => addButtonClick()}
                                                            >
                                                                Assign
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn float-start"
                                                                onClick={ClearFilter}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                        {/* <div className='row'> */}
                                                        {/* <div className="col-12 col-lg-4 text-end mt-lg-4 pt-2">
                                                          
                                                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Financial Total (Rs) :- 00  </span>

                                                        </div> */}

                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        {/* <th style={{ textAlign: "center", width: "5%" }}>#</th> */}
                                                        <th>Sr.No.</th>
                                                        <th>Season</th>
                                                        <th>Month</th>
                                                        {/* <th>District</th> */}
                                                        <th>District Officer Name</th>
                                                        {/* <th>Crop Type</th> */}
                                                        <th>Crop Name</th>
                                                        <th>Product Name</th>
                                                        <th>Pack Size</th>
                                                        <th>Assigned <br/> Quantity (Nos) </th>
                                                        <th>Financial <br/> Target (Rs)</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item?.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                {/* <td>{item?.districtName}</td> */}
                                                                <td>{item?.districtOfficerName}</td>
                                                                {/* <td>{item?.cropTypeName}</td> */}
                                                                <td>{item?.cropName}</td>
                                                                <td>{item?.product_Name}</td>
                                                                <td>{item?.packingSize}</td>
                                                                <td >{item?.assingQuantity}</td>
                                                                <td>{item?.assignTotalAmt.toFixed(2)}</td>

                                                                <td>
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
                                                                    <span className='tableIcon'
                                                                        onClick={() => deleteButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )) : <tr>No data</tr>
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
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
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {
                PopUpField.addPopUp ? <AssignOrderEditPopUp
                    open={PopUpField.addPopUp}
                    handleCloseClick={handleCloseClick}
                    PopUpField={PopUpField}
                    setPopUpField={setPopUpField}
                    UserID={UserID}
                    token={token}
                    handleIsPost={handlePost}
                    YearValue={YearValue}
                /> : <></>
            }

            {
                PopUpField.UpdatePopUp ?
                    <AssignOrderUpdatePopUp
                        open={PopUpField.UpdatePopUp}
                        handleCloseClick={handleCloseClick}
                        PopUpField={PopUpField}
                        setPopUpField={setPopUpField}
                        UserID={UserID}
                        token={token}
                        handleIsPost={handlePost}
                        YearValue={YearValue}
                    /> : <></>
            }

            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleDeleteCloseClick={handleDeleteCloseClick} handleDeleteData={handleDeleteData} /> : <></>
            }

        </>
    )
}
