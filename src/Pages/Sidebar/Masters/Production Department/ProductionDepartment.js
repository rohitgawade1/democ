import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import FieldDayMasterPopUp from '../Client Admin/FieldDayMaster/FieldDayMasterPopUp'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { FieldDayExportTableDataAPI, FieldDayTableDataAPI, FieldayDeleteAPI } from '../../../../Redux/ClientAdminSlice/FieldDayMasterSlice'
import { useAuthState } from '../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { CropNameDDLAPI, CropTypeDDLAPI, MonthDDLAPI, ProductCatDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonDDLAPI } from '../../../../Redux/DDLSlice'
import { Loading } from '../../../../Helper/Loading'
import { FieldDayMasterExport } from '../Client Admin/FieldDayMaster/FieldDayMasterExport'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { ProductSubCategoryDataDDL } from '../../../../Components/CommonDDL/ProductSubCategoryDataDDL'
import { ProductNameDataDDL } from '../../../../Components/CommonDDL/ProductNameDataDDL'
import ProductionDepartmentPopUp from './ProductionDepartmentPopUp'
import { ProductionHodTableDataAPI } from '../../../../Redux/ProductionHodSlice/ProductionHodSlice'
import { mockComponent } from 'react-dom/test-utils'
import moment from 'moment'


export default function ProductionDepartment() {
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()


    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(20)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [mfgDate, setmfgDate] = useState('')
    const [expDate, setExpDate] = useState('')

    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)

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
        console.log("Edit",item)
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

    const handleClearButton = () => {
        setProductCategoryDDL({
            // DDL: listProdCatData,
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductSubCategoryDDL({
            ...ProductSubCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setmfgDate('')
        setExpDate('')
    }

    // ----Crop type DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCatDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductCategoryDDL.ID, ProductSubCategoryDDL.ID])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)



    // ----Season DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
    }, [])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)

    useEffect(() => {
        const data = {
            M_UserID: UserID,
            token: token,
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            Flag: 'Production',
            From: From,
            To: '99999',
            ExpDate:expDate,
            MfgDate:mfgDate
        }
        dispatch(ProductionHodTableDataAPI({ data }))
            
    }, [IsPost, From,ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.ProductionHodTableData)

    return (
        <>
            {/* {isLoading && <Loading />}
            {isDeleteLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="productionDepartment" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Update Production Quantity</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
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
                                                                    onChange={(e) => setmfgDate(e.target.value)}
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
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleClearButton()}
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
                                        <div className="table-responsive pb-3 " style={{height:'350px'}}>
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
                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td>{i+1}</td>
                                                                <td>{item?.categoryName}</td>
                                                                <td>{item?.subCategoryName}</td>
                                                                <td>{item?.product_Name}</td>
                                                                <td>{item?.packingSize}</td>
                                                                <td>{item?.qtyInHand}</td>
                                                                <td>{item?.batchNo}</td>
                                                                <td>{item.mfgDate ? moment(item.mfgDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.expDate ? moment(item.expDate).format("DD-MM-YYYY") : "-"}</td>

                                                                <td>
                                                                    {/* <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span> */}
                                                                    <span className='tableIcon'
                                                                        onClick={() => deleteButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                    </span>
                                                                </td>
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

            {
                PopUpField.addPopUp ? <ProductionDepartmentPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}               
                    SeasonDDLData={SeasonDDLData}
               
                /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            }

        </>
    )
}
