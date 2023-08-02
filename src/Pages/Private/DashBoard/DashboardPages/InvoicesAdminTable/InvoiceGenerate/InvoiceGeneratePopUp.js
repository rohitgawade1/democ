import React from 'react'
import Popup from 'reactjs-popup'

export default function InvoiceGeneratePopUp({ open, handleCloseClick }) {
    return (
        <>
            <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> Invoice Generate Quantity </div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="table-responsive ">
                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                        <th>Product Category</th>
                                        <th>Product Sub Category</th>
                                        <th>Product Name </th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr style={{ textAlign: "center" }}>
                                        <td>1</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>

                                    <tr style={{ textAlign: "center" }}>
                                        <td>2</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </Popup>
        </>
    )
}


