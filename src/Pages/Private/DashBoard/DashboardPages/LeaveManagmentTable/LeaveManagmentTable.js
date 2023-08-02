import React, { useState } from 'react'
import moment from "moment";
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import ApprovalOrderPopUp from '../../../../Sidebar/StageInCharge/ApprovalOrder/ApprovalOrderPopUp'
import RejectApprovalOrder from '../../../../Sidebar/StageInCharge/ApprovalOrder/RejectApprovalOrder'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { AstricSign } from '../../../../../Helper/AstricSign'
import { LeaveManagementExportTableDataAPI, LeaveManagementTableDataAPI } from '../../../../../Redux/DashboardSlice/LeaveManagementSlice'
import { useEffect } from 'react'
import { CropNameDDLAPI, CropNameDashboardDDLAPI, DeptDDLAPI, DesignationDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, EmployeeDashboardDDLAPI, MonthDDLAPI, MonthDashboardDDLAPI, ProductNameDDLAPI, ProductNameDashboardDDLAPI, SeasonDDLAPI, SeasonDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, StatusDDLAPI, StatusDashboardDDLAPI, TalukaDashboardDDLAPI, TalukaNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { DepartmentDDL } from '../../../../../Components/CommonDDL/DepartmentDDL'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../../Helper/Loading';
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL';
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL';
import { TalukaDashboardDDL } from '../../../../../Components/CommonDDL/TalukaDashboardDDL';
import { MonthDashboardDDL } from '../../../../../Components/CommonDDL/MonthDashboardDDL';
import { EmployeeDashboardDDL } from '../../../../../Components/CommonDDL/EmployeeDashboardDDL';
import { StatusDashboardDDL } from '../../../../../Components/CommonDDL/StatusDashboardDDL';

export default function LeaveManagementTable() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")
    let ApiFlag = searchParams.get("ApiFlag")
    let activeFilter = searchParams.get("activeFilter");
    let DDLFlag = searchParams.get("DDLFlag")

    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Date, setDate] = useState('')

    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [YearValue, setYearValue] = useState(0)


    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
    });

    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
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

    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    });
    const [StatusDDL, setStatusDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",

    })
    const [EmpDDL, setEmpDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    });

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
            UserID,
            token,
            StateDDL,
            DistrictDDL,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        }
        if (YearValue !== 0) {
            dispatch(TalukaDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [StateDDL.ID, DistrictDDL.ID, YearValue])

    useEffect(() => {
        const data = { UserID, token };
        dispatch(DeptDDLAPI({ data }));
    }, []);


    useEffect(() => {
        const data = {
            UserID,
            token,
            DeptDDL,
            M_MonthID: '0',
            M_FinancialYearID: YearValue,
            ShowBy: 'Web',
            M_DesignationID: 0,

        }
        if (YearValue !== 0) {
            dispatch(EmployeeDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [DeptDDL.ID, YearValue])

    // ------------User Status DDL------------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StatusDashboardDDLAPI({ data,Flag: DDLFlag  }))
    }, [])

    
    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)
    const { EmployeeDashboardDDLData } = useSelector(state => state.EmployeeDashboardDDLData)
    const { DeptDDLDataa } = useSelector((state) => state.DeptDDLData);
    const { StatusDashboardDDLData } = useSelector((state) => state.StatusDashboardDDLData);



    const handleClearButton = () => {
        setCurrentPage(0)
        setDate('')
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        });
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
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select...",
        })

        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
        setDeptDDL({
            ...DeptDDL,
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
        setEmpDDL({
            ...EmpDDL,
            ID: 0,
            Label: "Select...",
        })

    };

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

    const handleDeleteData = () => {
        // dispatch(CropNameDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    // -------------------Total Order Target------------
    useEffect(() => {
        const data = {

            M_EmployeeLeaveID: 0,
            M_SeasonID: SeasonDDL.ID,
            FinancialYearID: YearValue,
            LeaveDate: Date,
            M_DepartmentID: DeptDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            M_StatusID: StatusDDL.ID,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: 0,
            M_VillageNameID: 0,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: ApiFlag,
            // ShowBy: 'Web'
            ShowBy: activeFilter
        }
        if (YearValue !== 0) {
            dispatch(LeaveManagementTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, DistrictDDL.ID, DeptDDL.ID, EmpDDL.ID, StatusDDL.ID, Date])

    useEffect(() => {
        const data = {
            M_SeasonID: SeasonDDL.ID,
            FinancialYearID: YearValue,
            LeaveDate: Date,
            M_DepartmentID: DeptDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            M_StatusID: StatusDDL.ID,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: 0,
            M_VillageNameID: 0,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: ApiFlag,
            // ShowBy: 'Web'
            ShowBy: activeFilter
        }
        if (YearValue !== 0) {
            dispatch(LeaveManagementExportTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, DistrictDDL.ID, DeptDDL.ID, EmpDDL.ID, StatusDDL.ID, Date])

    const { tableData, isLoading } = useSelector(state => state.LeaveManagementTableData)
    const { TotalPaymentTargetExporttableData, isExportLoading } = useSelector(state => state.LeaveManagementExportTableData)

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar />
                <div id="wrapper" >
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> {`Leave Management -> ${searchName}`} </h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="leave-managment"
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
                                                        <div className="col-md-6 col-lg-2">
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}
                                                                mandatory={false}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                                mandatory={false}

                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <TalukaDashboardDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDashboardDDLData={TalukaDashboardDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment"> Date </label>
                                                                <input
                                                                    className="form-control"
                                                                    id="Order"
                                                                    type="date"
                                                                    name="Date"
                                                                    value={Date}
                                                                    onChange={(e) => setDate(e.target.value)}
                                                                />
                                                            </div>
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
                                                            <DepartmentDDL
                                                                DeptDDL={DeptDDL}
                                                                setDeptDDL={setDeptDDL}
                                                                DeptDDLDataa={DeptDDLDataa}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <EmployeeDashboardDDL
                                                                EmpDDL={EmpDDL}
                                                                setEmpDDL={setEmpDDL}
                                                                EmployeeDashboardDDLData={EmployeeDashboardDDLData}
                                                            />
                                                        </div>
                                                        {
                                                            searchName === "Application Received" && ApiFlag === 'AllLeave' ?
                                                                <div className="col-md-6 col-lg-3">
                                                                    <StatusDashboardDDL
                                                                        StatusDDL={StatusDDL}
                                                                        setStatusDDL={setStatusDDL}
                                                                        StatusDashboardDDLData={StatusDashboardDDLData}
                                                                    />
                                                                </div>
                                                                :
                                                                <></>
                                                        }
                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn float-start"
                                                                onClick={handleClearButton}
                                                            >
                                                                Clear
                                                            </button>
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn float-start"

                                                            >
                                                                Search
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id='leave-managment' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        {
                                                            searchName === "Leave Approved" && ApiFlag === 'Approved' ?
                                                                <th>Approved Date</th>
                                                                :
                                                                <></>
                                                        }
                                                        <th>Department</th>
                                                        <th>Designation</th>
                                                        <th>Employee Name</th>
                                                        <th>Leave From Date</th>
                                                        <th>Leave To Date</th>
                                                        <th>Total Leave Days </th>
                                                        <th>Reason </th>
                                                        {
                                                            searchName === "Application Received" && ApiFlag === 'AllLeave' ?
                                                                <th>Status</th>
                                                                :
                                                                <></>
                                                        }
                                                        {/* {
                                                            searchName === "Leave Pending" && ApiFlag === 'Pending' ?
                                                                <th>Action</th>
                                                                :
                                                                <></>
                                                        } */}

                                                        {/* {
                                                            searchName === "Rejected Leave" ?
                                                                <th>Remark</th>
                                                                :
                                                                <th>Reason</th>
                                                        } */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                {
                                                                    searchName === "Leave Approved" && ApiFlag === 'Approved' ?
                                                                        <td>{item.statusDate ? item.statusDate : '-'}</td>
                                                                        :
                                                                        <></>
                                                                }
                                                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                                                <td>{item.designationName ? item.designationName : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                <td>{item.leaveDate ? moment(item.leaveDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.fromDate ? moment(item.fromDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.totalLeaveDays ? item.totalLeaveDays : '-'}</td>
                                                                <td>{item.leaveReason ? item.leaveReason : '-'}</td>

                                                                {
                                                                    searchName === "Application Received" && ApiFlag === 'AllLeave' ?
                                                                        <td>{item.statusName_English ? item.statusName_English : '-'}</td>
                                                                        :
                                                                        <></>
                                                                }
                                                                {/* {
                                                                    searchName === "Leave Pending" && ApiFlag === 'Pending' ?
                                                                        <td>
                                                                            <span className='tableIcon'
                                                                                onClick={() => editButtonClick()}
                                                                            >
                                                                                <i class="fa-solid fa-circle-check px-1" title='Approved' style={{ cursor: "pointer", color: "green", fontSize: "18px", marginTop: "4px" }} aria-hidden="true"></i>
                                                                            </span>
                                                                            <span className='tableIcon'
                                                                                onClick={() => rejectButtonClick()}
                                                                            >
                                                                                <i class="fa-solid fa-circle-xmark" title='Approved' style={{ cursor: "pointer", color: "red", fontSize: "18px", marginTop: "4px" }}></i>
                                                                            </span>
                                                                        </td>
                                                                        :
                                                                        <></>
                                                                } */}
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
            </main >
            {
                PopUpField.addPopUp ? <ApprovalOrderPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                // handleApproved={handleApproved}
                /> : <></>
            }
            {
                PopUpField.rejectPopUp ? <RejectApprovalOrder
                    open={PopUpField.rejectPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                /> : <></>
            }
        </>
    )
}


