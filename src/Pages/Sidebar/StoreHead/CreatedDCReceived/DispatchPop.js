import React from "react";
import Popup from "reactjs-popup";

export default function DispatchPop({
  open,
  handleCloseClick,
  QuantityPopUpHeading,
}) {
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
            <div className="col-12 col-md-5 col-lg-6">
              <div className="form-group">
                <label className="d-block" htmlFor="NameofDepartment">
                  DC Date{" "}
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  // value={UserTextField.joiningDate}
                  // onChange={(e) => handleInputChange(e)}
                />
              </div>
              </div>
              <div className="col-12 col-md-5 col-lg-6">
                <div className="form-group">
                  <label className="d-block" htmlFor="NameofDepartment">
                    DC No.{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="joiningDate"
                    // value={UserTextField.joiningDate}
                    // onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-6 col-md-5 col-lg-6">
                <div className="form-group">
                  <label className="d-block" for="NameofDepartment">
                    Document
                  </label>
                  <input type="file" className="form-control" name="filename" />
                  {/* <span style={{ color: "red", fontSize: "13px" }}>{onGoingImageSizeError}</span> */}
                </div>
              </div>
              <div className="row">
              <div className="col-6 col-lg-6 clear">
                              {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                              <button
                                type="button"
                                className="btn btn-clear float-start mt-lg-2 allBtn mx-2"
                              >
                                Forward
                              </button>
                              <button
                                type="button"
                                className="btn btn-clear float-start mt-lg-2 allBtn mx-2"
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
