import React, { useEffect, useState } from "react";
import Select from "react-select";
import Header from "../../../../../../Components/Header/Header";
import DeletePopUp from "../../../../../../Components/Common/DeletePopUp";
import Sidebar from "../../../../../../Components/Sidebar/Sidebar";
import { useSearchParams } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useLocation } from "react-router-dom";
import CommonQuantityPopUp from "../../Officer Target & Achievement/CommonQuantityPopUp";
import { AstricSign } from "../../../../../../Helper/AstricSign";
import { StateNameDataDDL } from "../../../../../../Components/CommonDDL/StateNameDataDDL";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "../../../../../../Helper/Context";
import { CropNameDashboardDDLAPI,MonthDashboardDDLAPI,ProductNameDashboardDDLAPI,SeasonDashboardDDLAPI,StateDashboardDDLAPI,} from "../../../../../../Redux/DDLSlice";
import { TotalOrderTargetExportTableDataAPI, TotalOrderTargetTableDataAPI } from "../../../../../../Redux/DashboardSlice/TotalOrderTargetSlice";
import { TotalOrderAchievementExportTableDataAPI, TotalOrderAchievementTableDataAPI } from "../../../../../../Redux/DashboardSlice/TotalOrderAcheivementSlice";
import { Pegination } from "../../../../../../Components/Pegination/Pegination";
import { TotalOrderTargetExport } from "./TotalOrderTargetExport";
import { TotalOrderAcheivementExport } from "./TotalOrderAcheivementExport";
import { Loading } from "../../../../../../Helper/Loading";
import { StateDashboardDDL } from "../../../../../../Components/CommonDDL/StateDashboardDDL";
import { SeasonDashboardDDL } from "../../../../../../Components/CommonDDL/SeasonDashboardDDL";
import { MonthDashboardDDL } from "../../../../../../Components/CommonDDL/MonthDashboardDDL";
import { CropNameDashboardDDL } from "../../../../../../Components/CommonDDL/CropNameDashboardDDL";
import { ProductNameDashboardDDL } from "../../../../../../Components/CommonDDL/ProductNameDashboardDDL";

