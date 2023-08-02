import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'

export default function SessionAddPopUp({ open, handleCloseClick, PopUpField }) {

    const { popupFlag, popupBtn } = PopUpField


    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
            <span className="close" onClick={handleCloseClick}>
                &times;
            </span>
            <div className="call">Session Master Popup</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Session Name</label>
                            <input
                                className="form-control"
                                id="sessionName"
                                type="text"
                                name="sessionName"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
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
