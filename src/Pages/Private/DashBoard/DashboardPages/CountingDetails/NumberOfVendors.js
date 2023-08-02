import React, { useEffect, useState } from 'react'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { AstricSign } from '../../../../../Helper/AstricSign'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../../Helper/Context'
import { DistrictDashboardDDLAPI, DistrictNameDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, TalukaDashboardDDLAPI, TalukaNameDDLAPI, VendorNameDDLAPI } from '../../../../../Redux/DDLSlice'
import { TalukaNameDataDDL } from '../../../../../Components/CommonDDL/TalukaNameDataDDL'
import { DistrictNameDataDDL } from '../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { StateNameDataDDL } from '../../../../../Components/CommonDDL/StateNameDataDDL'
import { VendorNameDDLData } from '../../../../../Components/CommonDDL/VendorNameDDLData'
import { NoOfVendorsExportTableDataAPI, NoOfVendorsTableDataAPI } from '../../../../../Redux/DashboardSlice/NoOfVendorsSlice'
import { Loading } from '../../../../../Helper/Loading'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { NumberOfFarmerExportData } from './NumberOfFarmerExportData'
import { NumberOfVendorExportData } from './NumberOfVendorExportData'
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { TalukaDashboardDDL } from '../../../../../Components/CommonDDL/TalukaDashboardDDL'

export default function NumberOfVendors() {
    const userDetails = useAuthState();
    const { UserID, token, RoleID } = userDetails
    const dispatch = useDispatch()
    const [IsSearch, setIsSearch] = useState(false)
    const [YearValue, setYearValue] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)

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

    const [VendorName, setVendorName] = useState('')

    const [NoOfVendorTextField, setNoOfVendorTextField] = useState(
        {
            vendorName: "",
        }
    )

    const handleInputChange = (e) => {
        setNoOfVendorTextField({ ...NoOfVendorTextField, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: 'Vendor' }))
        }
    }, [YearValue])


    useEffect(() => {
        const data = { StateDDL, UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(DistrictDashboardDDLAPI({ data, Flag: 'Vendor ' }))
        }
    }, [StateDDL.ID,YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(TalukaDashboardDDLAPI({ data, Flag: 'Vendor ' }))
        }
    }, [DistrictDDL.ID,YearValue])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(VendorNameDDLAPI({ data }))
    }, [])
    const { VendorNameData } = useSelector(state => state.VendorNameDDLData)

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClearButton = () => {
        setCurrentPage(0)
        setNoOfVendorTextField({
            vendorName: "",
        })
        setStateDDL({
            ...StateDDL,
            ID: 0,
            Label: "Select...",
        })
        setDistrictDDL({
            ...DistrictDDL,
            ID: 0,
            Label: "Select...",
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select...",
        })

    }
    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = {
            M_VendorID: 0,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageNameID: 0,
            // VendorName: VendorName,
            M_UsersID: 0,
            token: token,
            From: From,
            To: To,
            Flag: 'DO',
            ShowBy: 'Web',
            UserID: UserID,
            token: token,

        }
        if (YearValue !== 0) {
            dispatch(NoOfVendorsTableDataAPI({ data, NoOfVendorTextField }))
        }

    }, [To, IsPost, IsSearch, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VendorName])

    useEffect(() => {
        const data = {
            M_VendorID: 0,
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageNameID: 0,
            // VendorName: VendorName,
            M_UsersID: 0,
            token: token,
            From: From,
            To: '99999',
            Flag: 'Web',
            ShowBy: 'Web',
            UserID: UserID,
            token: token,

        }
        if (YearValue !== 0) {
            dispatch(NoOfVendorsExportTableDataAPI({ data, NoOfVendorTextField }))
        }

    }, [IsPost, IsSearch, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VendorName])

    const { tableData, isLoading } = useSelector(state => state.NoOfVendorsTableData)
    const { NoOfVendorsExportTableData, isExportLoading } = useSelector(state => state.NoOfVendorsExportTableData)

    // Pegination
    const [PerPageCount, setPerPageCount] = useState(10)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

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
                                                <h4 className="fontStyle">Number Of Vendor</h4>
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
                                                        NoOfVendorsExportTableData && NoOfVendorsExportTableData.table && NoOfVendorsExportTableData.table.length > 0 &&
                                                        <NumberOfVendorExportData
                                                            ExcelData={NoOfVendorsExportTableData}
                                                            name='Vendor Master'
                                                            RoleID = {RoleID}
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

                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Vendor Name</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="type"
                                                                    type="text"
                                                                    name="vendorName"
                                                                    // value={VendorName}
                                                                    // onChange={(e) => setVendorName(e.target.value)}
                                                                    value={NoOfVendorTextField.vendorName}
                                                                    onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-6 col-lg-2 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={handleClearButton}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>
                                                        <div className="col-12 col-lg-12 text-end mt-lg-2 mt-2">
                                                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Total Count:- 00  </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive ">
                                            <table id='vendors' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
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
                                                        <th>Vendor Name</th>
                                                        <th>Mobile Number</th>
                                                        <th>Vendor Address</th>
                                                        {/* <th style={{ width: "150px", textAlign: "center" }}>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        console.log(tableData)
                                                    }
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
                                                                <td>{item.vendorName ? item.vendorName : '-'}</td>
                                                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
                                                                <td>{item.address ? item.address : '-'}</td>
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
        </>
    )
}


