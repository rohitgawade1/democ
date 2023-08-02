import React from 'react'
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';
import { ApprovalRejectAPI } from '../../../../Redux/ClientAdminSlice/LeaveApprovalMasterSlice';
import { useState } from 'react';

export default function LeaveRejectPopUp({ open,handleAddCloseClick,handleDeleteData,PopUpField,handlePost }) {
    const { popupFlag, popupBtn, apiFlag, rowData,approvedRejFlag } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [RejectTextField, setRejectTextField] = useState(
        {
            Remark: apiFlag === "Insert" ? '' : rowData?.stateInChargeRemark,

        }
    )
    const handleInputChange = (e) => {
        setRejectTextField({ ...RejectTextField, [e.target.name]: e.target.value })
    }

    
    const handleReject = () => {
        const data = {
            M_EmployeeLeaveID: rowData?.m_EmployeeLeaveID,
            Remark:RejectTextField?.Remark,
            M_UserID: UserID,
            token: token,
            Flag: approvedRejFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalRejectAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick onClose={handleAddCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call "> Do You Want to Reject? </div>
            <div className="modal-body">
                <div className='row'>
                    
                        <div className="modal-body">
                            <div className="row details-row">
                                <div className="col-md-12 col-lg-12 px-4">
                                    <div className="form-group">
                                        <label className="d-block" htmlFor="NameofDepartment">Remark</label>
                                        <textarea
                                            className="form-control"
                                            id="stateInChargeRemark"
                                            type="text"
                                            name="stateInChargeRemark"
                                            value={RejectTextField.stateInChargeRemark}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                            <button
                                    type="button"
                                    className="btn btn-md btn-success m-2 float-right"
                                onClick={() => handleAddCloseClick()}
                                >Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-md btn-primary m-2 float-right"
                                    onClick={() => handleReject()}
                                >Yes</button>
                            </div>
                        </div>
                    
                </div>

            </div>

        </Popup>
    )
}


