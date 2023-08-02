import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useSearchParams } from 'react-router-dom'
import Header from '../../../../../../Components/Header/Header'
import Sidebar from '../../../../../../Components/Sidebar/Sidebar'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { AstricSign } from '../../../../../../Helper/AstricSign'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../../../Helper/Context'
import { StateNameDataDDL } from '../../../../../../Components/CommonDDL/StateNameDataDDL'
import { CropNameDDLAPI, CropNameDashboardDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, MonthDashboardDDLAPI, OfficerNameDDLAPI, ProductNameDDLAPI, ProductNameDashboardDDLAPI, SeasonDDLAPI, SeasonDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI } from '../../../../../../Redux/DDLSlice'
import { SeasonDataDDL } from '../../../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../../../Components/CommonDDL/MonthDataDDL'
import { CropNameDataDDL } from '../../../../../../Components/CommonDDL/CropNameDataDDL'
import { ProductNameDataDDL } from '../../../../../../Components/CommonDDL/ProductNameDataDDL'
import { DistrictNameDataDDL } from '../../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { TotalPaymentCollectionArcheivedExportTableDataAPI, TotalPaymentCollectionArcheivedTableDataAPI } from '../../../../../../Redux/DashboardSlice/TotalPayementCollectionArcheived'
import { Pegination } from '../../../../../../Components/Pegination/Pegination'
import { PaymentColletionArchievedExportData } from './PaymentColletionArchievedExportData'
import { Loading } from '../../../../../../Helper/Loading'
import { TotalPaymentCollectionTargetExportTableDataAPI, TotalPaymentCollectionTargetTableDataAPI } from '../../../../../../Redux/DashboardSlice/TotalPaymentCollectionTargetSlice'
import { OfficerNameDataDDL } from '../../../../../../Components/CommonDDL/OfficerNameDataDDL'
import { StateDashboardDDL } from '../../../../../../Components/CommonDDL/StateDashboardDDL'
import { SeasonDashboardDDL } from '../../../../../../Components/CommonDDL/SeasonDashboardDDL'
import { MonthDashboardDDL } from '../../../../../../Components/CommonDDL/MonthDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { CropNameDashboardDDL } from '../../../../../../Components/CommonDDL/CropNameDashboardDDL'
import { ProductNameDashboardDDL } from '../../../../../../Components/CommonDDL/ProductNameDashboardDDL'

