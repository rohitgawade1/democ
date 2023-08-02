import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";
import SchemeMasterPopUp from './SchemeMasterPopUp'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCategoryDDLAPI, SchemeTypeDDLAPI } from '../../../../../Redux/DDLSlice'
import { SchemeMasterDeleteAPI, SchemeMasterExportTableDataAPI, SchemeMasterTableDataAPI } from '../../../../../Redux/ClientAdminSlice/SchemeMasterSlice'
import { Loading } from '../../../../../Helper/Loading';
import { Pegination } from '../../../../../Components/Pegination/Pegination';
import { SchemeMasterExport } from './SchemeMasterExport';

export default function SchemeMaster() {

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

    const [SchemeTypeDDL, setSchemeTypeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

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
        setSchemeTypeDDL({
            ...SchemeTypeDDL,
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
        dispatch(SchemeMasterDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const { isDeleteLoading } = useSelector(state => state.SchemeMasterDeleteData)

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


    useEffect(() => {
        const data = { UserID, token }
        dispatch(SchemeTypeDDLAPI({ data }))
    }, [])

    const { SchemeTypeData } = useSelector(state => state.SchemeTypeDDLData)

    useEffect(() => {
        handleSchemeTypeDDL()
    }, [SchemeTypeData])

    const handleSchemeTypeDDL = () => {
        if (SchemeTypeData && SchemeTypeData.table && SchemeTypeData.table.length > 0) {
            let list = SchemeTypeData.table.map((item, index) => ({
                value: item.id,
                label: item.schemeType,
            }))

            setSchemeTypeDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setSchemeTypeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_SchemeTypeID: SchemeTypeDDL.ID,
            M_Product_CategoryID: ProductCategoryDDL.ID

        }
        dispatch(SchemeMasterTableDataAPI({ data }))
    }, [To, IsClear, IsPost, SchemeTypeDDL.ID, ProductCategoryDDL.ID])

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            M_SchemeTypeID: SchemeTypeDDL.ID,
            M_Product_CategoryID: ProductCategoryDDL.ID

        }
        dispatch(SchemeMasterExportTableDataAPI({ data }))
    }, [To, IsClear, IsPost, SchemeTypeDDL.ID, ProductCategoryDDL.ID])


    const { tableData, isLoading } = useSelector(state => state.SchemeMasterTableData)
    const { SchemeMasterExporttableData, isExportLoading } = useSelector(state => state.SchemeMasterExportTableData)



    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="schemeMaster" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Scheme Master</h4>
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
                                                        SchemeMasterExporttableData && SchemeMasterExporttableData.table && SchemeMasterExporttableData.table.length > 0 &&
                                                        <SchemeMasterExport
                                                            ExcelData={SchemeMasterExporttableData}
                                                            name='Scheme Master'
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

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Scheme Type</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={140}
                                                                    value={{ value: SchemeTypeDDL.ID, label: SchemeTypeDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setSchemeTypeDDL({ ...SchemeTypeDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setSchemeTypeDDL({ ...SchemeTypeDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={SchemeTypeDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
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
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th>Scheme Type</th>
                                                        <th>Scheme Name</th>
                                                        <th>Product Category</th>
                                                        <th>Scheme From Date</th>
                                                        <th>Scheme To Date</th>
                                                        <th>Scheme Details</th>
                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.schemeType ? item.schemeType : '-'}</td>
                                                                <td>{item.schemeName ? item.schemeName : '-'}</td>
                                                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                                                <td>{item.schemeDurationFromDate ? moment(item.schemeDurationFromDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.schemeDurationToDate ? moment(item.schemeDurationToDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.schemeDetails ? item.schemeDetails : '-'}</td>

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
                PopUpField.addPopUp ? <SchemeMasterPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    ProductCatDDLData={ProductCatDDLData}
                    SchemeTypeData={SchemeTypeData}
                    handlePost={handlePost}
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
