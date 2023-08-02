import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import Header from "../../../../Components/Header/Header";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import InvoiceGeneratePopUp from "../../../Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoiceGenerate/InvoiceGeneratePopUp";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import QuantityPopUpCommon from "../../../Private/DashBoard/DashboardPages/DCStoreTable/QuantityPopUpCommon";
import { AstricSign } from "../../../../Helper/AstricSign";
import { DealerNameDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, OfficerNameDDLAPI, SeasonDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI } from "../../../../Redux/DDLSlice";
import { ApprovalOrderExportTableDataAPI, ApprovalOrderTableDataAPI } from "../../../../Redux/StateInChargeSlice/ApprovalOrderSlice";
import { StateNameDataDDL } from "../../../../Components/CommonDDL/StateNameDataDDL";
import { SeasonDataDDL } from "../../../../Components/CommonDDL/SeasonDataDDL";
import { DistrictNameDataDDL } from "../../../../Components/CommonDDL/DistrictNameDataDDL";
import { OfficerNameDataDDL } from "../../../../Components/CommonDDL/OfficerNameDataDDL";
import { useAuthState } from "../../../../Helper/Context";
import { useDispatch, useSelector } from "react-redux";
import { Pegination } from "../../../../Components/Pegination/Pegination";
import { DcForwarderStoreHodExportTableDataAPI, DcForwarderStoreHodTableDataAPI } from "../../../../Redux/StockSlice/DcForwardedStoreHodSlice";
import DispatchPop from "../../StoreHead/ReceivedInvoice/DispatchPop";
import { Loading } from "../../../../Helper/Loading";


