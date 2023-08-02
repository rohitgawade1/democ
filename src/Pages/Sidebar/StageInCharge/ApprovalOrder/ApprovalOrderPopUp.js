import React from 'react'
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';

export default function ApprovalOrderPopUp({ open, handleAddCloseClick, PopUpField, handleApproved }) {
    const { popupFlag, popupBtn, apiFlag, rowData, approvedRejFlag } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    return (
        <Popup open={open} closeOnDocumentClick onClose={handleAddCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call "> Do you want to Approve? </div>
            <div className="modal-body">
                <div className="col-12 col-lg-12">
                    <div className="btn-action d-flex justify-content-center mt-4" >
                        <button
                            type="button"
                            className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 px-4 waves-effect waves-light allBtn"
                            style={{ width: '60px' }}
                            onClick={() => handleApproved()}
                        >Yes</button>
                        <button type="button"
                            className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn"
                            style={{width:'60px'}}
                            onClick={handleAddCloseClick}
                        >No</button>
                    </div>
                </div>
            </div>

        </Popup>
    )
}


