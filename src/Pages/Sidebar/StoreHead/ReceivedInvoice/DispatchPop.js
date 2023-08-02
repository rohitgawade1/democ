import React, { useState } from "react";
import Popup from "reactjs-popup";
import { DispatchStorePopUpPostAPI } from "../../../../Redux/StateInChargeSlice/ApprovalOrderSlice";
import { useAuthState } from "../../../../Helper/Context";
import { convertAfterImageBase64 } from "../../../../Helper/convertAfterImageBase64";
import { useDispatch } from "react-redux";

export default function DispatchPop({ open, handleCloseClick, QuantityPopUpHeading, PopUpField, handlePost }) {

  const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
  const userDetails = useAuthState();
  const { UserID, token } = userDetails
  const dispatch = useDispatch()

  const [DcNo, setDcNo] = useState('')
  const [DcDate, setDcDate] = useState('')
  const [VehicleName, setVehicleName] = useState('')
  const [VehicleNo, setVehicleNo] = useState('')
  const [LorryReceiptNo, setLorryReceiptNo] = useState('')
  const [Freight, setFreight] = useState('')
  const [Documents, setDocuments] = useState('')
  
  const Document = async (e) => {
    console.log(e);
    const file = e.target.files[0]
    // console.log(file);
    const base64 = await convertAfterImageBase64(file)
    setDocuments(base64.split(',')[1])
}

  const handleDispatched = () => {
    const data = {
      T_OrderPunchID: PopUpField.rowData?.t_OrderPunchID,
      DC_No: DcNo,
      DC_Date: DcDate,
      DocumentPath: Documents,
      DispatchedThrough: VehicleName,
      VehicleNo: VehicleNo,
      LorryReceiptNo: LorryReceiptNo,
      FreightToPayPaid: Freight,
      M_UserID: UserID,
      token: token,
      handlePost: handlePost,
      handleAddCloseClick: handleCloseClick
    }
    dispatch(DispatchStorePopUpPostAPI({ data }))
  }

  return (
    <>
      <Popup
        open={open}
        closeOnDocumentClick={false}
        onClose={handleCloseClick}
      >
        <span className="close" onClick={handleCloseClick}>
          &times;
        </span>
        <div className="call"> {QuantityPopUpHeading} </div>
        <div className="modal-body">
          <div className="row details-row">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    DC Date
                  </label>
                  <input type="date" className="form-control"
                    name="DcDate"
                    value={DcDate}
                    onChange={(e) => setDcDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    DC No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="DcNo"
                    value={DcNo}
                    onChange={(e) => setDcNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" for="NameofDepartment">Other Document</label>
                  <input type="file" className="form-control"
                    name="filename"
                    accept=".pdf"
                    onChange={(e) => {
                      Document(e)
                    }}
                  />
                  {/* <span style={{ color: "red", fontSize: "13px" }}>{onGoingImageSizeError}</span> */}
                </div>
              </div>
          
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="VehicleName"
                    value={VehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    Vehicle No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="VehicleNo"
                    value={VehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    Lorry Receipt No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="LorryReceiptNo"
                    value={LorryReceiptNo}
                    onChange={(e) => setLorryReceiptNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    Freight to Pay / Paid
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Freight"
                    value={Freight}
                    onChange={(e) => setFreight(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-lg-6 clear">
                  {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                  <button
                    type="button"
                    className="btn addBtns mt-lg-3 allBtn float-start mx-2"
                    onClick={() => handleDispatched()}
                  >
                    Dispatch
                  </button>
                  <button
                    type="button"
                    className="btn btn-clears float-start mt-lg-3 allBtn mx-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
