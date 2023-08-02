import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'
import Select from 'react-select'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../../Helper/Context'
import { ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, StoreNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { ProductSubCategoryDataDDL } from '../../../../../Components/CommonDDL/ProductSubCategoryDataDDL'
import { ProductNameDataDDL } from '../../../../../Components/CommonDDL/ProductNameDataDDL'
import { MaterialStockAtStoreExportTableDataAPI, MaterialStockAtStoreTableDataAPI } from '../../../../../Redux/DashboardSlice/MaterialStockAtStoreSlice'
import { Loading } from '../../../../../Helper/Loading'
import { StoreNameDataDDL } from '../../../../../Components/CommonDDL/StoreNameDataDDL'
import { MaterialStockStoreExportData } from './MaterialStockStoreExportData'

export default function MaterialStockStoreDep() {

    const dispatch = useDispatch()
    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")
    let m_Product_CategoryID = searchParams.get("m_Product_CategoryID")
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
    const [YearValue, setYearValue] = useState(0)
    const [BatchNumber, setBatchNumber] = useState('')
    const [ExpiryDate, setExpiryDate] = useState('')
    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    // const [invoiceCreatePopUp, setinvoiceCreatePopUp] = React.useState()
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
    const [StoreNameDDL, setStoreNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClearButton = () => {
        setCurrentPage(0)
        setBatchNumber("")
        setExpiryDate('')
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
        setStoreNameDDL({
            ...StoreNameDDL,
            ID: 0,
            Label: "Select...",
        })

    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
    }, [])
    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    useEffect(() => {
        const data = { UserID, token, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductSubCategoryDDL.ID])

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StoreNameDDLAPI({ data, Flag: 'AvailableStock' }))
    }, [])

    const { StoreNameData } = useSelector(state => state.StoreNameData)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)
    const { ProductNameData } = useSelector(state => state.ProductCatNameData)
    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)



    useEffect(() => {
        const data = {
            M_Product_PackDetailsID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: '0',
            M_EmployeeID: '0',
            // M_Product_CategoryID: PopUpField.rowData?.m_Product_CategoryID,
            M_Product_CategoryID: m_Product_CategoryID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            MfgDate: '',
            ExpDate: ExpiryDate,
            BatchNo: BatchNumber,
            StoreNameM_UserID: StoreNameDDL.ID,
            token: token,
            From: From,
            To: To,
            UserID: UserID,
            Flag: 'All',
            ShowBy: 'All',
        }
        if (YearValue !== 0) {
            dispatch(MaterialStockAtStoreTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, IsSearch, YearValue, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID, StoreNameDDL.ID])

    useEffect(() => {
        const data = {
            M_Product_PackDetailsID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: '0',
            M_EmployeeID: '0',
            // M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_CategoryID: m_Product_CategoryID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            MfgDate: '',
            ExpDate: ExpiryDate,
            BatchNo: BatchNumber,
            StoreNameM_UserID: StoreNameDDL.ID,
            token: token,
            From: From,
            To: '99999',
            UserID: UserID,
            Flag: 'All',
            ShowBy: 'All',
        }
        if (YearValue !== 0) {
            dispatch(MaterialStockAtStoreExportTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID, StoreNameDDL.ID, BatchNumber])

    const { tableData, isLoading } = useSelector(state => state.MaterialStockAtStoreTableData)
    const { MaterialStockAtStoreExportTableData, isExportLoading } = useSelector(state => state.MaterialStockAtStoreExportTableData)
    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mt-5">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">{`Material Stock At Stores Department -> ${searchName}`}</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        MaterialStockAtStoreExportTableData && MaterialStockAtStoreExportTableData.table && MaterialStockAtStoreExportTableData.table.length > 0 &&
                                                        <MaterialStockStoreExportData
                                                            ExcelData={MaterialStockAtStoreExportTableData}
                                                            name='Material Stock Store'
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
                                                            <StoreNameDataDDL
                                                                StoreNameDDL={StoreNameDDL}
                                                                setStoreNameDDL={setStoreNameDDL}
                                                                StoreNameData={StoreNameData}
                                                            />
                                                        </div>
                                                        {/* <div className="col-md-6 col-lg-3">
                                                            <ProductCategoryDataDDL
                                                                ProductCategoryDDL={ProductCategoryDDL}
                                                                setProductCategoryDDL={setProductCategoryDDL}
                                                                ProductCatDDLData={ProductCatDDLData}
                                                            // funProdCatDDLData={funProdCatDDLData}
                                                            />
                                                        </div> */}
                                                        <div className="col-md-6 col-lg-3">
                                                            <ProductSubCategoryDataDDL
                                                                ProductSubCategoryDDL={ProductSubCategoryDDL}
                                                                setProductSubCategoryDDL={setProductSubCategoryDDL}
                                                                ProductSubCatDDLData={ProductSubCatDDLData}
                                                            // funSubProdCatDDLData={funSubProdCatDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-2">
                                                            <ProductNameDataDDL
                                                                ProductNameDDL={ProductNameDDL}
                                                                setProductNameDDL={setProductNameDDL}
                                                                ProductNameData={ProductNameData}
                                                            // funProdNameDDLData={funProdNameDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-4 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Batch No</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="BatchNumber"
                                                                    type="text"
                                                                    name="BatchNumber"
                                                                    value={BatchNumber}
                                                                    onChange={(e) => setBatchNumber(e.target.value)}

                                                                />
                                                                {/* {
                                                                    IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                                                                } */}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Expiry Date</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="BatchNumber"
                                                                    type="date"
                                                                    name="BatchNumber"
                                                                    value={ExpiryDate}
                                                                    onChange={(e) => setExpiryDate(e.target.value)}

                                                                />
                                                                {/* {
                                                                    IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                                                                } */}
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-2 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mx-2 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={handleClearButton}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive w-100">
                                            <table id='materialstockstoredep' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th >Sr.No.</th>
                                                        <th>Batch No</th>
                                                        <th>Product Category</th>
                                                        <th>Product  Sub Category</th>
                                                        <th>Product Name </th>
                                                        <th>Packing Size</th>

                                                        <th>Manifacturing Date</th>
                                                        <th>Expiry Date</th>
                                                        <th>Quantity</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{i + 1}</td>
                                                                <td>{item.batchNo ? item.batchNo : '-'}</td>
                                                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                                                <td>{item.subCategoryName ? item.subCategoryName : '-'}</td>
                                                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                                                <td>{item.packingSize ? item.packingSize : '-'}</td>
                                                                <td>{item.mfgDate ? moment(item.mfgDate).format("DD-MM-YYYY") : '-'}</td>
                                                                <td>{item.expDate ? moment(item.expDate).format("DD-MM-YYYY") : '-'}</td>
                                                                <td>{item.qtyInHand ? item.qtyInHand : '-'}</td>

                                                            </tr>
                                                        )) : <tr>No data</tr>
                                                    }
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

        </>
    )
}


