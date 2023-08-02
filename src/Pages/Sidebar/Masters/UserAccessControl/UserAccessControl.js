import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import { Save, X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { RoleDDLAPI } from '../../../../Redux/DDLSlice'
import { useAuthState } from '../../../../Helper/Context'



export default function UserAccessControl() {
    const dispatch = useDispatch()

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: ""
    })

    const [RoleDDL, setRoleDDL] = useState({
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
        setRoleDDL({
            ...RoleDDL,
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

    return (
        <>
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="useraccesscontrol" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">User Access Control</h4>
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
                                                        <div className="col-12 col-md-6 col-lg-4">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">

                                                <thead>
                                                    <tr>
                                                        <th width="5% text-center">
                                                            <input type="checkbox" />
                                                        </th>
                                                        <th>Forms name</th>

                                                        {/* <th style={{ width: "150px", textAlign: "center" }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>-</td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="filter">
                                            <div className="col-12 col-lg-12 ">

                                                <button type="button" className=" mx-2 btn btn-clear text-white mr-2 float-end waves-effect waves-light"
                                                    onClick={() => handleClear()} style={{width:"94px"}} >
                                                    <X size={18} style={{ marginRight: "3px" }} /> Clear
                                                </button>
                                                <button type="button" className="mx-2 btn btn-primary text-white mr-2 float-end waves-effect waves-light" style={{ padding: "0.58rem 1rem" }}
                                                // onClick={handleOnSaveClick}
                                                >
                                                    {/* <Search/> */}
                                                    <Save size={18} style={{ marginRight: "8px" }} />
                                                    Save
                                                </button>
                                            </div>
                                        </div>
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
