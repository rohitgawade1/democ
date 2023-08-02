import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import Sidebar from '../../../../../Components/Sidebar/Sidebar'
import Header from '../../../../../Components/Header/Header'
import { useAuthState } from '../../../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DealerExportTableDataAPI, DealerTableDataAPI } from '../../../../../Redux/ClientAdminSlice/DealerSlice'
import { Pegination } from '../../../../../Components/Pegination/Pegination'
import { DealerNameDDLAPI, DelearNameDDLAPI, DistrictDashboardDDLAPI, DistrictNameDDLAPI, StateDashboardDDLAPI, StateNameDDLAPI, TalukaDashboardDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../../Redux/DDLSlice'
import DeletePopUp from '../../../../../Components/Common/DeletePopUp'
import DealerMasterPopUp from './DealerMasterPopUp'
import { DealerMasterExport } from './DealerMasterExport'
import { Loading } from '../../../../../Helper/Loading'
import { StateDashboardDDL } from '../../../../../Components/CommonDDL/StateDashboardDDL'
import { DistrictDashboardDDL } from '../../../../../Components/CommonDDL/DistrictDashboardDDL'
import { TalukaDashboardDDL } from '../../../../../Components/CommonDDL/TalukaDashboardDDL'


export default function DealerMaster() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
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
    const [DealerCode, setDealerCode] = useState('')
    const [YearValue, setYearValue] = useState(0)

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const dispatch = useDispatch()

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

    const [DealerDDL, setDealerDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })


    useEffect(() => {
        const data = {
            TalukaDDL: TalukaDDL,
            DistrictDDL: DistrictDDL,
            DealerCode: DealerCode,
            DealerID: DealerDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            DealerName: DealerDDL.ID,
            Flag:'Web_Client'
        }
        dispatch(DealerTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost])
    // }, [To, IsSearch, IsClear, IsPost, TalukaDDL.ID, DistrictDDL.ID, StateDDL.ID])

    useEffect(() => {
        const data = {
            TalukaDDL: TalukaDDL,
            DistrictDDL: DistrictDDL,
            DealerCode: DealerCode,
            DealerID: DealerDDL.ID,
            UserID: UserID,
            token: token,
            From: From,
            To: '99999',
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            DealerName: DealerDDL.ID,
            Flag:'Web_Client'
        }
        dispatch(DealerExportTableDataAPI({ data }))
    }, [From, IsSearch, IsClear, IsPost])
    // }, [To, IsSearch, IsClear, IsPost, TalukaDDL.ID, DistrictDDL.ID, StateDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.DealerTableData)
    const { DealerExporttableData, isExportLoading } = useSelector(state => state.DealerExportTableData)

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setDealerCode('')
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
        setDealerDDL({
            ...DealerDDL,
            ID: 0,
            Label: "Select...",
        })
    }

    // ---------State DDL---------

    useEffect(() => {
        const data = { UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(StateDashboardDDLAPI({ data, Flag: 'Web_Client' }))
        }
    }, [YearValue])


    useEffect(() => {
        const data = { StateDDL, UserID, token, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(DistrictDashboardDDLAPI({ data, Flag: 'Web_Client ' }))
        }
    }, [StateDDL.ID, YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, DistrictDDL, M_MonthID: '0', M_FinancialYearID: YearValue }
        if (YearValue !== 0) {
            dispatch(TalukaDashboardDDLAPI({ data, Flag: 'Web_Client ' }))
        }
    }, [StateDDL.ID, DistrictDDL.ID, YearValue])

    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL, VillageDDL }
        dispatch(DealerNameDDLAPI({ data, Flag: 'Web_Client' }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID, VillageDDL.ID])

    const { DealerNameDDLData } = useSelector(state => state.DealerNameDDLData)

    useEffect(() => {
        handleDelearNameDDL()
    }, [DealerNameDDLData])

    const handleDelearNameDDL = () => {
        // console.log(DealerNameDDLData)
        if (DealerNameDDLData && DealerNameDDLData.table && DealerNameDDLData.table.length > 0) {
            let list = DealerNameDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_DealerID,
                label: item.dealerName,
            }))

            setDealerDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDealerDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const { StateDashboardDDLData } = useSelector(state => state.StateDashboardDDLData)
    const { DistrictDashboardDDLData } = useSelector(state => state.DistrictDashboardDDL)
    const { TalukaDashboardDDLData } = useSelector(state => state.TalukaDashboardDDLData)


    // const [PopUpField, setPopUpField] = React.useState({
    //     addPopUp: false,
    //     deletePopUp: false,
    //     popupFlag: "",
    //     popupBtn:""
    // })

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
        setPopUpField({ ...PopUpField, addPopUp: true, deletePopUp: false, popupFlag: "Update", popupBtn: "Cancel", apiFlag: 'Update', rowData: item })
    }

    const deleteButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, deletePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
    }

    const AcknowledgeButtonClick = (item) => {
        setPopUpField({ ...PopUpField, addPopUp: false, acknowledgePopUp: true, popupBtn: "", apiFlag: 'Delete', rowData: item })
        // setDistributedID(item.m_Product_Stock_DistributeID)
    }

    return (
        <>
            {isLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header setYearValue={setYearValue} />
                <Sidebar active="dealermaster" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Dealer Master</h4>
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
                                                        DealerExporttableData && DealerExporttableData.table && DealerExporttableData.table.length > 0 &&
                                                        <DealerMasterExport
                                                            ExcelData={DealerExporttableData}
                                                            name='Dealer Master'
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
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Code </label>
                                                                <input
                                                                    className="form-control"
                                                                    id="Order"
                                                                    type="text"
                                                                    name="Order"
                                                                    value={DealerCode}
                                                                    onChange={(e) => setDealerCode(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <StateDashboardDDL
                                                                StateDDL={StateDDL}
                                                                setStateDDL={setStateDDL}
                                                                StateDashboardDDLData={StateDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <DistrictDashboardDDL
                                                                DistrictDDL={DistrictDDL}
                                                                setDistrictDDL={setDistrictDDL}
                                                                DistrictDashboardDDLData={DistrictDashboardDDLData}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <TalukaDashboardDDL
                                                                TalukaDDL={TalukaDDL}
                                                                setTalukaDDL={setTalukaDDL}
                                                                TalukaDashboardDDLData={TalukaDashboardDDLData}
                                                            />
                                                        </div>

                                                        {/* <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Village Name </label>
                                                                <Select
                                                                    isClearable
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
                                                        </div> */}

                                                        {/* <div className="col-md-6 col-lg-2">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Code</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="departmentCode"
                                                                    type="text"
                                                                    name="departmentCode"
                                                                // value={departmentTextField.departmentCode}
                                                                // onChange={(e) => handleInputChange(e)}
                                                                />
                                                            </div>
                                                        </div> */}

                                                        <div className="col-md-6 col-lg-3">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Dealer Name</label>
                                                                <Select
                                                                    // isClearable
                                                                    isSearchable
                                                                    maxMenuHeight={150}
                                                                    value={{ value: DealerDDL.ID, label: DealerDDL.Label }}
                                                                    onChange={(e) => {
                                                                        e ?
                                                                            setDealerDDL({ ...DealerDDL, ID: e.value, Label: e.label })
                                                                            :
                                                                            setDealerDDL({ ...DealerDDL, ID: 0, Label: "Select..." })

                                                                    }}
                                                                    options={DealerDDL.DDL}
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
                                        <div className="table-responsive ">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr.No.</th>
                                                        <th>Dealer Code </th>
                                                        <th>State </th>
                                                        <th>District</th>
                                                        <th>Taluka</th>
                                                        <th>Dealer Name </th>
                                                        {/* <th>Village Name</th> */}
                                                        <th>Mobile Number</th>
                                                        {/* <th>Shop Name</th> */}
                                                        <th>Dealer Address</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr>
                                                                <td style={{textAlign:'center'}} className='w-5'>{item.rowNum}</td>
                                                                <td>{item.dealerCode ? item.dealerCode : "-"}</td>
                                                                <td>{item.stateName ? item.stateName : "-"}</td>
                                                                <td>{item.districtName ? item.districtName : "-"}</td>
                                                                <td>{item.talukaName ? item.talukaName : "-"}</td>
                                                                <td style={{ whiteSpace: 'break-spaces' }}>{item.dealerName ? item.dealerName : "-"}</td>

                                                                <td>{item.mobileNumber ? item.mobileNumber : "-"}</td>

                                                                <td style={{ whiteSpace: 'break-spaces' }}>{item.address ? item.address : "-"}</td>

                                                                <td style={{textAlign:'center'}} >
                                                                    <span className='tableIcon'
                                                                        onClick={() => editButtonClick(item)}
                                                                    >
                                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                    </span>
                                                                    {/* {
                                                                        item.statusIndicatorName === 'Dealer Approved' ?
                                                                            <span onClick={() =>
                                                                                AcknowledgeButtonClick(item)

                                                                            }>
                                                                                <i
                                                                                    class="fa-solid fa-circle-check"
                                                                                    style={{ cursor: "pointer", fontSize: '1rem', color: '#172b4d' }}
                                                                                ></i>
                                                                            </span>
                                                                            : <></>
                                                                    } */}
                                                                    {/* <span className='tableIcon'
                                                                onClick={() => deleteButtonClick()}
                                                            >
                                                                <i className="fa fa-trash-o text-danger" aria-hidden="true"></i>
                                                            </span> */}
                                                                </td>

                                                            </tr>
                                                        )) : <tr > No data found ...</tr>
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
                PopUpField.addPopUp ? <DealerMasterPopUp
                    open={PopUpField.addPopUp}
                    handleAddCloseClick={handleAddCloseClick}
                    PopUpField={PopUpField}
                    handlePost={handlePost}
                /> : <></>
            }
            {
                PopUpField.deletePopUp ? <DeletePopUp
                    open={PopUpField.deletePopUp}
                    handleDeleteCloseClick={handleDeleteCloseClick}
                // handleDeleteData={handleDeleteData}
                /> : <></>
            }

        </>
    )
}
