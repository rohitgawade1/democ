import React from 'react'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useAuthState } from '../../../../../Helper/Context'
import { useEffect } from 'react'
import { DistrictDashboardDDLAPI, DistrictNameDDLAPI, FarmerNameDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, TalukaDashboardDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageDashboardDDLAPI } from '../../../../../Redux/DDLSlice'
import { StateNameDataDDL } from '../../../../../Components/CommonDDL/StateNameDataDDL'
import { DistrictNameDataDDL } from '../../../../../Components/CommonDDL/DistrictNameDataDDL'
import { TalukaNameDataDDL } from '../../../../../Components/CommonDDL/TalukaNameDataDDL'
import { VillageDataDDL } from '../../../../../Components/CommonDDL/VillageDataDDL'
import { AstricSign } from '../../../../../Helper/AstricSign'
import { NoOfFarmersExportTableDataAPI, NoOfFarmersTableDataAPI } from '../../../../../Redux/DashboardSlice/NoOfFarmersSlice'
import { Loading } from '../../../../../Helper/Loading'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { FarmerMasterExport } from '../../../../Sidebar/Masters/Client Admin/FarmerMaster/FarmerMasterExport'
import { NumberOfFarmerExportData } from './NumberOfFarmerExportData'
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { TalukaDashboardDDL } from '../../../../../Components/CommonDDL/TalukaDashboardDDL'
import { VillageDashboardDDL } from '../../../../../Components/CommonDDL/VillageDashboardDDL'


export default function NumberOfFarmers() {
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

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [FarmerNameDDL, setFarmerNameDDL] = useState({
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
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: 'Select...',
        })
        setFarmerNameDDL({
            ...FarmerNameDDL,
            ID: 0,
            Label: 'Select...',
        })
        // console.log("call")
    }
    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: 'Farmer' }))
        }
    }, [YearValue])


    useEffect(() => {
        const data = { StateDDL, UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(DistrictDashboardDDLAPI({ data, Flag: 'Farmer ' }))
        }
    }, [StateDDL.ID, YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(TalukaDashboardDDLAPI({ data, Flag: 'Farmer ' }))
        }
    }, [StateDDL.ID,DistrictDDL.ID,YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL, TalukaDDL, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
        dispatch(VillageDashboardDDLAPI({ data, Flag: 'Farmer'  }))
        }
    }, [StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID,YearValue])
   

    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)
    const { VillageDashboardData } = useSelector(state => state.VillageDashboardDDLData)

    // -----------Farmer Name DDL--------
    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL, VillageDDL }
        dispatch(FarmerNameDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID, VillageDDL.ID])

    const { FarmerNameData } = useSelector(state => state.FarmerNameDDLData)

    useEffect(() => {
        handleFarmerNameDDL()
    }, [FarmerNameData])

    const handleFarmerNameDDL = () => {
        if (FarmerNameData && FarmerNameData.table && FarmerNameData.table.length > 0) {
            let list = FarmerNameData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.fullName,
            }))

            setFarmerNameDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setFarmerNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = {
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageNameID: VillageDDL.ID,
            M_EmployeeID: '0',
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'DO',
            ShowBy: 'Web'
        }
        if (YearValue !== 0) {
            dispatch(NoOfFarmersTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID])

    useEffect(() => {
        const data = {
            FinancialYearID: YearValue,
            MonthID: 0,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            M_VillageNameID: VillageDDL.ID,
            M_EmployeeID: '0',
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: 'DO',
            ShowBy: 'Web'
        }
        if (YearValue !== 0) {
            dispatch(NoOfFarmersExportTableDataAPI({ data }))
        }

    }, [IsPost, From, IsClear, YearValue, StateDDL.ID, DistrictDDL.ID, TalukaDDL.ID, VillageDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.NoOfFarmersTableData)
    const { NoOfFarmersExportTableData, isExportLoading } = useSelector(state => state.NoOfFarmersExportTableData)
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
                                                <h4 className="fontStyle">Number Of Farmer</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                {/* <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                // onClick={() => addButtonClick()}
                                                >
                                                      <i className="fa-solid fa-file-export pr-2" style={{ fontSize: "15px", marginRight: "5px",color:"green" }}></i>
                                                    Export

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
                                                        NoOfFarmersExportTableData && NoOfFarmersExportTableData.table && NoOfFarmersExportTableData.table.length > 0 &&
                                                        <NumberOfFarmerExportData
                                                            ExcelData={NoOfFarmersExportTableData}
                                                            name='Farmer Master'
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
                                                        <div className="col-md-6 col-lg-2">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <TalukaDashboardDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDashboardDDLData={TalukaDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <VillageDashboardDDL
                                                                VillageDDL={VillageDDL}
                                                                setVillageDDL={setVillageDDL}
                                                                VillageDashboardData={VillageDashboardData}
                                                                mandatory={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Farmer Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: FarmerNameDDL.ID, label: FarmerNameDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setFarmerNameDDL({ ...FarmerNameDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setFarmerNameDDL({ ...FarmerNameDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={FarmerNameDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-1 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"

                                                            >
                                                                Search
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={handleClear}
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
                                            <table id='farmers' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
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
                                                        <th>Village</th>
                                                        <th>Farmer  Name</th>
                                                        <th>Mobile Number</th>
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
                                                                <td>{item.villageName ? item.villageName : '-'}</td>
                                                                <td>{item.fullName ? item.fullName : '-'}</td>
                                                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
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
                </div >
            </main >
        </>
    )
}


