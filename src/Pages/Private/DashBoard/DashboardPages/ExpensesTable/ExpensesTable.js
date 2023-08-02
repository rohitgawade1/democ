import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../../../../../Components/Header/Header";
import Sidebar from "../../../../../Components/Sidebar/Sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useAuthState } from "../../../../../Helper/Context";
import { useDispatch, useSelector } from "react-redux";
import { DistrictNameDataDDL } from "../../../../../Components/CommonDDL/DistrictNameDataDDL";
import { DepartmentDDL } from "../../../../../Components/CommonDDL/DepartmentDDL";
import { DeptDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, EmployeeDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI } from "../../../../../Redux/DDLSlice";
import { StateNameDataDDL } from "../../../../../Components/CommonDDL/StateNameDataDDL";
import { FieldExpenceDetailsExportTableDataAPI, FieldExpenceDetailsTableDataAPI } from "../../../../../Redux/DashboardSlice/FieldExpensesSlice";
import { FieldExpensesExport } from "./FieldExpensesExport";
import { StateDashboardDDL } from "../../../../../Components/CommonDDL/StateDashboardDDL";
import { DistrictDashboardDDL } from "../../../../../Components/CommonDDL/DistrictDashboardDDL";
import { EmployeeDashboardDDL } from "../../../../../Components/CommonDDL/EmployeeDashboardDDL";
import { Loading } from "../../../../../Helper/Loading";

export default function ExpensesTable() {
    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
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

    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [YearValue, setYearValue] = useState(0)
    const [Date, setDate] = useState('')

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
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [EmpDDL, setEmpDDL] = useState({
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
        const data = { UserID, token }
        dispatch(DeptDDLAPI({ data }))
    }, [])

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

    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { EmployeeDashboardDDLData } = useSelector(state => state.EmployeeDashboardDDLData)
    const { DeptDDLDataa } = useSelector(state => state.DeptDDLData)
    
    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClearButton = () => {
        setIsClear(!IsClear)
        setCurrentPage(0)
        setDate('')
        setDeptDDL({
            ...DeptDDL,
            ID: 0,
            Label: 'Select...'
        })
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: 'Select...'
        })
        setEmpDDL({
            ...EmpDDL,
            ID: 0,
            Label: 'Select...'
        })
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: 'Select...'
        })
    }

    // -------------------Expenses Table------------
    useEffect(() => {
        const data = {
            M_DailyExpensesID: 0,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_DepartmentID: DeptDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            Date: Date,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: ApiFlag,
            // ShowBy: 'Web'
            ShowBy: activeFilter
        }
        if (YearValue !== 0) {
            dispatch(FieldExpenceDetailsTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, IsSearch, YearValue, StateDDL.ID, DistrictDDL.ID, DeptDDL.ID, EmpDDL.ID])

    useEffect(() => {
        const data = {
            M_DailyExpensesID: 0,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_DepartmentID: DeptDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            Date: Date,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: ApiFlag,
            // ShowBy: 'Web'
            ShowBy: activeFilter
        }
        if (YearValue !== 0) {
            dispatch(FieldExpenceDetailsExportTableDataAPI({ data }))
        }

    }, [IsPost, IsSearch, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, DeptDDL.ID, EmpDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.FieldExpenceDetailsTableData)
    const { FieldExpenceDetailsExporttableData, isExportLoading } = useSelector(state => state.FieldExpenceDetailsExportTableData)

    return (
        <>
        {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar />
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
                                                    {`Expenses -> ${searchName}`}{" "}
                                                </h4>
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
                                                        FieldExpenceDetailsExporttableData && FieldExpenceDetailsExporttableData.table && FieldExpenceDetailsExporttableData.table.length > 0 &&
                                                        <FieldExpensesExport
                                                            ExcelData={FieldExpenceDetailsExporttableData}
                                                            name='Daily Expenses'
                                                            searchName={searchName}
                                                            ApiFlag={ApiFlag}
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
                                                <div className="filter-bg p-2">
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-3">
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}
                                                                mandatory={false}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                                mandatory={false}

                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label
                                                                    className="d-block"
                                                                    htmlFor="NameofDepartment"
                                                                >
                                                                    Date
                                                                </label>
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
                                                        <div className="col-12 col-lg-4 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleSearch}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleClearButton}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
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
                                                        <th>Date</th>
                                                        <th>Department Name</th>
                                                        <th>Employee Name</th>
                                                        {/* {
                                                            searchName === "Travelling Expenses" && ApiFlag === 'TravellingExpenses' ?
                                                                <th>Travelling Place</th>
                                                                : searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                                                    <th>Lodging  Place</th>
                                                                    :
                                                                    <th>Field Day  </th>
                                                        } */}
                                                        {
                                                            searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                                                <th>Lodging  Place</th>
                                                                :
                                                                <></>
                                                        }
                                                        <th>Expenses(Rs)</th>
                                                        <th>View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                {
                                                                    RoleID == 7 || RoleID == 8 ?
                                                                        <></>
                                                                        :
                                                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                                                }
                                                                <td>{item.districtName ? item.districtName : '-'}</td>
                                                                <td>{item.dailyExpensesDate ? item.dailyExpensesDate : '-'}</td>
                                                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                {/* {
                                                                    searchName === "Travelling Expenses" && ApiFlag === 'TravellingExpenses' ?
                                                                        <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                                                        : searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                                                            <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                                                            :
                                                                            <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                                                } */}
                                                                {
                                                                    searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                                                        <td>{item.lodgingPlace ? item.lodgingPlace : '-'}</td>
                                                                        :
                                                                        <></>
                                                                }
                                                                <td>{item.expensesAmt ? item.expensesAmt.toFixed(2) : '-'}</td>
                                                                <td style={{textAlign:'center'}}>
                                                                    {
                                                            
                                                                        <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                                                            <i class="fa-solid fa-eye" title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                                                                onClick={() => {
                                                                                    window.open(item.documentURL ? item.documentURL : 'ImageNotFound')
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
