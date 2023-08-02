import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import ProductWisePackingPopUp from './ProductWisePackingPopUp'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI } from '../../../../../Redux/DDLSlice'
import { ProductWisePackingDeleteAPI, ProductWisePackingExportTableDataAPI, ProductWisePackingTableDataAPI } from '../../../../../Redux/ClientAdminSlice/ProductWisePackingSlice'
import { Loading } from '../../../../../Helper/Loading'
import { ProductWisePackingExport } from './ProductWisePackingExport'
import { Pegination } from '../../../../../Components/Pegination/Pegination'


export default function ProductWisePacking() {

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
    const ClearFilter = () => {
        setCurrentPage(0)
        setProductCategoryDDL({
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

    const handleDeleteData = () => {
        dispatch(ProductWisePackingDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.ProductWisePackingDeleteData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        handleProductCatDDL()
    }, [ProductCatDDLData])

    const handleProductCatDDL = () => {
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
    // ----------------Product Sub Category-----------

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        handleSubProductCatDDL()
    }, [ProductSubCatDDLData])

    const handleSubProductCatDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductSubCatDDLData && ProductSubCatDDLData.table && ProductSubCatDDLData.table.length > 0) {
            let list = ProductSubCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.subCategoryName,
            }))

            setProductSubCategoryDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setProductSubCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductCategoryDDL.ID, ProductSubCategoryDDL.ID])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)

    useEffect(() => {
        handleProductNameDDL()
    }, [ProductNameData])

    const handleProductNameDDL = () => {
        if (ProductNameData && ProductNameData.table && ProductNameData.table.length > 0) {
            let list = ProductNameData.table.map((item, index) => ({
                value: item.m_ProductID,
                label: item.product_Name,
            }))

            setProductNameDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setProductNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleChangeSearch = () => {
        setCurrentPage(0)
        setTo(10)
        setFrom(1)
    }

    useEffect(() => {
        handleChangeSearch()
    }, [ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID

        }
        dispatch(ProductWisePackingTableDataAPI({ data, Flag: 'Master' }))
    }, [IsPost, To, IsClear, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID

        }
        dispatch(ProductWisePackingExportTableDataAPI({ data, Flag: 'Master' }))
    }, [IsPost, To, IsClear, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.ProductWisePackingData)
    const { ProductWisePackingExporttableData, isExportLoading } = useSelector(state => state.ProductWisePackingExportData)


    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="productwisepacking" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Product Wise Packing And Unit Rate</h4>
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
                                                        ProductWisePackingExporttableData && ProductWisePackingExporttableData.table && ProductWisePackingExporttableData.table.length > 0 &&
                                                        <ProductWisePackingExport
                                                            ExcelData={ProductWisePackingExporttableData}
                                                            name='Product Wise Packing Master'
                                                        />
                                                }
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

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Product Category</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={140}
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

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Product Sub Category</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={140}
                                                                    value={{ value: ProductSubCategoryDDL.ID, label: ProductSubCategoryDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={ProductSubCategoryDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Product Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: ProductNameDDL.ID, label: ProductNameDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setProductNameDDL({ ...ProductNameDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setProductNameDDL({ ...ProductNameDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={ProductNameDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-2 clear">
                                                            {/* <button type="button" className="btn btn-primary text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={ClearFilter}
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
                                                        <th>Sr.No.</th>
                                                        <th>Product Category</th>
                                                        <th >Product Sub Category</th>
                                                        <th >Product Name</th>
                                                        <th>Packing Size</th>
                                                        <th >Unit Rate(Rs)</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                                                <td>{item.subCategoryName ? item.subCategoryName : '-'}</td>
                                                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                                                <td>{item.packingSize ? item.packingSize : '-'}</td>
                                                                <td>{item.unitAmount ? item.unitAmount : '-'}</td>
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
                PopUpField.addPopUp ? <ProductWisePackingPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
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
