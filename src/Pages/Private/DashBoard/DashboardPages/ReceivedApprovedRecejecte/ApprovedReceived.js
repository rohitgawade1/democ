import React, { useEffect, useState } from 'react'
import moment from "moment";
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import ProductDetailsPopUp from './DashboardProductDetailsPopUp'
import { AstricSign } from '../../../../../Helper/AstricSign'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DealerNameDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, MonthDashboardDDLAPI, OfficerNameDDLAPI, SeasonDDLAPI, SeasonDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { StateNameDataDDL } from '../../../../../Components/CommonDDL/StateNameDataDDL'
import { SeasonDataDDL } from '../../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../../Components/CommonDDL/MonthDataDDL'
import { DistrictNameDataDDL } from '../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { ApprovalOrderApprovedRejectAPI, ApprovalOrderExportTableDataAPI, ApprovalOrderTableDataAPI } from '../../../../../Redux/StateInChargeSlice/ApprovalOrderSlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { ReceivedDealearDDL } from '../../../../../Components/CommonDDL/ReceivedDealearDDL';
import { OrderApprovalStatusExportTableDataAPI, OrderApprovalStatusTableDataAPI } from '../../../../../Redux/DashboardSlice/OrderApprovalStatusSlice';
import DashboardProductDetailsPopUp from './DashboardProductDetailsPopUp';
import { Loading } from '../../../../../Helper/Loading';
import { OfficerNameDataDDL } from '../../../../../Components/CommonDDL/OfficerNameDataDDL';
import { ApprovedReceivedExportData } from './ApprovedReceivedExportData';
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL';
import { SeasonDashboardDDL } from '../../../../../Components/CommonDDL/SeasonDashboardDDL';
import { MonthDashboardDDL } from '../../../../../Components/CommonDDL/MonthDashboardDDL';
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL';

