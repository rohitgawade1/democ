import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import { useAuthState } from '../../../../Helper/Context'
import { DealerNameDDLAPI, DeptDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, MonthDDLAPI, ReceivedDealerNameDDLAPI, SeasonDDLAPI, StatusDDLAPI, TalukaNameDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { ApprovalOrderApprovedRejectAPI, ApprovalOrderExportTableDataAPI, ApprovalOrderTableDataAPI } from '../../../../Redux/StateInChargeSlice/ApprovalOrderSlice'
import { Pegination } from '../../../../Components/Pegination/Pegination';
import { Loading } from '../../../../Helper/Loading';
import { AstricSign } from '../../../../Helper/AstricSign';
import { ReceivedDealearDDL } from '../../../../Components/CommonDDL/ReceivedDealearDDL';


export default function MonthWiseAttendance() {
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

    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })




    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
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

    const moment = require('moment');
    let result = moment("2020-02", "YYYY-MM").daysInMonth()

    console.log("No of days in 2020-02 is:", result)

    return (
        <>
            {/* {isLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active={ScreenName} listActive="report" reportsActive="attendance" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">{ScreenName} Attendance</h4>
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
                                                <div className='filter-bg p-2'>
                                                    <div className="row">
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Department</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                // maxMenuHeight={150}
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
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Designation</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                // maxMenuHeight={150}
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
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Employee Name </label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                // maxMenuHeight={150}
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

                                                        <div className="col-12 col-lg-1 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                            // onClick={() => handleClear()}
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
                                                        <th>Employee Name</th>
                                                        {/* {
                                                                Array.from({ length: moment('2023-08').daysInMonth() }, (x, i) =>
                                                                    moment().startOf('month').add(i, 'days').format('DD'))
                                                            } */}
                                                        {Array.from({ length: moment('2023-08').daysInMonth() }).map((x, i) => (
                                                            <th>
                                                                {
                                                                    moment().startOf('month').add(i, 'days').format('DD')
                                                                }
                                                            </th>
                                                        ))}

                                                        <th>Absent Days</th>
                                                        <th>Closing Leave Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>1</td>
                                                        <td>-</td>
                                                        {Array.from({ length: moment('2023-08').daysInMonth() }).map((x, i) => (
                                                            <td>  -</td>
                                                        ))}
                                                        <td>-</td>
                                                        <td>-</td>
                                                    </tr>

                                                </tbody>
                                            </table>

                                        </div>
                                        {/* {tableData && tableData.table && tableData.table.length > 0 &&
                                            <Pegination
                                                PerPageCount={PerPageCount}
                                                TotalCount={tableData.table[0].totalCount}
                                                setFrom={setFrom}
                                                setTo={setTo}
                                                setrowNo={setrowNo}
                                                CurrentPage={CurrentPage}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >

        </>
    )
}


