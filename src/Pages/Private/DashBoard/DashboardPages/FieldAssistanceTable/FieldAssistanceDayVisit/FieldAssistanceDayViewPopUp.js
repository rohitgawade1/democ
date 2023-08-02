import React from 'react'
import Popup from 'reactjs-popup'

export default function FieldAssistanceDayViewPopUp({open,handleCloseClick}){
  return (
    <>
       <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> Field Assistant </div>
                <div className="modal-body">
                    <div className="row details-row">
                    <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Remark</label>
                            <textarea
                                className="form-control"
                                id="Remark"
                                type="text"
                                name="Remark"
                            />
                        </div>
                    </div>
                    </div>
                </div>


            </Popup>
    </>
  )
}


