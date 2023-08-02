import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import moment from "moment";
import Header from '../../../../../../Components/Header/Header'
import Sidebar from '../../../../../../Components/Sidebar/Sidebar'
import InvoiceGeneratePopUp from '../../InvoicesAdminTable/InvoiceGenerate/InvoiceGeneratePopUp'
import QuantityPopUpCommon from '../QuantityPopUpCommon'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { AstricSign } from '../../../../../../Helper/AstricSign'
import { useAuthState } from '../../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DealerNameDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, InvoiceNumberDashboardDDLAPI, MonthDDLAPI, MonthDashboardDDLAPI, OfficerNameDDLAPI, SeasonDDLAPI, SeasonDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, StoreNameDDLAPI } from '../../../../../../Redux/DDLSlice'
import { StateNameDataDDL } from '../../../../../../Components/CommonDDL/StateNameDataDDL'
import { SeasonDataDDL } from '../../../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../../../Components/CommonDDL/MonthDataDDL'
import { DistrictNameDataDDL } from '../../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { DCCreatedStoreTableDataAPI } from '../../../../../../Redux/DashboardSlice/DCCreatedStoreSlice'
import { StateDashboardDDL } from '../../../../../../Components/CommonDDL/StateDashboardDDL'
import { SeasonDashboardDDL } from '../../../../../../Components/CommonDDL/SeasonDashboardDDL'
import { MonthDashboardDDL } from '../../../../../../Components/CommonDDL/MonthDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { OfficerNameDataDDL } from '../../../../../../Components/CommonDDL/OfficerNameDataDDL'
import { ReceivedDealearDDL } from '../../../../../../Components/CommonDDL/ReceivedDealearDDL'
import { InvoiceNumberDashboardDDL } from '../../../../../../Components/CommonDDL/InvoiceNumberDashboardDDL'
import { StoreNameDataDDL } from '../../../../../../Components/CommonDDL/StoreNameDataDDL'
import { Loading } from '../../../../../../Helper/Loading';


