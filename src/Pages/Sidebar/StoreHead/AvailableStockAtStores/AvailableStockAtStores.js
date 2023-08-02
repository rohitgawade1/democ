import React, { useEffect, useState } from 'react'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'

import { FieldDayExportTableDataAPI, FieldDayTableDataAPI, FieldayDeleteAPI } from '../../../../Redux/ClientAdminSlice/FieldDayMasterSlice'
import { useAuthState } from '../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { ProductCatDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonDDLAPI, StoreNameDDLAPI } from '../../../../Redux/DDLSlice'
import { Loading } from '../../../../Helper/Loading'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { ProductSubCategoryDataDDL } from '../../../../Components/CommonDDL/ProductSubCategoryDataDDL'
import { ProductNameDataDDL } from '../../../../Components/CommonDDL/ProductNameDataDDL'
import { AstricSign } from '../../../../Helper/AstricSign'
import ForwardProdQuantityPopUp from '../ForwardProductQuantity/ForwardProdQuantityPopUp'
import { StoreNameDataDDL } from '../../../../Components/CommonDDL/StoreNameDataDDL'
import moment from 'moment'
import { AvailableStockTableDataAPI, TempMultipleForwardDataPostAPI } from '../../../../Redux/StockSlice/AvailableStockSlice'
import AddMultipleForwardPopUp from './AddMultipleForwardPopUp'


