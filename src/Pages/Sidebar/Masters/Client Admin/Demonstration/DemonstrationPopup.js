import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { CropTypePostAPI } from '../../../../../Redux/ClientAdminSlice/CropTypeSlice';
import { CropNameDDLAPI, CropTypeDDLAPI, MonthDDLAPI } from '../../../../../Redux/DDLSlice';
import { Year } from '../../../../../Helper/Year';
import { DefineFarmerDemonstrationPostAPI } from '../../../../../Redux/DistrictOfficerSlice/DefineDemonstrationSlice';
import { Loading } from '../../../../../Helper/Loading';
import { RegExNumbersOnly } from '../../../../../Helper/regEx/RegExOnlyText';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function DemonstrationPopup({ open, handleAddCloseClick, PopUpField, handlePost, SeasonDDLData, VillageData,YearValue }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    console.log(rowData)
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [Count, setCount] = useState('')

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_MonthID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.month_Name,
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
    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_CropID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.cropName,
    })


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


    // ----Crop type DDL -------

    useEffect(() => {
        const data = { UserID, token }
        dispatch(CropTypeDDLAPI({ data, Flag:'Master' }))
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

    // ----Crop Name DDL -------

    useEffect(() => {
        const data = { UserID, token,CropTypeDDL }
        dispatch(CropNameDDLAPI({ data , Flag:"Master" }))
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

    const [DemonstrationTextField, setDemonstrationTextField] = useState(
        {

            DemonstrationCount: apiFlag === "Insert" ? '' : rowData?.demonstrationCount,
        }
    )

    const handleInputChange = (e) => {
        setDemonstrationTextField({ ...DemonstrationTextField, [e.target.name]: e.target.value })
    }
    const handleClear = () => {
        // setMeetingCount('')
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
        setDemonstrationTextField({
            DemonstrationCount:''
        })

    }

    const handleAddUpdate = () => {
        const data = {
            T_FarmerMeeting_DefineID: apiFlag === "Insert" ? '0' : rowData?.t_Demonstration_DefineID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_CropTypeID: CropTypeDDL.ID,
            M_CropID: CropNameDDL.ID,
            DemonstrationCount: DemonstrationTextField?.DemonstrationCount,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost,
            handleAddCloseClick,
            handleClear:handleClear
        }
        dispatch(DefineFarmerDemonstrationPostAPI({ data }))
    }

    const { isPostLoading } = useSelector(state => state.DefineFarmerDemonstrationPostData)


    
    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckNumbersOnly = (e) => {
        handleInputChange(e)
        const IsValid = RegExNumbersOnly(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    return (
        <>
            {isPostLoading && <Loading />}
            <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
                <span className="close" onClick={handleAddCloseClick}>
                    &times;
                </span>
                <div className="call">Define Demonstration Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Season <AstricSign/></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
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
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Month <AstricSign/> </label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
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

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Crop Type <AstricSign/></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
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

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Crop Name <AstricSign/></label>
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
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Demonstration Count <AstricSign/></label>
                                <input
                                    className="form-control"
                                    id="DemonstrationCount"
                                    type="text"
                                    name="DemonstrationCount"
                                    value={DemonstrationTextField.DemonstrationCount}
                                    onChange={(e) => handleCheckNumbersOnly(e)}
                                />
                                  {
                                    IsValidNumbers && <text style={{ color: 'red' }}>Please enter Number Only</text>
                                }
                            </div>
                        </div>


                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    onClick={() => handleAddUpdate()}
                                    disabled= {
                                        SeasonDDL.ID == 0 || MonthDDL.ID == 0 || CropTypeDDL.ID == 0 ||
                                        CropNameDDL.ID == 0 || DemonstrationTextField.DemonstrationCount == '' 
                                       
                                    }
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    {popupFlag}
                                </button>

                                <button
                                    type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                    onClick={() => handleClear()}
                                >
                                    {popupBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </Popup>
        </>
    )
}
