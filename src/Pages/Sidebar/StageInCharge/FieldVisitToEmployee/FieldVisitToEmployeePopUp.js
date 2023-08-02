import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import CommonAssignFieldVisitPopUp from './CommonAssignFieldVisitPopUp'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { DefineFieldVisiDataAPI, FieldVisitAssignPostAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFieldVisitSlice'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { Year } from '../../../../Helper/Year'
import { Loading } from '../../../../Helper/Loading'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'

export default function FieldVisitToEmployeePopUp({ open, handleCloseClick, PopUpField, handleIsPost, UserID, token, YearValue }) {

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

    const [DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
        dispatch(AssignToDDLAPI({ data, Flag: 'Field' }))
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
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    // useEffect(() => {
    //     const data = { UserID, token }
    //     dispatch(TalukaNameDDLAPI({ data }))
    // }, [])

    // const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
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
            Flag: 'FieldVisitAssign',
            SeasonDDL: SeasonDDL,
            MonthDDL: MonthDDL,
            CropTypeDDL: CropTypeDDL,
            From: From,
            To: '99999'
        }

        dispatch(DefineFieldVisiDataAPI({ data }))
    }, [IsPost, From, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID])

    const { tableData, isLoading } = useSelector(state => state.DefineFieldVisitData)

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

            if (data[index].remaningCount === 0) {
                data[index].isDisable = (data[index].remaningCount >= a)
            } else {
                data[index].isDisable = (data[index].remaningCount >= a)
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
            if (item.assignedQty > 0 && item.assignedQty <= item.remaningCount) {
                allCheckData = allCheckData + item.t_FieldVisit_DefineID + "|" + item.assignedQty + "|" + item.m_CropID +  ","
                // m_CropID = item.m_CropID
                // console.log(item.m_CropID)
            }
        })
        setAssignData(allCheckData)
        
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].remaningCount === 0) {
            data[index].isDisable = (data[index].remaningCount >= a)
        } else {
            if (parseInt(event.target.value) > data[index].remaningCount) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].remaningCount)
            } else {
                data[index].isDisable = !(data[index].remaningCount >= a)
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
    useEffect(() => {
        for (var i in gridData) {
            if (gridData[i].isDisable === false) {
                setAssignDataErr(true)
                break;
            }
        }
    }, [gridData])

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // let m_CropID = ""
        // gridData.forEach((item) => {
        //     if (item.assignedQty > 0 && item.assignedQty <= item.remaningCount) {
        //         // allCheckData = allCheckData + item.t_FieldVisit_DefineID + "|" + item.assignedQty + ","
        //         m_CropID = item.m_CropID
        //     }

        // })
        // console.log(allCheckData)

        if (CropTypeDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            const data = {
                FieldVisit_Define: AssignData,
                M_FinancialYearID: YearValue,
                M_MonthID: MonthDDL.ID,
                M_SeasonID: SeasonDDL.ID,
                M_CropTypeID: CropTypeDDL.ID,
                M_CropID: '0',
                AssignToOfficerID: AssignToDDL.ID,
                FieldVisitAssignToUserID: DistrictOfficerDDL.m_UserID,
                M_VillageNameID: VillageDDL.ID,
                M_TalukaNameID: '0',
                M_UserID: UserID,
                token: token,
                Flag: 'DistToTaluka',
                handlePost,
                handleCloseClick,
                ClearPopUpFilter: ClearPopUpFilter
            }
            dispatch(FieldVisitAssignPostAPI({ data }))
        }
    }

    const { isPostLoading } = useSelector(state => state.FieldVisitAssignPostData)

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
            {isPostLoading && <Loading />}
            {isLoading && <Loading />}
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Field Visit Target</div>
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
                                    <div className="col-md-6 col-lg-4">
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
                                                : AssignToDDL.ID === 5 ?
                                                    'Please Select Season, Month,Crop Type, Assign To & Sales Trainee Name'
                                                    :
                                                    'Please Select Season, Month, Assign To & District Officer'
                                    }
                                </span>
                            </div>
                        }

                        {/* <div className="col-12 mt-2 text-end">
                            <span className='px-2 fw-bold' style={{ color: "#344769", fontSize: "18px" }}>Field Visit Count :- 00  </span>

                        </div> */}

                        <div className="table-responsive mt-2" style={{ height: '350px' }}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>Sr.No</th>

                                        <th style={{ textAlign: "center" }}>Crop Name </th>
                                        <th style={{ textAlign: "center" }}>Total Count</th>
                                        <th style={{ textAlign: "center" }}>Assigned Field visit count</th>
                                        <th style={{ textAlign: "center" }}>Remaining Field Visit Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr key={i} className="text-center">
                                                {/* <td className="text-center">
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
                                                <td>{item.rowNum}</td>
                                                <td>{item.cropName ? item.cropName : '-'}</td>
                                                <td>{item.defineVisitCount ? item.defineVisitCount : '-'}</td>
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
                                                                            if (parseInt(e.target.value) <= parseInt(item.remaningCount) && parseInt(e.target.value) >= 0) {
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
                                                            {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid Field Visit Count</text>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.remaningCount ? item.remaningCount : '-'}</td>

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 clear">
                            <button type="button" className="btn addBtn text-white float-end mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn"
                                onClick={() => handelAssignClicked()}
                                // disabled={Validation}
                                disabled={AssignDataErr}
                            // disabled={AssignBtnValidation || AssignToDDL.ID == 0 || DistrictOfficerDDL.ID == 0 || VillageDDL.ID == 0}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>



            </Popup>
            {/* {
                PopUpField.assignPopUp ? <CommonAssignFieldVisitPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


