import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import Select from 'react-select'
import moment from "moment";
import { DesignationDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, ReportingOfficerDDLAPI, RoleDDLAPI, RoleNameDDLAPI, StateNameDDLAPI, StatusDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../Redux/DDLSlice'
import { useAuthState } from '../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeePostAPI } from '../../../../Redux/MasterSlice/EmployeeSlice';
import { UserPostAPI } from '../../../../Redux/MasterSlice/UserSlice';
import { AstricSign } from '../../../../Helper/AstricSign';

export default function UsersPopUp({ open, handleAddCloseClick, PopUpField, DeptDDLDataa, handlePost }) {
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const [RoleNameDDL, setRoleNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_RoleID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.m_RoleName,
    })

    const [DeptDDL, setDeptDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_DepartmentID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.departmentName,
    })

    const [DesigDDL, setDesigDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_DesignationID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.designationName,
    })

    const [EmpDDL, setEmpDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_EmployeeID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.employeeName,

    })
    const [ReportingOfficerDDL, setReportingOfficerDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.reportingOfficerEmployeeID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.reportingOfficerEmployee,
    })

    const [StatusDDL, setStatusDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.isActiveStatusID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.isActiveStatus,
    })

    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_StateID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
    })

    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_DistrictID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_TalukaID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_VillageID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.villageName,
    })

    const [UserTextField, setUserTextField] = useState(
        {
            userName: apiFlag === "Insert" ? '' : rowData?.userName,
            password: apiFlag === "Insert" ? '' : rowData?.password,
            joiningDate: apiFlag === "Insert" ? '' : moment(rowData?.joiningDate).format("YYYY-MM-DD"),
            tableUserName: apiFlag === "Insert" ? '' : rowData?.tableUserName,
        }
    )

    const handleInputChange = (e) => {
        setUserTextField({ ...UserTextField, [e.target.name]: e.target.value })
    }

    // --------Role DDL----

    useEffect(() => {
        const data = { UserID, token }
        dispatch(RoleNameDDLAPI({ data }))
    }, [])

    const { RoleNameData } = useSelector(state => state.RoleNameDDLData)
    const handleClear = () => {
        setUserTextField({
            userName: "",
            password: "",
            joiningDate: ""
        })
        setRoleNameDDL({
            ...RoleNameDDL,
            ID: 0,
            Label: "Select...",
        })
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
        setEmpDDL({
            ...EmpDDL,
            ID: 0,
            Label: "Select...",
        })
        setStatusDDL({
            ...StatusDDL,
            ID: 0,
            Label: "Select...",
        })

    }

    const DistrictDDLClear = () => {
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    useEffect(() => {
        handleRoleNameDDL()
    }, [RoleNameData])

    const handleRoleNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (RoleNameData && RoleNameData.table && RoleNameData.table.length > 0) {
            let list = RoleNameData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.role,
            }))

            setRoleNameDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_RoleID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.m_RoleName,
            })
        }
        else {
            setRoleNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_StateID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_DistrictID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_TalukaID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
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
                value: item.m_VillageNameID,
                label: item.villageName,
            }))

            setVillageDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_VillageID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.villageName,
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


    // ------------------Designation DDL------------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(DesignationDDLAPI({ data }))
    }, [])

    const { DesigDDLData } = useSelector(state => state.DesignationDDLData)

    useEffect(() => {
        handleDeptDDL()
    }, [DeptDDLDataa])

    const handleDeptDDL = () => {
        if (DeptDDLDataa && DeptDDLDataa.table && DeptDDLDataa.table.length > 0) {
            let list = DeptDDLDataa.table.map((item, index) => ({
                value: item.id,
                label: item.departmentName,
            }))

            setDeptDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_DepartmentID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.departmentName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_DesignationID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.designationName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_EmployeeID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.employeeName,
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
        console.log(StatusDDLData)
        if (StatusDDLData && StatusDDLData.table && StatusDDLData.table.length > 0) {
            let list = StatusDDLData.table.map((item, index) => ({
                value: item.indicatorID,
                label: item.indicatorName,
            }))

            setStatusDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.isActiveStatusID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.isActiveStatus,
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
    // ------------User Status DDL------------

    useEffect(() => {
        const data = { UserID, token, RoleNameDDL, StateDDL, DistrictDDL, TalukaDDL, VillageDDL }
        dispatch(ReportingOfficerDDLAPI({ data }))
    }, [RoleNameDDL.ID, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID])

    const { ReportingOfficerData } = useSelector(state => state.ReportingOfficerDDL)

    useEffect(() => {
        handleReportingOfficerDDL()
    }, [ReportingOfficerData])

    const handleReportingOfficerDDL = () => {
        if (ReportingOfficerData && ReportingOfficerData.table && ReportingOfficerData.table.length > 0) {
            let list = ReportingOfficerData.table.map((item, index) => ({
                value: item.m_EmployeeID,
                label: item.employeeName,
            }))

            setReportingOfficerDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.reportingOfficerEmployeeID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.reportingOfficerEmployee,
            })
        }
        else {
            setReportingOfficerDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleAddUpdate = () => {
        const data = {
            M_Table_UserID: apiFlag === 'Insert' ? '0' : rowData?.m_Table_UserID,
            M_RoleID: RoleNameDDL.ID,
            M_StateID: StateDDL.ID,
            M_DistrictID: DistrictDDL.ID,
            M_TalukaID: TalukaDDL.ID,
            M_VillageID: VillageDDL.ID,
            M_DepartmentID: DeptDDL.ID,
            M_DesignationID: DesigDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            TableUserName: UserTextField?.tableUserName,
            ReportingEmployeeID: ReportingOfficerDDL.ID,
            UserName: UserTextField?.userName,
            Password: UserTextField?.password,
            JoiningDate: UserTextField?.joiningDate,
            IsActiveStatusID: StatusDDL.ID,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(UserPostAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Add Users Master </div>
            <div className="modal-body" style={{ height: '550px', overflow: "scroll", overflowX: "hidden" }}>
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Role Name <AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: RoleNameDDL.ID, label: RoleNameDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setRoleNameDDL({ ...RoleNameDDL, ID: e.value, Label: e.label })
                                        :
                                        setRoleNameDDL({ ...RoleNameDDL, ID: 0, Label: "Select..." })

                                }}
                                options={RoleNameDDL.DDL}
                            />
                        </div>
                    </div>

                    {
                        RoleNameDDL.ID == 6 || RoleNameDDL.ID == 7 || RoleNameDDL.ID == 8 || RoleNameDDL.ID == 9 || RoleNameDDL.ID == 10 ?
                            <>
                                <div className="col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label className="d-block" htmlFor="NameofDepartment">State <AstricSign /> </label>
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
                                                DistrictDDLClear()
                                            }}
                                            options={StateDDL.DDL}
                                        // isDisabled
                                        />
                                    </div>
                                </div>
                            </>

                            : ""

                    }

                    {
                        RoleNameDDL.ID == 7 || RoleNameDDL.ID == 8 || RoleNameDDL.ID == 9 || RoleNameDDL.ID == 10 ?
                            <>
                                <div className="col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label className="d-block" htmlFor="NameofDepartment">District <AstricSign /></label>
                                        <Select
                                            // isClearable
                                            isSearchable
                                            isDisabled={StateDDL.ID == 0}
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
                            </>

                            : ""

                    }

                    {
                        RoleNameDDL.ID == 9 || RoleNameDDL.ID == 10 ?
                            <>
                                <div className="col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label className="d-block" htmlFor="NameofDepartment">Taluka <AstricSign /></label>
                                        <Select
                                            // isClearable
                                            isSearchable
                                            isDisabled={DistrictDDL.ID == 0}
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
                            </>

                            : ""

                    }
                    {
                        RoleNameDDL.ID == 10 ?
                            <>
                                <div className="col-md-6 col-lg-6">
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
                            </>

                            : ""

                    }

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Department Name <AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: DesigDDL.ID, label: DeptDDL.Label }}
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Designation Name <AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: DeptDDL.ID, label: DesigDDL.Label }}
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Employee Name <AstricSign /></label>
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Table UserName <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='tableUserName'
                                value={UserTextField.tableUserName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Reporting Officer Name<AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: ReportingOfficerDDL.ID, label: ReportingOfficerDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setReportingOfficerDDL({ ...ReportingOfficerDDL, ID: e.value, Label: e.label })
                                        :
                                        setReportingOfficerDDL({ ...ReportingOfficerDDL, ID: 0, Label: "Select..." })

                                }}
                                options={ReportingOfficerDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Username <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='userName'
                                value={UserTextField.userName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Password <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='password'
                                value={UserTextField.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Joining Date <AstricSign /></label>
                            <input
                                type="date"
                                className='form-control'
                                name='joiningDate'
                                value={UserTextField.joiningDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Status <AstricSign /></label>
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

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled={
                                    RoleNameDDL.ID == 0 || DesigDDL.ID == 0 || EmpDDL.ID == 0 ||
                                    UserTextField.userName == '' || UserTextField.password == '' ||
                                    UserTextField.joiningDate == '' || StatusDDL.ID == 0
                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                onClick={() => handleClear()}
                            >
                                {popupBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </Popup>
    )
}


