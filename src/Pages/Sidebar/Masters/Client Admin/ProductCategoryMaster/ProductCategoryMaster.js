import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Header from '../../../../../Components/Header/Header'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import ProductCategoryAddPopUp from './ProductCategoryAddPopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCategoryDeleteAPI, ProductCategoryExportTableDataAPI, ProductCategoryTableDataAPI } from '../../../../../Redux/ClientAdminSlice/ProductCategorySlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../../Helper/Loading'
import { ProductCategoryMasterExport } from './ProductCategoryMasterExport'


export default function ProductCategoryMaster() {
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

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [ProductCategoryTextField, setProductCategoryTextField] = useState(
        {
            productCategoryName: "",
        }
    )

    const handleCloseClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: false })
    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductCategoryTextField({
            productCategoryName: "",
        })
    }

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
    const handleInputChange = (e) => {
        setProductCategoryTextField({ ...ProductCategoryTextField, [e.target.name]: e.target.value })
    }
    const handleDeleteData = () => {
        dispatch(ProductCategoryDeleteAPI({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }))
    }

    const { isDeleteLoading } = useSelector(state => state.DepartmentDeleteData)

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To
        }
        dispatch(ProductCategoryTableDataAPI({ data, ProductCategoryTextField }))
    }, [To, IsSearch, IsClear, IsPost])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999'
        }
        dispatch(ProductCategoryExportTableDataAPI({ data, ProductCategoryTextField }))
    }, [To, IsSearch, IsClear, IsPost])

    const { tableData, isLoading } = useSelector(state => state.ProductCategoryTableData)
    const { ProductCategoryExporttableData, isExportLoading } = useSelector(state => state.ProductCategoryExportTableData)


    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="productcategorymaster" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Product Category Master</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        ProductCategoryExporttableData && ProductCategoryExporttableData.table && ProductCategoryExporttableData.table.length > 0 &&
                                                        <ProductCategoryMasterExport
                                                            ExcelData={ProductCategoryExporttableData}
                                                            name='Product Category Master'
                                                        />
                                                }
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
                                                        <div className="col-md-3 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Product Category</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="productCategoryName"
                                                                    type="text"
                                                                    name="productCategoryName"
                                                                    value={ProductCategoryTextField.productCategoryName}
                                                                    onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-4 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mx-2 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive pb-3">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Product Category</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.categoryName ? item.categoryName : '-'}</td>

                                                                <td style={{textAlign:'center'}}>
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
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
                                            {tableData && tableData.table && tableData.table.length > 0 &&
                                                <Pegination
                                                    PerPageCount={PerPageCount}
                                                    TotalCount={tableData.table[0].totalCount}
                                                    setFrom={setFrom}
                                                    setTo={setTo}
                                                    setrowNo={setrowNo}
                                                    CurrentPage={CurrentPage}
                                                    setCurrentPage={setCurrentPage}
                                                />
                                            }
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {
                PopUpField.addPopUp ? <ProductCategoryAddPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteData={handleDeleteData}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                /> : <></>
            }

        </>
    )
}
