import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import { Save, X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { DesignationDDLAPI, DistrictNameDDLAPI, EmployeeDDLAPI, EmployeeNameDDLAPI, RoleDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../Redux/DDLSlice'
import { useAuthState } from '../../../../Helper/Context'
import { EmployeeNameDataDDL } from '../../../../Components/CommonDDL/EmployeeNameDataDDL'
import { DistrictNameDataDDL } from '../../../../Components/CommonDDL/DistrictNameDataDDL'
import { StateNameDataDDL } from '../../../../Components/CommonDDL/StateNameDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { SDTWiseEmployeePostAPI, SDTWiseEmployeeTableDataAPI } from '../../../../Redux/MasterSlice/SDTWiseEmployeeAssign'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'



export default function SDTWiseEmployeeAssign() {
    const dispatch = useDispatch()
    const userDetails = useAuthState();
    const { UserID, RoleID, token } = userDetails

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

    const [gridData, setgridData] = useState([])

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [RoleDDL, setRoleDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    // const [EmployeeNameDDL, setEmployeeNameDDL] = useState({
    //     DDL: [],
    //     ID: 0,
    //     Label: "Select...",

    // })

    const [EmpDDL, setEmpDDL] = useState({
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
    const [DesigDDL, setDesigDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",

    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    useEffect(() => {
        const data = { UserID, token }
        dispatch(RoleDDLAPI({ data }))
    }, [])

    const { RoleData } = useSelector(state => state.RoleDDLData)

    const handleClear = () => {
        setIsClear(!IsClear)
        setRoleDDL({
            ...RoleDDL,
            ID: 0,
            Label: "Select...",
        })
        setEmpDDL({
            ...EmpDDL,
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
        setDesigDDL({
            ...DesigDDL,
            ID: 0,
            Label: "Select...",
        })
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    const handleClearFilter = () => {
        setIsClear(!IsClear)
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
    }

    useEffect(() => {
        handleRoleDDL()
    }, [RoleData])

    const handleRoleDDL = () => {
        // console.log(DeptDDLDataa)
        if (RoleData && RoleData.table && RoleData.table.length > 0) {
            let list = RoleData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.role,
            }))

            setRoleDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setRoleDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // const handleSetGridData =(data)=>{
    //     // console.log(data)
    //     setgridData(data)
    // }

    // useEffect(() => {
    //     const data = { UserID, token, RoleDDL }
    //     dispatch(EmployeeNameDDLAPI({ data }))
    // }, [RoleDDL.ID])

    // const { EmployeeNameData } = useSelector(state => state.EmployeeNameDDLData)

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
    // -------employee DDL-----------
    useEffect(() => {
        const data = { UserID, token, DesigDDL }
        dispatch(EmployeeDDLAPI({ data }))
    }, [DesigDDL.ID])

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
        const data = { UserID, token }
        dispatch(StateNameDDLAPI({ data }))
    }, [])

    const { StateDDLData } = useSelector(state => state.StateNameDDL)

    useEffect(() => {
        const data = { UserID, token, StateDDL }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [StateDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [StateDDL.ID, DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

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

    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Add" })
    }

    const editButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Update" })
    }

    const deleteButtonClick = () => {
        setPopUpField({ ...PopUpField, deletePopUp: true })
    }
    const handlePost = () => {
        setIsPost(!IsPost)
        setgridData([])
    }

    const handleAllSelectChecklist = (event) => {
        // setcheckedAll(true)
        const { checked } = event.target
        gridData.forEach((item) => {
            return item.isChecked = checked ? 1 : 0
        })
        setgridData([...gridData])
    }

    
    // const handleChecklist = (event, paramID) => {
    //     // setcheckedAll(false)
    //     const { checked } = event.target
    //     const selectedIndex = gridData.findIndex((id) => id.paramID === paramID)
    //     gridData[selectedIndex].isChecked = checked ? 1 : 0
    //     setgridData([...gridData])
    // }


    useEffect(() => {
        const data = {
            M_RoleID: RoleDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            //   M_VillageID:'1',
            M_VillageID: VillageDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
        }
        if (RoleDDL.ID == 6 && EmpDDL.ID != 0) {
            dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        } else if (RoleDDL.ID == 7 && EmpDDL.ID != 0 && StateDDL.ID != 0) {
            dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        } else if (RoleDDL.ID == 8 && EmpDDL.ID != 0 && StateDDL.ID != 0) {
            dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        } else if (RoleDDL.ID == 9 && EmpDDL.ID != 0 && StateDDL.ID != 0 && DistrictDDL.ID != 0) {
            dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        } else if (RoleDDL.ID == 10 && EmpDDL.ID != 0 && StateDDL.ID != 0 && DistrictDDL.ID != 0 && TalukaDDL.ID != 0) {
            dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        }
        // else {
        //     dispatch(SDTWiseEmployeeTableDataAPI({ data }))
        // }
    }, [To, IsClear, RoleDDL.ID, EmpDDL.ID, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.SDTWiseEmployeeTableData)

    useEffect(() => {
        let roleData = tableData?.table.map((item) => ({ ...item }))
        setgridData(roleData)
    }, [tableData])


    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].isChecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }


    const handelAssignClicked = () => {
        let allCheckData = ""
        gridData.forEach((item) => {
            if (item.isChecked) {
                allCheckData = allCheckData + item.paramID + ","
            }

        })
        // console.log(allCheckData)
        const data = {
            AssignData: allCheckData,
            M_RoleID: RoleDDL.ID,
            M_EmployeeID: EmpDDL.ID,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageID: VillageDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            handlePost: handlePost,
            handleClear:handleClear,
        }
        dispatch(SDTWiseEmployeePostAPI({ data }))
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="sdtwiseemployeeassign" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Officer Mapping</h4>
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
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="Budgettype">Role </label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: RoleDDL.ID, label: RoleDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setRoleDDL({ ...RoleDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setRoleDDL({ ...RoleDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={RoleDDL.DDL}
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
                                                        {/* {
                                                            RoleDDL.ID == 6 || RoleDDL.ID == 7 || RoleDDL.ID == 8 || RoleDDL.ID == 9 ?
                                                                <> */}
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
                                                        {/* </>

                                                                : ""

                                                        } */}

                                                        {
                                                            RoleDDL.ID == 7 || RoleDDL.ID == 8 || RoleDDL.ID == 9 || RoleDDL.ID == 10 ?
                                                                <div className="col-12 col-md-6 col-lg-3">
                                                                    <StateNameDataDDL
                                                                        StateDDL={StateDDL}
                                                                        setStateDDL={setStateDDL}
                                                                        StateDDLData={StateDDLData}
                                                                    />
                                                                </div>
                                                                : ""
                                                        }
                                                        {
                                                            RoleDDL.ID == 9 || RoleDDL.ID == 10 ?
                                                                <>
                                                                    <div className="col-12 col-md-6 col-lg-3">
                                                                        <DistrictNameDataDDL
                                                                            DistrictDDL={DistrictDDL}
                                                                            setDistrictDDL={setDistrictDDL}
                                                                            DistrictDDLData={DistrictDDLData}
                                                                        />
                                                                    </div>

                                                                    {/* <div className="col-12 col-md-6 col-lg-2">
                                                                        <TalukaNameDataDDL
                                                                            TalukaDDL={TalukaDDL}
                                                                            setTalukaDDL={setTalukaDDL}
                                                                            TalukaDDLData={TalukaDDLData}
                                                                        />
                                                                    </div> */}
                                                                </>
                                                                : ""
                                                        }
                                                        {
                                                            RoleDDL.ID == 10 ?
                                                                <>
                                                                    <div className="col-12 col-md-6 col-lg-3">
                                                                        <TalukaNameDataDDL
                                                                            TalukaDDL={TalukaDDL}
                                                                            setTalukaDDL={setTalukaDDL}
                                                                            TalukaDDLData={TalukaDDLData}
                                                                        />
                                                                    </div>
                                                                </>

                                                                : ""

                                                        }
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
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">

                                                <thead>
                                                    <tr>
                                                        <th width="5% text-center">
                                                            <div className="text-center">
                                                                <input
                                                                    className="text-center"
                                                                    type="checkbox"
                                                                    // checked={checkedAll}
                                                                    // checked={gridData.filter((item) => item?.isChecked !== 1).length < 1}
                                                                    disabled={RoleDDL.ID === 0}
                                                                    onChange={(e) => handleAllSelectChecklist(e)}
                                                                />
                                                            </div>
                                                        </th>
                                                        {/* <th>State/District/Taluka/Village </th> */}
                                                        <th>{gridData && gridData.length > 0 ? gridData[0].headerLabel : ''}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    </tr>
                                                    {
                                                        // tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map
                                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                                            <tr key={i}>
                                                                <>
                                                                    <td className="text_center">
                                                                        <div className="text-center">
                                                                            <input
                                                                                // className="text-center"
                                                                                type="checkbox"
                                                                                name={item.paramName}
                                                                                value={item.paramID}
                                                                                checked={item.isChecked}
                                                                                // checked={item.isChecked === 1 ? true : false}
                                                                                onChange={(e) => {
                                                                                    handleOnCheckClick(e, i, !item.isChecked)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        {item.paramName}
                                                                        {/* {
                                                                            RoleDDL.ID == 6 ?
                                                                                item.paramName
                                                                                :
                                                                                (RoleDDL.ID == 7 || RoleDDL.ID == 8) ?
                                                                                    item.districtName
                                                                                    :
                                                                                    RoleDDL.ID == 9 ?
                                                                                        item.talukaName
                                                                                        :
                                                                                        ""

                                                                        } */}

                                                                    </td>
                                                                </>
                                                                {/* // :
                                                                    // <></>

                                                            // } */}

                                                            </tr>
                                                        )) : <tr>No data</tr>
                                                    }


                                                </tbody>
                                            </table>
                                        </div>

                                        {
                                            tableData && tableData.table && tableData.table.length > 0 &&
                                            <div className="filter mb-5">
                                                <div className="col-12 col-lg-12 ">

                                                    <button type="button" className=" mx-2 btn btn-clear text-white mr-2 float-end waves-effect waves-light"
                                                        onClick={() => handleClear()} style={{width:"106px"}}>
                                                        <X size={18} style={{ marginRight: "3px" }} /> Cancel
                                                    </button>
                                                    <button type="button" className="mx-2 btn btn-primary text-white mr-2 float-end waves-effect waves-light" style={{ padding: "0.58rem 1rem" }}
                                                        onClick={handelAssignClicked}
                                                    >
                                                        {/* <Search/> */}
                                                        <Save size={18} style={{ marginRight: "8px" }} />
                                                        Assign
                                                    </button>
                                                </div>
                                            </div>
                                        }


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
            </main>

            {/* {
                PopUpField.addPopUp ? <LeaveApprovedPopUp open={PopUpField.addPopUp} handleCloseClick={handleCloseClick} PopUpField={PopUpField} /> : <></>
            } */}


        </>
    )
}
