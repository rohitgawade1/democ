import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import moment from "moment";
import { useAuthState } from '../../../../Helper/Context';
import { CropNameDDLAPI, CropTypeDDLAPI, FinancialYearDDLAPI, MonthDDLAPI, SeasonDDLAPI } from '../../../../Redux/DDLSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FieldDayPostAPI } from '../../../../Redux/ClientAdminSlice/FieldDayMasterSlice';
import { AstricSign } from '../../../../Helper/AstricSign';

export default function AvailableStockAtStoresPopUp({ open, handleAddCloseClick, PopUpField, handlePost, CropTypeDDLData, SeasonDDLData }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [FinancialYearDDL, setFinancialYearDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_FinancialYearID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.m_FinancialYearID,
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_CropTypeID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.cropTypeName,
    })

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_SeasonID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.seasonName,
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_MonthID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.month_Name,
    })

    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_CropID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.cropName,
    })


    const handleClear = () => {
        setFinancialYearDDL({
            ...FinancialYearDDL,
            ID: 0,
            Label: "Select...",
        })
        setCropTypeDDL({
            ...CropTypeDDL,
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
        setCropNameDDL({
            ...CropNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setFieldDayTextField({

            fieldDate: ''
        })
    }

    // ----Financial Year DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(FinancialYearDDLAPI({ data }))
    }, [])

    const { FinancialYearData } = useSelector(state => state.FinancialYearDDLData)

    useEffect(() => {
        handleFinancialYearDDL()
    }, [FinancialYearData])

    const handleFinancialYearDDL = () => {
        // console.log(DeptDDLDataa)
        if (FinancialYearData && FinancialYearData.table && FinancialYearData.table.length > 0) {
            let list = FinancialYearData.table.map((item, index) => ({
                value: item.id,
                label: item.financialYear,
            }))

            setFinancialYearDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_FinancialYearID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.m_FinancialYearID,
            })
        }
        else {
            setFinancialYearDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // ----Crop type DDL -------

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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_CropTypeID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.cropTypeName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_SeasonID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.seasonName,
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
        const data = { UserID, token, SeasonDDL }
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { MonthData } = useSelector(state => state.MonthDDLData)

    useEffect(() => {
        handleMonthDDL()
    }, [MonthData])

    const handleMonthDDL = () => {
        if (MonthData && MonthData.table && MonthData.table.length > 0) {
            let list = MonthData.table.map((item, index) => ({
                value: item.m_MonthID,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_MonthID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.month_Name,
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

    // ----Crop Name DDL -------

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_CropID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.cropName,
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

    const [FieldDayTextField, setFieldDayTextField] = useState(
        {
            fieldDate: apiFlag === "Insert" ? '' : rowData?.fieldDate.split("/").reverse().join("-"),

        }
    )
    const handleInputChange = (e) => {
        setFieldDayTextField({ ...FieldDayTextField, [e.target.name]: e.target.value })
    }

    const handleAddUpdate = () => {
        const data = {
            M_FieldDayID: apiFlag === 'Insert' ? '0' : rowData?.m_FieldDayID,
            M_FinancialYearID: FinancialYearDDL.ID,
            M_CropTypeID: CropTypeDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_MonthID: MonthDDL.ID,
            M_CropID: CropNameDDL.ID,
            FieldDate: FieldDayTextField?.fieldDate,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(FieldDayPostAPI({ data }))
    }


    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Available Stock at Stores</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label
                                className="d-block"
                                htmlFor="NameofDepartment"
                            >
                                Store Name
                                <AstricSign />
                            </label>
                            <Select isClearable isSearchable />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign /></label>
                            <Select
                                isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: FinancialYearDDL.ID, label: FinancialYearDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setFinancialYearDDL({ ...FinancialYearDDL, ID: e.value, Label: e.label })
                                        :
                                        setFinancialYearDDL({ ...FinancialYearDDL, ID: 0, Label: "Select..." })

                                }}
                            // options={FinancialYearDDL.DDL}
                            />
                        </div>

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Sub Category <AstricSign /></label>
                            <Select
                                isClearable
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
                            // options={SeasonDDL.DDL}
                            />
                        </div>

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Name <AstricSign /></label>
                            <Select
                                isClearable
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
                            // options={MonthDDL.DDL}
                            />
                        </div>

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Pack Size <AstricSign /></label>
                            <Select
                                isClearable
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
                            // options={MonthDDL.DDL}
                            />
                        </div>

                    </div>
                    
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Quantity <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='joiningDate'
                            // value={UserTextField.joiningDate}
                            // onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    
                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled={
                                    FinancialYearDDL.ID == 0 || SeasonDDL.ID == 0 || MonthDDL.ID == 0 ||
                                    CropTypeDDL.ID == 0 || CropNameDDL.ID == 0 || FieldDayTextField.fieldDate == ''
                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                onClick={() => { popupBtn === 'Clear' ? handleClear() : handleAddCloseClick() }}
                            >
                                {popupBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </Popup>
    )
}
