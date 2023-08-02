import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import PaymentCollectionTargetPopUp from './PaymentCollectionTargetPopUp'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDDLAPI, ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { ProductSubCategoryDataDDL } from '../../../../Components/CommonDDL/ProductSubCategoryDataDDL'
import { ProductNameDataDDL } from '../../../../Components/CommonDDL/ProductNameDataDDL'
import { FinanacialTableDataAPI, FinanacialTableExportDataAPI, FinanacialTargetDeleteAPI, FinanacialTargetUpdateAPI } from '../../../../Redux/StateInChargeSlice/FinancialTargetSlice'
import { Year } from '../../../../Helper/Year'
import { Loading } from '../../../../Helper/Loading'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { ExportPaymentCollectionTarget } from './ExportPaymentCollectionTarget'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'


export default function PaymentCollectionTarget() {

    const dispatch = useDispatch()

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [YearValue, setYearValue] = useState(0)

    const [IsPost, setIsPost] = useState(false)

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        apiFlag: "",
        rowData: ''
    })

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })


    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
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


    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Add" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Update", rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, rowData: item })
    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        // dispatch(MonthDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    useEffect(() => {
        const data = { UserID, token, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductSubCategoryDDL.ID])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)
    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    // const { MonthData } = useSelector(state => state.MonthDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)


    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            ProductCatDDL: ProductCategoryDDL.ID,
            ProductSubCategoryDDL: ProductSubCategoryDDL.ID,
            ProductNameDDL: ProductNameDDL.ID,
            Year: YearValue,
            Flag: 'PaymentDefine',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(FinanacialTableDataAPI({ data }))
        }
            
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID,YearValue])

    const { tableData, isLoading } = useSelector(state => state.FinanacialTableData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            ProductCatDDL: ProductCategoryDDL.ID,
            ProductSubCategoryDDL: ProductSubCategoryDDL.ID,
            ProductNameDDL: ProductNameDDL.ID,
            Year: YearValue,
            Flag: 'PaymentDefine',
            From: From,
            To: '99999'
        }
        if (YearValue !== 0) {
            dispatch(FinanacialTableExportDataAPI({ data }))
        }
       
    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID,YearValue])

    const { isExportLoading, ExporttableData } = useSelector(state => state.FinanacialTableExportData)

    const handleDeleteData = () => {
        const data = {
            T_PaymentTarget_DefineID: PopUpField?.rowData?.t_PaymentTarget_DefineID,
            M_FinancialYearID: PopUpField?.rowData?.m_FinancialYearID,
            M_MonthID: PopUpField?.rowData?.m_MonthID,
            M_UserID: UserID,
            Flag: 'Delete',
            token: token,
            handlePost: handlePost,
            handleDeleteCloseClick: handleDeleteCloseClick
        }
        dispatch(FinanacialTargetDeleteAPI({ data }))
    }

    const { isDeleteLoading } = useSelector(state => state.FinanacialTargetDeleteData)

    const ClearFilter = () => {
        setCurrentPage(0)
        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select..."
        })
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
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select..."
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue ={setYearValue}/>
                <Sidebar active="targetPayment" listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Financial Target</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}

                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        ExporttableData && ExporttableData.table && ExporttableData.table.length > 0 &&
                                                        <ExportPaymentCollectionTarget
                                                            ExcelData={ExporttableData}
                                                            name='Financial Target'
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

                                                        <div className="col-md-6 col-lg-2">
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            {/* <MonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthData={MonthData}
                                                            /> */}
                                                            <SeasonWiseMonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                SeasonWiseMonthData={SeasonWiseMonthData}
                                                                mandatory={false}

                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-2">
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

                                                        <div className="col-md-6 col-lg-2">
                                                            <ProductNameDataDDL
                                                                ProductNameDDL={ProductNameDDL}
                                                                setProductNameDDL={setProductNameDDL}
                                                                ProductNameData={ProductNameData}
                                                            />
                                                        </div>


                                                        <div className="col-12 col-lg-1 clear">
                                                            {/* <button type="button" className="btn btn-primary text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
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
                                                        <th>Season</th>
                                                        <th>Month</th>
                                                        <th>Product Category</th>
                                                        <th>Product Sub Category</th>
                                                        <th>Product Name</th>
                                                        <th>Financial Target (Rs)</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr style={{ textAlign: "center" }}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item?.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                <td>{item?.categoryName}</td>
                                                                <td>{item?.subCategoryName}</td>
                                                                <td>{item?.product_Name}</td>
                                                                <td>{item?.totalFinancialTargetAmt.toFixed(2)}</td>

                                                                <td style={{textAlign:'center'}}>
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
                                                                    {/* <span className='tableIcon'
                                                                        onClick={() => deleteButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                    </span> */}
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
                PopUpField.addPopUp ? <PaymentCollectionTargetPopUp open={PopUpField.addPopUp} handleCloseClick={handleCloseClick} PopUpField={PopUpField} UserID={UserID} token={token} handlePost={handlePost} /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleDeleteCloseClick={handleDeleteCloseClick} handleDeleteData={handleDeleteData} /> : <></>
            }

        </>
    )
}
