import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { DesignationPostAPI } from '../../../../Redux/MasterSlice/DesignationSlice'
import { useAuthState } from '../../../../Helper/Context'
import { AstricSign } from '../../../../Helper/AstricSign'
import { RegExAlphabetsandSpecialCharacters } from '../../../../Helper/regEx/RegExOnlyText'

export default function DesignationPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [designationTextField, setdesignationTextField] = useState(
        {
            M_DesignationID: apiFlag === "Insert" ? "0" : rowData?.m_DesignationID,
            DesignationName: apiFlag === "Insert" ? "" : rowData?.designationName
        }
    )

    const handleInputChange = (e) => {
        setdesignationTextField({ ...designationTextField, [e.target.name]: e.target.value })
    }

    const InsertUpdate = () => {
        const addData = {
            M_DesignationID: designationTextField.M_DesignationID,
            DesignationName: designationTextField.DesignationName,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(DesignationPostAPI(addData))
    }
    const handleClear = () => {
        setdesignationTextField({
            M_DesignationID: '0',
            DesignationName: ''
        })
    }
    // const {} = useSelector(state=>state.)

    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExAlphabetsandSpecialCharacters(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Add Designation Master </div>
            <div className="modal-body">
                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Designation Name <AstricSign /></label>
                            <input
                                className="form-control"
                                id="DesignationName"
                                type="text"
                                name="DesignationName"
                                value={designationTextField.DesignationName}
                                onChange={(e) => handleCheckText(e)}
                            />
                            {
                                IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                            }
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => InsertUpdate()}
                                disabled={
                                    designationTextField.DesignationName === '' ||
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
