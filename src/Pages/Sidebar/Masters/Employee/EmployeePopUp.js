import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { DeptDDLAPI, DesignationDDLAPI, ddlDeaignationAsyncGet } from '../../../../Redux/DDLSlice'
import { DepartmentDDLAPI, EmployeePostAPI } from '../../../../Redux/MasterSlice/EmployeeSlice'
import { useAuthState } from '../../../../Helper/Context'
import { AstricSign } from '../../../../Helper/AstricSign'
import { RegExAlphabetsandSpecialCharacters, RegExEmail, RegExMobile, RegExNumbersOnly, RegExOnlyText } from '../../../../Helper/regEx/RegExOnlyText'

export default function EmployeePopUp({ open, handleAddCloseClick, PopUpField, handlePost, DeptDDLDataa }) {
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

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

    const [EmployeeTextField, setEmployeeTextField] = useState(
        {
            DepartmentName: DeptDDL.ID,
            designationName: DesigDDL.ID,
            EmployeeName: apiFlag === "Insert" ? '' : rowData?.employeeName ? rowData.employeeName : '',
            MobileNo: apiFlag === "Insert" ? '' : rowData?.mobileNumber ? rowData.mobileNumber : '',
            BloodGrp: apiFlag === "Insert" ? '' : rowData?.bloodGroup ? rowData.bloodGroup : '',
            Email: apiFlag === "Insert" ? '' : rowData?.email_ID ? rowData.email_ID : '',
        }
    )

    const handleInputChange = (e) => {
        setEmployeeTextField({ ...EmployeeTextField, [e.target.name]: e.target.value })
    }

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

    const handleAddUpdate = () => {
        const data = {
            M_EmployeeID: apiFlag === 'Insert' ? '0' : rowData?.m_EmployeeID,
            M_DepartmentID: DeptDDL.ID,
            M_DesignationID: DesigDDL.ID,
            EmployeeName: EmployeeTextField?.EmployeeName,
            MobileNumber: EmployeeTextField?.MobileNo,
            Email_ID: EmployeeTextField?.Email,
            BloodGrp: EmployeeTextField?.BloodGrp,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(EmployeePostAPI({ data }))
    }

    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExOnlyText(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckNumbers = (e) => {
        handleInputChange(e)
        const IsValid = RegExMobile(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    const [IsValidAplhaSpecial, setIsValidAplhaSpecial] = useState(false)
    const handleCheckAplhaSpecial = (e) => {
        handleInputChange(e)
        const IsValid = RegExAlphabetsandSpecialCharacters(e.target.value)
        setIsValidAplhaSpecial(IsValid)
        return IsValid
    }
    
    const [IsValidEmail, setIsValidEmail] = useState(false)
    const handleCheckEmail = (e) => {
        handleInputChange(e)
        const IsValid = RegExEmail(e.target.value)
        setIsValidEmail(IsValid)
        return IsValid
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Add Employee Master </div>
            <div className="modal-body">
                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Department Name <AstricSign /></label>

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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Designation <AstricSign /></label>
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Employee Name <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='EmployeeName'
                                value={EmployeeTextField.EmployeeName}
                                onChange={(e) => handleCheckText(e)}
                            />
                            {
                                IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Mobile No</label>
                            <input
                                type="text"
                                // maxLength={10}
                                className='form-control'
                                name='MobileNo'
                                value={EmployeeTextField.MobileNo}
                                onChange={(e) => handleCheckNumbers(e)}
                            />
                            {
                                IsValidNumbers && <text style={{ color: 'red' }}>Please enter Valid Mobile Number</text>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Blood Group</label>
                            <input
                                type="text"
                                className='form-control'
                                name='BloodGrp'
                                value={EmployeeTextField.BloodGrp}
                                onChange={(e) => handleCheckAplhaSpecial(e)}
                            />
                            {
                                IsValidAplhaSpecial && <text style={{ color: 'red' }}>Please enter Valid Blood Group</text>
                            }

                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Email</label>
                            <input
                                type="email"
                                className='form-control'
                                name='Email'
                                required
                                value={EmployeeTextField.Email}
                                onChange={(e) => handleCheckEmail(e)}
                            />
                            {
                                IsValidEmail && <text style={{ color: 'red' }}>Please enter Valid Email</text>
                            }
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled={
                                    DeptDDL.ID == 0 ||
                                    DesigDDL.ID == 0 ||
                                    EmployeeTextField.EmployeeName == '' ||
                                    // EmployeeTextField.MobileNo == '' ||
                                    IsValidText || IsValidAplhaSpecial || IsValidNumbers || IsValidEmail

                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                            // onClick={}
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