export default function DcReceivedAkolaHod() {

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
    const [InvoiceDate, setInvoiceDate] = useState('')
    const [InvoiceNo, setInvoiceNo] = useState('')
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
        ProductDetailsPopUp: '',
        ForwardGeneratePopUp: '',
        DispatchGeneratePopUp: '',

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
    const [StoreNameDDL, setStoreNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })


    const [forwardGeneratePop, setForwardGeneratePop] = useState()
    const [dispatchGeneratePop, setDispatchGeneratePop] = useState()

    // const quantityPopUpClick = () => {
    //   setinvoiceGeneratePopUp(true);
    // };

    const handleForwardPop = () => {
        setForwardGeneratePop(true)
    }

    const handleDispatchPop = () => {
        setDispatchGeneratePop(true)
    }

    // const handleCloseClick = () => {
    //   setinvoiceGeneratePopUp(false);
    //   setForwardGeneratePop(false)
    //   setDispatchGeneratePop(false)
    // };

    const handleForwardClose = () => {

    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setCurrentPage(0)
        setIsClear(!IsClear)
        setInvoiceDate('')
        setInvoiceNo('')
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
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const productDetailsPopUpClick = (item) => {
        setPopUpField({ ...PopUpField, ProductDetailsPopUp: true, rowData: item })
    }

    const handleClosePopUpClick = (item) => {
        setPopUpField({ ...PopUpField, ProductDetailsPopUp: false, rowData: item })
    }
    const handleDispatchPopUp = (item) => {
        setPopUpField({ ...PopUpField, DispatchGeneratePopUp: true, rowData: item })
    }
    const handleDispatchClosePopUp = (item) => {
        setPopUpField({ ...PopUpField, DispatchGeneratePopUp: false, rowData: item })
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
            TalukaDDL,
            DistrictDDL,
            ShowBy: 'Web',
            // ScreenName: ScreenName,
            DistrictDDL
        }
        dispatch(OfficerNameDDLAPI({ data, Flag: 'InvoiceCreation' }))
    }, [DistrictDDL.ID])

    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            M_StatusID: StatusDDL.ID,
            InvoiceNumber: InvoiceNo,
            InvoiceDate: InvoiceDate,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'SubStore_Receive'
        }
        if (YearValue !== 0) {
            dispatch(DcForwarderStoreHodTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, SeasonDDL.ID, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID,YearValue])

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_DealerID: DealerDDL.ID,
            M_StatusID: StatusDDL.ID,
            InvoiceNumber: InvoiceNo,
            InvoiceDate: InvoiceDate,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: 'SubStore_Receive'
        }
        if (YearValue !== 0) {
            dispatch(DcForwarderStoreHodExportTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, SeasonDDL.ID, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, DealerDDL.ID,YearValue])


    const { tableData, isLoading } = useSelector(state => state.DcForwarderStoreHodTableData)
    const { ForwardStoreExportTableData, isExportLoading } = useSelector(state => state.DcForwarderStoreHodExportTableData)

    return (
        <>
        {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active='DcReceivedAkolaHod' />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40">
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">
                                                    {" "}
                                                    {/* {`${ScreenName}`}{" "} */}
                                                    DC Received
                                                </h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="totalordergenerated"
                                                    filename="data"
                                                    sheet="data"
                                                    pageOrientation="Landscape"
                                                    buttonText="Export"
                                                    style={{ borderColor: "black" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow table-card mt-1 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className="filter-bg p-2">
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
                                                                    // isClearable
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
                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Invoice No</label>
                                                                <input
                                                                    type="text"
                                                                    className='form-control'
                                                                    name='InvoiceNo'
                                                                    value={InvoiceNo}
                                                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Invoice Date </label>
                                                                <input
                                                                    type="date"
                                                                    className='form-control'
                                                                    name='InvoiceDate'
                                                                    value={InvoiceDate}
                                                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label
                                                                    className="d-block"
                                                                    htmlFor="NameofDepartment"
                                                                >
                                                                    Store Name
                                                                </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: StoreNameDDL.ID, label: StoreNameDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setStoreNameDDL({ ...StoreNameDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setStoreNameDDL({ ...StoreNameDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={StoreNameDDL.DDL}
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
                                                        <div className="col-12 col-lg-2 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
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
                                            <table
                                                id="totalordergenerated"
                                                cellPadding="0"
                                                cellSpacing="0"
                                                border="0"
                                                className="table table-bordered"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Sr.No.
                                                        </th>
                                                        <th>State</th>
                                                        <th>Season</th>
                                                        <th>District</th>
                                                        {/* <th>Dc Date</th>
                                                        <th>Dc No.</th> */}
                                                        <th>invoice Date
                                                        < hr style={{ color: "#ffff" }} />
                                                            invoice No</th>
                                                        <th>Order Date
                                                        < hr style={{ color: "#ffff" }} />
                                                            Order No</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Details</th>
                                                        <th>Order Amount (Rs)</th>
                                                        <th>Officer Name</th>
                                                        <th>Order Book</th>
                                                        <th>Invoice Document</th>
                                                        <th>Action</th>

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
                                                                {/* <td>-</td>
                                                                <td>-</td> */}
                                                                <td>
                                                                    {item.invoiceDate ? moment(item.invoiceDate).format("DD-MM-YYYY") : '-'}
                                                                    < hr style={{ color: "#172b4d" }} />
                                                                    {item.invoiceNumber ? item.invoiceNumber : '-'}
                                                                </td>
                                                                <td>
                                                                    {item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}
                                                                    < hr style={{ color: "#172b4d" }} />
                                                                    {item.orderNumber ? item.orderNumber : '-'}
                                                                </td>

                                                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    <span
                                                                        className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                        // onClick={() => productDetailsPopUpClick(item)}
                                                                        onClick={() => productDetailsPopUpClick()}
                                                                    >
                                                                        {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                    </span>
                                                                </td>

                                                                <td>{item.orderAmt ? item.orderAmt : '-'}</td>

                                                                <td> {item.employeeName ? item.employeeName : '-'}</td>
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

                                                                <td className="p-1">
                                                                    <span onClick={() => handleDispatchPopUp(item)}>
                                                                        <i
                                                                            title="Dispatch"
                                                                            class="fa-solid fa-right-from-bracket mx-2 "
                                                                            style={{ cursor: "pointer", fontSize: "1rem" }}
                                                                        ></i>
                                                                    </span>
                                                                </td>

                                                                {/* <td align="center">
                                                                    {
                                                                        <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                            <i class="fa fa-file " title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                                                                onClick={() => {
                                                                                    window.open(item.invoiceDocument ? item.invoiceDocument : 'ImageNotFound')
                                                                                }}
                                                                            ></i>
                                                                        </a>
                                                                    }
                                                                </td> */}

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

            {PopUpField.ProductDetailsPopUp ? (
                <QuantityPopUpCommon
                    open={PopUpField.ProductDetailsPopUp}
                    handleCloseClick={handleClosePopUpClick}
                    QuantityPopUpHeading="Total Order generated Quantity"
                />
            ) : (
                <></>
            )}

            {
                PopUpField.DispatchGeneratePopUp ?
                    <DispatchPop
                        open={PopUpField.DispatchGeneratePopUp}
                        PopUpField={PopUpField}
                        handleCloseClick={handleDispatchClosePopUp}
                        handlePost={handlePost}
                        QuantityPopUpHeading="Dispatch"
                    />
                    :
                    <></>
            }


        </>
    );
}
