import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import OrderTargetEmployeePopUp from './OrderTargetEmployeePopUp'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, EmployeeNameDDLAPI, MonthDDLAPI, ProductCategoryDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, TalukaEmployeeWiseAssignDDLAPI, TalukaNameDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { EmployeeNameDataDDL } from '../../../../Components/CommonDDL/EmployeeNameDataDDL'
import { OrderAssignTargetDataAPI, OrderAssignTargetExportDataAPI } from '../../../../Redux/DistrictOfficerSlice/OrderAssignTargetSlice'
import { AstricSign } from '../../../../Helper/AstricSign'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { Loading } from '../../../../Helper/Loading'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import UpdateOrderTarget from './UpdateOrderTarget'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function OrderTargetEmployee() {

    const dispatch = useDispatch()
    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [IsPost, setIsPost] = useState(false)
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        assignPopUp: false,
        deletePopUp: false,
        popupFlag: "",
        UpdatePopUp: false,
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

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [SalesTraineeDDL, setSalesTraineeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    // useEffect(() => {
    //     console.log(SalesTraineeDDL.m_UserID)
    // }, [SalesTraineeDDL.ID])

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const handlePost = () => {
        setIsPost(!IsPost)
    }
    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleUpdateCloseClick = () => {
        setPopUpField({ UpdatePopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Add" })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, UpdatePopUp: true, popupFlag: "Update", rowData: item })
    }

    const deleteButtonClick = () => {
        setPopUpField({ ...PopUpField, deletePopUp: true })
    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
        dispatch(TalukaNameDDLAPI({ data }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Order' }))
    }, [])

    // ------sales trainee---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SalesTraineeDDLDDLAPI({ data, Flag: 'Order' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, SalesTraineeDDL }
        dispatch(TalukaEmployeeWiseAssignDDLAPI({ data, Flag: 'District' }))
    }, [SalesTraineeDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)
    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)

    const ClearFilter = () => {
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select..."
        })
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
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setSalesTraineeDDL({
            ...SalesTraineeDDL,
            ID: 0,
            Label: "Select..."
        })

    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            TalukaDDL: TalukaDDL.ID,
            ProductCategoryDDL: ProductCategoryDDL.ID,
            DistrictOfficerDDL: SalesTraineeDDL.m_UserID,
            Year: YearValue,
            Flag: 'AssignByDistrict',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(OrderAssignTargetDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, TalukaDDL.ID, ProductCategoryDDL.ID, From, YearValue,SalesTraineeDDL.m_UserID])
    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            TalukaDDL: TalukaDDL.ID,
            ProductCategoryDDL: ProductCategoryDDL.ID,
            DistrictOfficerDDL: SalesTraineeDDL.m_UserID,
            Year: YearValue,
            Flag: 'AssignByDistrict',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(OrderAssignTargetExportDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, TalukaDDL.ID, ProductCategoryDDL.ID, From, YearValue,SalesTraineeDDL.m_UserID])

    const { tableData, isLoading } = useSelector(state => state.OrderAssignTargetData)
    const { ExportData, isExportLoading } = useSelector(state => state.OrderAssignTargetExportData)

    return (
        <>
            {isLoading && <Loading />}
            {/* {isDeleteLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="ordertargetemployee" listActive="district" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Assign Order Target</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button> */}
                                                <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-0 mx-2 waves-effect waves-light allBtn" style={{ float: "right" }}
                                                    onClick={() => addButtonClick()}
                                                >
                                                    Assign
                                                </button>

                                                <ReactHTMLTableToExcel
                                                    id="test-table-xls-button"
                                                    className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                    table="orderTargetDecide"
                                                    filename="data"
                                                    sheet="data"
                                                    pageOrientation='Landscape'
                                                    buttonText="Export"
                                                    style={{ borderColor: 'black' }}
                                                />
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
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <MonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthData={MonthData}
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
                                                            <DistrictOfficerDataDDL
                                                                DistrictOfficerDDL={SalesTraineeDDL}
                                                                setDistrictOfficerDDL={setSalesTraineeDDL}
                                                                DistrictOfficerDDLData={SalesTraineeDDLDDLData}
                                                                mandatory={false}
                                                                name="Sales Trainee Name"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DTVWiseEmployeeAssignDDL
                                                                DTVWiseEmployeeDDL={TalukaDDL}
                                                                setDTVWiseEmployeeDDL={setTalukaDDL}
                                                                DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                                mandatory={false}
                                                                name="Taluka Name"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-lg-1 clear">

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
                                                        <th >Season </th>
                                                        <th>Month </th>
                                                        <th>Crop Type </th>
                                                        <th>Crop Name </th>                                                    
                                                        <th >Sales Trainee Name</th>
                                                        <th>Taluka</th>                                                    
                                                        <th>Product Name </th>
                                                        <th>Pack Size</th>
                                                        <th>Assign <br/> Quantity </th>
                                                        <th>Financial <br/> Target </th>

                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr >
                                                                <td style={{textAlign:'center'}} className='w-5'>{item?.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                <td>{item?.cropTypeName}</td>
                                                                <td>{item?.cropName}</td>                                                              
                                                                <td>{item?.tragetAssignToUser}</td>
                                                                <td>{item.talukaName ? item.talukaName : '-'}</td>                                                             
                                                                <td>{item?.product_Name}</td>
                                                                <td>{item?.packingSize}</td>
                                                                <td>{item?.assingQuantity}</td>
                                                                <td>{item?.assignTotalAmt}</td>
                                                                <td>
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
                PopUpField.addPopUp ? <OrderTargetEmployeePopUp
                    open={PopUpField.addPopUp}
                    handleCloseClick={handleCloseClick}
                    PopUpField={PopUpField}
                    setPopUpField={setPopUpField}
                    UserID={UserID}
                    token={token}
                    handleIsPost={handlePost}
                    YearValue={YearValue}
                /> : <></>
            }
            {
                PopUpField.UpdatePopUp ?
                    <UpdateOrderTarget
                        open={PopUpField.UpdatePopUp}
                        handleCloseClick={handleUpdateCloseClick}
                        PopUpField={PopUpField}
                        setPopUpField={setPopUpField}
                        UserID={UserID}
                        token={token}
                        handlePost={handlePost}
                        YearValue={YearValue}
                    /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleCloseClick={handleCloseClick} /> : <></>
            }

        </>
    )
}
