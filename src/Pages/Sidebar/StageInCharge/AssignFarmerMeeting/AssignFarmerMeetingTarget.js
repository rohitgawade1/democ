import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import AssignFarmerMeetingPopUp from './AssignFarmerMeetingPopUp'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { useDispatch, useSelector } from 'react-redux'
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, TalukaEmployeeWiseAssignDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useAuthState } from '../../../../Helper/Context'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { CropNameDataDDL } from '../../../../Components/CommonDDL/CropNameDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { AssignFarmerMeetingTargeDataAPI, AssignFarmerMeetingTargetExportDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFarmerMeetingTargetSlice'
import { Year } from '../../../../Helper/Year'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'
import { ExportAssignFarmerMeeting } from './ExportAssignFarmerMeeting'
import UpdateAssignFarmerMeeting from './UpdateAssignFarmerMeeting'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'

export default function AssignFarmerMeetingTarget() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    // ----------pagination-------------
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
    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [SalesTraineeDDL, setSalesTraineeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    // const [DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL] = useState({
    //     DDL: [],
    //     ID: 0,
    //     Label: "Select...",
    // })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'FarmerMeetingDefine' }))
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'Target' }))

    }, [])

    // ------sales trainee---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(SalesTraineeDDLDDLAPI({ data, Flag: 'Order' }))
    }, [AssignToDDL.ID])

    // ------Field Assistant---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [AssignToDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SalesTraineeDDL }
        dispatch(TalukaEmployeeWiseAssignDDLAPI({ data, Flag: 'District' }))
    }, [SalesTraineeDDL.ID])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL: DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID])


    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "FarmerMeetingDefine" }))
    }, [CropTypeDDL.ID])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    const handleUpdateCloseClick = () => {
        setPopUpField({ UpdatePopUp: false })
    }

    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, popupFlag: "Add" })
    }

    const editButtonClick = (item) => {
        console.log(item)
        setPopUpField({ ...PopUpField, UpdatePopUp: true, popupFlag: "Update", rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, deletePopUp: true, rowData: item })
    }


    useEffect(() => {
        const data = {
            T_FarmerMeeting_AssignID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL,
            M_SeasonID: SeasonDDL,
            M_CropTypeID: CropTypeDDL,
            M_CropID: CropNameDDL,
            FieldAssistantID: AssignToDDL.ID === 6 ? DistrictOfficerDDL.m_UserID : SalesTraineeDDL.m_UserID,
            M_VillageID: AssignToDDL.ID === 6 ? VillageDDL.ID : TalukaDDL.ID,
            M_UsersID: UserID,
            Flag: 'FarmerMeetingAssign',
            FromTop: From,
            ToTop: To,
            token: token
        }
        if (YearValue !== 0) {
            dispatch(AssignFarmerMeetingTargeDataAPI({ data }))
        }

    }, [SeasonDDL.ID, IsPost, From, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, DistrictOfficerDDL.m_UserID, SalesTraineeDDL.m_UserID, VillageDDL.ID, TalukaDDL.ID, YearValue])

    useEffect(() => {
        const data = {
            T_FarmerMeeting_AssignID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL,
            M_SeasonID: SeasonDDL,
            M_CropTypeID: CropTypeDDL,
            M_CropID: CropNameDDL,
            FieldAssistantID: AssignToDDL.ID === 6 ? DistrictOfficerDDL.m_UserID : SalesTraineeDDL.m_UserID,
            M_VillageID: AssignToDDL.ID === 6 ? VillageDDL.ID : TalukaDDL.ID,
            M_UsersID: UserID,
            Flag: 'FarmerMeetingAssign',
            FromTop: From,
            ToTop: '99999',
            token: token
        }
        if (YearValue !== 0) {
            dispatch(AssignFarmerMeetingTargetExportDataAPI({ data }))
        }

    }, [SeasonDDL.ID, IsPost, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, DistrictOfficerDDL.m_UserID, SalesTraineeDDL.m_UserID, VillageDDL.ID, TalukaDDL.ID, YearValue])


    const { tableData, isLoading } = useSelector(state => state.AssignFarmerMeetingTargeData)
    const { ExportData, isExportLoading } = useSelector(state => state.AssignFarmerMeetingTargetExportData)

    const handleDeleteData = () => {
        dispatch()
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
        setAssignToDDL({
            ...AssignToDDL,
            ID: 0,
            Label: "Select..."
        })
        setSalesTraineeDDL({
            ...SalesTraineeDDL,
            ID: 0,
            Label: "Select..."
        })
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })

    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="assignfarmermeetingtarget" listActive="district" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Assign Farmer Meeting Target </h4>
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
                                                        <ExportAssignFarmerMeeting
                                                            ExcelData={ExportData}
                                                            name='Assign Farmer Meeting Target'
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
                                                        <div className="col-md-6 col-lg-2">
                                                            <SeasonDataDDL
                                                                SeasonDDL={SeasonDDL}
                                                                setSeasonDDL={setSeasonDDL}
                                                                SeasonDDLData={SeasonDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <MonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                MonthData={MonthData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
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

                                                        {/* <div className="col-md-6 col-lg-4">
                                                            <DistrictOfficerDataDDL
                                                                DistrictOfficerDDL={DistrictOfficerDDL}
                                                                setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                                DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                                mandatory={false}
                                                                name="Field Assistant Name"
                                                            />
                                                        </div>

                                                        <div className="col-md-6 col-lg-4">
                                                            <DTVWiseEmployeeAssignDDL
                                                                DTVWiseEmployeeDDL={VillageDDL}
                                                                setDTVWiseEmployeeDDL={setVillageDDL}
                                                                DTVEmployeeWiseAssignData={DTVEmployeeWiseAssignData}
                                                                mandatory={false}
                                                                name="Village Name"
                                                            />
                                                        </div> */}
                                                        <div className="col-md-6 col-lg-3">
                                                            <AssignToDataDDL
                                                                AssignToDDL={AssignToDDL}
                                                                setAssignToDDL={setAssignToDDL}
                                                                AssignToData={AssignToData}
                                                                mandatory={true}

                                                            />
                                                        </div>
                                                        {
                                                            AssignToDDL.ID === 3 ?
                                                                <>
                                                                </>
                                                                : AssignToDDL.ID === 5 ?
                                                                    <>
                                                                        <div className="col-md-6 col-lg-4">
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

                                                                    </>
                                                                    : AssignToDDL.ID === 6 ?
                                                                        <>
                                                                            <div className="col-md-6 col-lg-4">
                                                                                <DistrictOfficerDataDDL
                                                                                    DistrictOfficerDDL={DistrictOfficerDDL}
                                                                                    setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                                                    DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                                                    mandatory={true}
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

                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <DistrictOfficerDataDDL
                                                                                    DistrictOfficerDDL={SalesTraineeDDL}
                                                                                    setDistrictOfficerDDL={setSalesTraineeDDL}
                                                                                    DistrictOfficerDDLData={SalesTraineeDDLDDLData}
                                                                                    mandatory={false}
                                                                                    name="Sales Trainee Name"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-6 col-lg-2">
                                                                                <DTVWiseEmployeeAssignDDL
                                                                                    DTVWiseEmployeeDDL={TalukaDDL}
                                                                                    setDTVWiseEmployeeDDL={setTalukaDDL}
                                                                                    DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                                                    mandatory={false}
                                                                                    name="Taluka Name"

                                                                                />
                                                                            </div>
                                                                            <div className="col-md-6 col-lg-3">
                                                                                <DistrictOfficerDataDDL
                                                                                    DistrictOfficerDDL={DistrictOfficerDDL}
                                                                                    setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                                                    DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                                                    mandatory={true}
                                                                                    name="Field Assistant Name"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-6 col-lg-2">
                                                                                <DTVWiseEmployeeAssignDDL
                                                                                    DTVWiseEmployeeDDL={VillageDDL}
                                                                                    setDTVWiseEmployeeDDL={setVillageDDL}
                                                                                    DTVEmployeeWiseAssignData={VillageEmployeeWiseAssignData}
                                                                                    mandatory={false}
                                                                                    name="Village Name"
                                                                                />
                                                                            </div>
                                                                        </>
                                                        }



                                                        <div className="col-12 col-lg-2 clear">
                                                            {/* <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => addButtonClick()}
                                                            >
                                                                Assign
                                                            </button> */}
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={ClearFilter}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>

                                                        {/* <div className='row'>
                                                            <div className="col-12 text-end">
                                                                <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Farmer Meeting Count:- 00  </span>

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
                                                        <th >Season </th>
                                                        <th>Month </th>
                                                        <th>Crop Type </th>
                                                        <th>Crop Name </th>
                                                        <th>Field Assistant Name</th>
                                                        <th>Village Name / <br/>Taluka Name</th>
                                                        <th>Total Farmer <br />Meeting Count</th>
                                                        <th>Assign Farmer <br /> Meeting Count</th>
                                                        <th >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr>
                                                                <td style={{ textAlign: 'center' }} className='w-5'>{item?.rowNum}</td>
                                                                <td>{item?.seasonName}</td>
                                                                <td>{item?.month_Name}</td>
                                                                <td>{item?.cropTypeName}</td>
                                                                <td>{item?.cropName}</td>
                                                                <td>{item?.tragetAssignToUser}</td>
                                                                {
                                                                    (item.villageName === null) ?
                                                                        <>
                                                                            <td>{item?.talukaName}</td>
                                                                        </>
                                                                        :
                                                                        <td>{item?.villageName}</td>
                                                                }
                                                                <td >{item?.farmerMeetingCount}</td>
                                                                <td>{item?.assignMeetingCount}</td>

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
                PopUpField.addPopUp ? <AssignFarmerMeetingPopUp
                    open={PopUpField.addPopUp}
                    handleCloseClick={handleCloseClick}
                    PopUpField={PopUpField}
                    setPopUpField={setPopUpField}
                    handleIsPost={handlePost}
                    YearValue={YearValue}
                /> : <></>
            }

            {
                PopUpField.UpdatePopUp ? <UpdateAssignFarmerMeeting
                    open={PopUpField.UpdatePopUp}
                    handleCloseClick={handleUpdateCloseClick}
                    PopUpField={PopUpField}
                    setPopUpField={setPopUpField}
                    handlePost={handlePost}
                    YearValue={YearValue}
                /> : <></>
            }

            {
                PopUpField.deletePopUp ? <DeletePopUp open={PopUpField.deletePopUp} handleDeleteCloseClick={handleDeleteCloseClick} handleDeleteData={handleDeleteData} /> : <></>
            }

        </>
    )
}

