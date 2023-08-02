import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import Header from "../../../../../../Components/Header/Header";
import Sidebar from "../../../../../../Components/Sidebar/Sidebar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { DistrictNameDataDDL } from "../../../../../../Components/CommonDDL/DistrictNameDataDDL";
import { useDispatch, useSelector } from "react-redux";
import {
  DepartmentDashboardDDLAPI,
  DeptDDLAPI,
  DesignationDDLAPI,
  DesignationDashboardDDLAPI,
  DistrictDashboardDDLAPI,
  DistrictNameDDLAPI,
  EmployeeDDLAPI,
  FinancialYearDDLReducer,
  OfficerNameDDLAPI,
  TalukaDashboardDDLAPI,
  TalukaNameDDLAPI,
} from "../../../../../../Redux/DDLSlice";
import { useAuthState } from "../../../../../../Helper/Context";
import { TalukaNameDataDDL } from "../../../../../../Components/CommonDDL/TalukaNameDataDDL";
import { DepartmentDDL } from "../../../../../../Components/CommonDDL/DepartmentDDL";
import { DesignationNameDataDDL } from "../../../../../../Components/CommonDDL/DesignationNameDataDDL";
import { WithWithoutLeaveTableDataAPI } from "../../../../../../Redux/DashboardSlice/WithWithoutLeaveSlice";
import { Loading } from "../../../../../../Helper/Loading";
import { Pegination } from "../../../../../../Components/Pegination/Pegination";
import { DistrictDashboardDDL } from "../../../../../../Components/CommonDDL/DistrictDashboardDDL";
import { TalukaDashboardDDL } from "../../../../../../Components/CommonDDL/TalukaDashboardDDL";
import { DepartmentDashboardDDL } from "../../../../../../Components/CommonDDL/DepartmentDashboardDDL";
import { DesignationDashboardDDL } from "../../../../../../Components/CommonDDL/DesignationDashboardDDL";
import { OfficerNameDataDDL } from "../../../../../../Components/CommonDDL/OfficerNameDataDDL";

