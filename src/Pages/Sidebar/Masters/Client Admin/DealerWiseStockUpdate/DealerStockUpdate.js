import React, { useState } from 'react'
import Select from 'react-select'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import AcknowledgePopUp from '../../../../../Components/Common/AcknowledgePopUp'


export default function DealerStockUpdate() {
    const [PopUpField, setPopUpField] = React.useState({
        acknowledgePopUp: false,
    })

    const acknowldgeButtonClick = () => {
        setPopUpField({ acknowledgePopUp: true })
    }

    const handleCloseClick = () => {
        setPopUpField({ acknowledgePopUp: false })
    }


    return (
        <>
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="dealerStock" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Dealer Wise Stock Update</h4>
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

                                                        <div className="col-12 col-lg-3 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

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
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        {/* <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th> */}
                                                        <th>Date</th>
                                                        <th>Dealer Name </th>
                                                        <th>Product Category</th>
                                                        <th>Product Name</th>
                                                        <th>Pack Size</th>
                                                        <th>Manufacturing Date</th>
                                                        <th>Expiry Date</th>
                                                        <th>Available Quantity</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ textAlign: "center" }}>
                                                        {/* <td>1</td> */}
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>

                                                        {/* <td>
                                                            <span className='tableIcon'
                                                                onClick={() => acknowldgeButtonClick()}
                                                            >
                                                                <i className="fa fa-handshake-o" title='acknowledge' aria-hidden="true"></i>
                                                            </span>
                                                        </td> */}
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

            {
                PopUpField.acknowledgePopUp ?
                    <AcknowledgePopUp
                        open={PopUpField.acknowledgePopUp}
                        handleCloseClick={handleCloseClick}
                    /> : <></>
            }

        </>
    )
}
