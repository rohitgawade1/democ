import React from 'react'
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';
import { ApprovalRejectAPI } from '../../../../Redux/ClientAdminSlice/LeaveApprovalMasterSlice';

export default function LeaveApprovedPopUp({open,handleAddCloseClick,handleDeleteData,PopUpField,handlePost,Title,handleApproved}) {
    const { popupFlag, popupBtn, apiFlag, rowData,approvedRejFlag } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    
    // const handleApproved = () => {
    //     const data = {
    //         M_EmployeeLeaveID: rowData?.m_EmployeeLeaveID,
    //         M_UserID: UserID,
    //         token: token,
    //         Flag: approvedRejFlag,
    //         handlePost: handlePost,
    //         handleAddCloseClick: handleAddCloseClick
    //     }
    //     dispatch(ApprovalRejectAPI({ data }))
    // }

    return (
        <Popup open={open} closeOnDocumentClick onClose={handleAddCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call "> {Title}</div>
            <div className="modal-body">
                <div className="col-12 col-lg-12">
                    <div className="btn-action d-flex justify-content-center mt-4" >
                       
                        <button type="button"
                            className="btn btn-md btn-primary m-2 float-right"
                            onClick={handleAddCloseClick}
                        >Cancel</button>
                         <button
                            type="button"
                            className="btn btn-md btn-danger m-2 float-right"
                            onClick={() => handleApproved()}
                        >Yes</button>
                    </div>
                </div>
            </div>

        </Popup>
    )
}


