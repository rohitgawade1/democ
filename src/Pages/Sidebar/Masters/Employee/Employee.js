import React, { useEffect, useState } from 'react'
import EmployeePopUp from './EmployeePopUp'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import { useDispatch, useSelector } from 'react-redux'
import { DeptDDLAPI, DesignationDDLAPI, ddlAsyncGet } from '../../../../Redux/DDLSlice'
import { DepartmentDDLAPI, EmployeeDeleteAPI, EmployeeTableDataAPI } from '../../../../Redux/MasterSlice/EmployeeSlice'
import { useAuthState } from '../../../../Helper/Context'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'
import { RegExOnlyText } from '../../../../Helper/regEx/RegExOnlyText'


export default function Employee() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

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

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DesigDDL, setDesigDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",

    })

    const [EmployeeTextField, setEmployeeTextField] = useState(
        {
            EmployeeName: '',


        }
    )

    const handleInputChange = (e) => {
        setEmployeeTextField({ ...EmployeeTextField, [e.target.name]: e.target.value })
    }

    const [IsValidText, setIsValidText] = useState(false)

    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExOnlyText(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }
    const handleChangeSearch = () => {
        setTo(10)
        setFrom(1)
    }

    useEffect(() => {
        setCurrentPage(0)
        handleChangeSearch()
    }, [DeptDDL.ID])

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }
    const handleClear = () => {
        setIsClear(!IsClear)
        // setCurrentPage(0)
        setDeptDDL({
            ...DeptDDL,
            ID: 0,
            Label: "Select...",
        })
        setDesigDDL({
            ...DesigDDL,
            ID: 0,
            Label: "Select...",
        })
        setEmployeeTextField({
            EmployeeName: ''
        })
    }

    const dispatch = useDispatch()
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
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DesignationDDLAPI({ data }))
    }, [])

    const { DesigDDLData } = useSelector(state => state.DesignationDDLData)

    useEffect(() => {
        handleDesigDDL()
    }, [DesigDDLData])

    const handleDesigDDL = () => {
        if (DesigDDLData && DesigDDLData.table && DesigDDLData.table.length > 0) {
            let list = DesigDDLData.table.map((item, index) => ({
                value: item.id,
                label: item.designationName,
            }))

            setDesigDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDesigDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_DepartmentID: DeptDDL.ID,
            M_DesignationID: DesigDDL.ID,
            EmployeeName: EmployeeTextField?.EmployeeName
        }
        dispatch(EmployeeTableDataAPI({ data }))
    }, [To, IsSearch, IsClear, IsPost, DeptDDL.ID, DesigDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.EmployeeTableData)


    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Insert", popupFlag: "Add", popupBtn: "Clear" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Update", popupFlag: "Update", popupBtn: "Cancel", rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const handleDeleteData = () => {
        dispatch(EmployeeDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.EmployeeDeleteData)

    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="employee" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Employee Master</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
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
                                                                <label className="d-block" htmlFor="NameofDepartment">Department Name</label>

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
                                                                <label className="d-block" htmlFor="NameofDepartment">Designation</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DesigDDL.ID, label: DesigDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDesigDDL({ ...DesigDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDesigDDL({ ...DesigDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DesigDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Employee Name</label>
                                                                <input
                                                                    type="text"
                                                                    className='form-control'
                                                                    name='EmployeeName'
                                                                    value={EmployeeTextField.EmployeeName}
                                                                    onChange={(e) => handleInputChange(e)}
                                                                />
                                                               
                                                            </div>
                                                        </div>
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
                                        <div className="table-responsive pb-3">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th style={{ textAlign: "center" }}>Department Name</th>
                                                        <th style={{ textAlign: "center" }}>Designation Name</th>
                                                        <th style={{ textAlign: "center" }}>Employee Name</th>
                                                        <th style={{ textAlign: "center" }}>Mobile No.</th>
                                                        <th style={{ textAlign: "center" }}>Blood Group</th>
                                                        <th style={{ textAlign: "center" }}>Email</th>
                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td align='center'>{item.rowNum}</td>
                                                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                                                <td>{item.designationName ? item.designationName : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
                                                                <td>{item.bloodGroup ? item.bloodGroup : '-'}</td>
                                                                <td>{item.email_ID ? item.email_ID : '-'}</td>
                                                                <td align='center'>
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
                </div>
            </main>

            {
                PopUpField.addPopUp ?
                    <EmployeePopUp
                        open={PopUpField.addPopUp}
                        handleAddCloseClick={handleAddCloseClick}
                        PopUpField={PopUpField}
                        DeptDDL={DeptDDL}
                        handlePost={handlePost}
                        DeptDDLDataa={DeptDDLDataa}
                    /> : <></>
            }
            {
                PopUpField.deletePopUp ?
                    <DeletePopUp
                        open={PopUpField.deletePopUp}
                        handleDeleteCloseClick={handleDeleteCloseClick}
                        handleDeleteData={handleDeleteData}
                    />
                    : <></>
            }

        </>
    )
}
