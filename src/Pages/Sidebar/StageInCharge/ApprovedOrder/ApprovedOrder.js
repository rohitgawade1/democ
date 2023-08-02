import React, { useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import { AstricSign } from '../../../../Helper/AstricSign'
import ProductDetailsPopUp from '../../../Private/DashBoard/DashboardPages/ReceivedApprovedRecejecte/DashboardProductDetailsPopUp'


export default function ApprovedOrder() {

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")

    const [ApprovedRejectPopUp, setApprovedRejectPopUp] = React.useState()
    const [ProductDetailsPopUpHeading, setProductDetailsPopUpHeading] = useState()
    const productDetailsPopUpClick = () => {
        setApprovedRejectPopUp(true)
    }

    const handleCloseClick = () => {
        setApprovedRejectPopUp(false)
    }

    return (
        <>
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="ApprovedOrder" listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> Approved Order</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="expenses"
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
                                                                <label className="d-block" htmlFor="NameofDepartment">State<AstricSign /></label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Season<AstricSign /></label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month <AstricSign /></label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">District</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Officer Name</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Name</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                       
                                                                <div className="col-md-6 col-lg-3">
                                                                    <div className="form-group">
                                                                        <label className="d-block" htmlFor="NameofDepartment">Order Date </label>
                                                                        <input
                                                                            type="date"
                                                                            className='form-control'
                                                                            name='joiningDate'
                                                                        // value={UserTextField.joiningDate}
                                                                        // onChange={(e) => handleInputChange(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                      

                                                        <div className="col-12 col-lg-2 clear">
                                                            {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                                                            <button type="button" className="btn btn-clear float-start mt-lg-4 allBtn mx-2"

                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-responsive ">

                                            <table id='expenses' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                    <th style={{ textAlign: "center", width: "5%" }}>Sr.No.</th>
                                                        <th>Order Date</th>
                                                        <th>Order No</th>
                                                        <th>District</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Quantity</th>
                                                        <th>Order Amount (Rs)</th>
                                                        <th>Officer Name</th>
                                                        {/* <th>Action</th> */}
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
                                                            <span style={{ cursor: "pointer" }}
                                                                onClick={() => productDetailsPopUpClick()}
                                                            >
                                                                <u> PopUp </u>
                                                            </span>
                                                        </td>

                                                       
                                                        <td>-</td>
                                                        <td>-</td>
                                                        {/* <td>-</td> */}
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
                ApprovedRejectPopUp ?
                    <ProductDetailsPopUp
                        open={ApprovedRejectPopUp}
                        handleCloseClick={handleCloseClick}
                        ProductDetailsPopUpHeading={searchName}
                    /> : <></>
            }
        </>
    )
}


