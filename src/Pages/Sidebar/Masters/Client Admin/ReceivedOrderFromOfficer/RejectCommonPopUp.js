import React from 'react'
import Popup from 'reactjs-popup'

export default function RejectCommonPopUp({open,handleAddCloseClick,handleDeleteData}) {
    return (
        <Popup open={open} closeOnDocumentClick onClose={handleAddCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call "> Do You Want To Reject ? </div>
            <div className="modal-body">
                <div className="col-12 col-lg-12">
                    <div className="btn-action d-flex justify-content-center mt-4" >
                        <button
                            type="button"
                            className="btn btn-md btn-danger m-2 float-right"
                            // onClick={() => handleDeleteData()}
                        >Yes</button>
                        <button type="button"
                            className="btn btn-md btn-primary m-2 float-right"
                            onClick={handleAddCloseClick}
                        >No</button>
                    </div>
                </div>
            </div>

        </Popup>
    )
}


