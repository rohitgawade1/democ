import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import UsersPopUp from './UsersPopUp'
import moment from "moment";
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DeptDDLAPI, DesignationDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../Redux/DDLSlice'
import { UserDeleteAPI, UserTableDataAPI, UserTableExportDataAPI } from '../../../../Redux/MasterSlice/UserSlice'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading';
import { UserMasterExport } from './UserMasterExport';
import { DesignationNameDataDDL } from '../../../../Components/CommonDDL/DesignationNameDataDDL';
import Designation from '../Designation/Designation';


export default function Users() {

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
        popupFlag: "",
        popupBtn: "",
        apiFlag: "",
        rowData: ''

    })

    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [StateDDL, setStateDDL] = useState({
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

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DesigDDL, setDesigDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",

    })
    const [EmpDDL, setEmpDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const handleChangeSearch = () => {
        setTo(10)
        setFrom(1)
    }

    useEffect(() => {
        setCurrentPage(0)
        handleChangeSearch()
    }, [DeptDDL.ID, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID])

    const handleClear = () => {
        setCurrentPage(0)
        setDeptDDL({
            ...DeptDDL,
            ID: 0,
            Label: "Select...",
        })
        setStateDDL({
            ...StateDDL,
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
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select...",
        })
        setDesigDDL({
            ...DesigDDL,
            ID: 0,
            Label: "Select...",
        })
        setEmpDDL({
            ...EmpDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    const dispatch = useDispatch()

    // ------------Department -------

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

    // ----------Designation Name DDL---------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(DesignationDDLAPI({ data }))
    }, [])

    const { DesigDDLData } = useSelector(state => state.DesignationDDLData)

    // ---------State DDL---------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StateNameDDLAPI({ data }))
    }, [])

    const { StateDDLData } = useSelector(state => state.StateNameDDL)

    useEffect(() => {
        handleStateDDL()
    }, [StateDDLData])

    const handleStateDDL = () => {
        if (StateDDLData && StateDDLData.table && StateDDLData.table.length > 0) {
            let list = StateDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.stateName,
            }))

            setStateDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setStateDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token, StateDDL }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [StateDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        handleDistrictDDL()
    }, [DistrictDDLData])

    const handleDistrictDDL = () => {
        if (DistrictDDLData && DistrictDDLData.table && DistrictDDLData.table.length > 0) {
            let list = DistrictDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.districtName,
            }))

            setDistrictDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDistrictDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [StateDDL.ID, DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

    useEffect(() => {
        handleTalukaDDL()
    }, [TalukaDDLData])

    const handleTalukaDDL = () => {
        if (TalukaDDLData && TalukaDDLData.table && TalukaDDLData.table.length > 0) {
            let list = TalukaDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.talukaName,
            }))

            setTalukaDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setTalukaDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // -----------Village Name DDL--------
    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL }
        dispatch(VillageDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID])

    const { VillageData } = useSelector(state => state.VillageDDLData)

    useEffect(() => {
        handleVillageDDL()
    }, [VillageData])

    const handleVillageDDL = () => {
        if (VillageData && VillageData.table && VillageData.table.length > 0) {
            let list = VillageData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.villageName,
            }))

            setVillageDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setVillageDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // -------employee DDL-----------
    useEffect(() => {
        const data = { UserID, token, DesigDDL, DeptDDL }
        dispatch(EmployeeDDLAPI({ data }))
    }, [DesigDDL.ID, DeptDDL.ID])

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
                ID: 0 ,
                Label:"Select...",
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
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_DepartmentID: DeptDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictID: DistrictDDL.ID,
            M_TalukaID: TalukaDDL.ID,
            M_VillageID: VillageDDL.ID,
            M_DesignationID: DesigDDL.ID,
            M_EmployeeID: EmpDDL.ID
        }
        dispatch(UserTableDataAPI({ data }))
    }, [From, DeptDDL.ID, IsPost, , StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID, DesigDDL.ID,EmpDDL.ID])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            M_DepartmentID: DeptDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictID: DistrictDDL.ID,
            M_TalukaID: TalukaDDL.ID,
            M_VillageID: VillageDDL.ID,
            M_DesignationID: DesigDDL.ID,
            M_EmployeeID: EmpDDL.ID
        }
        dispatch(UserTableExportDataAPI({ data }))
    }, [From, DeptDDL.ID, IsPost, , StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID, DesigDDL.ID,EmpDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.UserTableData)
    const { UserTableExporttableData, isExportLoading } = useSelector(state => state.UserTableExportData)

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
        dispatch(UserDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }
    const { isDeleteLoading } = useSelector(state => state.UserDeleteData)


    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="users" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Users Master</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        UserTableExporttableData && UserTableExporttableData.table && UserTableExporttableData.table.length > 0 &&
                                                        <UserMasterExport
                                                            ExcelData={UserTableExporttableData}
                                                            name='User Master'
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
                                                            <DesignationNameDataDDL
                                                                DesigDDL={DesigDDL}
                                                                setDesigDDL={setDesigDDL}
                                                                DesigDDLData={DesigDDLData}
                                                                mandatory={false}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">State </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: StateDDL.ID, label: StateDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setStateDDL({ ...StateDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setStateDDL({ ...StateDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={StateDDL.DDL}
                                                                // isDisabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">District</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DistrictDDL.ID, label: DistrictDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDistrictDDL({ ...DistrictDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDistrictDDL({ ...DistrictDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DistrictDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Taluka</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: TalukaDDL.ID, label: TalukaDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setTalukaDDL({ ...TalukaDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setTalukaDDL({ ...TalukaDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={TalukaDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Village Name </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: VillageDDL.ID, label: VillageDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setVillageDDL({ ...VillageDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setVillageDDL({ ...VillageDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={VillageDDL.DDL}
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

                                                        <div className="col-12 col-lg-2 clear">
                                                            {/* <button type="button" className="btn btn-primary text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
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
                                        <div className="table-responsive">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th style={{ textAlign: "center" }}>Role</th>
                                                        <th style={{ textAlign: "center" }}>Department Name</th>
                                                        <th style={{ textAlign: "center" }}>Designation Name</th>
                                                        <th style={{ textAlign: "center" }}>Employee Name</th>
                                                        <th style={{ textAlign: "center" }}>Table Username</th>
                                                        <th style={{ textAlign: "center" }}>UserName</th>
                                                        <th style={{ textAlign: "center" }}>Password</th>
                                                        <th style={{ textAlign: "center" }}>Status</th>
                                                        <th style={{ textAlign: "center" }}>Joining Date</th>
                                                        <th style={{ textAlign: "center" }}>Reporting Officer Name</th>
                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td align='center'>{item.rowNum}</td>
                                                                <td>{item.m_RoleName ? item.m_RoleName : '-'}</td>
                                                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                                                <td>{item.designationName ? item.designationName : '-'}</td>
                                                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                                                <td>{item.tableUserName ? item.tableUserName : '-'}</td>
                                                                <td>{item.userName ? item.userName : '-'}</td>
                                                                <td>{item.password ? item.password : '-'}</td>
                                                                <td>{item.isActiveStatus ? item.isActiveStatus : '-'}</td>
                                                                <td>{item.joiningDate ? moment(item.joiningDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.reportingOfficerEmployee}</td>
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

            {
                PopUpField.addPopUp ? <UsersPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    DeptDDL={DeptDDL}
                    handlePost={handlePost}
                    DeptDDLDataa={DeptDDLDataa}
                /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            }

        </>
    )
}
