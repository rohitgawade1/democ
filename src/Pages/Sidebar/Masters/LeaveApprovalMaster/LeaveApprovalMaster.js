import React, { useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import moment from "moment";
import LeaveApprovedPopUp from './LeaveApprovedPopUp'
import { useAuthState } from '../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DeptDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, MonthDDLAPI, StatusDDLAPI, TalukaNameDDLAPI } from '../../../../Redux/DDLSlice'
import { useEffect } from 'react'
import { ApprovalRejectAPI, LeaveApprovalTableDataAPI } from '../../../../Redux/ClientAdminSlice/LeaveApprovalMasterSlice'
import LeaveRejectPopUp from './LeaveRejectPopUp'
import ApprovalOrderPopUp from '../../StageInCharge/ApprovalOrder/ApprovalOrderPopUp'
import RejectApprovalOrder from '../../StageInCharge/ApprovalOrder/RejectApprovalOrder'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL';
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL';
import { AstricSign } from '../../../../Helper/AstricSign';
import { Pegination } from '../../../../Components/Pegination/Pegination';
import { Loading } from '../../../../Helper/Loading';

export default function LeaveApprovalMaster() {
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

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

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: '',
        rejectPopUp: '',
        approvedRejFlag: '',
        Remark: ''

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

    const [EmpDDL, setEmpDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

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
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select...",
        })
        setEmpDDL({
            ...EmpDDL,
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

    const handleDeleteData = () => {
        // dispatch(CropNameDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.EmployeeDeleteData)

    // ----Month DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(MonthDDLAPI({ data }))
    }, [])

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

    // -------employee DDL-----------
    useEffect(() => {
        const data = { UserID, token, DeptDDL }
        dispatch(EmployeeDDLAPI({ data }))
    }, [DeptDDL.ID])

    const { EmployeeDDLData } = useSelector(state => state.EmployeeDDLData)

    useEffect(() => {
        handleEmployeeDDL()
    }, [EmployeeDDLData])

    const handleEmployeeDDL = () => {
        if (EmployeeDDLData && EmployeeDDLData.table && EmployeeDDLData.table.length > 0) {
            let list = EmployeeDDLData.table.map((item, index) => ({
                value: item.id,
                label: item.employeeName,
            }))

            setEmpDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setEmpDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }
    }

    useEffect(() => {
        const data = {
            M_EmployeeLeaveID: 0,
            M_LeaveTypeID: 0,
            MonthID: MonthDDL.ID,
            M_DistrictID: DistrictDDL.ID,
            M_TalukaID: TalukaDDL.ID,
            M_DepartmentID: DeptDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            Date: Date,
            M_StatusID: StatusDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
        }
        dispatch(LeaveApprovalTableDataAPI({ data, Flag: 'State_Received' }))
    }, [To, IsPost, From, IsClear, IsSearch, DistrictDDL.ID, TalukaDDL.ID, MonthDDL.ID, StatusDDL.ID, EmpDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.LeaveApprovalTableData)

    const handleApproved = () => {
        const data = {
            M_EmployeeLeaveID: PopUpField.rowData?.m_EmployeeLeaveID,
            Remark: '',
            M_UserID: UserID,
            token: token,
            Flag: "Approved",
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalRejectAPI({ data }))
    }

    const handleReject = () => {
        const data = {
            M_EmployeeLeaveID: PopUpField.rowData?.m_EmployeeLeaveID,
            Remark: Remark,
            M_UserID: UserID,
            token: token,
            Flag: 'Rejected',
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalRejectAPI({ data }))
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="leaveapprovalmaster" listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Leave Approval</h4>
                                            </div>
                                            {/* <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow table-card mt-2 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">
                                                        <div className="col-12 col-md-6 col-lg-3">
                                                            <DistrictNameDataDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDDLData={DistrictDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <TalukaNameDataDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDDLData={TalukaDDLData}
                                                            />

                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment"> Date </label>
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
                                                                <label className="d-block" htmlFor="NameofDepartment">Month</label>
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
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Department</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DeptDDL.ID, label: DeptDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDeptDDL({ ...DeptDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDeptDDL({ ...DeptDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DeptDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Employee Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: EmpDDL.ID, label: EmpDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setEmpDDL({ ...EmpDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setEmpDDL({ ...EmpDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={EmpDDL.DDL}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Status</label>
                                                                <Select
                                                                    // isClearable
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
                                                        </div>

                                                        <div className="col-12 col-lg-3 clear">
                                                        <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn float-start"
                                                                onClick={handleSearch}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn float-start"
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
                                                        <th>Department </th>
                                                        <th>Designation</th>
                                                        <th>Employee Name</th>
                                                        <th>Leave From Date </th>
                                                        <th>Leave To Date</th>
                                                        <th>Total Leave Days</th>
                                                        <th> Reason</th>
                                                        <th> Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                                                <td>{item.designationName ? item.designationName : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                <td>{item.fromDate ? moment(item.fromDate).format("DD-MM-YYYY") : '-'}</td>
                                                                <td>{item.toDate ? moment(item.toDate).format("DD-MM-YYYY") : '-'}</td>
                                                                <td>{item.totalLeaveDays ? item.totalLeaveDays : '-'}</td>
                                                                <td>{item.leaveReason ? item.leaveReason : '-'}</td>
                                                                <td>{item.m_StatusName ? item.m_StatusName : '-'}</td>

                                                                <td>
                                                                    {
                                                                        item.m_StatusName === 'Approved' ?
                                                                            <span className='tableIcon'
                                                                                onClick={() => rejectButtonClick(item)}
                                                                            >
                                                                                <i class="fa-solid fa-circle-xmark" title='Approved' style={{ cursor: "pointer", color: "red", fontSize: "18px", marginTop: "4px" }}></i>
                                                                            </span>
                                                                            :
                                                                            item.m_StatusName === 'Rejected' ?
                                                                                <span className='tableIcon'
                                                                                    onClick={() => editButtonClick(item)}
                                                                                >
                                                                                    <i class="fa-solid fa-circle-check px-1" title='Approved' style={{ cursor: "pointer", color: "green", fontSize: "18px", marginTop: "4px" }} aria-hidden="true"></i>

                                                                                    {/* <i className="fa fa-pencil-square-o" aria-hidden="true"></i> */}
                                                                                </span>
                                                                                :
                                                                                <>
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
                                                                                </>
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
                PopUpField.addPopUp ? <LeaveApprovedPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                    handleApproved={handleApproved}
                    Title=" Do You Want To Approved Leave ?"
                /> : <></>
            }
            {
                PopUpField.rejectPopUp ? <LeaveRejectPopUp
                    open={PopUpField.rejectPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}

                /> : <></>
            } */}

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
                    handlePost={handlePost}
                    handleReject={handleReject}
                    Remark={Remark}
                    setRemark={setRemark}
                /> : <></>
            }


        </>
    )
}
