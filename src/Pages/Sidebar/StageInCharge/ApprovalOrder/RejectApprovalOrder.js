import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { ApprovalRejectAPI } from '../../../../Redux/ClientAdminSlice/LeaveApprovalMasterSlice'
import { useAuthState } from '../../../../Helper/Context';
import { useDispatch } from 'react-redux';
import { AstricSign } from '../../../../Helper/AstricSign';

export default function RejectApprovalOrder({ open, handleAddCloseClick, handleDeleteData, PopUpField, handlePost, handleReject, setRemark, Remark }) {
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
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

    return (
        <Popup open={open} closeOnDocumentClick onClose={handleAddCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call "> Do you want to Reject? </div>
            <div className="modal-body">
                <div className='row'>

                    <div className="modal-body">
                        <div className="row details-row">
                            <div className="col-md-12 col-lg-12 px-4">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">Reason <AstricSign /></label>
                                    <textarea
                                        className="form-control"
                                        id="stateInChargeRemark"
                                        type="text"
                                        name="stateInChargeRemark"

                                        // value={RejectTextField.stateInChargeRemark}
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <button
                                type="button"
                                // className="btn btn-md btn-primary m-2 float-right px-4 py-2"
                                className='btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 px-4 waves-effect waves-light allBtn'
                               style={{width: '80px'}}
                                onClick={() => handleReject()}
                                disabled={Remark === ''}
                            >Yes</button>
                            <button
                                type="button"
                                // className="btn btn-md btn-success m-2 float-right py-2"
                                className='btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn'
                                style={{width: '80px'}}
                                onClick={() => handleAddCloseClick()}
                            >Cancel</button>

                        </div>
                    </div>

                </div>

            </div>

        </Popup>
    )
}


