import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import FarmerMasterPopUp from './FarmerMasterPopUp'
import Header from '../../../../../Components/Header/Header'
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { FarmerExportTableDataAPI, FarmerTableDataAPI } from '../../../../../Redux/ClientAdminSlice/FarmerMasterSlice'
import { DistrictNameDDLAPI, FarmerNameDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../../Redux/DDLSlice'
import FarmerImagePopUp from './FarmerImagePopUp'
import { Loading } from '../../../../../Helper/Loading'
import { FarmerMasterExport } from './FarmerMasterExport'


export default function FarmerMarster() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()
    // console.log('token', token , 'UserID',UserID)

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
    const [FarmerCode, setFarmerCode] = useState('')

    const [imgError, setimgError] = useState()
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        imagePopUp: false,
        imageData: "",
        videoData: "",
        deletePopUp: false,
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

    const [FarmerNameDDL, setFarmerNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    
    useEffect(() => {
        const data = { UserID, token }
        dispatch(StateNameDDLAPI({ data }))
    }, [])

    const { StateDDLData } = useSelector(state => state.StateNameDDL)

    useEffect(() => {
        handleStateDDL()
    }, [StateDDLData])

    const handleStateDDL = () => {
        if (StateDDLData && StateDDLData.table && StateDDLData.table.length > 0) {
            let list = StateDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.stateName,
            }))

            setStateDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setStateDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        const data = { UserID, token, StateDDL }
        dispatch(DistrictNameDDLAPI({ data }))
    }, [StateDDL.ID])

    const { DistrictDDLData } = useSelector(state => state.DistrictNameDDL)

    useEffect(() => {
        handleDeptDDL()
    }, [DistrictDDLData])

    const handleDeptDDL = () => {
        if (DistrictDDLData && DistrictDDLData.table && DistrictDDLData.table.length > 0) {
            let list = DistrictDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.districtName,
            }))

            setDistrictDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDistrictDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL }
        dispatch(TalukaNameDDLAPI({ data }))
    }, [StateDDL.ID, DistrictDDL.ID])

    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)

    useEffect(() => {
        handleTalukaDDL()
    }, [TalukaDDLData])

    const handleTalukaDDL = () => {
        if (TalukaDDLData && TalukaDDLData.table && TalukaDDLData.table.length > 0) {
            let list = TalukaDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.talukaName,
            }))

            setTalukaDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setTalukaDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // -----------Village Name DDL--------
    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL }
        dispatch(VillageDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID])

    const { VillageData } = useSelector(state => state.VillageDDLData)

    useEffect(() => {
        handleVillageDDL()
    }, [VillageData])

    const handleVillageDDL = () => {
        if (VillageData && VillageData.table && VillageData.table.length > 0) {
            let list = VillageData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_VillageNameID,
                label: item.villageName,
            }))

            setVillageDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setVillageDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // -----------Farmer Name DDL--------
    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL,VillageDDL }
        dispatch(FarmerNameDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID,VillageDDL.ID])

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
            M_FarmerID: 0,
            FarmerCode: FarmerCode,
            StateDDL: StateDDL,
            TalukaDDL: TalukaDDL,
            DistrictDDL: DistrictDDL,
            VillageDDL: VillageDDL,
            FarmerNameDDL: FarmerNameDDL,
            UserID: UserID,
            token: token,
            From: From,
            To: To
        }
        dispatch(FarmerTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost])
    // }, [To, IsSearch, IsClear, IsPost,StateDDL.ID,TalukaDDL.ID,DistrictDDL.ID,VillageDDL.ID,FarmerNameDDL.ID])

    useEffect(() => {
        const data = {
            M_FarmerID: 0,
            FarmerCode: FarmerCode,
            StateDDL: StateDDL,
            TalukaDDL: TalukaDDL,
            DistrictDDL: DistrictDDL,
            VillageDDL: VillageDDL,
            FarmerNameDDL: FarmerNameDDL,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999'
        }
        dispatch(FarmerExportTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost])
    // }, [To, IsSearch, IsClear, IsPost,StateDDL.ID,TalukaDDL.ID,DistrictDDL.ID,VillageDDL.ID,FarmerNameDDL.ID])


    const { tableData, isLoading } = useSelector(state => state.FarmerTableData)
    const { FarmerExportTableData, isExportLoading } = useSelector(state => state.FarmerExportTableData)

    const [ViewImagePopUp , setViewImagePopUp] = useState(false)
    const [imageData,setimageData] = useState('')

    const handleAddCloseClick = () => {
        setPopUpField({ addPopUp: false })
    }
    const handleCloseClick = () => {
        // setPopUpField({ ...PopUpField, imagePopUp: false })
        setViewImagePopUp(false)
        // setPopUpField({ ...PopUpField, addPopUp: true })
        
    }
    const addButtonClick = () => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Add", popupBtn: "Clear", apiFlag: 'Insert', rowData: '' })
    }

    const editButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Update", popupBtn: "Cancel", apiFlag: 'Update', rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const handleDeleteData = () => {
        // dispatch(EmployeeDeleteAPI({ PopUpField: PopUpField, handlePost, token: token, UserID: UserID, handleDeleteCloseClick }))
    }

    const handleDeleteCloseClick = () => {
        setPopUpField({ deletePopUp: false })
    }

    // const { isDeleteLoading } = useSelector(state => state.EmployeeDeleteData)

    const imageButtonClick = (item) => {
        setimageData(item)
        setViewImagePopUp(true)
        // setPopUpField({ imageData: item })
    }
    const videoButtonClick = (item) => {
        setPopUpField({ addPopUp: true, videoData: item })
    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setFarmerCode('')
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

        setVillageDDL({
            ...VillageDDL,
            ID: 0,
            Label: "Select...",
        })
        setFarmerNameDDL({
            ...FarmerNameDDL,
            ID: 0,
            Label: "Select...",
        })
    }


    return (
        <>
            {isLoading && <Loading />}
            {/* {isDeleteLoading && <Loading />} */}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="farmermarster" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Farmer Master</h4>
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
                                                        FarmerExportTableData && FarmerExportTableData.table && FarmerExportTableData.table.length > 0 &&
                                                        <FarmerMasterExport
                                                        ExcelData={FarmerExportTableData}
                                                        name='Farmer Master'
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
                                                                <label className="d-block" htmlFor="NameofDepartment">Farmer Code </label>
                                                                <input
                                                                    className="form-control"
                                                                    id="Order"
                                                                    type="text"
                                                                    name="Order"
                                                                    value={FarmerCode}
                                                                    onChange={(e) => setFarmerCode(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">State </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: StateDDL.ID, label: StateDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setStateDDL({ ...StateDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setStateDDL({ ...StateDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={StateDDL.DDL}
                                                                // isDisabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">District </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DistrictDDL.ID, label: DistrictDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDistrictDDL({ ...DistrictDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDistrictDDL({ ...DistrictDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DistrictDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Taluka </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: TalukaDDL.ID, label: TalukaDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setTalukaDDL({ ...TalukaDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setTalukaDDL({ ...TalukaDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={TalukaDDL.DDL}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Village Name </label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: VillageDDL.ID, label: VillageDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setVillageDDL({ ...VillageDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setVillageDDL({ ...VillageDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={VillageDDL.DDL}
                                                                />
                                                            </div>
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



                                                        <div className="col-12 col-lg-3 clear">
                                                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Search
                                                            </button>
                                                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                                                onClick={() => handleClear()}
                                                            >
                                                                Clear
                                                            </button>

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                  <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Farmer Code </th>
                                                        <th>State</th>
                                                        <th>District </th>
                                                        <th>Taluka</th>
                                                        <th>Village Name </th>
                                                        <th>Farmer Name </th>
                                                        <th>Mobile No.</th>
                                                        <th>Farmer land details(Acre)</th>
                                                        <th>Plot Photo</th>
                                                        {/* <th>Track Photo</th> */}
                                                        <th>Action</th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i} >
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum ? item.rowNum : "-"}</td>
                                                                <td>{item.farmerCode ? item.farmerCode : "-"}</td>
                                                                <td>{item.stateName ? item.stateName : "-"}</td>
                                                                <td>{item.districtName ? item.districtName : "-"}</td>
                                                                <td>{item.talukaName ? item.talukaName : "-"}</td>
                                                                <td>{item.villageName ? item.villageName : "-"}</td>
                                                                <td>{item.fullName ? item.fullName : "-"}</td>
                                                                <td>{item.mobileNumber ? item.mobileNumber : "-"}</td>
                                                                <td>{item.farmerLandDetails ? item.farmerLandDetails : "-"}</td>


                                                                <td style={{textAlign:'center'}}>
                                                                    <span className='tableIcon'
                                                                        onClick={() => imageButtonClick(item.plotPhoto)}
                                                                    >
                                                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                                                    </span>
                                                                </td>
                                                                {/* <td>
                                                                    <span className='tableIcon'
                                                                        onClick={() => videoButtonClick(item.plotPhoto)}
                                                                    >
                                                                        <i className="fa fa-file-video-o" aria-hidden="true"></i>
                                                                    </span>
                                                                </td> */}
                                                                <td style={{textAlign:'center'}}>
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
                                                                    {/* <span className='tableIcon'
                                                                onClick={() => deleteButtonClick()}
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
                PopUpField.addPopUp ? <FarmerMasterPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                    StateDDLData={StateDDLData}
                    DistrictDDLData={DistrictDDLData}
                    TalukaDDLData={TalukaDDLData}
                    VillageData={VillageData}
                    imageButtonClick={imageButtonClick}
                    YearValue={YearValue}
                /> : <> </>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                    handleDeleteData={handleDeleteData}
                /> : <></>
            }
            {
                // PopUpField.imagePopUp ? 
                ViewImagePopUp ?
                <FarmerImagePopUp 
                open={ViewImagePopUp} 
                handleCloseClick={handleCloseClick} 
                PopUpField={PopUpField} 
                imageData={imageData}
                imgError={imgError} /> : <></>
            }

        </>
    )
}
