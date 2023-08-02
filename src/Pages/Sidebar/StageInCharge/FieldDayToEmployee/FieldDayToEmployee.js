import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import FieldVisitToEmployeePopUp from '../FieldVisitToEmployee/FieldVisitToEmployeePopUp'
import FieldDayToEmployeePopUp from './FieldDayToEmployeePopUp'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { Year } from '../../../../Helper/Year'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { CropNameDataDDL } from '../../../../Components/CommonDDL/CropNameDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { AssignFieldDayDataAPI, AssignFieldDayExportDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFieldDaySlice'
import { AssignFieldDayExport } from './AssignFieldDayExport'
import UpdateFieldDay from './UpdateFieldDay'
import { Loading } from '../../../../Helper/Loading'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'

export default function FieldDayToEmployee() {

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

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: "FieldDayAssign" }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [])

     // ------Field Assistant---
     useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "FieldDayAssign" }))
    }, [CropTypeDDL.ID])
    useEffect(() => {
        const data = {
            token,
            UserID
        }
        dispatch(VillageDDLAPI({ data }))
    }, [])

    const { VillageData } = useSelector(state => state.VillageDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

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

    const ClearFilter = () => {
        // setCurrentPage(0)
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
        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })
    }
    const handlePost = () => {
        setIsPost(!IsPost)
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            VillageDDL: VillageDDL.ID,
            FieldAssistantID: DistrictOfficerDDL.m_UserID,
            Year: YearValue,
            Flag: 'FieldDayAssign',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(AssignFieldDayDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, From, DistrictOfficerDDL.m_UserID,VillageDDL.ID, YearValue])


    const { tableData, isLoading } = useSelector(state => state.AssignFieldDayData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            VillageDDL: VillageDDL.ID,
            FieldAssistantID: DistrictOfficerDDL.m_UserID,
            Year: YearValue,
            Flag: 'FieldDayAssign',
            From: From,
            To: '99999'
        }
        if (YearValue !== 0) {
            dispatch(AssignFieldDayExportDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, From, DistrictOfficerDDL.m_UserID, VillageDDL.ID, YearValue])



    const { ExportData, isExportLoading } = useSelector(state => state.AssignFieldDayExportData)


    return (
        <>
            {isLoading && <Loading />}
            {/* {isDeleteLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="fielddaytoemployee" listActive="district" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Assign Field Day Target</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">

                                                <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-0 mx-2 waves-effect waves-light allBtn" style={{ float: "right" }}
                                                    onClick={() => addButtonClick()}
                                                >
                                                    Assign
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
                                                        ExportData && ExportData.table && ExportData.table.length > 0 &&
                                                        <AssignFieldDayExport
                                                            ExcelData={ExportData}
                                                            name='Field Visit Target'
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
                                                            <CropTypeDataDDL
                                                                CropTypeDDL={CropTypeDDL}
                                                                setCropTypeDDL={setCropTypeDDL}
                                                                CropTypeDDLData={CropTypeDDLData}
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <CropNameDataDDL
                                                                CropNameDDL={CropNameDDL}
                                                                setCropNameDDL={setCropNameDDL}
                                                                CropNameDDLData={CropNameDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-4">
                                                            <DistrictOfficerDataDDL
                                                                DistrictOfficerDDL={DistrictOfficerDDL}
                                                                setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                                DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                                mandatory={false}
                                                                name="Field Assistant Name"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DTVWiseEmployeeAssignDDL
                                                                DTVWiseEmployeeDDL={VillageDDL}
                                                                setDTVWiseEmployeeDDL={setVillageDDL}
                                                                DTVEmployeeWiseAssignData={VillageEmployeeWiseAssignData}
                                                                mandatory={false}
                                                                name="Village Name"
                                                            />
                                                        </div>

                                                        <div className="col-12 col-lg-1 clear">
                                                          
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={ClearFilter}
                                                            >
                                                                Clear
                                                            </button>
                                                        </div>
                                                        {/* <div className='row'>
                                                            <div className="col-12 text-end">
                                                                <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Field Day Count :- 00  </span>

                                                            </div>

                                                        </div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Season </th>
                                                        <th>Month </th>
                                                        <th>Crop Type </th>
                                                        <th>Crop Name </th>
                                                        <th>Field Assistant Name</th>
                                                        <th>Village Name</th>
                                                        <th>Total Field <br/> Day Count</th>
                                                        <th>Assign Field <br/> Day Count</th>
                                                        <th >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item?.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                <td>{item?.cropTypeName}</td>
                                                                <td>{item?.cropName}</td>
                                                                <td>{item?.tragetAssignToUser}</td>
                                                                <td>{item?.villageName}</td>
                                                                <td>{item?.total_FieldDay_Count}</td>
                                                                <td>{item?.assignDayCount}</td>

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
                PopUpField.addPopUp ?
                    <FieldDayToEmployeePopUp
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
                    <UpdateFieldDay
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