export default function PaymentAchievedTable() {
    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()
    let searchName = searchParams.get("name")
    let ApiFlag = searchParams.get("ApiFlag")
    let screenFlag = searchParams.get('screenFlag')
    let activeFilter = searchParams.get("activeFilter");
    let DDLFlag = searchParams.get("DDLFlag")

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

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: "",
    });
    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
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
    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })
    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select..."
    })

    const [OfficerNameDDL, setOfficerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const handleClear = () => {
        setCurrentPage(0)
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        });
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select...",
        })
        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select...",
        })
        setCropNameDDL({
            ...CropNameDDL,
            ID: 0,
            Label: "Select...",
        })

        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setOfficerNameDDL({
            ...OfficerNameDDL,
            ID: 0,
            Label: "Select...",
        })

    };

    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [YearValue])

    useEffect(() => {
        const data = {
            UserID,
            token,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        };
        if (YearValue !== 0) {
            dispatch(SeasonDashboardDDLAPI({ data, Flag: DDLFlag }));
        }
    }, [YearValue]);

    useEffect(() => {
        const data = {
            UserID,
            token,
            SeasonDDL,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        };
        if (YearValue !== 0) {
            dispatch(MonthDashboardDDLAPI({ data, Flag: DDLFlag }));
        }
    }, [SeasonDDL.ID, YearValue]);


    useEffect(() => {
        const data = { UserID, token, SeasonDDL, M_CropTypeID: '0' }
        dispatch(CropNameDashboardDDLAPI({ data, Flag: DDLFlag }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, M_Product_SubCategoryID: '0' }
        dispatch(ProductNameDashboardDDLAPI({ data, Flag: DDLFlag }))
    }, [])

    useEffect(() => {
        const data = {
            StateDDL,
            UserID,
            token,
            M_MonthID: '0',
            M_FinancialYearID: YearValue
        }
        if (YearValue !== 0) {
            dispatch(DistrictDashboardDDLAPI({ data, Flag: DDLFlag }))
        }
    }, [StateDDL.ID, YearValue])

    useEffect(() => {
        const data = {
            UserID,
            token,
            StateDDL,
            DistrictDDL,
            ShowBy: 'Web',
        }
        dispatch(OfficerNameDDLAPI({ data, Flag: DDLFlag }))
    }, [StateDDL.ID,DistrictDDL.ID])
    
    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { SeasonDashboardData } = useSelector((state) => state.SeasonDashboardDDLData);
    const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
    const { CropNameDashboardData } = useSelector(state => state.CropNameDashboardDDLData)
    const { ProductNameDashboardData } = useSelector(state => state.ProductNameDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)
    // // -------------------Total Order Target------------
    // useEffect(() => {
    //     const data = {

    //         T_PaymentTarget_AssingID: 0,
    //         M_SeasonID: SeasonDDL.ID,
    //         M_CropID: CropNameDDL.ID,
    //         M_ProductID: ProductNameDDL.ID,
    //         FinancialYearID: YearValue,
    //         MonthID: 0,
    //         M_StateNameID: StateDDL.ID,
    //         M_DistrictNameID: DistrictDDL.ID,
    //         M_TalukaNameID: 0,
    //         M_VillageNameID: 0,
    //         UserID: UserID,
    //         token: token,
    //         From: From,
    //         To: To,
    //         Flag: ApiFlag,
    //         ShowBy: 'Web'
    //     }
    //     if (YearValue !== 0) {
    //         dispatch(TotalPaymentCollectionArcheivedTableDataAPI({ data }))
    //     }

    // }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, DistrictDDL.ID])

    // useEffect(() => {
    //     const data = {
    //         T_PaymentTarget_AssingID: 0,
    //         M_SeasonID: SeasonDDL.ID,
    //         M_CropID: CropNameDDL.ID,
    //         M_ProductID: ProductNameDDL.ID,
    //         FinancialYearID: YearValue,
    //         MonthID: 0,
    //         M_StateNameID: StateDDL.ID,
    //         M_DistrictNameID: DistrictDDL.ID,
    //         M_TalukaNameID: 0,
    //         M_VillageNameID: 0,
    //         UserID: UserID,
    //         token: token,
    //         From: From,
    //         To: To,
    //         Flag: ApiFlag,
    //         ShowBy: 'Web'
    //     }
    //     if (YearValue !== 0) {
    //         dispatch(TotalPaymentCollectionArcheivedExportTableDataAPI({ data }))
    //     }

    // }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, DistrictDDL.ID])

    // const { tableData, isLoading } = useSelector(state => state.TotalPaymentCollectionTargetTableData)
    // const { TotalPaymentArcheivedExporttableData, isExportLoading } = useSelector(state => state.TotalPaymentCollectionTargetExportTableData)
    // -------------------Financial Target------------
    useEffect(() => {
        const data = {

            T_PaymentTarget_AssingID: 0,
            M_SeasonID: SeasonDDL.ID,
            M_CropID: CropNameDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: 0,
            M_VillageNameID: 0,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: ApiFlag,
            // ShowBy: 'Web',
            ShowBy: activeFilter,
            searchName: searchName,
            screenFlag: screenFlag
        }
        if (YearValue !== 0) {
            dispatch(TotalPaymentCollectionTargetTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, DistrictDDL.ID])

    useEffect(() => {
        const data = {
            T_PaymentTarget_AssingID: 0,
            M_SeasonID: SeasonDDL.ID,
            M_CropID: CropNameDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: 0,
            M_VillageNameID: 0,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: ApiFlag,
            // ShowBy: 'Web',
            ShowBy: activeFilter,
            searchName: searchName,
            screenFlag: screenFlag
        }
        if (YearValue !== 0) {
            dispatch(TotalPaymentCollectionTargetExportTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, DistrictDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.TotalPaymentCollectionTargetTableData)
    const { TotalPaymentTargetExporttableData, isExportLoading } = useSelector(state => state.TotalPaymentCollectionTargetExportTableData)

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
                                                <h4 className="fontStyle"> {`Payment Collection -> Achieved -> ${searchName}`} </h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0">
                                                {
                                                    isExportLoading ?
                                                        <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                                            disabled>
                                                            <i
                                                                className="fa fa-refresh fa-spin"
                                                                style={{ marginRight: "5px" }}
                                                            />Loading</button>
                                                        :
                                                        TotalPaymentTargetExporttableData && TotalPaymentTargetExporttableData.table && TotalPaymentTargetExporttableData.table.length > 0 &&
                                                        <PaymentColletionArchievedExportData
                                                            ExcelData={TotalPaymentTargetExporttableData}
                                                            name='Payment Collection Archeived'
                                                            searchName={searchName}
                                                            ApiFlag={ApiFlag}
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
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}

                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <SeasonDashboardDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDashboardData={SeasonDashboardData}

                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <MonthDashboardDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthDashboardData={MonthDashboardData}

                                                            />
                                                        </div>
                                                        {
                                                            searchName === "Regional Manager (Lacs)" && ApiFlag === 'RegionalManager' || searchName === "District Officer (Lacs)" && ApiFlag === 'DisctrictOfficer' ?
                                                                <>
                                                                    <div className="col-md-6 col-lg-3">
                                                                        <DistrictDashboardDDL
                                                                            DistrictDDL={DistrictDDL}
                                                                            setDistrictDDL={setDistrictDDL}
                                                                            DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                                        // mandatory={true}
                                                                        // searchName={searchName}
                                                                        />
                                                                    </div>
                                                                </>
                                                                :
                                                                ''

                                                        }
                                                        {/* {
                                                            searchName === "Sales Trainee" ?
                                                                <>
                                                                    < div className="col-md-6 col-lg-3">
                                                                        <div className="form-group">
                                                                            <label className="d-block" htmlFor="NameofDepartment">Taluka Name</label>
                                                                            <Select
                                                                                isClearable
                                                                                isSearchable
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </>

                                                                :
                                                                ''
                                                        } */}
                                                        <div className="col-md-6 col-lg-3">
                                                            <CropNameDashboardDDL
                                                                CropNameDDL={CropNameDDL}
                                                                setCropNameDDL={setCropNameDDL}
                                                                CropNameDashboardData={CropNameDashboardData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <ProductNameDashboardDDL
                                                                ProductNameDDL={ProductNameDDL}
                                                                setProductNameDDL={setProductNameDDL}
                                                                ProductNameDashboardData={ProductNameDashboardData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <OfficerNameDataDDL
                                                                OfficerNameDDL={OfficerNameDDL}
                                                                setOfficerNameDDL={setOfficerNameDDL}
                                                                OfficerNameDDLData={OfficerNameDDLData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleClear}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id="payment-achieved" cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        {
                                                            RoleID == 7 || RoleID == 8 ?
                                                                <></>
                                                                :
                                                                <th>State</th>
                                                        }
                                                        <th>Season</th>
                                                        {
                                                            searchName === "Regional Manager (Lacs)" && ApiFlag === 'RegionalManager' || searchName === "District Officer (Lacs)" && ApiFlag === 'DisctrictOfficer' ?
                                                                <th>District</th>
                                                                :
                                                                ''
                                                        }
                                                        {/* {
                                                            searchName === "Sales Trainee" ?
                                                                <th>Taluka</th>
                                                                :
                                                                ''
                                                        } */}

                                                        <th> Crop Name</th>
                                                        <th>Product Name</th>
                                                        <th>Packing Size</th>
                                                        <th>Financial Target (Rs)</th>
                                                        <th> Financial Achieved Target (Rs)</th>
                                                        <th>Officer Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                {
                                                                    RoleID == 7 || RoleID == 8 ?
                                                                        <></>
                                                                        :
                                                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                                                }
                                                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                                                {
                                                                    searchName === "Regional Manager (Lacs)" && ApiFlag === 'RegionalManager' || searchName === "District Officer (Lacs)" && ApiFlag === 'DisctrictOfficer' ?
                                                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                                                        :
                                                                        ''
                                                                }

                                                                <td>{item.cropName ? item.cropName : '-'}</td>
                                                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                                                <td align='center'>{item.packingSize ? item.packingSize : '-'}</td>
                                                                <td align='center'>{item.targetAmt ? item.targetAmt.toFixed(2) : '-'}</td>
                                                                <td align='center'>{item.achiveAmt ? item.achiveAmt.toFixed(2) : '-'}</td>
                                                                <td align='center'>{item.officerName ? item.officerName : '-'}</td>

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
            </main >
        </>
    )
}


