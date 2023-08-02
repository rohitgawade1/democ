import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DTVEmployeeWiseAssignDDLAPI, DistrictOfficerDDLAPI, MonthDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, TalukaEmployeeWiseAssignDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice';
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL';
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL';
import { MonthDataDDL } from '../../../../Components/CommonDDL/MonthDataDDL';
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL';
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL';
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL';
import { AssignFarmerMeetingPopUpPostAPI, AssignFarmerMeetingPopUpUpdatePostAPI, AssignFarmerMeetingTargePopUpDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignFarmerMeetingTargetSlice';
import { Year } from '../../../../Helper/Year';
import { Loading } from '../../../../Helper/Loading';
import { toastErrorr } from '../../../../Helper/ToastMessage';
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL';
import { AstricSign } from '../../../../Helper/AstricSign';
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL';


export default function AssignFarmerMeetingPopUp({ open, handleCloseClick, PopUpField, setPopUpField, handleIsPost, YearValue }) {

    const { popupFlag, assignPopUp, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [IsAssignQty, setIsAssignQty] = useState(false)
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const dispatch = useDispatch()

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

    const [DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL] = useState({
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

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
        // dispatch(TalukaNameDDLAPI({ data }))
        // dispatch(VillageDDLAPI({ data }))      
        dispatch(AssignToDDLAPI({ data, Flag: 'Target' }))
        // SalesDistrictDDLAPI({
        //     DDLData: SalesTraineeDDL,
        //     setDDLData: setSalesTraineeDDL,
        //     UserID: UserID,
        //     token: token,
        //     Flag: 'Order'
        // })

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
        dispatch(MonthDDLAPI({ data }))
    }, [SeasonDDL.ID])


    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
    }, [CropTypeDDL.ID])


    const { VillageData } = useSelector(state => state.VillageDDLData)
    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { MonthData } = useSelector(state => state.MonthDDLData)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { TalukaDDLData } = useSelector(state => state.TalukaNameDDL)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)

    const handleassignCloseClick = () => {
        setPopUpField({ ...PopUpField, assignPopUp: false })
    }

    const assignButtonClick = () => {
        setPopUpField({ ...PopUpField, assignPopUp: true })

    }

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
        // setCurrentPage(0)
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
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setVillageDDL({
            ...VillageDDL,
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

    const ClearPopUpFilter = () => {
        setCurrentPage(0)
        ClearAssignInput()
        setTalukaDDL({
            ...TalukaDDL,
            ID: 0,
            Label: "Select..."
        })
        setVillageDDL({
            ...VillageDDL,
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
            T_FarmerMeeting_DefineID: '0',
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL,
            M_SeasonID: SeasonDDL,
            M_CropTypeID: CropTypeDDL,
            M_CropID: CropNameDDL,
            M_UsersID: UserID,
            Flag: 'MeetingDefine',
            FromTop: From,
            ToTop: '99999',
            token: token
        }
        dispatch(AssignFarmerMeetingTargePopUpDataAPI({ data }))
    }, [IsPost, IsAssignQty, SeasonDDL.ID, MonthDDL.ID, CropTypeDDL.ID])

    const { isLoading, tableData } = useSelector(state => state.AssignFarmerMeetingTargePopUpData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

    // const handlePost = () => {
    //     setIsAssignQty(!IsAssignQty)
    // }

    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].remainMeetingCount === 0) {
                data[index].isDisable = (data[index].remainMeetingCount >= a)
            } else {
                data[index].isDisable = (data[index].remainMeetingCount >= a)
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
            if (item.assignedQty > 0 && item.assignedQty <= item.remainMeetingCount) {
                allCheckData = allCheckData + item.t_FarmerMeeting_DefineID + "|" + item.assignedQty +"|" + item.m_CropID +  ","
                // m_CropID = item.m_CropID
            }
        })
        setAssignData(allCheckData)
        // console.log(allCheckData)
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].remainMeetingCount === 0) {
            data[index].isDisable = (data[index].remainMeetingCount >= a)
        } else {
            if (parseInt(event.target.value) > data[index].remainMeetingCount) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].remainMeetingCount)
            } else {
                data[index].isDisable = !(data[index].remainMeetingCount >= a)
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
            setDisabled(false)

        } else {
            setDisabled(true)
        }
    }

    const handelAssignClicked = () => {
        // let allCheckData = ""
        // let m_CropID = ""
        // gridData.forEach((item) => {
        //     if (item.assignedQty > 0 && item.assignedQty <= item.remainMeetingCount) {
        //         // allCheckData = allCheckData + item.t_FarmerMeeting_DefineID + "|" + item.assignedQty + ","
        //         m_CropID = item.m_CropID
        //     }

        // })
        // console.log(allCheckData)

        if (CropTypeDDL.ID == '0' || AssignToDDL.ID == '0') {
            setDDLInfo(true)
        } else {
            const data = {
                FarmerMeeting_Define: AssignData,
                M_FinancialYearID: YearValue,
                M_MonthID: MonthDDL.ID,
                M_SeasonID: SeasonDDL.ID,
                M_CropTypeID: CropTypeDDL.ID,
                M_CropID:'0',
                AssignToOfficerID: AssignToDDL.ID,
                FarmerMeetingAssignToUserID: AssignToDDL.ID === 5 ? SalesTraineeDDL.m_UserID : DistrictOfficerDDL.m_UserID,
                M_VillageNameID: VillageDDL.ID,
                M_UserID: UserID,
                M_TalukaNameID: TalukaDDL.ID,
                token: token,
                Flag: 'DistToTaluka',
                handlePost: handlePost,
                handleAddCloseClick: handleCloseClick,
                ClearPopUpFilter: ClearPopUpFilter
            }
            dispatch(AssignFarmerMeetingPopUpPostAPI({ data }))
        }
    }

    const { isPostLoading } = useSelector(state => state.AssignFarmerMeetingPopUpPostData)

    const handelUpdateAssign = () => {
        console.log(gridData)
        // const data ={
        //     T_FarmerMeeting_AssignID,
        //     M_FinancialYearID,
        //     M_MonthID,
        //     OrderAssignToUserID,
        //     M_UserID,
        //     AssignMeeting,
        //     token,
        //     Flag,
        //     handlePost
        // } 
        // dispatch(AssignFarmerMeetingPopUpUpdatePostAPI({ data }))
    }

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
        } else if (AssignToDDL.ID == 5 || Disabled) {
            if (SalesTraineeDDL.ID == 0 || TalukaDDL.ID == 0) {
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
    }, [AssignToDDL.ID, AssignBtnValidation, SalesTraineeDDL.ID, TalukaDDL.ID, DistrictOfficerDDL.ID, VillageDDL.ID, Disabled])
    return (
        <>
            {isLoading && <Loading />}
            {isPostLoading && <Loading />}

            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Farmer Meeting Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-2">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                mandatory={true}
                            />
                        </div>

                        <div className="col-md-6 col-lg-2">
                            <MonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                MonthData={MonthData}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-2">
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
                                            <div className="col-md-6 col-lg-4">
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
                                            <div className="col-md-6 col-lg-3">
                                                <DTVWiseEmployeeAssignDDL
                                                    DTVWiseEmployeeDDL={TalukaDDL}
                                                    setDTVWiseEmployeeDDL={setTalukaDDL}
                                                    DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                    mandatory={false}
                                                    name="Taluka Name"

                                                />
                                            </div>
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
                                                <VillageDataDDL
                                                    VillageDDL={VillageDDL}
                                                    setVillageDDL={setVillageDDL}
                                                    VillageData={VillageData}
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


                        <div className="col-12 col-lg-2 clear">
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


                        <div className="table-responsive mt-2" style={{ height: '350px' }}>
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>Sr no.</th>

                                        <th style={{ textAlign: "center" }}>Crop Name</th>
                                        <th style={{ textAlign: "center" }}>Total Farmer Meeting Count</th>
                                        <th style={{ textAlign: "center" }}> Assign Farmer Meeting Count </th>
                                        <th style={{ textAlign: "center" }}>Remaining Farmer Meeting Count</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                            <tr style={{ textAlign: "center" }}>
                                                {/* {
                                                    popupFlag === "Update" ?
                                                        <td className="text-center">{i + 1}</td>
                                                        : */}
                                                <td className="text-center">{i + 1}</td>
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
                                                {/* } */}
                                                <td>{item?.cropName}</td>
                                                <td>{item?.farmerMeetingCount}</td>

                                                <td>
                                                    <div className="col-8 text-center mx-auto">
                                                        <div className="input-box">
                                                            {/* <input
                                                                type="text"
                                                                className='input-boxes'
                                                                name='Password'
                                                            // value={UserTextField.Password}
                                                            // onChange={(e) => handleInputChange(e)}
                                                            /> */}

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
                                                                            if (parseInt(e.target.value) <= parseInt(item.remainMeetingCount) && parseInt(e.target.value) >= 0) {
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
                                                            {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid meeting Count</text>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item?.remainMeetingCount}</td>

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="col-12  clear">
                            {
                                popupFlag === "Update" ?
                                    <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                        // disabled={AssignBtnValidation}
                                        onClick={handelUpdateAssign}
                                    >
                                        Update
                                    </button>
                                    :
                                    <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                        // disabled={Validation}
                                        disabled={AssignDataErr}
                                        onClick={handelAssignClicked}

                                    >
                                        Assign
                                    </button>
                            }


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
                PopUpField.assignPopUp ? <AssignOrderTargetPopUp open={PopUpField.assignPopUp} handleassignCloseClick={handleassignCloseClick} PopUpField={PopUpField} setPopUpField={setPopUpField} /> : <></>
            } */}
        </>
    )
}


