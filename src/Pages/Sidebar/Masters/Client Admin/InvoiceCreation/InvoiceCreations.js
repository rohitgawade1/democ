import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import moment from "moment";
import DeletePopUp from '../../../../../Components/Common/DeletePopUp';
import InvoiceCreationPopup from './InvoiceCreationPopup';
import Header from '../../../../../Components/Header/Header';
import Sidebar from '../../../../../Components/Sidebar/Sidebar';
import { useAuthState } from '../../../../../Helper/Context';
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import InvoiceCreatePopUp from '../../../../Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoiceCreate/InvoiceCreatePopUp';
import CreateActionPopUp from '../../../../Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoicePending/CreateActionPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { DealerNameDDLAPI, DeptDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, OfficerNameDDLAPI, SeasonDDLAPI, StateNameDDLAPI, StatusDDLAPI, TalukaNameDDLAPI } from '../../../../../Redux/DDLSlice';
import { ApprovalOrderExportTableDataAPI, ApprovalOrderTableDataAPI } from '../../../../../Redux/StateInChargeSlice/ApprovalOrderSlice';
import { SeasonDataDDL } from '../../../../../Components/CommonDDL/SeasonDataDDL';
import { DistrictNameDataDDL } from '../../../../../Components/CommonDDL/DistrictNameDataDDL';
import { Pegination } from '../../../../../Components/Pegination/Pegination';
import { StateNameDataDDL } from '../../../../../Components/CommonDDL/StateNameDataDDL';
import { InvoiceCreationExportExcel } from './InvoiceCreationExportExcel';
import { Loading } from '../../../../../Helper/Loading';
import { useSearchParams } from 'react-router-dom';
import { AstricSign } from '../../../../../Helper/AstricSign';
import { OfficerNameDataDDL } from '../../../../../Components/CommonDDL/OfficerNameDataDDL';
import ProductDetailsPopUp from '../../../StageInCharge/ApprovalOrder/ProductDetailsPopUp';