export default function TotalAbsent() {
  const [searchParams] = useSearchParams();
  let searchName = searchParams.get("name");
  let ApiFlag = searchParams.get('ApiFlag')
  let DDLFlag = searchParams.get("DDLFlag");
  const userDetails = useAuthState();
  const { UserID, token } = userDetails;
  const dispatch = useDispatch();

  const [ScreenName, setScreenName] = useState(searchName);
  const [PerPageCount, setPerPageCount] = useState(10)
  const [To, setTo] = useState(10)
  const [From, setFrom] = useState(1)
  const [rowNo, setrowNo] = useState(1)
  const [IsSearch, setIsSearch] = useState(false)
  const [IsClear, setIsClear] = useState(false)
  const [IsPost, setIsPost] = useState(false)
  const [YearValue, setYearValue] = useState(0)
  const [CurrentPage, setCurrentPage] = useState(0)
  const [MobNo, setMobNo] = useState('')

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
  const [DeptDDL, setDeptDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
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

  useEffect(() => {
    const data = {
      // StateDDL:'0',
      UserID,
      token,
      M_MonthID: '0',
      M_FinancialYearID: YearValue
    }
    if (YearValue !== 0) {
      dispatch(DistrictDashboardDDLAPI({ data, Flag: DDLFlag }))
    }
  }, [YearValue])

  useEffect(() => {
    const data = {
      UserID,
      token,
      DistrictDDL,
      M_MonthID: '0',
      M_FinancialYearID: YearValue
    }
    if (YearValue !== 0) {
      dispatch(TalukaDashboardDDLAPI({ data, Flag: DDLFlag }))
    }
  }, [DistrictDDL.ID, YearValue])

  useEffect(() => {
    const data = {
      UserID,
      token,
      M_StateNameID: '0',
      M_DistrictNameID: DistrictDDL.ID,
      M_TalukaNameID: TalukaDDL.ID
    }
    dispatch(DepartmentDashboardDDLAPI({ data, Flag: DDLFlag }))
  }, [DistrictDDL.ID, TalukaDDL.ID])

  useEffect(() => {
    const data = {
      UserID,
      token,
      M_StateNameID: '0',
      M_DistrictNameID: DistrictDDL.ID,
      M_TalukaNameID: TalukaDDL.ID
    }
    dispatch(DesignationDashboardDDLAPI({ data, Flag: DDLFlag }))
  }, [DistrictDDL.ID, TalukaDDL.ID])

  // useEffect(() => {
  //   const data = { UserID, token, DesigDDL, DeptDDL };
  //   dispatch(EmployeeDDLAPI({ data, Flag: "Master" }));
  // }, []);

  useEffect(() => {
    const data = {
      UserID,
      token,
      // StateDDL,
      DistrictDDL,
      ShowBy: 'Web',
    }
    dispatch(OfficerNameDDLAPI({ data, Flag: DDLFlag }))
  }, [DistrictDDL.ID])

  const { DesignationDashboardDDLData } = useSelector(state => state.DesignationDashboardDDLData);
  const { DepartmentDashboardDDLData } = useSelector(state => state.DepartmentDashboardDDLData);
  const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
  const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)
  const { EmployeeDDLData } = useSelector(state => state.EmployeeDDLData);
  const { OfficerNameDDLData } = useSelector(state => state.OfficerNameDDLDataa)

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
    setDeptDDL({
      ...DeptDDL,
      ID: 0,
      Label: "Select...",
    });
    setDistrictDDL({
      ...DistrictDDL,
      ID: 0,
      Label: "Select...",
    });
    setDesigDDL({
      ...DesigDDL,
      ID: 0,
      Label: "Select...",
    });
    setTalukaDDL({
      ...TalukaDDL,
      ID: 0,
      Label: "Select...",
    });
    setEmpDDL({
      ...EmpDDL,
      ID: 0,
      Label: "Select...",
    });
  };

  useEffect(() => {
    const data = {
      FinancialYearID: YearValue,
      MonthID: 0,
      M_StateNameID: 0,
      M_DistrictNameID: DistrictDDL.ID,
      M_TalukaNameID: TalukaDDL.ID,
      M_DepartmentID: DeptDDL.ID,
      M_EmployeeID: EmpDDL.ID,
      M_StatusID: 0,
      UserID: UserID,
      token,
      From,
      To,
      ShowBy: 'Daily',
      searchName: searchName,
    }

    if (YearValue !== 0) {
      dispatch(WithWithoutLeaveTableDataAPI({ data,Flag: ApiFlag }))
  }
    // if (ScreenName === 'With Leave') {
    //   if (YearValue !== 0) {
    //     dispatch(WithWithoutLeaveTableDataAPI({
    //       data, Flag: "WithLeave",
    //       ShowBy: "Daily"
    //     }))
    //   }
    // }
    // else if (ScreenName === 'Without Leave') {
    //   if (YearValue !== 0) {
    //     dispatch(WithWithoutLeaveTableDataAPI({
    //       data, Flag: "WithoutLeave",
    //       ShowBy: "Daily"
    //     }))
    //   }
    // }


  }, [From, IsSearch, IsClear, IsPost, ScreenName, YearValue,DistrictDDL.ID,TalukaDDL.ID,DeptDDL.ID, EmpDDL.ID])

  const { tableData, isLoading } = useSelector(state => state.WithWithoutLeaveTableData)

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
                        <h4 className="fontStyle">
                          {" "}
                          {`Attendance - ${searchName}`}
                        </h4>
                      </div>
                      <div className="col-12 col-lg-4 mb-xl-0">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3"
                          table="total-absent"
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
                            <div className="col-md-6 col-lg-2">
                              <DistrictDashboardDDL
                                DistrictDDL={DistrictDDL}
                                setDistrictDDL={setDistrictDDL}
                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                searchName={searchName}
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
                              <DepartmentDashboardDDL
                                DeptDDL={DeptDDL}
                                setDeptDDL={setDeptDDL}
                                DepartmentDashboardDDLData={DepartmentDashboardDDLData}
                                mandatory={false}
                              />
                            </div>
                            <div className="col-md-6 col-lg-2">
                              <DesignationDashboardDDL
                                DesigDDL={DesigDDL}
                                setDesigDDL={setDesigDDL}
                                DesignationDashboardDDLData={DesignationDashboardDDLData}
                              />
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <OfficerNameDataDDL
                                OfficerNameDDL={EmpDDL}
                                setOfficerNameDDL={setEmpDDL}
                                OfficerNameDDLData={OfficerNameDDLData}
                                mandatory={true}
                                name="Employee Name"
                              />
                              {/* <div className="form-group">
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
                              </div> */}

                            </div>
                            {/* <div className="col-md-6 col-lg-3">
                              <div className="form-group">
                                <label
                                  className="d-block"
                                  htmlFor="NameofDepartment"
                                >
                                  Mobile Number
                                </label>
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
                            </div> */}
                            <div className="col-12 col-lg-1 text-start ">
                              <button
                                type="button"
                                className="btn btn-clear text-white mr-2 mt-4 mt-md-0  mt-lg-4 waves-effect waves-light allBtn"
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
                        id="total-absent"
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
                            {
                              searchName === "Without Leave" ?
                                <th>Month</th>
                                :
                                <></>
                            }
                            <th>District </th>
                            <th>Taluka</th>
                            <th>Department </th>
                            <th>Employee Code </th>
                            <th>Employee Name</th>
                            <th>Designation</th>
                            <th>Mobile Number</th>
                            <th>Leave Reason</th>
                          </tr>
                        </thead>
                        <tbody>

                          {
                            tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                              <tr key={i} style={{ textAlign: "center" }}>
                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum ? item.rowNum : "-"}</td>
                                {
                                  searchName === "Without Leave" ?
                                    <td>{item.stateName ? item.stateName : "-"}</td>
                                    :
                                    <></>
                                }
                                <td>{item.districtName ? item.districtName : "-"}</td>
                                <td>{item.talukaName ? item.talukaName : "-"}</td>
                                <td>{item.departmentName ? item.departmentName : "-"}</td>
                                <td>-</td>
                                <td>{item.employeeName ? item.employeeName : "-"}</td>
                                <td>{item.designationName ? item.designationName : "-"}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : "-"}</td>
                                <td>{item.leaveReason ? item.leaveReason : "-"}</td>


                                {/* <td>
                                  <span className='tableIcon'
                                    onClick={() => imageButtonClick(item.plotPhoto)}
                                  >
                                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                                  </span>
                                </td> */}
                                {/* <td>
                                                                    <span className='tableIcon'
                                                                        onClick={() => videoButtonClick(item.plotPhoto)}
                                                                    >
                                                                        <i className="fa fa-file-video-o" aria-hidden="true"></i>
                                                                    </span>
                                                                </td> */}
                                {/* <td align='center'>
                                  <span className='tableIcon'
                                    onClick={() => editButtonClick(item)}
                                  >
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                  </span> */}
                                {/* <span className='tableIcon'
                                                                onClick={() => deleteButtonClick()}
                                                            >
                                                                <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                            </span> */}
                                {/* </td> */}

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
  );
}
