import React, { useState } from 'react'
import Select from 'react-select'
import Header from '../../../../Components/Header/Header'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import AssignDemonstrationTargetPopUp from './AssignDemonstrationTargetPopUp'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaEmployeeWiseAssignDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../Helper/Context'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { CropNameDataDDL } from '../../../../Components/CommonDDL/CropNameDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { AssignDemonstrationDataAPI, AssignDemonstrationExportTableDataAPI, AssignDemonstrationTableDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignDemonstrationSlice'
import { Loading } from '../../../../Helper/Loading'
import { AssignDemonstrationExport } from './AssignDemonstrationExport'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import UpdateAssignDemonstration from './UpdateAssignDemonstration'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'

export default function AssignDemonstrationTarget() {

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
        UpdatePopUp: '',
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



    const handlePost = () => {
        setIsPost(!IsPost)
    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'DemonstrationDefine' }))
        // dispatch(DistrictOfficerDDLAPI({ data, Flag: 'State' }))
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
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "DemonstrationDefine" }))
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
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handleCloseClick = () => {
        setPopUpField({ addPopUp: false })
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
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            FieldAssistantID: AssignToDDL.ID === 6 ? DistrictOfficerDDL.m_UserID : SalesTraineeDDL.m_UserID ,
            M_VillageID: AssignToDDL.ID === 6 ? VillageDDL.ID : TalukaDDL.ID,
            Year: YearValue,
            Flag: 'DemonstrationAssign',
            From: From,
            To: To
        }
        if (YearValue !== 0) {
            dispatch(AssignDemonstrationTableDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, VillageDDL.ID, From,  DistrictOfficerDDL.m_UserID,SalesTraineeDDL.m_UserID,VillageDDL.ID,TalukaDDL.ID, YearValue])


    const { tableData, isLoading } = useSelector(state => state.AssignDemonstrationTableData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            SeasonDDL: SeasonDDL.ID,
            MonthDDL: MonthDDL.ID,
            CropTypeDDL: CropTypeDDL.ID,
            CropNameDDL: CropNameDDL.ID,
            FieldAssistantID: AssignToDDL.ID === 6 ? DistrictOfficerDDL.m_UserID : SalesTraineeDDL.m_UserID ,
            M_VillageID: AssignToDDL.ID === 6 ? VillageDDL.ID : TalukaDDL.ID,
            Year: YearValue,
            Flag: 'DemonstrationAssign',
            From: From,
            To: '99999'
        }
        if (YearValue !== 0) {
            dispatch(AssignDemonstrationExportTableDataAPI({ data }))
        }

    }, [IsPost, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID, VillageDDL.ID, DistrictOfficerDDL.m_UserID,SalesTraineeDDL.m_UserID,VillageDDL.ID,TalukaDDL.ID, From, YearValue])


    const { AssignDemonstrationTableData, isExportLoading } = useSelector(state => state.AssignDemonstrationExportTableData)

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="assigndemonstrationtarget" listActive="district" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle"> Assign Demonstration Target </h4>
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
                                                        AssignDemonstrationTableData && AssignDemonstrationTableData.table && AssignDemonstrationTableData.table.length > 0 &&
                                                        <AssignDemonstrationExport
                                                            ExcelData={AssignDemonstrationTableData}
                                                            name='Assign Demonstartion'
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
                                                            <SeasonWiseMonthDataDDL
                                                                MonthDDL={MonthDDL}
                                                                setMonthDDL={setMonthDDL}
                                                                SeasonWiseMonthData={SeasonWiseMonthData}
                                                            // mandatory={true}

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
                                                                            {/* <div className="col-md-6 col-lg-3">
                                                <TalukaNameDataDDL
                                                    TalukaDDL={TalukaDDL}
                                                    setTalukaDDL={setTalukaDDL}
                                                    TalukaDDLData={TalukaDDLData}
                                                    mandatory={true}
                                                />
                                            </div> */}
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
                                                                            {/* <div className="col-md-6 col-lg-3">
                                                <VillageDataDDL
                                                    VillageDDL={VillageDDL}
                                                    setVillageDDL={setVillageDDL}
                                                    VillageData={VillageData}
                                                    mandatory={true}
                                                />
                                            </div> */}
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
                                                                <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Demonstration Count:- 00  </span>

                                                            </div>

                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr >
                                                        <th>Sr.No.</th>
                                                        <th>Season </th>
                                                        <th>Month </th>
                                                        <th>Crop Type </th>
                                                        <th>Crop Name </th>
                                                        <th>Field Assistant Name</th>
                                                        <th>Village Name /<br/> Taluka Name</th>
                                                        <th >Total Demonstration <br/> Count</th>
                                                        <th>Assign Demonstration <br/> Count</th>
                                                        <th>Action</th>
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
                                                                {
                                                                    (item.villageName === null) ?
                                                                        <>
                                                                            <td>{item?.talukaName}</td>
                                                                        </>
                                                                        :
                                                                        <td>{item?.villageName}</td>
                                                                }
                                                                <td >{item?.remainCount}</td>
                                                                <td >{item?.assignCount}</td>

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
                    <AssignDemonstrationTargetPopUp
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
                    <UpdateAssignDemonstration
                        open={PopUpField.UpdatePopUp}
                        handleCloseClick={handleCloseClick}
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
