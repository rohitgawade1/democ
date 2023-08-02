import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../../../../Components/Header/Header";
import Sidebar from "../../../../../../Components/Sidebar/Sidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useAuthState } from "../../../../../../Helper/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  DesignationDDLAPI,
  DistrictNameDDLAPI,
  EmployeeDDLAPI,
  MonthDDLAPI,
  TalukaNameDDLAPI,
} from "../../../../../../Redux/DDLSlice";
import { DesignationNameDataDDL } from "../../../../../../Components/CommonDDL/DesignationNameDataDDL";
import { MonthDataDDL } from "../../../../../../Components/CommonDDL/MonthDataDDL";
import { DistrictNameDataDDL } from "../../../../../../Components/CommonDDL/DistrictNameDataDDL";
import { TalukaNameDataDDL } from "../../../../../../Components/CommonDDL/TalukaNameDataDDL";
import { TotalEmployeeTableDataAPI } from "../../../../../../Redux/DashboardSlice/TotalEmployeeDetailsSlice";
import { Loading } from "../../../../../../Helper/Loading";
import { BaseUrl } from "../../../../../../Helper/BaseUrl";
import { toastInfo } from "../../../../../../Helper/ToastMessage";
import { GetTrackDataAPI } from "../../../../../../Redux/MapViewSlice/MapViewSlice";
import MapView from "../../../../../../Components/MapView/MapView";

