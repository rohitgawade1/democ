import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import OrderTargetDecidePopUp from './OrderTargetDecidePopUp'
import { CropNameDDLAPI, CropTypeDDLAPI, MonthDDLAPI, ProductCatDDLAPI, ProductCategoryDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'
import { DefineOrderTargetDeleteAPI, DefineOrderTargetExportTableDataAPI, DefineOrderTargetTableDataAPI } from '../../../../Redux/StateInChargeSlice/DefineOrderTargetSlice'
import { OrderTargetExportExcel } from './OrderTargetExportExcel'


export default function OrderTargetDecide() {

    const dispatch = useDispatch()

    // const Year = new Date().getFullYear()

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [IsPost, setIsPost] = useState(false)
    const [IsChanged, setIsChanged] = useState(false)
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [FinancialYearDDL, setFinancialYearDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })


    // const [ProductCatDDL, setProductCatDDL] = useState({
    //     DDL: [],
    //     ID: 0,
    //     Label: "Select..."
    // })
    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        // dispatch(MonthDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'PaymentDefine' }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'DefineTarget' }))

    }, [])


    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "DefineTarget" }))
    }, [CropTypeDDL.ID])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    // const { MonthData } = useSelector(state => state.MonthDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        handleSeasonDDL()
    }, [SeasonDDLData])


    const handleSeasonDDL = () => {
        // console.log(DeptDDLDataa)
        if (SeasonDDLData && SeasonDDLData.table && SeasonDDLData.table.length > 0) {
            let list = SeasonDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.seasonName,
            }))

            setSeasonDDL({
                DDL: list,
                ID: 0,
                Label: "Select..."
            })
        }
        else {
            setSeasonDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        handleMonthDDL()
    }, [SeasonWiseMonthData])

    const handleMonthDDL = () => {
        if (SeasonWiseMonthData && SeasonWiseMonthData.table && SeasonWiseMonthData.table.length > 0) {
            let list = SeasonWiseMonthData.table.map((item, index) => ({
                value: item.m_MonthID,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: 0,
                Label: "Select..."
            })
        }
        else {
            setMonthDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        handleCropTypeDDL()
    }, [CropTypeDDLData])

    const handleCropTypeDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropTypeDDLData && CropTypeDDLData.table && CropTypeDDLData.table.length > 0) {
            let list = CropTypeDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_CropTypeID,
                label: item.cropTypeName,
            }))

            setCropTypeDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setCropTypeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        handleCropNameDDL()
    }, [CropNameDDLData])

    const handleCropNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropNameDDLData && CropNameDDLData.table && CropNameDDLData.table.length > 0) {
            let list = CropNameDDLData.table.map((item, index) => ({
                value: item.m_CropID,
                label: item.cropName,
            }))

            setCropNameDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setCropNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

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
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL,
            MonthDDL: MonthDDL,
            ProductCatDDL: ProductCategoryDDL,
            CropNameDDL: CropNameDDL,
            CropTypeDDL: CropTypeDDL,
            Year: YearValue,
            Flag: 'TargetDefine',
            From: From, To: To
        }
        if (YearValue !== 0) {
            dispatch(DefineOrderTargetTableDataAPI({ data }))
        }

    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID, CropNameDDL.ID, CropTypeDDL.ID, YearValue])


    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL,
            MonthDDL: MonthDDL,
            ProductCatDDL: ProductCategoryDDL,
            CropNameDDL: CropNameDDL,
            CropTypeDDL: CropTypeDDL,
            Year: YearValue,
            Flag: 'TargetDefine',
            From: From, To: '99999'
        }
        if (YearValue !== 0) {
            dispatch(DefineOrderTargetExportTableDataAPI({ data }))
        }
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, ProductCategoryDDL.ID, CropNameDDL.ID, CropTypeDDL.ID, YearValue])

    const { tableData, isLoading } = useSelector(state => state.DefineOrderTargetTableData)
    const { ExporttableData, isExportLoading } = useSelector(state => state.DefineOrderTargetExportTableData)

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
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select..."
        })
        setCropTypeDDL({
            ...CropTypeDDL,
            ID: 0,
            Label: "Select..."
        })
        setCropNameDDL({
            ...CropNameDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
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
        const data = {
            T_OrderTarget_DefineID: PopUpField?.rowData?.t_OrderTarget_DefineID,
            M_UserID: UserID,
            Flag: 'Delete',
            token: token,
            handlePost: handlePost,
            handleCloseClick: handleDeleteCloseClick
        }
        dispatch(DefineOrderTargetDeleteAPI({ data }))
    }

    const { isDeleteLoading } = useSelector(state => state.DefineOrderTargetDeleteData)

    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="orderTarget" listActive="stage" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> Define Order Target</h4>
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
                                                        ExporttableData && ExporttableData.table && ExporttableData.table.length > 0 &&
                                                        <OrderTargetExportExcel
                                                            ExcelData={ExporttableData}
                                                            name='Define Order Target'
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
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Season</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: SeasonDDL.ID, label: SeasonDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setSeasonDDL({ ...SeasonDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setSeasonDDL({ ...SeasonDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={SeasonDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={MonthDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Crop Type Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: CropTypeDDL.ID, label: CropTypeDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setCropTypeDDL({ ...CropTypeDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setCropTypeDDL({ ...CropTypeDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={CropTypeDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Crop Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: CropNameDDL.ID, label: CropNameDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setCropNameDDL({ ...CropNameDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setCropNameDDL({ ...CropNameDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={CropNameDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-md-6 col-lg-3">
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

                                                        <div className="col-12 col-lg-1 clear">

                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => ClearFilter()}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>

                                                        {/* <div className='row'> */}
                                                        {/* <div className="col-12 col-lg-6 mt-4 pt-2 text-end">
                                                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "16px" }}>Financial Total (Lac) :- 00  </span>

                                                        </div> */}

                                                        {/* </div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive w-100">
                                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr align='center'>
                                                        <th>Sr.No.</th>
                                                        <th>Season</th>
                                                        <th>Month</th>
                                                        {/* <th >Crop Type</th> */}
                                                        <th>Crop Name</th>
                                                        <th>Product Category</th>
                                                        <th >Product Sub Category</th>
                                                        <th>Product Name</th>
                                                        <th >Pack Size</th>
                                                        <th >Quantity <br/> (Nos)</th>
                                                        <th > Financial Target <br/> (Rs)</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                {/* <td>{item?.cropTypeName}</td> */}
                                                                <td>{item?.cropName}</td>
                                                                <td>{item?.categoryName}</td>
                                                                <td>{item?.subCategoryName}</td>
                                                                <td>{item?.product_Name}</td>
                                                                <td>{item?.packingSize}</td>
                                                                <td >{item?.totalQuantity}</td>
                                                                <td>{item?.total_Amt.toFixed(2)} </td>
                                                                <td>
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
                PopUpField.addPopUp ?
                    <OrderTargetDecidePopUp
                        open={PopUpField.addPopUp}
                        handleAddCloseClick={handleAddCloseClick}
                        PopUpField={PopUpField}
                        SeasonDDLData={SeasonDDLData}
                        SeasonWiseMonthData={SeasonWiseMonthData}
                        ProductCatDDLData={ProductCatDDLData}
                        handlePost={handlePost}
                        YearValue={YearValue}

                    /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleDeleteData={handleDeleteData} handleDeleteCloseClick={handleDeleteCloseClick} /> : <></>
            }

        </>
    )
}