export default function AvailableStockAtStores() {
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
    const [SelectMultipleCheckbox, setSelectMultipleCheckbox] = useState(false)
    const [AssignData, setAssignData] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: '',
        forwardGeneratePop: false,
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
    const [StoreNameDDL, setStoreNameDDL] = useState({
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

    const handleMultipleForward = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, apiFlag: "Insert", popupFlag: "Add", popupBtn: "Clear" })
    }

    const handleForwardPop = (item) => {
        setPopUpField({ ...PopUpField, forwardGeneratePop: true, rowData: item })
    }
    const handleCloseClick = () => {
        setPopUpField({ ...PopUpField, forwardGeneratePop: false })
    };

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
        setStoreNameDDL({
            ...StoreNameDDL,
            ID: 0,
            Label: "Select..."
        })

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
    }, [])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StoreNameDDLAPI({ data, Flag: 'AvailableStock' }))
    }, [])

    const { StoreNameData } = useSelector(state => state.StoreNameData)
    // const { tableData, isLoading } = useSelector(state => state.FieldDayTableData)
    // const { FieldDayExporttableData, isExportLoading } = useSelector(state => state.FieldDayExportTableData)

    useEffect(() => {
        const data = {
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'MainStore'
        }
        dispatch(AvailableStockTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost, ProductCategoryDDL.ID, ProductSubCategoryDDL.ID, ProductNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.AvailableStockTableData)

    const handleOnCheckClick = (item, index, check) => {
        // if (tableData) {
        //     let tempGridData = [...tableData]
        // if(tempGridData[index].ischecked == false){
        //     tempGridData[index].ischecked = true
        // }else{
        //     tempGridData[index].ischecked = false
        // }
        if (tableData) {
            let tempGridData = [...tableData]
            tempGridData[index].ischecked = check
            console.log(tempGridData)
            // setgridData(tempGridData)
        }
        // console.log(tempGridData)
        console.log(typeof (check))
        // settableData(tempGridData)
    }

    // }

    const handleCheckBox = (item, i) => {

        // if (gridData) {
        //     let tempGridData = [...gridData]
        //     tempGridData[index].ischecked = check
        //     // console.log(tempGridData)
        //     setgridData(tempGridData)
        // }

        console.log(tableData)
        let allCheckData = ""
        tableData.forEach((item) => {
            if (item.allCheckData > 0 && item.allCheckData <= item.allCheckData) {
                allCheckData = allCheckData + item.m_Product_PackDetailsID + "|" + item.batchNo + "|" + moment(item.mfgDate).format("DD-MM-YYYY") +
                    "|" + moment(item.expDate).format("DD-MM-YYYY") + "|" + item.qtyInHand + ","

            }
        })
        setAssignData(allCheckData)
        console.log(allCheckData)
    }

    const handelAssignClicked = () => {
        const data = {
            Product_Stock_Distribute_Data: AssignData,
            DistributeUniqueNo: '0',
            M_UserID: UserID,
            token: token,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick,
            handleMultipleForward: handleMultipleForward
        }
        dispatch(TempMultipleForwardDataPostAPI({ data }))
    }

    const [checked, setChecked] = useState(false)

    const handleCheck = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="availableStockAtStores" listActive="masters" />
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
                                                            <StoreNameDataDDL
                                                                StoreNameDDL={StoreNameDDL}
                                                                setStoreNameDDL={setStoreNameDDL}
                                                                StoreNameData={StoreNameData}
                                                            />
                                                        </div>
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
                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-3 waves-effect waves-light allBtn"
                                                                onClick={() => handleClear()}
                                                            >
                                                                Clear
                                                            </button>
                                                        </div>
                                                        <div className="col-12 col-lg-9 clear">

                                                            <button type="button" className="btn  text-white mr-2 mt-4 mt-md-0 mt-lg-3 mx-2 waves-effect waves-light allBtn float-end"
                                                                style={{ backgroundColor: "#60a53e", color: 'white' }}
                                                                onClick={() => handelAssignClicked()}
                                                            >
                                                                Forward
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
                                                        <th>Select</th>
                                                        <th>Sr.No.</th>
                                                        <th>Store Name</th>
                                                        <th>Product Sub Category </th>
                                                        <th>Product Name</th>
                                                        <th>Pack Size</th>
                                                        <th>Available Quantity</th>
                                                        <th>Batch Code</th>
                                                        <th>Manufacturing Date</th>
                                                        <th>Expiry Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.length > 0 ? tableData.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>
                                                                    <input
                                                                        //  disabled={item.isDisable}
                                                                        //  value={item.ischecked}
                                                                        //  checked={item.ischecked}
                                                                        name='checkbox'
                                                                        onChange={(e) => {
                                                                            handleCheck(e)
                                                                            // handleCheckBox(item,i)
                                                                            handleOnCheckClick(item, i, !item.ischecked)
                                                                        }
                                                                        }

                                                                        type='checkbox' style={{ cursor: "pointer" }} />
                                                                </td>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{i + 1}</td>
                                                                <td>{item.storeName ? item.storeName : "-"}</td>
                                                                {/* <td>{item.categoryName ? item.categoryName : "-"}</td> */}
                                                                <td>{item.subCategoryName ? item.subCategoryName : "-"}</td>
                                                                <td>{item.product_Name ? item.product_Name : "-"}</td>
                                                                <td>{item.packingSize ? item.packingSize : "-"}</td>
                                                                <td>{item.qtyInHand ? item.qtyInHand : "-"}</td>
                                                                <td>{item.batchNo ? item.batchNo : "-"}</td>
                                                                <td>{item.mfgDate ? moment(item.mfgDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td>{item.expDate ? moment(item.expDate).format("DD-MM-YYYY") : "-"}</td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    {/* <span className='tableIcon'
                                                                    onClick={() => editButtonClick()}
                                                                >
                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                </span> */}
                                                                    {/* <span className='tableIcon'
                                                                        onClick={() => deleteButtonClick()}
                                                                    >
                                                                        <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                    </span> */}
                                                                    {
                                                                        checked ?
                                                                            <span onClick={() => handleForwardPop(item)}>
                                                                                <i
                                                                                    class="fa-solid fa-share mx-1"
                                                                                    title='Forward'
                                                                                    style={{ cursor: "pointer", fontSize: '1rem', color: '#172b4d' }}
                                                                                ></i>
                                                                            </span>
                                                                            :
                                                                            <>-</>
                                                                    }
                                                                </td>
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
            </main>

            {/* {
                PopUpField.addPopUp ? <AvailableStockAtStoresPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                // CropTypeDDLData={CropTypeDDLData}
                // SeasonDDLData={SeasonDDLData}
                // CropNameDDLData={CropNameDDLData}
                /> : <></>
            } */}
            {/* {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            } */}

            {
                PopUpField.forwardGeneratePop ?
                    <ForwardProdQuantityPopUp
                        open={PopUpField.forwardGeneratePop}
                        handleCloseClick={handleCloseClick}
                        QuantityPopUpHeading="Forward"
                        PopUpField={PopUpField}
                        handlePost={handlePost}
                    />
                    :
                    <></>
            }
            {
                PopUpField.addPopUp ?
                    <AddMultipleForwardPopUp
                        open={PopUpField.addPopUp}
                        handleAddCloseClick={handleAddCloseClick}
                        QuantityPopUpHeading="Forward"
                        PopUpField={PopUpField}
                        handlePost={handlePost}
                    />
                    :
                    <></>
            }

        </>
    )
}