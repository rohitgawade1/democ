import React from 'react'
import Popup from 'reactjs-popup'

export default function CommonQuantityPopUp({ open, handleCloseClick, PopUpField }) {
    const { popupFlag } = PopUpField
    return (


        <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
            <span className="close" onClick={handleCloseClick}>
                &times;
            </span>
            <div className="call"> Add Quantity Pop </div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="table-responsive ">
                        <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                    <th>Product Name </th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                    {/* <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            

                            <button
                                type="button" className="btn addBtn allBtn float-right"
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clear text-white mr-2 mx-2 allBtn float-right"
                            >
                                Cancel
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>


        </Popup>





    )
}
