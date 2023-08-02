import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import CommonAssignFieldVisitPopUp from '../FieldVisitToEmployee/CommonAssignFieldVisitPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { AssignToDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { DefineFieldDayDataAPI, FieldDayAssignPostAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFieldDaySlice'
import { Loading } from '../../../../Helper/Loading'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { Year } from '../../../../Helper/Year'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function FieldDayToEmployeePopUp({ open, handleCloseClick, PopUpField, handleIsPost, UserID, token, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, assignPopUp } = PopUpField

    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [AssignQty, setAssignQty] = useState(0)
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)

    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

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

    const [DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL] = useState({
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


    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'Field' }))
    }, [])

    // ------Field Assistant---
    useEffect(() => {
        const data = { UserID, token }
        dispatch(DistrictOfficerDDLAPI({ data, Flag: 'Field' }))
    }, [AssignToDDL.ID])

    useEffect(() => {
        const data = { UserID, token, DistrictOfficerDDL }
        dispatch(VillageEmployeeWiseAssignDDLAPI({ data, Flag: 'District_Village' }))
    }, [DistrictOfficerDDL.ID])

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    // useEffect(() => {
    //     const data = {
    //         token,
    //         UserID
    //     }
    //     dispatch(VillageDDLAPI({ data }))
    // }, [])

    // useEffect(() => {
    //     const data = { UserID, token }
    //     dispatch(TalukaNameDDLAPI({ data }))
    // }, [])

    // const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { VillageData } = useSelector(state => state.VillageDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handlePost = () => {
        setIsPost(!IsPost)
        handleIsPost()
        // ClearAssign()
        // handleClearPopUp()
    }
    const ClearAssignInput = () => {
        gridData &&  gridData.length > 0 && gridData.map(function (item) {
            delete item.bad;
            setgridData(item)
            // console.log(item);

            // return item;
        });
    }
    const ClearFilter = () => {
        ClearAssignInput()
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
        setDistrictOfficerDDL({
            ...DistrictOfficerDDL,
            ID: 0,
            Label: "Select..."
        })
    }

    const ClearPopUpFilter = () => {
        setCurrentPage(0)
        ClearAssignInput()
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

    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            Flag: 'FieldDayDefine',
            SeasonDDL,
            MonthDDL,
            CropTypeDDL,
            From: From,
            To: '99999'
        }

        dispatch(DefineFieldDayDataAPI({ data }))
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.DefineFieldDayData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].remainTotal_FieldDay_Count === 0) {
                data[index].isDisable = (data[index].remainTotal_FieldDay_Count >= a)
            } else {
                data[index].isDisable = (data[index].remainTotal_FieldDay_Count >= a)
            }
        }
        setgridData(data)
        setAssignDataErr(false)
        handleQtyInputChange(index, event)
    }

    const handleQtyInputChange = (index, event) => {
        let allCheckData = ""
        // let m_CropID = ""
        gridData.forEach((item) => {
            if (item.assignedQty > 0 && item.assignedQty <= item.remainTotal_FieldDay_Count) {
                allCheckData = allCheckData + item.t_FieldDay_DefineID + "|" + item.assignedQty + "|" + item.m_CropID + ","
                // m_CropID = item.m_CropID
            }
        })
        setAssignData(allCheckData)
        // console.log(allCheckData)
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].remainTotal_FieldDay_Count === 0) {
            data[index].isDisable = (data[index].remainTotal_FieldDay_Count >= a)
        } else {
            if (parseInt(event.target.value) > data[index].remainTotal_FieldDay_Count) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].remainTotal_FieldDay_Count)
            } else {
                data[index].isDisable = !(data[index].remainTotal_FieldDay_Count >= a)
            }
        }

        setgridData(data)
        setAssignDataErr(true)
    }

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // let m_CropID = ""
        // gridData.forEach((item) => {
        //     if (item.assignedQty > 0 && item.assignedQty <= item.remainTotal_FieldDay_Count) {
        //         // allCheckData = allCheckData + item.t_FieldDay_DefineID + "|" + item.assignedQty + ","
        //         m_CropID = item.m_CropID
        //     }

        // })
        if (CropTypeDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            const data = {
                FieldDay_Define: AssignData,
                M_FinancialYearID: YearValue,
                M_MonthID: MonthDDL.ID,
                M_SeasonID: SeasonDDL.ID,
                AssignToOfficerID: AssignToDDL.ID,
                M_CropTypeID: CropTypeDDL.ID,
                M_CropID: "0",
                FieldDayDefineToUserID: DistrictOfficerDDL.m_UserID,
                M_VillageNameID: VillageDDL.ID,
                M_TalukaNameID: '0',
                M_UserID: UserID,
                token: token,
                Flag: 'DistToTaluka',
                handlePost,
                handleCloseClick,
                ClearPopUpFilter:ClearPopUpFilter
            }
            dispatch(FieldDayAssignPostAPI({ data }))
        }
    }

    const { isPostLoading } = useSelector(state => state.FieldDayAssignPostData)

    useEffect(() => {
        if (gridData && gridData.length > 0) {
            let count = 0
            gridData.every((item) => {
                if (item.ischecked) {
                    count = count + 1

                    return false
                }
                return true
            })
            if (count > 0) {
                setAssignBtnValidation(false)
            } else {
                setAssignBtnValidation(true)

            }
        } else {
            setAssignBtnValidation(true)

        }

    }, [gridData])

    const isValidate = () => {
        if (AssignToDDL.ID == 3 || Disabled) {

            if (AssignBtnValidation) {
                setValidation(true)
            } else {
                setValidation(false)
            }
        } else if (AssignToDDL.ID == 6 || Disabled) {
            if (DistrictOfficerDDL.ID == 0 || VillageDDL.ID == 0) {
                setValidation(true)
            } else {
                setValidation(false)

            }
        }
    }

    useEffect(() => {
        isValidate()
    }, [AssignToDDL.ID, AssignBtnValidation, TalukaDDL.ID, DistrictOfficerDDL.ID, VillageDDL.ID, Disabled])

    return (
        <>
            {isLoading && <Loading />}
            {isPostLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Field Day Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-3">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <SeasonWiseMonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                SeasonWiseMonthData={SeasonWiseMonthData}
                                mandatory={true}

                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                mandatory={true}
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
                                :
                                <>
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
                                        <TalukaNameDataDDL
                                            TalukaDDL={TalukaDDL}
                                            setTalukaDDL={setTalukaDDL}
                                            TalukaDDLData={TalukaDDLData}
                                            mandatory={true}
                                        />
                                    </div> */}

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
                        }
                        <div className="col-12 col-lg-3 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div>
                        {DDLInfo &&
                            <div className="col-12 col-lg-12 text-end">
                                <span className='px-2 fw-bold' style={{ color: "blue" }}>
                                    {
                                        AssignToDDL.ID === 3 ?
                                            'Please Select Season, Month, Assign To'
                                            : AssignToDDL.ID === 6 ?
                                                'Please Select Season, Month,Crop Type, Assign To & Field Assistant Name'
                                                :
                                                'Please Select Season, Month, Assign To & District Officer'
                                    }
                                </span>
                            </div>
                        }

                        {/* <div className="col-12 mt-1 text-end">

                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Field Day Count  :- 00  </span>

                        </div> */}
                        <div className="table-responsive mt-1" style={{height:'350px'}}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        {/* <th style={{ textAlign: "center", width: "5%" }}>#</th> */}

                                        <th style={{ textAlign: "center" }}>Crop Name </th>
                                        <th style={{ textAlign: "center" }}>Total Field Day Count</th>
                                        <th style={{ textAlign: "center" }}>Assigned Field Day Count</th>
                                        <th style={{ textAlign: "center" }}>Remaining Field Day Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr style={{ textAlign: "center" }}>
                                                {/* <td>
                                                    <input
                                                        disabled={item.isDisable}
                                                        value={item.ischecked}
                                                        checked={item.ischecked}
                                                        onChange={(e) => {
                                                            if (AssignBtnValidation1) {
                                                                toastErrorr('Please Enter Valid Quantity')
                                                            } else {
                                                                handleOnCheckClick(item, i, !item.ischecked)
                                                            }
                                                        }}

                                                        type="checkbox" />
                                                </td> */}
                                                <td>{item?.cropName}</td>
                                                <td>{item?.total_FieldDay_Count}</td>

                                                <td>
                                                    <div className="col-8 text-center mx-auto">
                                                        <div className="input-box">
                                                            <input
                                                                name='assignedQty'
                                                                qtyerr='assignedQtyErr'
                                                                type="text"
                                                                className="form-control p-0 px-2 text-center"
                                                                style={{ background: 'whitesmoke', borderColor: '#777777', borderWidth: '0.5px', textAlign: 'center' }}
                                                                onChange={(e) => {
                                                                    const reg = new RegExp('^[0-9]+$');
                                                                    if (e.target.value === "") {
                                                                        handleQuantityInputChange(i, e)

                                                                    } else {
                                                                        if (reg.test(e.target.value)) {
                                                                            if (parseInt(e.target.value) <= parseInt(item.remainTotal_FieldDay_Count) && parseInt(e.target.value) >= 0) {
                                                                                handleQuantityInputChange(i, e)
                                                                                setAssignBtnValidation(false)
                                                                                setAssignBtnValidation1(false)
                                                                                setAssignDataErr(false)
                                                                                // setAssignQty(e.target.value)
                                                                            }
                                                                            else {
                                                                                handleDisableCheckbox(i, e)
                                                                                // toastErrorr('Please Enter Valid Quantity')
                                                                                setAssignDataErr(true)
                                                                                setAssignBtnValidation(true)
                                                                                setAssignBtnValidation1(true)
                                                                                handleQtyInputChange(i, e)
                                                                            }
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid Field Day Count</text>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item?.remainTotal_FieldDay_Count}</td>

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }

                                </tbody>
                            </table>
                            </div>
                            <div className="col-12 clear">
                                <button type="button" className="btn addBtn float-end text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn"
                                    onClick={() => handelAssignClicked()}
                                    disabled={AssignDataErr}
                                // disabled={Validation}
                                // disabled={AssignBtnValidation || AssignToDDL.ID == 0 || DistrictOfficerDDL.ID == 0 || VillageDDL.ID == 0}
                                >
                                    Assign
                                </button>
                            </div>
                        

                        {/* <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                               

                                <button
                                    type="button" className="btn addBtn allBtn float-right"
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    Save
                                </button>

                                <button
                                    type="button" className="btn btn-clear text-white mr-2 mx-2 allBtn float-right"
                                >
                                    Clear
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>


            </Popup>
            {/* {
                PopUpField.assignPopUp ? <CommonAssignFieldVisitPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


