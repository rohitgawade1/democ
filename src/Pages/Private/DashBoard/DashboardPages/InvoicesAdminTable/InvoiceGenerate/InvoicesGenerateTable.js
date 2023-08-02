import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'
import Header from '../../../../../../Components/Header/Header'
import Sidebar from '../../../../../../Components/Sidebar/Sidebar'
import InvoiceGeneratePopUp from './InvoiceGeneratePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InvoiceCreatePopUp from '../InvoiceCreate/InvoiceCreatePopUp'
import { AstricSign } from '../../../../../../Helper/AstricSign'
import { useAuthState } from '../../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DistrictNameDDLAPI, MonthDDLAPI, SeasonDDLAPI, StateNameDDLAPI } from '../../../../../../Redux/DDLSlice'
import { StateNameDataDDL } from '../../../../../../Components/CommonDDL/StateNameDataDDL'
import { SeasonDataDDL } from '../../../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../../../Components/CommonDDL/MonthDataDDL'
import { DistrictNameDataDDL } from '../../../../../../Components/CommonDDL/DistrictNameDataDDL'

export default function InvoicesGenerateTable() {

    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")

    const [Date, setDate] = useState('')

    const [invoiceCreatePopUp, setinvoiceCreatePopUp] = React.useState()

    const quantityPopUpClick = () => {
        setinvoiceCreatePopUp(true)
    }
    const handleCloseClick = () => {
        setinvoiceCreatePopUp(false)
    }

    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StateNameDDLAPI({ data }))
    }, [])

    const { StateDDLData } = useSelector(state => state.StateNameDDL)
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
    }, [])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(MonthDDLAPI({ data }))
    }, [])

    const { MonthData } = useSelector(state => state.MonthDDLData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    const handleClear = () => {
        // setIsClear(!IsClear)
        
        setDate('')
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        })
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select...",
        })

        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select...",
        })
       
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
        
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
                                                <h4 className="fontStyle"> {`Invoice Created By Admin -> ${searchName}`}</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-center">
                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                                                    table="invoice-generated"
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
                                                        <StateNameDataDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDDLData={StateDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                        <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                        <MonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthData={MonthData}
                                                            />
                                                        </div>


                                                        <div className="col-md-6 col-lg-3">
                                                        <DistrictNameDataDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDDLData={DistrictDDLData}
                                                            />
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
                                                        {
                                                            searchName === "Rejected" ?
                                                                <></>
                                                                :
                                                                <div className="col-md-6 col-lg-3">
                                                                    <div className="form-group">
                                                                        <label className="d-block" htmlFor="NameofDepartment">Invoice Date </label>
                                                                        <input
                                                                            type="date"
                                                                            className='form-control'
                                                                            name='joiningDate'
                                                                        // value={UserTextField.joiningDate}
                                                                        // onChange={(e) => handleInputChange(e)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                        }
                                
                                                         <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Invoice No</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-2 clear">
                                                            {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                                                            <button type="button" className="btn btn-clear float-start mt-lg-4 allBtn mx-2"
                                                                onClick={handleClear}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id='invoice-generated' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                <tr>
                                                        <th style={{ textAlign: "center", width: "5%" }}>Sr.No.</th>
                                                        {
                                                            RoleID == 7 || RoleID == 8 ?
                                                                <></>
                                                                :
                                                                <th>State</th>
                                                        }
                                                        <th>Season</th>
                                                        <th>Invoice No</th>
                                                        <th>Invoice Date</th>
                                                        <th>Order Date/Order No</th>                                                      
                                                        <th>District</th>
                                                        <th>Dealer Name</th>
                                                        <th>Product Quantity</th>
                                                        <th>Order Amount (Rs)</th>
                                                        <th>Officer Name</th>
                                                        <th>Order Book</th>
                                                        <th>Invoice Document</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr style={{ textAlign: "center" }}>
                                                        <td>1</td>
                                                        {
                                                            RoleID == 7 || RoleID == 8 ?
                                                                <></>
                                                                :
                                                                <td>-</td>
                                                        }
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>
                                                            <span style={{ cursor: "pointer" }}
                                                                onClick={() => quantityPopUpClick()}
                                                            >
                                                                <u> PopUp </u>
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

            {/* {
                invoiceGeneratePopUp ? <InvoiceGeneratePopUp open={invoiceGeneratePopUp} handleCloseClick={handleCloseClick} /> : <></>
            } */}
             {
                invoiceCreatePopUp ? <InvoiceCreatePopUp open={invoiceCreatePopUp} handleCloseClick={handleCloseClick} /> : <></>
            }
        </>
    )
}


