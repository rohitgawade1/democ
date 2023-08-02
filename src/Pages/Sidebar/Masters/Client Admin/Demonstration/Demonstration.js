import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Header from '../../../../../Components/Header/Header'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthState } from '../../../../../Helper/Context'
import { CropTypeDeleteAPI, CropTypeTableDataAPI } from '../../../../../Redux/ClientAdminSlice/CropTypeSlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { CropNameDDLAPI, CropTypeDDLAPI, DistrictNameDDLAPI, MonthDDLAPI, SeasonDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../../Redux/DDLSlice'
import { Loading } from '../../../../../Helper/Loading'
import FarmerImagePopUp from '../FarmerMaster/FarmerImagePopUp'
import DemonstrationPopup from './DemonstrationPopup'
import { Year } from '../../../../../Helper/Year'
import { DefineDemonstrationDataAPI, DefineDemonstrationExportDataAPI, DefineFarmerDemonstrationDeleteAPI } from '../../../../../Redux/DistrictOfficerSlice/DefineDemonstrationSlice'
import { ExportDemonstration } from './ExportDemonstration'


export default function Demonstration() {
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

    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [imgError, setimgError] = useState()
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        imagePopUp: false,
        imageData: "",
        videoData: "",
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })
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

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
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



    // const handleInputChange = (e) => {
    //     setdesignationTextField({ ...designationTextField, [e.target.name]: e.target.value })
    // }

    const imageButtonClick = (item) => {
        setPopUpField({ imagePopUp: true, imageData: item })
    }
    const videoButtonClick = (item) => {
        setPopUpField({ imagePopUp: true, videoData: item })
    }

    const handleDeleteData = () => {
        dispatch(DefineFarmerDemonstrationDeleteAPI({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }))
    }

    const { isDeleteLoading } = useSelector(state => state.DefineFarmerDemonstrationDeleteData)

    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }
    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Add", popupBtn: "Clear", apiFlag: 'Insert', rowData: '' })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Update", popupBtn: "Close", apiFlag: 'Update', rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }
    const handleCloseClick = () => {
        setPopUpField({ ...PopUpField, imagePopUp: false })
    }



    // ----Crop Name DDL -------

    useEffect(() => {
        const data = { UserID, token,CropTypeDDL }
        dispatch(CropNameDDLAPI({ data , Flag:"DemonstrationDefine" }))
    }, [CropTypeDDL.ID])

    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)

    useEffect(() => {
        handleCropNameDDL()
    }, [CropNameDDLData])

    const handleCropNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropNameDDLData && CropNameDDLData.table && CropNameDDLData.table.length > 0) {
            let list = CropNameDDLData.table.map((item, index) => ({
                value: item.m_CropID,
                label: item.cropName,
            }))

            setCropNameDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setCropNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    // ----Crop type DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(CropTypeDDLAPI({ data ,Flag:'DemonstrationDefine' }))
    }, [])

    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)

    useEffect(() => {
        handleCropTypeDDL()
    }, [CropTypeDDLData])

    const handleCropTypeDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropTypeDDLData && CropTypeDDLData.table && CropTypeDDLData.table.length > 0) {
            let list = CropTypeDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_CropTypeID,
                label: item.cropTypeName,
            }))

            setCropTypeDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setCropTypeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // ----Season DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
    }, [])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)

    useEffect(() => {
        handleSeasonDDL()
    }, [SeasonDDLData])

    const handleSeasonDDL = () => {
        // console.log(DeptDDLDataa)
        if (SeasonDDLData && SeasonDDLData.table && SeasonDDLData.table.length > 0) {
            let list = SeasonDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.seasonName,
            }))

            setSeasonDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setSeasonDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    // ----Month DDL -------

    useEffect(() => {
        const data = { UserID, token , SeasonDDL}
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { MonthData } = useSelector(state => state.MonthDDLData)

    useEffect(() => {
        handleMonthDDL()
    }, [MonthData])

    const handleMonthDDL = () => {
        if (MonthData && MonthData.table && MonthData.table.length > 0) {
            let list = MonthData.table.map((item, index) => ({
                value: item.id,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: 0,
                Label: "Select..."
            })
        }
        else {
            setMonthDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const ClearFilter = () => {
        setCurrentPage(0)
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
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            Flag: 'DemonstrationDefine',
            Month: MonthDDL.ID,
            Year: YearValue,
            Season: SeasonDDL.ID,
            CropType: CropTypeDDL.ID,
            CropID: CropNameDDL.ID
        }
        dispatch(DefineDemonstrationDataAPI({ data }))
    }, [SeasonDDL.ID, From, IsPost, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID,YearValue])

    const { tableData, isLoading } = useSelector(state => state.DefineDemonstrationData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            Flag: 'DemonstrationDefine',
            Month: MonthDDL.ID,
            Year: YearValue,
            Season: SeasonDDL.ID,
            CropType: CropTypeDDL.ID,
            CropID: CropNameDDL.ID
        }
        dispatch(DefineDemonstrationExportDataAPI({ data }))
    }, [SeasonDDL.ID, IsPost, MonthDDL.ID, CropTypeDDL.ID, CropNameDDL.ID,YearValue])

    const { isExportLoading, ExportData } = useSelector(state => state.DefineDemonstrationExportData)

    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="demonstration" listActive="district" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Define Demonstration Target</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
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
                                                        <ExportDemonstration
                                                            ExcelData={ExportData}
                                                            name='Define Demonstration Target'
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


                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Season</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: SeasonDDL.ID, label: SeasonDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setSeasonDDL({ ...SeasonDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setSeasonDDL({ ...SeasonDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={SeasonDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Month </label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={MonthDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Crop Type</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: CropTypeDDL.ID, label: CropTypeDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setCropTypeDDL({ ...CropTypeDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setCropTypeDDL({ ...CropTypeDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={CropTypeDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Crop Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    // isRtl={isRtl}
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: CropNameDDL.ID, label: CropNameDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setCropNameDDL({ ...CropNameDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setCropNameDDL({ ...CropNameDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={CropNameDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-12 col-lg-1 clear">

                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 waves-effect waves-light allBtn"
                                                                onClick={() => ClearFilter()}
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
                                        <div className="table-responsive pb-3 ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Season</th>
                                                        <th>Month</th>
                                                        <th>Crop Type</th>
                                                        <th>Crop Name</th>
                                                        <th>Demonstration Count </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                                                <td>{item.month_Name ? item.month_Name : '-'}</td>
                                                                <td>{item.cropTypeName ? item.cropTypeName : '-'}</td>
                                                                <td>{item.cropName ? item.cropName : '-'}</td>
                                                                <td >{item.demonstrationCount ? item.demonstrationCount : '-'}</td>
                                                                <td style={{textAlign:'center'}}>
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
                                                                    <span className='tableIcon'
                                                                        onClick={() => deleteButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                                    </span>
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
                    <DemonstrationPopup
                        open={PopUpField.addPopUp}
                        handleAddCloseClick={handleAddCloseClick}
                        PopUpField={PopUpField}
                        SeasonDDLData={SeasonDDLData}
                        MonthData={MonthData}
                        handlePost={handlePost}
                        YearValue={YearValue}
                    /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            }
            {
                PopUpField.imagePopUp ? <FarmerImagePopUp open={PopUpField.imagePopUp} handleCloseClick={handleCloseClick} PopUpField={PopUpField} imgError={imgError} /> : <></>
            }

        </>
    )
}
