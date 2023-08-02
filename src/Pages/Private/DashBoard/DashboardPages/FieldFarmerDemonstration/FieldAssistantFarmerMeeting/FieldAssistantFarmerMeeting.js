import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../../../../../Components/Header/Header";
import Sidebar from "../../../../../../Components/Sidebar/Sidebar";
import Select from "react-select";
// import FieldAssistantPopUp from './FieldAssistantPopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AstricSign } from "../../../../../../Helper/AstricSign";
import { useAuthState } from "../../../../../../Helper/Context";
import { useDispatch, useSelector } from "react-redux";
import { CropNameDDLAPI, CropNameDashboardDDLAPI, DesignationDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, MonthDashboardDDLAPI, OfficerNameDDLAPI, SeasonDDLAPI, SeasonDashboardDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI } from "../../../../../../Redux/DDLSlice";
import { StateNameDataDDL } from "../../../../../../Components/CommonDDL/StateNameDataDDL";
import { SeasonDataDDL } from "../../../../../../Components/CommonDDL/SeasonDataDDL";
import { MonthDataDDL } from "../../../../../../Components/CommonDDL/MonthDataDDL";
import { DistrictNameDataDDL } from "../../../../../../Components/CommonDDL/DistrictNameDataDDL";
import { CropNameDataDDL } from "../../../../../../Components/CommonDDL/CropNameDataDDL";
import { DesignationNameDataDDL } from "../../../../../../Components/CommonDDL/DesignationNameDataDDL";
import { TotalFarmerMeetingExportTableDataAPI, TotalFarmerMeetingTableDataAPI } from "../../../../../../Redux/DashboardSlice/TotalFarmerMeetingSlice";
import { FieldAssistantVisitExportData } from "../../FieldAssistanceTable/FieldAssistanceVisit/FieldAssistantVisitExportData";
import { Pegination } from "../../../../../../Components/Pegination/Pegination";
import { FieldAssistantFarmerMeetingExportData } from "./FieldAssistantFarmerMeetingExportData";
import { OfficerNameDataDDL } from "../../../../../../Components/CommonDDL/OfficerNameDataDDL";
import { Loading } from "../../../../../../Helper/Loading";
import { CropNameDashboardDDL } from "../../../../../../Components/CommonDDL/CropNameDashboardDDL";
import { DistrictDashboardDDL } from "../../../../../../Components/CommonDDL/DistrictDashboardDDL";
import { MonthDashboardDDL } from "../../../../../../Components/CommonDDL/MonthDashboardDDL";
import { SeasonDashboardDDL } from "../../../../../../Components/CommonDDL/SeasonDashboardDDL";
import { StateDashboardDDL } from "../../../../../../Components/CommonDDL/StateDashboardDDL";

