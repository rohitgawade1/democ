import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
// import FieldDayMasterPopUp from '../Client Admin/FieldDayMaster/FieldDayMasterPopUp'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { FieldDayExportTableDataAPI, FieldDayTableDataAPI, FieldayDeleteAPI } from '../../../../Redux/ClientAdminSlice/FieldDayMasterSlice'
import { useAuthState } from '../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { CropNameDDLAPI, CropTypeDDLAPI, MonthDDLAPI, ProductCatDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonDDLAPI } from '../../../../Redux/DDLSlice'
import { Loading } from '../../../../Helper/Loading'
// import { FieldDayMasterExport } from '../Client Admin/FieldDayMaster/FieldDayMasterExport'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { ProductSubCategoryDataDDL } from '../../../../Components/CommonDDL/ProductSubCategoryDataDDL'
import { ProductNameDataDDL } from '../../../../Components/CommonDDL/ProductNameDataDDL'
import { AvailableStockTableDataAPI } from '../../../../Redux/StockSlice/AvailableStockSlice'
import moment from 'moment'
// import ProductionDepartmentPopUp from './ProductionDepartmentPopUp'


export default function AvailableProduct() {
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

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

    const [mfgDate, setMfgDate] = useState('')
    const [expDate, setExpDate] = useState('')

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })
    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [ProductSubCategoryDDL, setProductSubCategoryDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Insert", popupFlag: "Add", popupBtn: "Clear" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Update", popupFlag: "Update", popupBtn: "Cancel", rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const handleDeleteData = () => {
        dispatch(FieldayDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.FieldDayDeleteData)

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select..."
        })
        setProductSubCategoryDDL({
            ...ProductSubCategoryDDL,
            ID: 0,
            Label: "Select..."
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select..."

        })
        setMfgDate('')
        setExpDate('')

    }
    const [forwardGeneratePop, setForwardGeneratePop] = useState()
    const handleForwardPop = () => {
        setForwardGeneratePop(true)
    }

    const handleCloseClick = () => {
        setForwardGeneratePop(false)
    };

    // ----Crop type DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCatDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)

    useEffect(() => {
        const data = {
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            MfgDate:mfgDate,
            ExpDate:expDate,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'SubMainStore'
        }
        dispatch(AvailableStockTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost, ProductCategoryDDL.ID,
        ProductSubCategoryDDL.ID,
        ProductNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.AvailableStockTableData)

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="availableProduct" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Available Stock</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}
                                                {/* {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        FieldDayExporttableData && FieldDayExporttableData.table && FieldDayExporttableData.table.length > 0 &&
                                                        <FieldDayMasterExport
                                                            ExcelData={FieldDayExporttableData}
                                                            name='Field day master'
                                                        />
                                                } */}
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
                                                            <ProductCategoryDataDDL
                                                                ProductCategoryDDL={ProductCategoryDDL}
                                                                setProductCategoryDDL={setProductCategoryDDL}
                                                                ProductCatDDLData={ProductCatDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <ProductSubCategoryDataDDL
                                                                ProductSubCategoryDDL={ProductSubCategoryDDL}
                                                                setProductSubCategoryDDL={setProductSubCategoryDDL}
                                                                ProductSubCatDDLData={ProductSubCatDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <ProductNameDataDDL
                                                                ProductNameDDL={ProductNameDDL}
                                                                setProductNameDDL={setProductNameDDL}
                                                                ProductNameData={ProductNameData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Manufacturing Date</label>
                                                                <input
                                                                    type="date"
                                                                    className='form-control'
                                                                    name='joiningDate'
                                                                    value={mfgDate}
                                                                    onChange={(e) => setMfgDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Expiry Date</label>
                                                                <input
                                                                    type="date"
                                                                    className='form-control'
                                                                    name='joiningDate'
                                                                    value={expDate}
                                                                    onChange={(e) => setExpDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>



                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleClear()}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>

                                                        {/* <div className='row'> */}
                                                        {/* <div className="col-12 col-lg-9 mt-lg-5 text-end">
                                                                <span className='px-2 fw-bold' style={{ color: "#344769" }}>Physical Total:-00 </span>
                                                                <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Total Count :- 00  </span>

                                                            </div>

                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive pb-3 ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th>Product Category </th>
                                                        <th>Product Sub Category </th>
                                                        <th>Product Name</th>
                                                        <th>Pack Size</th>
                                                        <th>Quantity</th>
                                                        <th>Batch Code</th>
                                                        <th>Manufacturing Date</th>
                                                        <th>Expiry Date</th>
                                                        {/* <th>Field Day Count</th> */}
                                                        {/* <th style={{ width: "150px", textAlign: "center" }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i} style={{ textAlign: "center" }}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.categoryName ? item.categoryName : "-"}</td>
                                                                <td>{item.subCategoryName ? item.subCategoryName : "-"}</td>
                                                                <td>{item.product_Name ? item.product_Name : "-"}</td>
                                                                <td>{item.packingSize ? item.packingSize : "-"}</td>
                                                                <td>{item.qtyInHand ? item.qtyInHand : "-"}</td>
                                                                <td>{item.batchNo ? item.batchNo : "-"}</td>
                                                                <td>{item.mfgDate ? moment(item.mfgDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.expDate ? moment(item.expDate).format("DD-MM-YYYY") : "-"}</td>


                                                                {/* <td align='center'>
                                                                        <span onClick={() => handleForwardPop()}>
                                                                            <i
                                                                                class="fa-solid fa-share mx-1"
                                                                                style={{ cursor: "pointer", fontSize:'1rem', color:'#172b4d' }}
                                                                            ></i>
                                                                        </span>
                                                                        <span className='tableIcon'
                                                                            onClick={() => deleteButtonClick()}
                                                                        >
                                                                            <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                        </span>
                                                                    </td> */}
                                                            </tr>
                                                        )) : <tr>No data</tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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
            </main>

            {/* {
        forwardGeneratePop ? (
            <ForwardProdQuantityPopUp
              open={forwardGeneratePop}
              handleCloseClick={handleCloseClick}
              QuantityPopUpHeading="Forward"
            />
          ) : (
            <></>
          )} */}
            {/* {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            } */}

        </>
    )
}
