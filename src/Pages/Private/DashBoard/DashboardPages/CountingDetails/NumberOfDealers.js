import React from 'react'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateNameDataDDL } from '../../../../../Components/CommonDDL/StateNameDataDDL'
import { DistrictNameDataDDL } from '../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { DistrictDashboardDDLAPI, DistrictNameDDLAPI, OfficerNameDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, TalukaDashboardDDLAPI, TalukaNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { useEffect } from 'react'
import { useAuthState } from '../../../../../Helper/Context'
import { TalukaNameDataDDL } from '../../../../../Components/CommonDDL/TalukaNameDataDDL'
import { AstricSign } from '../../../../../Helper/AstricSign'
import { NoOfDealerExportTableDataAPI, NoOfDealerTableDataAPI } from '../../../../../Redux/DashboardSlice/NoOfDealerSlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../../Helper/Loading'
import { NoOfDealerExportData } from './NoOfDealerExportData'
import { OfficerNameDataDDL } from '../../../../../Components/CommonDDL/OfficerNameDataDDL'
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { TalukaDashboardDDL } from '../../../../../Components/CommonDDL/TalukaDashboardDDL'

export default function NumberOfDealers() {
    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
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
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })
    // const [list, setList] = useState([])
    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [OfficerNameDDL, setOfficerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })


    const handleClear = () => {
        setCurrentPage(0)
        setIsClear(!IsClear)
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: 'Select...',
        })
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: 'Select...',
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: 'Select...',
        })
        setOfficerNameDDL({
            ...OfficerNameDDL,
            ID: 0,
            Label: "Select...",
        })
        // console.log("call")
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }


    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: 'Dealer' }))
        }
    }, [YearValue])


    useEffect(() => {
        const data = { StateDDL, UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(DistrictDashboardDDLAPI({ data, Flag: 'Dealer' }))
        }
    }, [StateDDL.ID,YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL,M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(TalukaDashboardDDLAPI({ data, Flag: 'Dealer' }))
        }
    }, [StateDDL.ID, DistrictDDL.ID,YearValue])

    useEffect(() => {
        const data = {
            UserID,
            token,
            StateDDL,
            TalukaDDL,
            // ScreenName: ScreenName,
            DistrictDDL
        }
        dispatch(OfficerNameDDLAPI({ data }))
    }, [StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID])

    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)
    const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)

    // console.log(OfficerNameDDLData)

    // useEffect(() => {
    //     const data = { UserID, token }
    //     dispatch(DistrictNameDDLAPI({ data }))
    // }, [])
    // const {} = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        const data = {
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_EmployeeID: OfficerNameDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'DO',
            ShowBy: 'Web'

        }
        if (YearValue !== 0) {
            dispatch(NoOfDealerTableDataAPI({ data }))
        }

    }, [IsPost, From,To, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, OfficerNameDDL.ID])

    useEffect(() => {
        const data = {
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_EmployeeID: OfficerNameDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: 'DO',
            ShowBy: 'Web'

        }
        if (YearValue !== 0) {
            dispatch(NoOfDealerExportTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, OfficerNameDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.NoOfDealerTableData)
    const { NoOfDealerExportTableData, isExportLoading } = useSelector(state => state.NoOfDealerExportTableData)


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
                                                <h4 className="fontStyle">Number Of Dealer</h4>
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
                                                        NoOfDealerExportTableData && NoOfDealerExportTableData.table && NoOfDealerExportTableData.table.length > 0 &&
                                                        <NoOfDealerExportData
                                                            ExcelData={NoOfDealerExportTableData}
                                                            name='No of Dealer'
                                                            RoleID={RoleID}
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

                                                        <div className="col-md-6 col-lg-2">
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <TalukaDashboardDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDashboardDDLData={TalukaDashboardDDLData}
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

                                                        <div className="col-12 col-lg-1 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-2 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => {
                                                                    handleClear()
                                                                }}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>

                                                        <div className="col-12 col-lg-12 text-end  mt-lg-3">
                                                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Total Count:- 00  </span>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id='dealers' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        {
                                                            RoleID == 7 || RoleID == 8 ?
                                                                <></>
                                                                :
                                                                <th>State</th>
                                                        }
                                                        <th>District</th>
                                                        <th>Taluka</th>
                                                        <th>Dealer Name</th>
                                                        <th>Dealer Address</th>
                                                        <th>Mobile Number</th>
                                                        <th>Email</th>
                                                        {/* <th style={{ width: "150px", textAlign: "center" }}>Action</th> */}
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
                                                                <td>{item.districtName ? item.districtName : '-'}</td>
                                                                <td>{item.talukaName ? item.talukaName : '-'}</td>
                                                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                                                <td>{item.dealerAddress ? item.dealerAddress : '-'}</td>
                                                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
                                                                <td>{item.emailID ? item.emailID : '-'}</td>
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


