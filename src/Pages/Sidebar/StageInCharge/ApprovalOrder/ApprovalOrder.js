import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import moment from "moment";
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import RejectApprovalOrder from './RejectApprovalOrder'
import ApprovalOrderPopUp from './ApprovalOrderPopUp'
import { useAuthState } from '../../../../Helper/Context'
import { DealerNameDDLAPI, DeptDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, MonthDDLAPI, ReceivedDealerNameDDLAPI, SeasonDDLAPI, StatusDDLAPI, TalukaNameDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { ApprovalOrderApprovedRejectAPI, ApprovalOrderExportTableDataAPI, ApprovalOrderTableDataAPI } from '../../../../Redux/StateInChargeSlice/ApprovalOrderSlice'
import { Pegination } from '../../../../Components/Pegination/Pegination';
import { ApprovalOrderExportExcel } from './ApprovalOrderExportExcel';
import { Loading } from '../../../../Helper/Loading';
import { AstricSign } from '../../../../Helper/AstricSign';
import { ReceivedDealearDDL } from '../../../../Components/CommonDDL/ReceivedDealearDDL';
import ProductDetailsPopUp from './ProductDetailsPopUp';

export default function ApprovalOrder() {
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let ScreenName = searchParams.get("ScreenName")
    let Flag = searchParams.get("Flag")
    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [Remark, setRemark] = useState("")
    const [Date, setDate] = useState('')
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: '',
        rejectPopUp: '',
        approvedRejFlag: '',
        Remark: '',
        ApprovedRejectPopUp: '',

    })

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [StatusDDL, setStatusDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",

    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DealerDDL, setDealerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [ApprovedRejectPopUp, setApprovedRejectPopUp] = React.useState()
    const [ProductDetailsPopUpHeading, setProductDetailsPopUpHeading] = useState()

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setDate('')
        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select...",
        })
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select...",
        })
        setStatusDDL({
            ...StatusDDL,
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
        setDealerDDL({
            ...DealerDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false, rejectPopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Insert", popupFlag: "Add", popupBtn: "Clear" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, approvedRejFlag: "Approved", popupFlag: "Update", popupBtn: "Cancel", rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const rejectButtonClick = (item) => {
        setPopUpField({ ...PopUpField, rejectPopUp: true, approvedRejFlag: "Rejected", rowData: item })
    }
    const productDetailsPopUpClick = (item) => {
        // setApprovedRejectPopUp(true) ApprovedRejectPopUp
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: true, rowData: item })
    }

    const handleClosePopUpClick = (item) => {
        // setApprovedRejectPopUp(false)
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: false, rowData: item })
    }
    const handleDeleteData = () => {
        // dispatch(CropNameDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.EmployeeDeleteData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
    }, [])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)

    // ----Month DDL -------

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { MonthData } = useSelector(state => state.MonthDDLData)

    useEffect(() => {
        handleMonthDDL()
    }, [MonthData])

    const handleMonthDDL = () => {
        if (MonthData && MonthData.table && MonthData.table.length > 0) {
            let list = MonthData.table.map((item, index) => ({
                value: item.id,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: 0,
                Label: "Select..."
            })
        }
        else {
            setMonthDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // ----------Department DDL--------
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DeptDDLAPI({ data }))
    }, [])

    const { DeptDDLDataa } = useSelector(state => state.DeptDDLData)

    useEffect(() => {
        handleDeptDDL()
    }, [DeptDDLDataa])

    const handleDeptDDL = () => {
        // console.log(DeptDDLDataa)
        if (DeptDDLDataa && DeptDDLDataa.table && DeptDDLDataa.table.length > 0) {
            let list = DeptDDLDataa.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.departmentName,
            }))

            setDeptDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDeptDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // ------------User Status DDL------------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StatusDDLAPI({ data }))
    }, [])

    const { StatusDDLData } = useSelector(state => state.StatusDDLData)

    useEffect(() => {
        handleUserDDL()
    }, [StatusDDLData])

    const handleUserDDL = () => {
        if (StatusDDLData && StatusDDLData.table && StatusDDLData.table.length > 0) {
            let list = StatusDDLData.table.map((item, index) => ({
                value: item.indicatorID,
                label: item.indicatorName,
            }))

            setStatusDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setStatusDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [])
    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        const data = { UserID, token, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

    useEffect(() => {
        const data = {
            UserID, token, TalukaDDL, DistrictDDL,
            // Flag: Flag
        }
        dispatch(DealerNameDDLAPI({ data, Flag: Flag }))
    }, [TalukaDDL.ID, DistrictDDL.ID, Flag])

    const { DealerNameDDLData } = useSelector(state => state.DealerNameDDLData)
    // console.log(Flag)

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_SeasonID: SeasonDDL.ID,
            M_StateID: 0,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            InvoiceNumber: '',
            InvoiceDate: '',
            M_StatusID: StatusDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: Flag
            // Flag: Flag === 'State_Received' ? 'State_Received' : Flag === 'State_Approval' ? 'State_Approval' : 'State_Rejected'
        }
        if (YearValue !== 0) {
            dispatch(ApprovalOrderTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, SeasonDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID, YearValue, Flag])

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_SeasonID: SeasonDDL.ID,
            M_StateID: 0,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            InvoiceNumber: '',
            InvoiceDate: '',
            M_StatusID: StatusDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: Flag
        }
        if (YearValue !== 0) {
            dispatch(ApprovalOrderExportTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, SeasonDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID, YearValue])


    const { tableData, isLoading } = useSelector(state => state.ApprovalOrderTableData)
    const { ApprovalOrderExportTableData, isExportLoading } = useSelector(state => state.ApprovalOrderExportTableData)

    const handleApproved = () => {
        const data = {
            T_OrderPunchID: PopUpField.rowData?.t_OrderPunchID,
            M_FinancialYearID: YearValue,
            M_MonthID: '0',
            Remark: '',
            M_UserID: UserID,
            token: token,
            Flag: "Ack",
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalOrderApprovedRejectAPI({ data }))
    }

    const handleReject = () => {
        const data = {
            T_OrderPunchID: PopUpField.rowData?.t_OrderPunchID,
            M_FinancialYearID: YearValue,
            M_MonthID: '0',
            Remark: Remark,
            M_UserID: UserID,
            token: token,
            Flag: 'Reject',
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalOrderApprovedRejectAPI({ data }))
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active={ScreenName} listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">{ScreenName} Order</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        ApprovalOrderExportTableData && ApprovalOrderExportTableData.table && ApprovalOrderExportTableData.table.length > 0 &&
                                                        <ApprovalOrderExportExcel
                                                            ExcelData={ApprovalOrderExportTableData}
                                                            name='Approval Order'
                                                        />
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow table-card mt-1 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-3">
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month <AstricSign /></label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={MonthDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DistrictNameDataDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDDLData={DistrictDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Officer Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                // value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                                                                // onChange={(e) => {
                                                                //     e ?
                                                                //         setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                                                                //         :
                                                                //         setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                                                                // }}
                                                                // options={MonthDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-4">
                                                            <ReceivedDealearDDL
                                                                DealerDDL={DealerDDL}
                                                                setDealerDDL={setDealerDDL}
                                                                DealerNameDDLData={DealerNameDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment"> Order Date </label>
                                                                <input
                                                                    className="form-control"
                                                                    id="Date"
                                                                    type="date"
                                                                    name="Date"
                                                                    value={Date}
                                                                    onChange={(e) => setDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <TalukaNameDataDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDDLData={TalukaDDLData}
                                                            />
                                                        </div> */}

                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleClear()}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            {
                                                ScreenName === "Received" && Flag === "State_Received" ?
                                                    <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.No.</th>
                                                                <th>District</th>
                                                                <th>Dealer Name</th>
                                                                <th>Order Received Date</th>
                                                                <th>Product Quantity</th>
                                                                <th>Order Amount (Rs)</th>
                                                                <th>Officer Name</th>


                                                                {/* {
                                                            ScreenName === 'Rejected' ?
                                                                <th>Rejected Remark</th>
                                                                :
                                                                ''
                                                        } */}
                                                                {/* {
                                                            ScreenName === 'Received' ? */}
                                                                <th>Action</th>
                                                                {/* :
                                                                ''
                                                        } */}

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                                                        <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                        <td>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            <span
                                                                                title='Click'
                                                                                className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                onClick={() => productDetailsPopUpClick(item)}
                                                                            >
                                                                                {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                            </span>
                                                                        </td>
                                                                        <td>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                                                        <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                        {/* {
                                                                    ScreenName === 'Rejected' ?
                                                                        <td>-</td>
                                                                        :
                                                                        ''
                                                                } */}
                                                                        {/* {
                                                                    ScreenName === 'Received' ? */}
                                                                        <td>
                                                                            <span className='tableIcon'
                                                                                onClick={() => editButtonClick(item)}
                                                                            >
                                                                                <i class="fa-solid fa-circle-check px-1" title='Approved' style={{ cursor: "pointer", color: "green", fontSize: "18px", marginTop: "4px" }} aria-hidden="true"></i>

                                                                                {/* <i className="fa fa-pencil-square-o" aria-hidden="true"></i> */}
                                                                            </span>
                                                                            <span className='tableIcon'
                                                                                onClick={() => rejectButtonClick(item)}
                                                                            >
                                                                                <i class="fa-solid fa-circle-xmark" title='Approved' style={{ cursor: "pointer", color: "red", fontSize: "18px", marginTop: "4px" }}></i>
                                                                            </span>
                                                                        </td>
                                                                        {/* :
                                                                        ''
                                                                } */}

                                                                    </tr>
                                                                )) : <tr>No data</tr>
                                                            }

                                                        </tbody>
                                                    </table>
                                                    :
                                                    ScreenName === "Approved" && Flag === "State_Approval" ?
                                                        <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No.</th>
                                                                    <th>Order Date</th>
                                                                    <th>Order No</th>
                                                                    <th>District</th>
                                                                    <th>Dealer Name</th>
                                                                    <th>Product Quantity</th>
                                                                    <th>Order Amount (Rs)</th>
                                                                    <th>Officer Name</th>
                                                                    <th>Order Book</th>
                                                                    {/* <th>Action</th> */}

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                            <td>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                                                            <td>{item.orderNumber ? item.orderNumber : '-'}</td>
                                                                            <td>{item.districtName ? item.districtName : '-'}</td>
                                                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                            <td style={{ textAlign: 'center' }} >
                                                                                <span
                                                                                    title='Click'
                                                                                    className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                    onClick={() => productDetailsPopUpClick(item)}
                                                                                >
                                                                                    {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                                </span>
                                                                            </td>
                                                                            <td>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                                                            <td>{item.employeeName ? item.employeeName : '-'}</td>

                                                                            <td style={{ textAlign: 'center' }}>
                                                                                {
                                                                                    <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                                        <i class="fa-solid fa-file-pdf" style={{ fontSize: '1.3rem', color: 'red', cursor: 'pointer' }}
                                                                                            onClick={() => {
                                                                                                window.open(item.orderPunchPdf ? item.orderPunchPdf : 'ImageNotFound')
                                                                                            }}
                                                                                        ></i>
                                                                                    </a>
                                                                                }
                                                                            </td>

                                                                            {/* {
                                                                    ScreenName === 'Rejected' ?
                                                                        <td>-</td>
                                                                        :
                                                                        ''
                                                                } */}
                                                                        </tr>
                                                                    )) : <tr>No data</tr>
                                                                }

                                                            </tbody>
                                                        </table>
                                                        : ScreenName === "Rejected" && Flag === "State_Rejected" ?
                                                            <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Sr.No.</th>
                                                                        <th>District</th>
                                                                        <th>Dealer Name</th>
                                                                        <th>Product Quantity</th>
                                                                        {/* <th>Order Received Date</th> */}
                                                                        <th>Order Amount (Rs)</th>
                                                                        <th>Officer Name</th>
                                                                        <th>Reject Remark</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                                            <tr key={i}>
                                                                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                                <td>{item.districtName ? item.districtName : '-'}</td>
                                                                                <td>{item.dealerName ? item.dealerName : '-'}</td>


                                                                                <td style={{ textAlign: 'center' }}>
                                                                                    <span
                                                                                        title='Click'
                                                                                        className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                        onClick={() => productDetailsPopUpClick(item)}
                                                                                    >
                                                                                        {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                                    </span>
                                                                                </td>
                                                                                <td>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                                <td>{item.remark ? item.remark : '-'}</td>
                                                                                {/* {
                                                                    ScreenName === 'Rejected' ?
                                                                        <td>-</td>
                                                                        :
                                                                        ''
                                                                } */}
                                                                            </tr>
                                                                        )) : <tr>No data</tr>
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            :
                                                            ''
                                            }


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
            </main >
            {
                PopUpField.addPopUp ? <ApprovalOrderPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handleApproved={handleApproved}

                /> : <></>
            }
            {
                PopUpField.rejectPopUp ? <RejectApprovalOrder
                    open={PopUpField.rejectPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handleReject={handleReject}
                    Remark={Remark}
                    setRemark={setRemark}
                /> : <></>
            }

            {
                PopUpField.ApprovedRejectPopUp ?
                    <ProductDetailsPopUp
                        open={PopUpField.ApprovedRejectPopUp}
                        handleCloseClick={handleClosePopUpClick}
                        ProductDetailsPopUpHeading='Product Details'
                        PopUpField={PopUpField}
                        Flag='State_Approval'
                    // Flag={Flag === 'State_Received' ? 'State_Received' : Flag === 'State_Approval' ? 'State_Approval' :'State_Rejected'}
                    /> : <></>
            }
        </>
    )
}


