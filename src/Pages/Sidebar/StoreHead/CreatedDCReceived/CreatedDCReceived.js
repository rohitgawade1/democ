import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import Header from "../../../../Components/Header/Header";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import InvoiceGeneratePopUp from "../../../Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoiceGenerate/InvoiceGeneratePopUp";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import QuantityPopUpCommon from "../../../Private/DashBoard/DashboardPages/DCStoreTable/QuantityPopUpCommon";
import { AstricSign } from "../../../../Helper/AstricSign";
import ForwardPop from "./ForwardPop";
import DispatchPop from "./DispatchPop";
export default function CreatedDCReceived() {
  const [searchParams] = useSearchParams();
  let ScreenName = searchParams.get("ScreenName");

  const [QuantityPopUpHeading, setQuantityPopUpHeading] = useState();

  const [invoiceGeneratePopUp, setinvoiceGeneratePopUp] = React.useState();

  const [forwardGeneratePop, setForwardGeneratePop] = useState()
  const [dispatchGeneratePop, setDispatchGeneratePop] = useState()

  const quantityPopUpClick = () => {
    setinvoiceGeneratePopUp(true);
  };

  const handleForwardPop = () => {
    setForwardGeneratePop(true)
  }

  const handleDispatchPop = () => {
    setDispatchGeneratePop(true)
  }

  const handleCloseClick = () => {
    setinvoiceGeneratePopUp(false);
    setForwardGeneratePop(false)
    setDispatchGeneratePop(false)
  };

  const handleForwardClose = () => {

  }


  return (
    <>
      <main className="main-content position-relative border-radius-lg ">
        <Header />
        <Sidebar active={ScreenName} />
        <div id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid xyz">
              <div className="row mt_40">
                <div className="row mt-5">
                  <div className="col-md-12 grid-margin">
                    <div className="row page-heading">
                      <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                        <h4 className="fontStyle">
                          {" "}
                          {`${ScreenName}`}{" "}
                        </h4>
                      </div>
                      <div className="col-12 col-lg-4 mb-xl-0">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                          table="totalordergenerated"
                          filename="data"
                          sheet="data"
                          pageOrientation="Landscape"
                          buttonText="Export"
                          style={{ borderColor: "black" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 shadow table-card mt-1 mx-2">
                    <div className="filter mb-2 mt-2">
                      <div className="card-body">
                        <div className="filter-bg p-2">
                          <div className="row">
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  State
                                  <AstricSign />
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Season
                                  <AstricSign />
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Month <AstricSign />
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  District
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Officer Name
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Dealer Name
                                </label>
                                <Select isClearable isSearchable />
                              </div>
                            </div>

                            {ScreenName === "DCCreated" ? (
                              <>
                                <div className="col-md-6 col-lg-3">
                                  <div className="form-group">
                                    <label
                                      className="d-block"
                                      htmlFor="NameofDepartment"
                                    >
                                      DC No
                                    </label>
                                    <Select isClearable isSearchable />
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                  <div className="form-group">
                                    <label
                                      className="d-block"
                                      htmlFor="NameofDepartment"
                                    >
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
                              </>
                            ) : (
                              <>
                                <div className="col-md-6 col-lg-3">
                                  <div className="form-group">
                                    <label
                                      className="d-block"
                                      htmlFor="NameofDepartment"
                                    >
                                      Invoice No
                                    </label>
                                    <Select isClearable isSearchable />
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                  <div className="form-group">
                                    <label
                                      className="d-block"
                                      htmlFor="NameofDepartment"
                                    >
                                      Invoice Date{" "}
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
                              </>
                            )}
                            {
                              ScreenName === 'Forwarded DC' ?
                                <>
                                  <div className="col-md-6 col-lg-3">
                                    <div className="form-group">
                                      <label
                                        className="d-block"
                                        htmlFor="NameofDepartment"
                                      >
                                        Store Name
                                      </label>
                                      <Select isClearable isSearchable />
                                    </div>
                                  </div>
                                </>
                                :
                                <></>
                            }
                            <div className="col-12 mt-3 align-items-end col-lg-2 clear">
                              {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                              <button
                                type="button"
                                className="btn btn-clear float-start mt-lg-2 allBtn mx-2"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive ">
                      <table
                        id="totalordergenerated"
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                        className="table table-bordered"
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "center", width: "5%" }}>
                              Sr.No.
                            </th>
                            <th>State</th>
                            <th>Season</th>
                            <th>District</th>
                            {ScreenName === "DC Created" || ScreenName === 'Forwarded DC' || ScreenName === 'Dispatched Orders' ? (
                              <>
                                <th>Dc Date</th>
                                <th>Dc No.</th>
                              </>
                            ) : (
                              <></>
                            )}
                            <th>invoice Date/invoice No</th>
                            <th>Order Date/Order No</th>
                            <th>Dealer Name</th>
                            <th>Product Quantity</th>
                            <th>Order Amount (Rs)</th>
                            <th>Officer Name</th>
                            {
                              ScreenName === 'Forwarded DC' ?
                                <th>Store Name</th> :
                                <></>
                            }
                            {ScreenName == "Received Invoice" || ScreenName === "DC Pending" ? (
                              <>
                                <th>Invoice Document</th>
                                <th>Action</th>
                              </>
                            ) : (
                              <></>
                            )}

                            {ScreenName === "Dispatched Orders" ? (
                              <>
                                <th>Invoice Document</th>
                                <th>DC Document</th>
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ textAlign: "center" }}>
                            <td>1</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            {ScreenName === "Received Invoice" || ScreenName === "DC Pending" ? (
                              <>
                                <td>-</td>
                              </>
                            ) : (
                              <></>
                            )}
                            {ScreenName === "DC Created" || ScreenName === 'Forwarded DC' ? (
                              <>
                                <td>-</td>
                                <td>-</td>
                              </>
                            ) : (
                              <></>
                            )}
                            <td>-</td>
                            <td>-</td>
                            {
                              ScreenName === 'Forwarded DC' ?
                                <td>-</td> :
                                <></>
                            }
                            {
                              ScreenName === 'Dispatched Orders' ?
                                <>
                                  <td>-</td>
                                  <td>-</td>
                                  <td>-</td>
                                </>
                                :
                                <></>
                            }

                            <td>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => quantityPopUpClick()}
                              >
                                <u> PopUp </u>
                              </span>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            {
                              ScreenName === 'Forwarded DC' || ScreenName === 'Dispatched Orders' ?
                                <td>-</td> :
                                <></>
                            }
                            {ScreenName === "Received Invoice" || ScreenName === "DC Pending" ? (
                              <>
                                <td>-</td>
                                <td className="p-1">
                                  <span onClick={() => handleForwardPop()}>
                                    <i
                                      class="fa-solid fa-share mx-2"
                                      style={{ cursor: "pointer", fontSize: "1rem" }}
                                    ></i>
                                  </span>
                                  <span onClick={() => handleDispatchPop()}>
                                    <i
                                      class="fa-solid fa-right-from-bracket mx-2 "
                                      style={{ cursor: "pointer", fontSize: "1rem" }}
                                    ></i>
                                  </span>
                                </td>
                              </>
                            ) : (
                              <></>
                            )}
                            {ScreenName === "Dispatched Orders" ? (
                              <>
                                <td>-</td>
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {invoiceGeneratePopUp ? (
        <QuantityPopUpCommon
          open={invoiceGeneratePopUp}
          handleCloseClick={handleCloseClick}
          QuantityPopUpHeading="Total Order generated Quantity"
        />
      ) : (
        <></>
      )}
      {
        forwardGeneratePop ? (
          <ForwardPop
            open={forwardGeneratePop}
            handleCloseClick={handleCloseClick}
            QuantityPopUpHeading="Forward"
          />
        ) : (
          <></>
        )}
      {
        dispatchGeneratePop ? (
          <DispatchPop
            open={dispatchGeneratePop}
            handleCloseClick={handleCloseClick}
            QuantityPopUpHeading="Dispatch"
          />
        ) : (
          <></>
        )}

    </>
  );
}
