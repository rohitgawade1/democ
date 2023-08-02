import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { Loading } from '../../../../../Helper/Loading'
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export default function DealerWiseVisitDetail() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    // console.log('token', token , 'UserID',UserID)

    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)

    const [rawMaterialTextField, setrawMaterialTextField] = useState(
        {
            rawMaterialName: "",

        }
    )

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        popupBtn: "",
        apiFlag: "",
        rowData: ""
    })

    const handleInputChange = (e) => {
        setrawMaterialTextField({ ...rawMaterialTextField, [e.target.name]: e.target.value })
    }


    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, deletePopUp: false, addPopUp: true, apiFlag: "Insert", popupFlag: "Add", popupBtn: "Clear" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, deletePopUp: false, addPopUp: true, apiFlag: "Update", popupFlag: "Update", popupBtn: "Cancel" })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, deletePopUp: true, addPopUp: false, apiFlag: "Delete", popupFlag: "", popupBtn: "" })
    }


    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setrawMaterialTextField({
            rawMaterialName: "",

        })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    return (
        <>
            {/* {isLoading && <Loading />} */}
            {/* {isDeleteLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="dealerwiseVisitdetail" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Dealer Wise Visit Details</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
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
                                    <div className="col-12 shadow table-card mt-1 mx-2">
                                        <div className="filter mb-2 mt-2">
                                            <div className="card-body">
                                                <div className='filter-bg p-2'>
                                                    <div className="row">

                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month</label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Date </label>
                                                                <input
                                                                    className="form-control"
                                                                    id="rawMaterialName"
                                                                    type="date"
                                                                    name="rawMaterialName"
                                                                    // value={productWiseRawMaterialTextField.rawMaterialName}
                                                                    // onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Visit Place </label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Name </label>
                                                                <Select
                                                                    isClearable
                                                                    isSearchable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn float-start"
                                                                
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn float-start"
                                                                onClick={() => handleClear()}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                        {/* <div className='row'> */}
                                                            <div className="col-12 col-lg-8 mt-4 text-end">
                                                                {/* <span className='px-2 fw-bold' style={{ color: "#344769" }}>Physical Total:-00 </span> */}
                                                                <span className='px-2 fw-bold ' style={{ color: "#344769", fontSize: "18px" }}>Dealer Visit Count :- 00  </span>

                                                            </div>

                                                        {/* </div> */}

                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive pb-3">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th>Date</th>
                                                        <th>Dealer Name  </th>
                                                        <th>Visit Place</th>
                                                        <th>Photo</th>
                                                        <th>Track Geo Tagging</th>
                                                        <th>Remark</th>
                                                        {/* <th style={{ width: "150px", textAlign: "center" }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ textAlign: "center" }}>

                                                        <td>1</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        {/* <td>
                                                            <span className='tableIcon'
                                                                onClick={() => editButtonClick()}
                                                            >
                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                            </span>
                                                            <span className='tableIcon'
                                                                onClick={() => deleteButtonClick()}
                                                            >
                                                                <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                            </span>
                                                        </td> */}
                                                    </tr>


                                                </tbody>
                                            </table>

                                            {/* {tableData && tableData.table && tableData.table.length > 0 &&
                                                <Pegination
                                                    PerPageCount={PerPageCount}
                                                    TotalCount={tableData.table[0].totalCount}
                                                    setFrom={setFrom}
                                                    setTo={setTo}
                                                    setrowNo={setrowNo}
                                                    CurrentPage={CurrentPage}
                                                    setCurrentPage={setCurrentPage}
                                                />
                                            } */}

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