export default function ApprovedReceived() {

    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")
    let ApiFlag = searchParams.get("ApiFlag")
    let activeFilter = searchParams.get("activeFilter");
    let DDLFlag = searchParams.get("DDLFlag");

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
    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "---Select---",
    });

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "---Select---",
    });

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "---Select---",
    });
    const [DistrictDDL, setDistrictDDL] = useState({
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

    const { DealerNameDDLData } = useSelector(state => state.DealerNameDDLData);
    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData);
    const { SeasonDashboardData } = useSelector((state) => state.SeasonDashboardDDLData);
    const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL);
    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa);

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false, rejectPopUp: false })
    }

    const productDetailsPopUpClick = (item) => {
        // setApprovedRejectPopUp(true) ApprovedRejectPopUp
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: true, rowData: item })
    }

    const handleClosePopUpClick = (item) => {
        // setApprovedRejectPopUp(false)
        setPopUpField({ ...PopUpField, ApprovedRejectPopUp: false, rowData: item })
    }

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
        setDistrictDDL({
            ...DistrictDDL,
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

    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_StateID: StateDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: '0',
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            OrderPunchByM_EmployeeID: OfficerNameDDL.ID,
            M_StatusID: '0',
            UserID: UserID,
            token: token,
            // ShowBy: 'Web',
            ShowBy: activeFilter,
            From: From,
            To: To,
            Flag: ApiFlag
        }
        if (YearValue !== 0) {
            dispatch(OrderApprovalStatusTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, StateDDL.ID, SeasonDDL.ID, DistrictDDL.ID, MonthDDL.ID, DealerDDL.ID, YearValue, OfficerNameDDL.ID, ApiFlag])


    useEffect(() => {
        const data = {
            T_OrderPunchID: 0,
            M_FinancialYearID: YearValue,
            M_StateID: StateDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            MonthID: MonthDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: '0',
            M_DealerID: DealerDDL.ID,
            OrderDate: Date,
            OrderPunchByM_EmployeeID: OfficerNameDDL.ID,
            M_StatusID: '0',
            UserID: UserID,
            token: token,
            // ShowBy: 'Web',
            ShowBy: activeFilter,
            From: From,
            To: '99999',
            Flag: ApiFlag
        }
        if (YearValue !== 0) {
            dispatch(OrderApprovalStatusExportTableDataAPI({ data }))
        }
    }, [To, IsPost, From, IsClear, IsSearch, StateDDL.ID, SeasonDDL.ID, DistrictDDL.ID, MonthDDL.ID, DealerDDL.ID, YearValue, OfficerNameDDL.ID, ApiFlag])


    const { tableData, isLoading } = useSelector(state => state.OrderApprovalStatusTableData)
    const { OrderApprovalStatusExportTableData, isExportLoading } = useSelector(state => state.OrderApprovalStatusExportTableData)

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="approvedreceived" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> {searchName} Order</h4>
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
                                                        OrderApprovalStatusExportTableData && OrderApprovalStatusExportTableData.table && OrderApprovalStatusExportTableData.table.length > 0 &&
                                                        <ApprovedReceivedExportData
                                                            ExcelData={OrderApprovalStatusExportTableData}
                                                            name='Approval Order Status'
                                                            searchName={searchName}
                                                            ApiFlag={ApiFlag}
                                                            RoleID={RoleID}
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
                                                            searchName === "Rejected" && ApiFlag === 'Rejected' ?
                                                                <></>
                                                                :
                                                                <div className="col-md-6 col-lg-3">
                                                                    <div className="form-group">
                                                                        <label className="d-block" htmlFor="NameofDepartment">Order Date </label>
                                                                        <input
                                                                            type="date"
                                                                            className='form-control'
                                                                            name='joiningDate'
                                                                            value={Date}
                                                                            onChange={(e) => setDate(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                        }

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
                                                searchName === "Received" && ApiFlag === 'Received' ?
                                                    <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.No.</th>
                                                                <th>State</th>
                                                                <th>District</th>
                                                                <th>Dealer Name</th>
                                                                <th>Order Received Date</th>
                                                                <th>Product Quantity</th>
                                                                <th>Order Amount (Rs)</th>
                                                                <th>Officer Name</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                                                        <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                        <td>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                                                        <td style={{ textAlign: 'center' }} >
                                                                            <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                onClick={() => productDetailsPopUpClick(item)}
                                                                            >
                                                                                {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                                                            </span>
                                                                        </td>
                                                                        <td>{item.orderAmt ? item.orderAmt : '-'}</td>
                                                                        <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                        <td>{item.statusName ? item.statusName : '-'}</td>
                                                                    </tr>
                                                                )) : <tr>No data</tr>
                                                            }

                                                        </tbody>
                                                    </table>
                                                    :
                                                    searchName === "Approved" && ApiFlag === 'Approved' ?
                                                        <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No.</th>
                                                                    <th>Order Date</th>
                                                                    <th>Order No</th>
                                                                    <th>State</th>
                                                                    <th>District</th>
                                                                    <th>Dealer Name</th>
                                                                    <th>Product Quantity</th>
                                                                    <th>Order Amount (Rs)</th>
                                                                    <th>Officer Name</th>
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
                                                                            <td>{item.stateName ? item.stateName : '-'}</td>
                                                                            <td>{item.districtName ? item.districtName : '-'}</td>
                                                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                            <td style={{ textAlign: 'center' }} >
                                                                                <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                    onClick={() => productDetailsPopUpClick(item)}
                                                                                >
                                                                                    Click
                                                                                </span>
                                                                            </td>
                                                                            <td>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                                                            <td>{item.employeeName ? item.employeeName : '-'}</td>

                                                                        </tr>
                                                                    )) : <tr>No data</tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                        :
                                                        <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No.</th>
                                                                    {
                                                                        RoleID == 7 || RoleID == 8 ?
                                                                            <></>
                                                                            :
                                                                            <th>State</th>
                                                                    }
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
                                                                            {
                                                                                RoleID == 7 || RoleID == 8 ?
                                                                                    <></>
                                                                                    :
                                                                                    <td>{item.stateName ? item.stateName : '-'}</td>
                                                                            }
                                                                            <td>{item.districtName ? item.districtName : '-'}</td>
                                                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                            <td style={{ textAlign: 'center' }} >
                                                                                <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                                                    onClick={() => productDetailsPopUpClick(item)}
                                                                                >
                                                                                    Click
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
            {/* {
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
            } */}
            {
                PopUpField.ApprovedRejectPopUp ?
                    <DashboardProductDetailsPopUp
                        open={PopUpField.ApprovedRejectPopUp}
                        handleCloseClick={handleClosePopUpClick}
                        ProductDetailsPopUpHeading='Product Details'
                        PopUpField={PopUpField}
                        Flag={ApiFlag}
                    // Flag={Flag === 'State_Received' ? 'State_Received' : Flag === 'State_Approval' ? 'State_Approval' :'State_Rejected'}
                    /> : <></>
            }
        </>
    )
}


