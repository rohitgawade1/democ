import React, { useEffect, useState } from 'react'
import DesignationPopUp from './DesignationPopUp'
import Sidebar from '../../../../Components/Sidebar/Sidebar'
import Header from '../../../../Components/Header/Header'
import DeletePopUp from '../../../../Components/Common/DeletePopUp'
import { useDispatch, useSelector } from 'react-redux'
import { DesignationDeleteAPI, DesignationTableDataAPI } from '../../../../Redux/MasterSlice/DesignationSlice'
import { useAuthState } from '../../../../Helper/Context'
import { Pegination } from '../../../../Components/Pegination/Pegination'
import { Loading } from '../../../../Helper/Loading'
import { RegExAlphabetsandSpecialCharacters, RegExOnlyText } from '../../../../Helper/regEx/RegExOnlyText'


export default function Designation() {

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

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

    const [PopUpField, setPopUpField] = React.useState({
        addPopUp: false,
        deletePopUp: false,
        popupFlag: '',
        popupBtn: "",
        apiFlag: "",
        rowData: ''
    })

    const [designationTextField, setdesignationTextField] = useState(
        {
            designationName: ""
        }
    )


    const handleInputChange = (e) => {
        setdesignationTextField({ ...designationTextField, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch()
    const { tableData, isLoading } = useSelector(state => state.DesignationTableData)

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            From: From,
            To: To
        }
        dispatch(DesignationTableDataAPI({ data, designationTextField }))
    }, [To, IsSearch, IsClear, IsPost])

    const handleDeleteData = () => {
        dispatch(DesignationDeleteAPI({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }))
    }

    const { isDeleteLoading } = useSelector(state => state.DesignationDeleteData)

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

    const handlePost = () => {
        setIsPost(!IsPost)
    }

    const handleSearch = () => {
        setIsSearch(!IsSearch)
        setCurrentPage(0)
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setdesignationTextField({
            designationName: ""
        })
    }

    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExAlphabetsandSpecialCharacters(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    return (
        <>
            {isLoading && <Loading />}
            {isDeleteLoading && <Loading />}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <Sidebar active="designation" listActive="masters" />
                <div id="wrapper">
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row mt_40" >
                                <div className="row mtop">
                                    <div className="col-md-12 grid-margin">
                                        <div className="row page-heading">
                                            <div className="col-12 col-lg-8 mb-xl-0 align-self-center align-items-center">
                                                <h4 className="fontStyle">Designation Master</h4>
                                            </div>
                                            <div className="col-12 col-lg-4 mb-xl-0 align-self-center align-items-end text-right ">
                                                <button type="button" className="btn btn-add text-white mr-2 mt-4 mt-md-0 mx-2 waves-effect waves-light allBtn " style={{ float: "right" }} title="Add"
                                                    onClick={() => addButtonClick()}
                                                >
                                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                                    Add
                                                </button>
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
                                                        <div className="col-md-6 col-lg-4">
                                                            <div className="form-group">
                                                                <label className="d-block" htmlFor="NameofDepartment">Designation  Name</label>
                                                                <input
                                                                    className="form-control"
                                                                    id="designationName"
                                                                    type="text"
                                                                    name="designationName"
                                                                    value={designationTextField.designationName}
                                                                    onChange={(e) => handleCheckText(e)}
                                                                />
                                                                {
                                                                    IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-lg-4 clear">
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
                                        <div className="table-responsive pb-3">
                                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                                        <th style={{ textAlign: "center" }}>Designation  Name</th>
                                                        <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                                            <tr key={i}>
                                                                <td align='center'>{item.rowNum}</td>
                                                                <td>{item.designationName ? item.designationName : ''}</td>
                                                                <td align='center'>
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
                </div>
            </main>

            {
                PopUpField.addPopUp ? <DesignationPopUp
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
                    handleDeleteData={handleDeleteData}
                /> : <></>
            }

        </>
    )
}