export default function TotalOrderGenerated() {

    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")
    let ApiFlag = searchParams.get("ApiFlag")
    let DDLFlag = searchParams.get("DDLFlag")
    // console.log(ApiFlag)

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
    const [YearValue, setYearValue] = useState(0)
    const [DCDate, setDCDate] = useState('')
    const [InvoiceDate, setInvoiceDate] = useState('')
    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        invoiceGeneratePopUp: false,
    });

    const [QuantityPopUpHeading, setQuantityPopUpHeading] = useState()

    const [invoiceGeneratePopUp, setinvoiceGeneratePopUp] = React.useState()

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

    const [OfficerNameDDL, setOfficerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DealerDDL, setDealerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [InvoiceNumberDDL, setInvoiceNumberDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [StoreNameDDL, setStoreNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const quantityPopUpClick = (item) => {
        // setApprovedRejectPopUp(true) ApprovedRejectPopUp
        setPopUpField({ ...PopUpField, invoiceGeneratePopUp: true, rowData: item })
    }

    const handleCloseClick = (item) => {
        // setApprovedRejectPopUp(false)
        setPopUpField({ ...PopUpField, invoiceGeneratePopUp: false, rowData: item })
    }

    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [YearValue])

    useEffect(() => {
        const data = {
            UserID,
            token,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        };
        if (YearValue !== 0) {
            dispatch(SeasonDashboardDDLAPI({ data, Flag: DDLFlag }));
        }
    }, [YearValue]);

    useEffect(() => {
        const data = {
            UserID,
            token,
            SeasonDDL,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        };
        if (YearValue !== 0) {
            dispatch(MonthDashboardDDLAPI({ data, Flag: DDLFlag }));
        }
    }, [SeasonDDL.ID, YearValue]);

    useEffect(() => {
        const data = {
            StateDDL,
            UserID,
            token,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        }
        if (YearValue !== 0) {
            dispatch(DistrictDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [StateDDL.ID, YearValue])

    useEffect(() => {
        const data = {
            UserID, token, DistrictDDL,
            // Flag: Flag
        }
        dispatch(DealerNameDDLAPI({ data, Flag: ApiFlag }))
    }, [DistrictDDL.ID])

    useEffect(() => {
        const data = {
            UserID,
            token,
            StateDDL,
            DistrictDDL,
            ShowBy: 'Web',
            // ScreenName: ScreenName,         
        }
        dispatch(OfficerNameDDLAPI({ data, Flag: DDLFlag, }))
    }, [StateDDL.ID, DistrictDDL.ID])

    useEffect(() => {
        const data = { UserID, token }
        dispatch(InvoiceNumberDashboardDDLAPI({ data, Flag: 'DB_ReceivedInvoice' }))

    }, [])

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StoreNameDDLAPI({ data, Flag: "AvailableStock" }))
    }, [])

    const { DealerNameDDLData } = useSelector(state => state.DealerNameDDLData);
    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData);
    const { SeasonDashboardData } = useSelector((state) => state.SeasonDashboardDDLData);
    const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL);
    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa);
    const { InvoiceNumberDDLData } = useSelector(state => state.InvoiceNumberDashboardDDLData);
    const { StoreNameData } = useSelector(state => state.StoreNameData)

    const handleClear = () => {
        // setIsClear(!IsClear)
        // setDate('')
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

        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })

    }

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: 0,
            M_DealerID: DealerDDL.ID,
            M_EmployeeID: OfficerNameDDL.ID,
            M_StatusID: 0,
            InvoiceNumber: InvoiceNumberDDL.ID,
            InvoiceDate: InvoiceDate,
            UserID: UserID,
            token: token,
            Flag: ApiFlag,
            ShowBy: 'Yearly',
            To: '99999',
        }
        if (YearValue !== 0) {
            dispatch(DCCreatedStoreTableDataAPI({ data }))
        }

    }, [IsPost, From, To, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, SeasonDDL.ID, MonthDDL.ID, OfficerNameDDL.ID, DealerDDL.ID, InvoiceNumberDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.DCCreatedStoreTableData)

    return (
        <>
           {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> {`DC Created By Store -> ${searchName}`} </h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="totalordergenerated"
                                                    filename="data"
                                                    sheet="data"
                                                    pageOrientation='Landscape'
                                                    buttonText="Export"
                                                    style={{ borderColor: 'black' }}
                                                />
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
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <SeasonDashboardDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDashboardData={SeasonDashboardData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <MonthDashboardDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthDashboardData={MonthDashboardData}
                                                                mandatory={true}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                                mandatory={true}
                                                                searchName={searchName}
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
                                                            <ReceivedDealearDDL
                                                                DealerDDL={DealerDDL}
                                                                setDealerDDL={setDealerDDL}
                                                                DealerNameDDLData={DealerNameDDLData}
                                                            />
                                                        </div>

                                                        {
                                                            searchName === "DC Dispatched" ?
                                                                <>
                                                                    <div className="col-md-6 col-lg-3">
                                                                        <div className="form-group">
                                                                            <label className="d-block" htmlFor="NameofDepartment">DC No</label>
                                                                            <Select
                                                                                isClearable
                                                                                isSearchable
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-lg-3">
                                                                        <div className="form-group">
                                                                            <label className="d-block" htmlFor="NameofDepartment">DC Date </label>
                                                                            <input
                                                                                type="date"
                                                                                className='form-control'
                                                                                name='joiningDate'
                                                                                value={DCDate}
                                                                                onChange={(e) => setDCDate(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                : searchName === "DC Forwarded" ?
                                                                    <>
                                                                        <div className="col-12 col-md-5 col-lg-3">
                                                                            <StoreNameDataDDL
                                                                                StoreNameDDL={StoreNameDDL}
                                                                                setStoreNameDDL={setStoreNameDDL}
                                                                                StoreNameData={StoreNameData}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <div className="col-md-6 col-lg-2">
                                                                            <InvoiceNumberDashboardDDL
                                                                                InvoiceNumberDDL={InvoiceNumberDDL}
                                                                                setInvoiceNumberDDL={setInvoiceNumberDDL}
                                                                                InvoiceNumberDDLData={InvoiceNumberDDLData}
                                                                            />
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
                                                                    </>

                                                        }
                                                        <div className="col-12 col-lg-1 clear">
                                                            {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                                                            <button type="button" className="btn btn-clear float-start mt-lg-4 allBtn mx-2"
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
                                            <table id='totalordergenerated' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "5%" }}>Sr.No.</th>
                                                        {
                                                            RoleID == 7 || RoleID == 8 ?
                                                                <></>
                                                                :
                                                                <th>State</th>
                                                        }
                                                        <th>Season</th>
                                                        <th>District</th>
                                                        {
                                                            searchName === "DC Dispatched" ?
                                                                <>
                                                                    <th>Dc Date</th>
                                                                    <th>Dc No.</th>
                                                                </>
                                                                :
                                                                <></>
                                                        }
                                                        <th>invoice Date
                                                            < hr style={{ color: "#ffff" }} />
                                                            invoice No</th>
                                                        <th>Order Date
                                                            < hr style={{ color: "#ffff" }} />
                                                            Order No</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Quantity</th>
                                                        <th>Order Amount (Rs)</th>
                                                        <th>Officer Name</th>
                                                        {
                                                            searchName === "DC Forwarded" ?
                                                                <>
                                                                    <th>Store Name</th>
                                                                    {/* <th>Invoice Document</th> */}
                                                                </>
                                                                :
                                                                ''

                                                        }
                                                        {
                                                            searchName === "DC Dispatched" ?
                                                                <>
                                                                    <th>Order Book</th>
                                                                    <th>Invoice Document</th>
                                                                    <th> Dc Document</th>
                                                                </>
                                                                :
                                                                <>
                                                                    <th>Order Book</th>
                                                                    <th>Invoice Document</th>

                                                                </>

                                                        }


                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                {
                                                                    RoleID == 7 || RoleID == 8 ?
                                                                        <></>
                                                                        :
                                                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                                                }
                                                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                                                <td>{item.districtName ? item.districtName : '-'}</td>
                                                                {
                                                                    searchName === "DC Dispatched" ?
                                                                        <>
                                                                            <td>{item.dC_Date ? moment(item.dC_Date).format("DD-MM-YYYY") : '-'}</td>
                                                                            <td>{item.dC_No ? item.dC_No : '-'}</td>

                                                                        </>
                                                                        :
                                                                        <></>
                                                                }
                                                                <td>
                                                                    {item.invoiceDate ? moment(item.invoiceDate).format("DD-MM-YYYY") : '-'}
                                                                    <hr></hr>
                                                                    {item.invoiceNumber ? item.invoiceNumber : '-'}

                                                                </td>
                                                                <td>
                                                                    {item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}
                                                                    <hr></hr>
                                                                    {item.orderNumber ? item.orderNumber : '-'}

                                                                </td>
                                                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                        onClick={() => quantityPopUpClick()}
                                                                    >
                                                                        {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                    </span>
                                                                </td>
                                                                <td>{item.orderAmt ? item.orderAmt : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                {
                                                                    searchName === "DC Forwarded" ?
                                                                        <>
                                                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                        </>
                                                                        :
                                                                        ''

                                                                }
                                                                {
                                                                    searchName === "DC Dispatched" ?
                                                                        <>
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
                                                                            <td style={{ textAlign: 'center' }}>
                                                                                {
                                                                                    <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                                        <i class="fa fa-file " title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                                                                            onClick={() => {
                                                                                                window.open(item.orderPunchDispatchPdf ? item.orderPunchDispatchPdf : 'ImageNotFound')
                                                                                            }}
                                                                                        ></i>
                                                                                    </a>
                                                                                }
                                                                            </td>
                                                                        </>
                                                                        :
                                                                        <>
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

                                                                        </>

                                                                }
                                                            </tr>
                                                        )) : <tr>No data</tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {
                PopUpField.invoiceGeneratePopUp ? <QuantityPopUpCommon
                    open={PopUpField.invoiceGeneratePopUp}
                    handleCloseClick={handleCloseClick}
                    QuantityPopUpHeading="Total Order generated Quantity"
                    PopUpField={PopUpField}
                    Flag='DB_ProductDetails'

                /> : <></>
            }
        </>
    )
}