export default function MonthTotalEmployee() {
  const userDetails = useAuthState();
  const { UserID, token } = userDetails
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [searchParams] = useSearchParams()
  let searchName = searchParams.get("name")

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

  const [MobNo, setMobNo] = useState('')

  const [Loader, setLoading] = useState(true)
  const [LoactionData, setLoactionData] = useState([])
  const [ShowMap, setShowMap] = useState(false)


  const [latlong, setlatlong] = useState([])

  const [PopUpField, setPopUpField] = React.useState({
    addPopUp: false,
    deletePopUp: false,
    popupFlag: "",
  });

  const [DesigDDL, setDesigDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [EmpDDL, setEmpDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [DistrictDDL, setDistrictDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [TalukaDDL, setTalukaDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });
  const [MonthDDL, setMonthDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  });

  useEffect(() => {
    const data = { UserID, token };
    dispatch(DesignationDDLAPI({ data }));
  }, []);
  useEffect(() => {
    const data = { UserID, token, DesigDDL };
    dispatch(EmployeeDDLAPI({ data, Flag: "Master" }));
  }, []);
  useEffect(() => {
    const data = { UserID, token };
    dispatch(DistrictNameDDLAPI({ data }));
  }, []);
  useEffect(() => {
    const data = { UserID, token };
    dispatch(TalukaNameDDLAPI({ data }));
  }, []);
  useEffect(() => {
    const data = { UserID, token };
    dispatch(MonthDDLAPI({ data }));
  }, []);



  const { DesigDDLData } = useSelector((state) => state.DesignationDDLData);
  const { EmployeeDDLData } = useSelector((state) => state.EmployeeDDLData);
  const { DistrictDDLData } = useSelector((state) => state.DistrictNameDDL);
  const { TalukaDDLData } = useSelector((state) => state.TalukaNameDDL);
  const { MonthData } = useSelector((state) => state.MonthDDLData);

  useEffect(() => {
    handleEmployeeDDL();
  }, [EmployeeDDLData]);

  const handleEmployeeDDL = () => {
    if (
      EmployeeDDLData &&
      EmployeeDDLData.table &&
      EmployeeDDLData.table.length > 0
    ) {
      let list = EmployeeDDLData.table.map((item, index) => ({
        value: item.id,
        label: item.employeeName,
      }));

      setEmpDDL({
        DDL: list,
        ID: 0,
        Label: "Select...",
      });
    } else {
      setEmpDDL({
        DDL: [],
        ID: 0,
        Label: "Select...",
      });
    }
  };

  const handleClearButton = () => {
    setCurrentPage(0)
    setMobNo('')
    setDesigDDL({
      ...DesigDDL,
      ID: 0,
      Label: "Select---",
    });
    setEmpDDL({
      ...EmpDDL,
      ID: 0,
      Label: "Select---",
    });
    setDistrictDDL({
      ...DistrictDDL,
      ID: 0,
      Label: "Select---",
    });
    setTalukaDDL({
      ...TalukaDDL,
      ID: 0,
      Label: "Select---",
    });
    setMonthDDL({
      ...MonthDDL,
      ID: 0,
      Label: "Select---",
    });
  };

  // ------------------------Total Employee----------
  useEffect(() => {
    const data = {
      M_EmployeeID: EmpDDL.ID,
      FinancialYearID: YearValue,
      MonthID: 0,
      M_DistrictID: DistrictDDL.ID,
      M_TalukaID: TalukaDDL.ID,
      // M_DepartmentID: DeptDDL.ID,
      M_DesignationID: DesigDDL.ID,
      EmployeeName: '',
      MobileNumber: MobNo,
      UserID: UserID,
      token: token,
      From: From,
      To: To,
      Flag: 'All',
      ShowBy: 'Monthly',
      searchName: searchName,
    }
    if (YearValue !== 0) {
      dispatch(TotalEmployeeTableDataAPI({ data }))
    }

  }, [IsPost, From, IsClear, YearValue, DistrictDDL.ID, TalukaDDL.ID, DesigDDL.ID, EmpDDL.ID, MobNo])

  const { tableData, isLoading } = useSelector(state => state.TotalEmployeeTableData)

  const handleLocation = (M_Employee_AttendanceID, M_EmployeeID) => {
    const data = {
      token: token,
      M_Employee_AttendanceID: M_Employee_AttendanceID,
      M_EmployeeID: M_EmployeeID,
      M_UserID: UserID,
      Flag: 'Track',
      handleShowMap: handleShowMap
    }
    dispatch(GetTrackDataAPI({ data }))
  }

  const { isTrackLoading, TrackData } = useSelector(state => state.GetTrackData)

  const handleShowMap = () => {
    setShowMap(true)
  }
  const handleCloseMap = () => {
    setShowMap(false)
  }

  return (
    <>
      {isTrackLoading && <Loading />}
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
                        <h4 className="fontStyle">
                          {" "}
                          {`Attendance -> ${searchName}`}{" "}
                        </h4>
                      </div>
                      <div className="col-12 col-lg-4 mb-xl-0">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                          table="total-employee"
                          filename="data"
                          sheet="data"
                          pageOrientation="Landscape"
                          buttonText="Export"
                          style={{ borderColor: "black" }}
                        />
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
                            {searchName === "Total Present" ? (
                              <>
                                <div className="col-md-6 col-lg-3">
                                  <MonthDataDDL
                                    MonthDDL={MonthDDL}
                                    setMonthDDL={setMonthDDL}
                                    MonthData={MonthData}
                                  />
                                </div>
                                <div className="col-md-6 col-lg-3">
                                  <div className="form-group">
                                    <label
                                      className="d-block"
                                      htmlFor="NameofDepartment"
                                    >
                                      Date
                                    </label>
                                    <input
                                      className="form-control"
                                      id="Date"
                                      type="Date"
                                      name="Date"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                  <DistrictNameDataDDL
                                    DistrictDDL={DistrictDDL}
                                    setDistrictDDL={setDistrictDDL}
                                    DistrictDDLData={DistrictDDLData}
                                  />
                                </div>
                                <div className="col-md-6 col-lg-3">
                                  <TalukaNameDataDDL
                                    TalukaDDL={TalukaDDL}
                                    setTalukaDDL={setTalukaDDL}
                                    TalukaDDLData={TalukaDDLData}
                                  />
                                </div>
                              </>
                            ) : (
                              ""
                            )}

                            <div className="col-md-6 col-lg-3">
                              <DesignationNameDataDDL
                                DesigDDL={DesigDDL}
                                setDesigDDL={setDesigDDL}
                                DesigDDLData={DesigDDLData}
                              />
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Employee Name
                                </label>
                                <Select
                                  isClearable
                                  // isRtl={isRtl}
                                  isSearchable
                                  maxMenuHeight={150}
                                  value={{
                                    value: EmpDDL.ID,
                                    label: EmpDDL.Label,
                                  }}
                                  onChange={(e) => {
                                    e
                                      ? setEmpDDL({
                                        ...EmpDDL,
                                        ID: e.value,
                                        Label: e.label,
                                      })
                                      : setEmpDDL({
                                        ...EmpDDL,
                                        ID: 0,
                                        Label: "Select...",
                                      });
                                  }}
                                  options={EmpDDL.DDL}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Mobile Number</label>
                                <input
                                  className="form-control"
                                  id="MobNo"
                                  type="text"
                                  name="MobNo"
                                  value={MobNo}

                                  onChange={(e) =>
                                    setMobNo(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-12 col-lg-2 clear">
                              <button
                                type="button"
                                className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mx-2 mt-lg-4 waves-effect waves-light allBtn"
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
                        id="total-employee"
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                        className="table table-bordered"
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "center", width: "10%" }}>
                              Sr.No.
                            </th>
                            {searchName === "Total Present" && (
                              <>
                                <th>Month </th>
                                <th>Date </th>
                                <th>District </th>
                                <th>Taluka </th>
                              </>
                            )}
                            <th>Department </th>
                            <th> Employee Code</th>
                            <th>Employee Name</th>
                            <th>Designation</th>
                            <th>Mobile Number</th>
                            {searchName === "Total Present" && (
                              <>
                                <th>Starting Km</th>
                                <th>closing Km</th>
                                <th>In</th>
                                <th>Out</th>
                                {/* <th>Visit</th> */}
                                <th>Track</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {

                            tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (

                              <tr key={i}>
                                <td align='center'>{item.rowNum}</td>
                                {searchName === "Total Present" && (
                                  <>
                                    <td>{item.month_Name ? item.month_Name : '-'}</td>
                                    <td>{item.attendance_Day ? item.attendance_Day : '-'}</td>
                                    <td>{item.districtName ? item.districtName : '-'}</td>
                                    <td>{item.talukaName ? item.talukaName : '-'}</td>
                                  </>
                                )}
                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                <td>{item.designationName ? item.designationName : '-'}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
                                {searchName === "Total Present" && (
                                  <>
                                    <td>{item.startingKM ? item.startingKM : '-'}</td>
                                    <td>{item.closingKM ? item.closingKM : '-'}</td>
                                    <td align="center">
                                      {
                                        (item.inPhotoPath == null) ?
                                          <span>-</span>
                                          :
                                          <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                            <i class="fa-solid fa-eye " title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                              onClick={() => {
                                                window.open(item.inPhotoPath ? item.inPhotoPath : 'ImageNotFound')
                                              }}
                                            ></i>
                                          </a>
                                      }
                                    </td>
                                    <td align="center">
                                      {
                                        (item.outPhotoPath == null) ?
                                          <span>-</span>
                                          :
                                          <a target="_blank" style={{ textDecoration: "underline", fontSize: "16px" }}>
                                            <i class="fa-solid fa-eye " title='view' style={{ fontSize: "17px", cursor: "pointer" }}
                                              onClick={() => {
                                                window.open(item.outPhotoPath ? item.outPhotoPath : 'ImageNotFound')
                                              }}
                                            ></i>
                                          </a>

                                      }
                                    </td>

                                    {/* <td style={{ fontSize: '1rem', textAlign: 'center', cursor: 'pointer' }}>
                                      <a href={item.inPhotoPath} target="_blank">
                                        <i class="fa-solid fa-eye"></i>
                                      </a>
                                    </td>
                                    <td style={{ fontSize: '1rem', textAlign: 'center', cursor: 'pointer' }}>
                                      <a href={item.outPhotoPath} target="_blank">
                                        <i class="fa-solid fa-eye"></i>
                                      </a>
                                    </td> */}

                                    <td align="center"
                                      onClick={() => handleLocation(item.m_Employee_AttendanceID, item.m_EmployeeID)}
                                    >
                                      {
                                        (item.trackCount == 0) ?
                                          <span>-</span>
                                          :

                                          <i style={{ cursor: 'pointer', fontSize: '1rem' }} class="fa-solid fa-location-dot"></i>
                                      }
                                    </td>


                                    {/* <td align="center" onClick={() => { handleLocation(item.m_Employee_AttendanceID, item.m_EmployeeID) }}><i style={{ cursor: 'pointer', fontSize: '1rem' }} class="fa-solid fa-location-dot"></i></td> */}
                                  </>
                                )}

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
        {
          ShowMap &&
          <MapView
            LoactionData={TrackData}
            ShowMap={ShowMap}
            handleCloseMap={handleCloseMap}
          />
        }
      </main>
    </>
  );
}