export default function InvoiceCreations() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()


    const [searchParams] = useSearchParams()
    let ScreenName = searchParams.get("ScreenName")
    // let Flag = searchParams.get("Flag")
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
        createActionPopUp: ''

    })

    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
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

    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [StatusDDL, setStatusDDL] = useState({
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
    const [OfficerNameDDL, setOfficerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [InvoiceCreationTextField, setInvoiceCreationTextField] = useState(
        {
            invoiceNumber: '',
            invoiceDate: '',

        }
    )

    const handleInputChange = (e) => {
        setInvoiceCreationTextField({ ...InvoiceCreationTextField, [e.target.name]: e.target.value })
    }
    const [ApprovedRejectPopUp, setApprovedRejectPopUp] = React.useState()
    const [ProductDetailsPopUpHeading, setProductDetailsPopUpHeading] = useState()
    const [createActionPopUp, setcreateActionPopUp] = React.useState()

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setDate('')
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        })
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select...",
        })

        setMonthDDL({
            ...MonthDDL,
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
        setOfficerNameDDL({
            ...OfficerNameDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const productDetailsPopUpClick = (item) => {
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: true, rowData: item })
    }

    const handleClosePopUpClick = (item) => {
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: false, rowData: item })
    }
    const CreatePopUpClick = (item) => {
        setPopUpField({ ...PopUpField, createActionPopUp: true, rowData: item })
    }
    const handleCloseClick = (item) => {
        setPopUpField({ ...PopUpField, createActionPopUp: false, rowData: item })
    }


    useEffect(() => {
        const data = {
            UserID,
            token,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(StateNameDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [])

    const { StateDDLData } = useSelector(state => state.StateNameDDL)

    useEffect(() => {
        const data = {
            UserID,
            token,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(SeasonDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [])
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)


    // ----Month DDL -------

    useEffect(() => {
        const data = {
            UserID,
            token,
            SeasonDDL,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(MonthDDLAPI({ data, Flag: 'InvoiceCreation' }))
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


    useEffect(() => {
        const data = {
            UserID,
            token,
            StateDDL,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(DistrictNameDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [StateDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        const data = { UserID, token, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

    useEffect(() => {
        const data = {
            UserID,
            token,
            TalukaDDL,
            DistrictDDL,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(DealerNameDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [TalukaDDL.ID, DistrictDDL.ID])

    const { DealerNameDDLData } = useSelector(state => state.DealerNameDDLData)

    useEffect(() => {
        handleDelearNameDDL()
    }, [DealerNameDDLData])

    const handleDelearNameDDL = () => {
        // console.log(DealerNameDDLData)
        if (DealerNameDDLData && DealerNameDDLData.table && DealerNameDDLData.table.length > 0) {
            let list = DealerNameDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_DealerID,
                label: item.dealerName,
            }))

            setDealerDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDealerDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = {
            UserID,
            token,
            DistrictDDL,
            ShowBy: 'Web',
            ScreenName: ScreenName
        }
        dispatch(OfficerNameDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [DistrictDDL.ID])

    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)
    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_SeasonID:SeasonDDL.ID,
            M_StateID:StateDDL.ID,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            InvoiceNumber: InvoiceCreationTextField?.invoiceNumber,
            InvoiceDate: InvoiceCreationTextField?.invoiceDate,
            M_StatusID: StatusDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'Admin_InvoiceCreation'
        }
        if (YearValue !== 0) {
            dispatch(ApprovalOrderTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch,SeasonDDL.ID,StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID, Date, YearValue])

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_SeasonID:SeasonDDL.ID,
            M_StateID:StateDDL.ID,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            InvoiceNumber: InvoiceCreationTextField?.invoiceNumber,
            InvoiceDate: InvoiceCreationTextField?.invoiceDate,
            M_StatusID: StatusDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'Admin_InvoiceCreation'
        }
        if (YearValue !== 0) {
            dispatch(ApprovalOrderExportTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch,SeasonDDL.ID,StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID, Date, YearValue])


    const { tableData, isLoading } = useSelector(state => state.ApprovalOrderTableData)
    const { ApprovalOrderExportTableData, isExportLoading } = useSelector(state => state.ApprovalOrderExportTableData)

    // const handleApproved = () => {
    //     const data = {
    //         T_OrderPunchID: PopUpField.rowData?.t_OrderPunchID,
    //         M_FinancialYearID: YearValue,
    //         M_MonthID: '0',
    //         Remark: '',
    //         M_UserID: UserID,
    //         token: token,
    //         Flag: "Ack",
    //         handlePost: handlePost,
    //         handleAddCloseClick: handleAddCloseClick
    //     }
    //     dispatch(ApprovalOrderApprovedRejectAPI({ data }))
    // }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active='InvoiceCreations' listActive="invoice" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">{ScreenName}</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}
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
                                                        <InvoiceCreationExportExcel
                                                            ExcelData={ApprovalOrderExportTableData}
                                                            name='Invoice Creation'
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

                                                        <div className="col-md-6 col-lg-2">
                                                            <StateNameDataDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDDLData={StateDDLData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month<AstricSign /></label>
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
                                                            <OfficerNameDataDDL
                                                                OfficerNameDDL={OfficerNameDDL}
                                                                setOfficerNameDDL={setOfficerNameDDL}
                                                                OfficerNameDDLData={OfficerNameDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Name</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DealerDDL.ID, label: DealerDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDealerDDL({ ...DealerDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDealerDDL({ ...DealerDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DealerDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Invoice Date </label>
                                                                <input
                                                                    type="date"
                                                                    className='form-control'
                                                                    name='invoiceDate'
                                                                    value={InvoiceCreationTextField.invoiceDate}
                                                                    onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Invoice No</label>
                                                                <input
                                                                    type="text"
                                                                    className='form-control'
                                                                    name='invoiceNumber'
                                                                    value={InvoiceCreationTextField.invoiceNumber}
                                                                    onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div>


                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Order Date</label>
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
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Status</label>
                                                                <Select
                                                                    isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: StatusDDL.ID, label: StatusDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setStatusDDL({ ...StatusDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setStatusDDL({ ...StatusDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={StatusDDL.DDL}
                                                                />
                                                            </div>
                                                        </div> */}
                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleSearch}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleClear}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>State</th>
                                                        <th>Season</th>
                                                        <th>District</th>
                                                        <th>Invoice No</th>
                                                        <th>Invoice Date</th>
                                                        <th>Order Date/Order No</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Quantity</th>
                                                        <th>Order Amount (Rs)</th>
                                                        <th>Officer Name</th>
                                                        <th>Order Book</th>
                                                        <th>Document</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.stateName ? item.stateName : '-'}</td>
                                                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                                                <td>{item.districtName ? item.districtName : '-'}</td>
                                                                <td>
                                                                    {item.invoiceNumber ? item.invoiceNumber : '-'}
                                                                </td>
                                                                <td>
                                                                    {item.invoiceDate ? moment(item.invoiceDate).format("DD-MM-YYYY") : '-'}
                                                                </td>
                                                                <td>
                                                                    {item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}
                                                                    < hr style={{ color: "#172b4d" }} />
                                                                    {item.orderNumber ? item.orderNumber : '-'}
                                                                </td>

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

                                                                <td>{item.orderAmt ? item.orderAmt : '-'}</td>

                                                                <td>
                                                                    {item.employeeName ? item.employeeName : '-'}</td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    {
                                                                        <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                            <i class="fa-solid fa-file-pdf" style={{ fontSize: '1.3rem', color: 'red', cursor: 'pointer' }}
                                                                                onClick={() => {
                                                                                    window.open(item.orderPunchPdf ? item.orderPunchPdf : 'ImageNotFound')
                                                                                }}>

                                                                            </i>
                                                                        </a>
                                                                    }

                                                                </td>

                                                                <td style={{ textAlign: 'center' }}>
                                                                    {
                                                                        <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                            <i class="fa fa-file " title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                                                                onClick={() => {
                                                                                    window.open(item.invoiceDocument ? item.invoiceDocument : 'ImageNotFound')
                                                                                }}
                                                                            ></i>
                                                                        </a>

                                                                    }
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

            {/* {
                PopUpField.addPopUp ? <InvoiceCreationPopup open={PopUpField.addPopUp} handleAddCloseClick={handleAddCloseClick} PopUpField={PopUpField} handlePost={handlePost} /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleDeleteCloseClick={handleDeleteCloseClick} /> : <></>
            } */}

            {/* {
                invoiceCreatePopUp ? <InvoiceCreatePopUp
                    open={invoiceCreatePopUp}
                    handleCloseClick={handleCloseClick}
                /> : <></>
            } */}

            {
                PopUpField.ApprovedRejectPopUp ?
                    <ProductDetailsPopUp
                        open={PopUpField.ApprovedRejectPopUp}
                        handleCloseClick={handleClosePopUpClick}
                        ProductDetailsPopUpHeading='Product Details'
                        PopUpField={PopUpField}
                        Flag='Admin_Received'
                    // Flag={Flag === 'State_Received' ? 'State_Received' : Flag === 'State_Approval' ? 'State_Approval' :'State_Rejected'}
                    /> : <></>
            }
            {
                PopUpField.createActionPopUp ? <CreateActionPopUp
                    open={PopUpField.createActionPopUp}
                    handleCloseClick={handleCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                    YearValue={YearValue}

                /> : <></>
            }

        </>
    )
}
