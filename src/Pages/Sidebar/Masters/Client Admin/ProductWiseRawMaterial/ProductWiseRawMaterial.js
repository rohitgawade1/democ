import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { Loading } from '../../../../../Helper/Loading'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import ProductWiseRawMaterialPopUp from './ProductWiseRawMaterialPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { ProductNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { ProductWiseRawMAterialDeleteAPI, ProductWiseRawMAterialExportTableDataAPI, ProductWiseRawMAterialTableDataAPI } from '../../../../../Redux/ClientAdminSlice/ProductWiseRawMaterialSlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { ProductWiseRawMaterialExport } from './ProductWiseRawMaterialExport'


export default function ProductWiseRawMaterial() {

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

    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [SchemeTypeTextField, setSchemeTypeTextField] = useState(
        {
            schemeType: "",

        }
    )
    const handleInputChange = (e) => {
        setSchemeTypeTextField({ ...SchemeTypeTextField, [e.target.name]: e.target.value })
    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setSchemeTypeTextField({
            schemeType: "",

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
        dispatch(ProductWiseRawMAterialDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.ProductWiseRawMAterialDelete)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [])

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

    useEffect(() => {
        const data = {
            M_ProductID: ProductNameDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
        }
        dispatch(ProductWiseRawMAterialTableDataAPI({ data }))
    }, [To,IsSearch, IsClear, IsPost,ProductNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.ProductWiseRawMAterialData)

    useEffect(() => {
        const data = {
            M_ProductID: ProductNameDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
        }
        dispatch(ProductWiseRawMAterialExportTableDataAPI({ data }))
    }, [To,IsSearch, IsClear, IsPost,ProductNameDDL.ID])

    const { ProductWiseRawMAterialExportTableData, isExportLoading } = useSelector(state => state.ProductWiseRawMAterialExportData)


    return (
        <>
             {isLoading && <Loading />} 
            {isDeleteLoading && <Loading />} 
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="productwiserawmaterial" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Product Wise Raw Material</h4>
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
                                                        ProductWiseRawMAterialExportTableData && ProductWiseRawMAterialExportTableData.table && ProductWiseRawMAterialExportTableData.table.length > 0 &&
                                                        <ProductWiseRawMaterialExport
                                                            ExcelData={ProductWiseRawMAterialExportTableData}
                                                            name='Product Wise Raw Material Master'
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
                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Date</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="rawMaterialName"
                                                                    type="Date"
                                                                    name="rawMaterialName"
                                                                // value={rawMaterialTextField.rawMaterialName}
                                                                // onChange={(e) => handleInputChange(e)}
                                                                />

                                                            </div>
                                                        </div> */}
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

                                                        <div className="col-12 col-lg-4 clear">
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
                                                        {/* <th>Date</th> */}
                                                        {/* <th>Product Category</th> */}
                                                        <th>Product Name</th>
                                                        <th>Raw Material </th>
                                                        {/* <th>Raw Material Quantity</th> */}
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.m_Product_PackDetails_Name ? item.m_Product_PackDetails_Name : '-'}</td>
                                                                <td>{item.rawMaterialName ? item.rawMaterialName : '-'}</td>
                                                               
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
                PopUpField.addPopUp ? <ProductWiseRawMaterialPopUp 
                open={PopUpField.addPopUp} 
                handleAddCloseClick={handleAddCloseClick} 
                PopUpField={PopUpField} 
                // ProductNameData={ProductNameData}
                handlePost={handlePost} /> : <></>
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