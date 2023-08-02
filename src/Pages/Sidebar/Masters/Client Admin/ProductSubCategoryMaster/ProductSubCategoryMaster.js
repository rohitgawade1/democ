import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Header from '../../../../../Components/Header/Header'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import ProductSubCategoryAddPopUp from './ProductSubCategoryAddPopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { ProductSubCategoryDeleteAPI, ProductSubCategoryExportTableDataAPI, ProductSubCategoryTableDataAPI } from '../../../../../Redux/ClientAdminSlice/ProductSubCategorySlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { ProductCategoryDDLAPI } from '../../../../../Redux/DDLSlice'
import { Loading } from '../../../../../Helper/Loading'
import { ProductSubCategoryExport } from './ProductSubCategoryExport'


export default function ProductSubCategoryMaster() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

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
        popupFlag: "",
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const dispatch = useDispatch()

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        handleDeptDDL()
    }, [ProductCatDDLData])

    const handleDeptDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductCatDDLData && ProductCatDDLData.table && ProductCatDDLData.table.length > 0) {
            let list = ProductCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_Product_CategoryID,
                label: item.categoryName,
            }))

            setProductCategoryDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setProductCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    // console.log(CategorytableData);

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_Product_CategoryID: ProductCategoryDDL.ID
        }
        dispatch(ProductSubCategoryTableDataAPI({ data }))
    }, [To, IsSearch, IsClear, IsPost, ProductCategoryDDL.ID])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            M_Product_CategoryID: ProductCategoryDDL.ID
        }
        dispatch(ProductSubCategoryExportTableDataAPI({ data }))
    }, [To, IsSearch, IsClear, IsPost, ProductCategoryDDL.ID])

    const { CategorytableData, isLoading } = useSelector(state => state.ProductSubCategoryTableData)
    const { ProductSubCategoryExporttableData, isExportLoading } = useSelector(state => state.ProductSubCategoryExportTableData)


    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }
    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Add", popupBtn: "Clear", apiFlag: 'Insert', rowData: '' })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Update", popupBtn: "Cancel", apiFlag: 'Update', rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const handleDeleteData = () => {
        dispatch(ProductSubCategoryDeleteAPI({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }))
    }

    const { isDeleteLoading } = useSelector(state => state.ProductSubCategoryDeleteData)


    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }


    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="productsubcategorymaster" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Product Sub Category Master</h4>
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
                                                        ProductSubCategoryExporttableData && ProductSubCategoryExporttableData.table && ProductSubCategoryExporttableData.table.length > 0 &&
                                                        <ProductSubCategoryExport
                                                            ExcelData={ProductSubCategoryExporttableData}
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
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: ProductCategoryDDL.ID, label: ProductCategoryDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setProductCategoryDDL({ ...ProductCategoryDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setProductCategoryDDL({ ...ProductCategoryDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={ProductCategoryDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-3 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
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
                                                        <th>Product Sub Category</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        CategorytableData && CategorytableData.table && CategorytableData.table.length > 0 ? CategorytableData.table.map((item, i) => (
                                                            <tr key={i} >
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                                                <td>{item.subCategoryName ? item.subCategoryName : '-'}</td>
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
                                            {CategorytableData && CategorytableData.table && CategorytableData.table.length > 0 &&
                                                <Pegination
                                                    PerPageCount={PerPageCount}
                                                    TotalCount={CategorytableData.table[0].totalCount}
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
                PopUpField.addPopUp ?
                    <ProductSubCategoryAddPopUp
                        open={PopUpField.addPopUp}
                        handleAddCloseClick={handleAddCloseClick}
                        PopUpField={PopUpField}
                        // DeptDDL={DeptDDL}
                        handlePost={handlePost}
                        ProductCatDDLData={ProductCatDDLData}
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
