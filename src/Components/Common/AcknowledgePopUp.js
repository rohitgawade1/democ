import React from 'react'
import Popup from 'reactjs-popup'

export default function AcknowledgePopUp({open,handleCloseClick,handleDeleteData,handleAckPost}) {
    return (
        <Popup open={open} closeOnDocumentClick onClose={handleCloseClick} className="DeletePopUp DeletePopUpwidth DeletePopUp-content">
            <span className="close" onClick={handleCloseClick}>
                &times;
            </span>
            <div className="call "> Do You Want To Acknowledge ? </div>
            <div className="modal-body">
                <div className="col-12 col-lg-12">
                    <div className="btn-action d-flex justify-content-center mt-4" >
                        <button
                            type="button"
                            className="btn btn-md btn-danger m-2 pt-2 pb-2 float-right"
                            onClick={() => handleAckPost()}
                        >Yes</button>
                        <button type="button"
                            className="btn btn-md btn-primary m-2 pt-2 pb-2 float-right"
                            onClick={() => {handleCloseClick()}}
                        >No</button>
                    </div>
                </div>
            </div>

        </Popup>
    )
}


