import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import Header from '../../../../../../Components/Header/Header'
import Sidebar from '../../../../../../Components/Sidebar/Sidebar'
import InvoicePendingPopUp from '../../InvoicesAdminTable/InvoicePending/InvoicePendingPopUp'
import QuantityPopUpCommon from '../QuantityPopUpCommon'
import ReactHTMLTableToExcel from "react-html-table-to-excel"


export default function DCPendingTable() {

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")

    const [invoicePendingPopUp, setinvoicePendingPopUp] = React.useState()
    const [QuantityPopUpHeading, setQuantityPopUpHeading] = useState()

    const quantityPopUpClick = () => {
        setinvoicePendingPopUp(true)
    }

    const handleCloseClick = () => {
        setinvoicePendingPopUp(false)
    }

    return (
        <>
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">{`DC Created By Store -> ${searchName}`}</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="dcpending-table"
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
                                    <div className="col-12 shadow table-card mt-1 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Name</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Order No</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Order Date</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div> */}

                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Product category</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div> */}

                                                        <div className="col-12 col-lg-2 clear">
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id='dcpending-table' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th>Order Date</th>
                                                        <th>Order No.</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Name</th>
                                                        <th>Packing Size</th>
                                                        <th>Quantity</th>
                                                        <th>Amount(RS)</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <td>1</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>
                                                            <span style={{ cursor: "pointer" }}
                                                                onClick={() => quantityPopUpClick()}
                                                            >
                                                                <u> Name </u>
                                                            </span>
                                                        </td>
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
                                                        <td>
                                                            <span style={{ cursor: "pointer" }}
                                                                onClick={() => quantityPopUpClick()}
                                                            >
                                                                <u> Name </u>
                                                            </span>
                                                        </td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {
                invoicePendingPopUp ?
                    <QuantityPopUpCommon
                        open={invoicePendingPopUp}
                        handleCloseClick={handleCloseClick}
                        QuantityPopUpHeading="DC Pending Quantity"
                    /> : <></>
            }
        </>
    )
}