export default function TotalTargetOrder(props) {
  const userDetails = useAuthState();

  const { UserID, token, RoleID } = userDetails;
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let searchName = searchParams.get("name");
  let activeFilter = searchParams.get("activeFilter");
  let DDLFlag = searchParams.get("DDLFlag")
  // const loaction = useLocation();
  // console.log(loaction);

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
    Label: "---Select---",
  });

  const [SeasonDDL, setSeasonDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "---Select---",
  });

  const [MonthDDL, setMonthDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "---Select---",
  });

  const [CropNameDDL, setCropNameDDL] = useState({
    DDL: [],
    ID: 0,
    Label: '---Select---'
  })

  const [ProductNameDDL, setProductNameDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "---Select---",
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
    const data = { UserID, token, M_Product_SubCategoryID: '0' }
    dispatch(ProductNameDashboardDDLAPI({ data, Flag: DDLFlag }))
  }, [])

  const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
  const { SeasonDashboardData } = useSelector((state) => state.SeasonDashboardDDLData);
  const { MonthDashboardData } = useSelector((state) => state.MonthDashboardDDLData);
  const { CropNameDashboardData } = useSelector(state => state.CropNameDashboardDDLData)
  const { ProductNameDashboardData } = useSelector(state => state.ProductNameDashboardDDLData)
  const handleClear = () => {
    setCurrentPage(0)
    setIsClear(!IsClear)
    setStateDDL({
      ...StateDDL,
      ID: 0,
      Label: "Select...",
    })
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
    setProductNameDDL({
      ...ProductNameDDL,
      ID: 0,
      Label: "Select...",
    })

    setCropNameDDL({
      ...CropNameDDL,
      ID: 0,
      Label: "Select...",
    })
  }
  const handleCloseClick = () => {
    setPopUpField({ addPopUp: false });
  };

  const addButtonClick = () => {
    setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Add" });
  };

  const editButtonClick = () => {
    setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Update" });
  };

  const deleteButtonClick = () => {
    setPopUpField({ ...PopUpField, deletePopUp: true });
  };

  // // -------------------Total Order Target------------
  // useEffect(() => {
  //   const data = {
  //     T_OrderTarget_DefineID: 0,
  //     M_SeasonID: SeasonDDL.ID,
  //     M_CropID: CropNameDDL.ID,
  //     M_ProductID: ProductNameDDL.ID,
  //     FinancialYearID: YearValue,
  //     MonthID: 0,
  //     M_StateNameID: StateDDL.ID,
  //     UserID: UserID,
  //     token: token,
  //     From: From,
  //     To: To,
  //     Flag: 'All',
  //     ShowBy: 'Web'
  //   }
  //   if (YearValue !== 0) {
  //     dispatch(TotalOrderTargetTableDataAPI({ data }))
  //   }

  // }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID])
  // useEffect(() => {
  //   const data = {
  //     T_OrderTarget_DefineID: 0,
  //     M_SeasonID: SeasonDDL.ID,
  //     M_CropID: CropNameDDL.ID,
  //     M_ProductID: ProductNameDDL.ID,
  //     FinancialYearID: YearValue,
  //     MonthID: 0,
  //     M_StateNameID: StateDDL.ID,
  //     UserID: UserID,
  //     token: token,
  //     From: From,
  //     To: '99999',
  //     Flag: 'All',
  //     ShowBy: 'Web'
  //   }
  //   if (YearValue !== 0) {
  //     dispatch(TotalOrderTargetExportTableDataAPI({ data }))
  //   }

  // }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID])

  // const { tableData, isLoading } = useSelector(state => state.TotalOrderTargetTableData)
  // const { TotalOrderTargetExporttableData, isExportLoading } = useSelector(state => state.TotalOrderTargetExportTableData)

  // ------------------------Total Order Acheivement----------
  useEffect(() => {

    const data = {
      T_OrderTarget_DefineID: 0,
      M_SeasonID: SeasonDDL.ID,
      M_CropID: CropNameDDL.ID,
      M_ProductID: ProductNameDDL.ID,
      FinancialYearID: YearValue,
      MonthID: MonthDDL.ID,
      M_StateNameID: StateDDL.ID,
      UserID: UserID,
      token: token,
      From: From,
      To: To,
      Flag: 'All',
      // ShowBy: 'Web',
      ShowBy: activeFilter,
      searchName: searchName,
    }
    if (YearValue !== 0) {
      dispatch(TotalOrderAchievementTableDataAPI({ data }))
    }

  }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, MonthDDL.ID])

  useEffect(() => {
    const data = {
      T_OrderTarget_DefineID: 0,
      M_SeasonID: SeasonDDL.ID,
      M_CropID: CropNameDDL.ID,
      M_ProductID: ProductNameDDL.ID,
      FinancialYearID: YearValue,
      MonthID: MonthDDL.ID,
      M_StateNameID: StateDDL.ID,
      UserID: UserID,
      token: token,
      From: From,
      To: '99999',
      Flag: 'All',
      ShowBy: activeFilter,
      searchName: searchName,
    }
    if (YearValue !== 0) {
      dispatch(TotalOrderAchievementExportTableDataAPI({ data }))
    }

  }, [IsPost, From, IsClear, YearValue, StateDDL.ID, SeasonDDL.ID, CropNameDDL.ID, ProductNameDDL.ID, MonthDDL.ID])


  const { tableData, isLoading } = useSelector(state => state.TotalOrderAchievementTableData)
  const { TotalOrderAcheivementExporttableData, isAcheivementExportLoading } = useSelector(state => state.TotalOrderAchievementExportTableData)

  return (
    <>
      {isLoading && <Loading />}
      <main className="main-content position-relative border-radius-lg ">
        <Header setYearValue={setYearValue} />
        <Sidebar active="dashboard" />
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
                          {`Total Target & Achievement -> ${searchName}`}{" "}
                        </h4>
                      </div>
                      <div className="col-12 col-lg-4 mb-xl-0">
                        {/* {
                          searchName === "Order Target" ?
                            <>
                              {
                                isExportLoading ?
                                  <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                                    disabled>
                                    <i
                                      className="fa fa-refresh fa-spin"
                                      style={{ marginRight: "5px" }}
                                    />Loading</button>
                                  :
                                  TotalOrderTargetExporttableData && TotalOrderTargetExporttableData.table && TotalOrderTargetExporttableData.table.length > 0 &&
                                  <TotalOrderTargetExport
                                    ExcelData={TotalOrderTargetExporttableData}
                                    name='Target Order'
                                  />
                              }
                            </> */}
                        {/* : searchName === "Order Achievement" ?
                              <> */}

                        {
                          isAcheivementExportLoading ?
                            <button className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                              disabled>
                              <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                              />Loading</button>
                            :
                            TotalOrderAcheivementExporttableData && TotalOrderAcheivementExporttableData.table && TotalOrderAcheivementExporttableData.table.length > 0 &&
                            <TotalOrderTargetExport
                              ExcelData={TotalOrderAcheivementExporttableData}
                              name='Acheivement Order'
                              RoleID={RoleID}
                              searchName={searchName}
                            />
                        }
                        {/* </>
                              :
                              <></>

                        } */}
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
                              <StateDashboardDDL
                                StateDDL={StateDDL}
                                setStateDDL={setStateDDL}
                                StateDashboardDDLData={StateDashboardDDLData}
                              />
                            </div>
                            <div className="col-md-6 col-lg-2">
                              <SeasonDashboardDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDashboardData={SeasonDashboardData}
                                mandatory={true}
                              />
                            </div>
                            <div className="col-md-6 col-lg-2">
                              <MonthDashboardDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthDashboardData={MonthDashboardData}
                                mandatory={true}
                              />
                            </div>

                            <div className="col-md-6 col-lg-2">
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

                            <div className="col-12 col-lg-1 clear">
                              <button
                                type="button"
                                className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
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
                      {
                        searchName === "Order Target (Nos)" ? (
                          <table
                            id="target-order"
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
                                <th>Crop Name </th>
                                <th>Product Name</th>
                                <th>Packing Size</th>
                                <th> Quantity(Nos)</th>
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
                                    <td>{item.cropName ? item.cropName : '-'}</td>
                                    <td>{item.product_Name ? item.product_Name : '-'}</td>
                                    <td>{item.packingSize ? item.packingSize : '-'}</td>
                                    <td>{item.totalQuantity ? item.totalQuantity : '-'}</td>
                                  </tr>
                                )) : <tr>No data</tr>
                              }
                            </tbody>
                          </table>
                        ) : (
                          <table
                            id="order Acheivement (Nos) "
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
                                <th>Crop Name </th>
                                <th>Product Name</th>
                                <th>Packing Size</th>
                                <th>District</th>
                                <th> Target Quantity (Nos)</th>
                                <th> Achieved Quantity (Nos)</th>
                                <th> Officer Name</th>
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
                                    <td>{item.cropName ? item.cropName : '-'}</td>
                                    <td>{item.product_Name ? item.product_Name : '-'}</td>
                                    <td>{item.packingSize ? item.packingSize : '-'}</td>
                                    <td>{item.districtName ? item.districtName : '-'}</td>
                                    <td>{item.totalQuantity ? item.totalQuantity : '-'}</td>
                                    <td>{item.achiveQty ? item.achiveQty : '-'}</td>
                                    <td>{item.officerName ? item.officerName : '-'}</td>
                                  </tr>
                                )) : <tr>No data</tr>
                              }
                            </tbody>
                          </table>
                        )}
                    </div>
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
      </main>

      {PopUpField.addPopUp ? (
        <CommonQuantityPopUp
          open={PopUpField.addPopUp}
          handleCloseClick={handleCloseClick}
          PopUpField={PopUpField}
        />
      ) : (
        <></>
      )}
      {PopUpField.deletePopUp ? (
        <DeletePopUp
          open={PopUpField.deletePopUp}
          handleCloseClick={handleCloseClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
