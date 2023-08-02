import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { DepartmentPostAPI } from '../../../../Redux/MasterSlice/DepartmentSlice';
import { Loading } from '../../../../Helper/Loading';
import { AstricSign } from '../../../../Helper/AstricSign';
import { RegExAlphabetsandSpecialCharacters, RegExOnlyText } from '../../../../Helper/regEx/RegExOnlyText';

export default function DepartmentAddPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const { tableData, isLoading } = useSelector(state => state.DepartmentPostData)

    const [departmentTextField, setdepartmentTextField] = useState(
        {
            departmentName: apiFlag === "Insert" ? "" : rowData?.departmentName,
            departmentCode: apiFlag === "Insert" ? "" : rowData?.departmentCode
        }
    )
    const handleInputChange = (e) => {
        setdepartmentTextField({ ...departmentTextField, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
        setdepartmentTextField({
            departmentName: '',
            departmentCode: ''
        })
    }

    const Add = () => {
        const addData = {
            DepartmentID: apiFlag === 'Insert' ? '0' : rowData?.m_DepartmentID,
            UserID,
            token,
            apiFlag,
            departmentTextField,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(DepartmentPostAPI(addData))
    }

    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExAlphabetsandSpecialCharacters(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Add Department Master </div>
            <div className="modal-body">

                {isLoading && <Loading />}

                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Department Name <AstricSign /></label>
                            <input
                                className="form-control"
                                id="departmentName"
                                type="text"
                                name="departmentName"
                                value={departmentTextField.departmentName}
                                onChange={(e) => handleCheckText(e)}
                            />
                            {
                                IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Department Code <AstricSign /> </label>
                            <input
                                className="form-control"
                                id="departmentCode"
                                type="text"
                                name="departmentCode"
                                value={departmentTextField.departmentCode}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => Add()}
                                disabled={
                                    departmentTextField.departmentName == '' ||
                                    departmentTextField.departmentCode == '' ||
                                    IsValidText
                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                onClick={() => { popupBtn === 'Clear' ? handleClear() : handleAddCloseClick() }}
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