export default function FieldAssistantFarmerMeeting() {
  const userDetails = useAuthState();
  const { UserID, token, RoleID } = userDetails
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  let searchName = searchParams.get("name")
  let ApiFlag = searchParams.get("ApiFlag")
  let activeFilter = searchParams.get("activeFilter");
  let DDLFlag = searchParams.get("DDLFlag")

  // ----------pagination-------------
  const [PerPageCount, setPerPageCount] = useState(10)
  const [TotalCount, setTotalCount] = useState(0)
  const [To, setTo] = useState(20)
  const [From, setFrom] = useState(1)
  const [rowNo, setrowNo] = useState(1)
  const [CurrentPage, setCurrentPage] = useState(0)

  const [IsSearch, setIsSearch] = useState(false)
  const [IsClear, setIsClear] = useState(false)
  const [IsPost, setIsPost] = useState(false)
  const [YearValue, setYearValue] = useState(0)

  const [fieldVisitPopUp, setfieldVisitPopUp] = useState(false);

  const assitantNamePopUpClick = () => {
    setfieldVisitPopUp(true);
  };

  const handleCloseClick = () => {
    setfieldVisitPopUp(false);
  };

  const [StateDDL, setStateDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [SeasonDDL, setSeasonDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [MonthDDL, setMonthDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [CropNameDDL, setCropNameDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [DistrictDDL, setDistrictDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [DesigDDL, setDesigDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [OfficerNameDDL, setOfficerNameDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  })

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
    const data = { UserID, token, StateDDL };
    dispatch(DesignationDDLAPI({ data }));
  }, []);

 useEffect(() => {
    const data = {
      UserID,
      token,
      StateDDL,
      // TalukaDDL :'0',
      DistrictDDL,
      ShowBy: 'Web',
      // ScreenName: ScreenName,         
    }
    dispatch(OfficerNameDDLAPI({ data, Flag: DDLFlag, }))
  }, [StateDDL.ID, DistrictDDL.ID])

  const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
  const { SeasonDashboardData } = useSelector((state) => state.SeasonDashboardDDLData);
  const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
  const { CropNameDashboardData } = useSelector(state => state.CropNameDashboardDDLData)
  const { DesigDDLData } = useSelector((state) => state.DesignationDDLData);
  const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
  const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)

  const handleClearButton = () => {
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
    setDesigDDL({
      ...DesigDDL,
      ID: 0,
      Label: "Select...",
    })
    setOfficerNameDDL({
      ...OfficerNameDDL,
      ID: 0,
      Label: "Select...",
    })

  };
  // -------------------Farmer Meeting------------
  useEffect(() => {
    const data = {
      M_SeasonID: SeasonDDL.ID,
      M_CropID: CropNameDDL.ID,
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
      // ShowBy: 'Web'
      ShowBy: activeFilter
    }
    if (YearValue !== 0) {
      dispatch(TotalFarmerMeetingTableDataAPI({ data }))
    }

  }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, DistrictDDL.ID])

  useEffect(() => {
    const data = {
      M_SeasonID: SeasonDDL.ID,
      M_CropID: CropNameDDL.ID,
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
      // ShowBy: 'Web'
      ShowBy: activeFilter
    }
    if (YearValue !== 0) {
      dispatch(TotalFarmerMeetingExportTableDataAPI({ data }))
    }

  }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, DistrictDDL.ID])

  const { tableData, isLoading } = useSelector(state => state.TotalFarmerMeetingTableData)
  const { TotalFarmerMeetingExporttableData, isExportLoading } = useSelector(state => state.TotalFarmerMeetingExportTableData)

  const loadMore = () => {
    setTo(To + 20)
  }

  return (
    <>
     {isLoading && <Loading />}
      <main className="main-content position-relative border-radius-lg ">
        <Header setYearValue={setYearValue} />
        <Sidebar />
        <div id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid xyz">
              <div className="row mt_40">
                <div className="row mt-5">
                  <div className="col-md-12 grid-margin">
                    <div className="row page-heading">
                      <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                        <h4 className="fontStyle">{`Farmer Meeting -> ${searchName}`}</h4>
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
                            TotalFarmerMeetingExporttableData && TotalFarmerMeetingExporttableData.table && TotalFarmerMeetingExporttableData.table.length > 0 &&
                            <FieldAssistantFarmerMeetingExportData
                              ExcelData={TotalFarmerMeetingExporttableData}
                              name='Total Farmer Meeting'
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
                        <div className="filter-bg p-2">
                          <div className="row">
                          <div className="col-md-6 col-lg-3">
                              <StateDashboardDDL
                                StateDDL={StateDDL}
                                setStateDDL={setStateDDL}
                                StateDashboardDDLData={StateDashboardDDLData}
                                mandatory={false}
                              />
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <SeasonDashboardDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDashboardData={SeasonDashboardData}
                                mandatory={false}
                              />
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <MonthDashboardDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthDashboardData={MonthDashboardData}
                                mandatory={false}
                              />
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <DistrictDashboardDDL
                                DistrictDDL={DistrictDDL}
                                setDistrictDDL={setDistrictDDL}
                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                mandatory={false}
                                searchName={searchName}
                              />
                            </div>

                            <div className="col-md-6 col-lg-3">
                              <CropNameDashboardDDL
                                CropNameDDL={CropNameDDL}
                                setCropNameDDL={setCropNameDDL}
                                CropNameDashboardData={CropNameDashboardData}
                              />
                            </div>

                            {
                              searchName === "Target" && ApiFlag === 'Target' || searchName === "Pending" && ApiFlag === 'Pending' ?
                                <></>
                                :
                                <>
                                  <div className="col-md-6 col-lg-3">
                                    <OfficerNameDataDDL
                                      OfficerNameDDL={OfficerNameDDL}
                                      setOfficerNameDDL={setOfficerNameDDL}
                                      OfficerNameDDLData={OfficerNameDDLData}
                                      mandatory={true}
                                    />
                                  </div>

                                  {/* <div className="col-md-6 col-lg-3">
                                    <DesignationNameDataDDL
                                      DesigDDL={DesigDDL}
                                      setDesigDDL={setDesigDDL}
                                      DesigDDLData={DesigDDLData}
                                    />
                                  </div> */}
                                </>
                            }
                            {/* <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Date</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="Date"
                                                                    type="Date"
                                                                    name="Date"
                                                                />
                                                            </div>
                                                        </div> */}

                            <div className="col-12 col-lg-2 clear">
                              <button
                                type="button"
                                className="btn btn-clear mt-4 mt-md-0 mt-lg-4 mx-2 allBtn"
                                onClick={handleClearButton}
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive ">
                      <table
                        id="field-visit"
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                        className="table table-bordered"
                      >
                        <thead>
                          <tr>
                            <th>
                              Sr.No.
                            </th>
                            {
                              RoleID == 7 || RoleID == 8 ?
                                <></>
                                :
                                <th>State</th>
                            }
                            <th>Season</th>
                            <th>District </th>
                            <th>Crop Name</th>
                            <th>Total Farmer Meeting Assign Target</th>
                            {searchName === "Completed" && ApiFlag === 'Completed' ? (
                              <>
                                <th>Completed Farmer Meeting Target</th>
                                <th>Pending Farmer Meeting Target</th>
                                <th>Officer Name</th>
                              </>
                            ) : searchName === "Pending" && ApiFlag === 'Pending' ? (
                              <>
                                <th>Completed Farmer Meeting Target</th>
                                <th>Pending Farmer Meeting Target</th>
                                {/* <th>Officer Name</th> */}
                              </>
                            ) : (
                              <></>
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {
                            tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                              <tr key={i}>
                                <td style={{textAlign:'center'}} className='w-5'>{i+1}</td>
                                {
                                  RoleID == 7 || RoleID == 8 ?
                                    <></>
                                    :
                                    <td>{item.stateName ? item.stateName : '-'}</td>
                                }
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.cropName ? item.cropName : '-'}</td>
                                <td>{item.totalFarmermeetingTarget ? item.totalFarmermeetingTarget : '-'}</td>
                                {searchName === "Completed" && ApiFlag === 'Completed' ?
                                  <>
                                    <td>{item.completedFarmerMeeting ? item.completedFarmerMeeting : 0}</td>
                                    <td>{item.pendingFarmerMeetingTarget ? item.pendingFarmerMeetingTarget : '-'}</td>
                                    <td>{item.employeeName ? item.employeeName : '-'}</td>
                                  </>
                                  : searchName === "Pending" && ApiFlag === 'Pending' ?
                                    <>
                                      <td>{item.completedFarmerMeeting ? item.completedFarmerMeeting : 0}</td>
                                      <td>{item.pendingFarmerMeetingTarget ? item.pendingFarmerMeetingTarget : '-'}</td>
                                      {/* <td>{item.employeeName ? item.employeeName : '-'}</td> */}
                                    </>
                                    :
                                    <></>
                                }
                              </tr>
                            )) : <tr>No data</tr>
                          }
                        </tbody>
                      </table>
                    </div>
                    {tableData && tableData.table && tableData.table.length > 0 && (To <= tableData.table.length) ?
                    <div className="text-center mb-2">
                    <button className="btn btn-outline-primary" onClick={()=> loadMore()}> Load More...</button>
                    </div>
                      :
                      <text>No more records....</text>
                      // <Pegination
                      //   PerPageCount={PerPageCount}
                      //   TotalCount={tableData.table[0].totalCount}
                      //   setFrom={setFrom}
                      //   setTo={setTo}
                      //   setrowNo={setrowNo}
                      //   CurrentPage={CurrentPage}
                      //   setCurrentPage={setCurrentPage}
                      // />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* {
                fieldVisitPopUp ? <FieldAssistantPopUp open={fieldVisitPopUp} handleCloseClick={handleCloseClick} /> : <></>
            } */}
    </>
  );
}
