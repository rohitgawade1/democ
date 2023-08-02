import React from "react";
import Header from "../../../../Components/Header/Header";
import Sidebar from "../../../../Components/Sidebar/Sidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Select from "react-select";

export default function DealerVisitAchievement() {
    return (
        <>
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                
                <Sidebar active="achiveDealer" listActive ="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Dealer Visit Achievement</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}
                                                {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-0 mx-2 waves-effect waves-light allBtn" style={{ float: "right" }}
                                                    onClick={() => addButtonClick()}
                                                >
                                                    Assign
                                                </button> */}

                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                    table="orderTargetDecide"
                                                    filename="data"
                                                    sheet="data"
                                                    pageOrientation='Landscape'
                                                    buttonText="Export"
                                                    style={{ borderColor: 'black' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 shadow table-card mt-2 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">

                                                        <div className="col-md-6 col-lg-4">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Taluka</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-4">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">District Officer</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-4 clear">
                                                            {/* <button type="button" className="btn btn-primary text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th style={{ textAlign: "center" }}>Taluka Name</th>
                                                        <th style={{ textAlign: "center" }}>District Officer</th>
                                                        <th style={{ textAlign: "center" }}>Dealer Name</th>
                                                        <th style={{ textAlign: "center" }}>Dealer Address</th>
                                                        <th style={{ textAlign: "center" }}>Photo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <td>1</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>
                                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <td>2</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>
                                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                                        </td>
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
        </>
    )
}