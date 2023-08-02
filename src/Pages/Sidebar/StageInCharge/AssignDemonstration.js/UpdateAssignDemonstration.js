
import React from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { AssignToDDLAPI, CropNameDDLAPI, CropTypeDDLAPI, DistrictOfficerDDLAPI, SalesDistrictDDLAPI, SalesTraineeDDLDDLAPI, SeasonDDLAPI, SeasonWiseMonthDDLAPI, TalukaEmployeeWiseAssignDDLAPI, TalukaNameDDLAPI, VillageDDLAPI, VillageEmployeeWiseAssignDDLAPI, villageTalukaDDLAPI } from '../../../../Redux/DDLSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SeasonDataDDL } from '../../../../Components/CommonDDL/SeasonDataDDL'
import { SeasonWiseMonthDataDDL } from '../../../../Components/CommonDDL/SeasonWiseMonthDataDDL'
import { CropTypeDataDDL } from '../../../../Components/CommonDDL/CropTypeDataDDL'
import { VillageDataDDL } from '../../../../Components/CommonDDL/VillageDataDDL'
import { TalukaNameDataDDL } from '../../../../Components/CommonDDL/TalukaNameDataDDL'
import { AssignDemoPopUpUpdatePostAPI, AssignDemonstrationDefineDataAPI } from '../../../../Redux/DistrictOfficerSlice/AssignDemonstrationSlice'
import { toastErrorr } from '../../../../Helper/ToastMessage'
import { useAuthState } from '../../../../Helper/Context'
import { Year } from '../../../../Helper/Year'
import { DistrictOfficerDataDDL } from '../../../../Components/CommonDDL/DistrictOfficerDataDDL'
import { AssignToDataDDL } from '../../../../Components/CommonDDL/AssignToDataDDL'
import { DTVWiseEmployeeAssignDDL } from '../../../../Components/CommonDDL/DTVWiseEmployeeAssignDDL'


export default function UpdateAssignDemonstration({ open, handleCloseClick, PopUpField, handlePost, YearValue }) {
    const dispatch = useDispatch()
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const { popupFlag, assignPopUp, rowData } = PopUpField

    // console.log(rowData)
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

    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_SeasonID : 0,
        Label: popupFlag === "Update" ? rowData?.seasonName : "Select..."
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_CropTypeID : 0,
        Label: popupFlag === "Update" ? rowData?.cropTypeName : "Select..."
    })

    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_CropTypeID : 0,
        Label: popupFlag === "Update" ? rowData?.cropTypeName : "Select..."
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_VillageNameID : 0,
        Label: popupFlag === "Update" ? rowData?.villageName : "Select..."
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.m_TalukaNameID : 0,
        Label: popupFlag === "Update" ? rowData?.talukaName : "Select..."
    })

    const [DistrictOfficerDDL, setDistrictOfficerDDL] = useState({
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
        // ID: popupFlag === "Update" ? rowData?.districtOfficerID : 0,
        // Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
    })

    const [AssignToDDL, setAssignToDDL] = useState({
        DDL: [],
        ID: popupFlag === "Update" ? rowData?.assignOfficerIndicatorID : 0,
        Label: popupFlag === "Update" ? rowData?.assignOfficerIndicatorName : "Select..."
    })
    const [SalesTraineeDDL, setSalesTraineeDDL] = useState({
        ID: popupFlag === "Update" ? rowData?.m_EmployeeID : 0,
        m_UserID: popupFlag === "Update" ? rowData?.tragetAssignToUserID : 0,
        Label: popupFlag === "Update" ? rowData?.districtOfficerName : "Select..."
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
        dispatch(CropTypeDDLAPI({ data }))
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
        dispatch(CropNameDDLAPI({ data,Flag:'Master' }))
    }, [CropTypeDDL.ID])


    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)
    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)
    const { DistrictOfficerDDLData } = useSelector(state => state.DistrictOfficerDDLData)
    const { AssignToData } = useSelector(state => state.AssignToDDL)
    const { SalesTraineeDDLDDLData } = useSelector(state => state.SalesTraineeDDLDDL)
    const { TalukamployeeWiseAssignData } = useSelector(state => state.TalukaEmployeeWiseAssignDDLData)
    const { VillageEmployeeWiseAssignData } = useSelector(state => state.VillageEmployeeWiseAssignDDLData)


    const handleUpdateClick = () => {
        const data = {
            T_Demonstration_AssignID: rowData?.t_Demonstration_AssignID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            AssignToOfficerID: AssignToDDL.ID,
            OrderAssignToUserID: AssignToDDL.ID === 5 ? SalesTraineeDDL.m_UserID : DistrictOfficerDDL.m_UserID,
            M_VillageNameID: VillageDDL.ID ? VillageDDL.ID : '0' ,
            M_TalukaNameID: TalukaDDL.ID ? TalukaDDL.ID :'0',
            M_UserID: UserID,
            DemonstrationAssignCount: AssignQty,
            token: token,
            Flag: 'Update',
            handlePost,
            handleCloseClick
        }
        dispatch(AssignDemoPopUpUpdatePostAPI({ data }))
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
    }

    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            // SeasonDDL: SeasonDDL.ID,
            // MonthDDL: MonthDDL.ID,
            // CropTypeDDL: CropTypeDDL.ID,
            // CropNameDDL: CropNameDDL.ID,
            // Year: Year,
            Flag: 'DemonstrationDefine',
            From: From,
            To: To
        }
        console.log(data)
        dispatch(AssignDemonstrationDefineDataAPI({ data }))
    }, [IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.AssignDemonstrationDefineData)

    useEffect(() => {
        let tempData = tableData && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)
    }, [tableData])

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
            <Popup className='assigns' open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> Update Demonstration Target</div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-3">
                            <SeasonDataDDL
                                SeasonDDL={SeasonDDL}
                                setSeasonDDL={setSeasonDDL}
                                SeasonDDLData={SeasonDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <SeasonWiseMonthDataDDL
                                MonthDDL={MonthDDL}
                                setMonthDDL={setMonthDDL}
                                SeasonWiseMonthData={SeasonWiseMonthData}
                                PopUpField={PopUpField}
                                mandatory={true}

                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <CropTypeDataDDL
                                CropTypeDDL={CropTypeDDL}
                                setCropTypeDDL={setCropTypeDDL}
                                CropTypeDDLData={CropTypeDDLData}
                                PopUpField={PopUpField}
                                mandatory={true}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <AssignToDataDDL
                                AssignToDDL={AssignToDDL}
                                setAssignToDDL={setAssignToDDL}
                                AssignToData={AssignToData}
                                PopUpField={PopUpField}
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
                                                PopUpField={PopUpField}
                                                mandatory={false}
                                                name="Sales Trainee Name"
                                            />
                                        </div>
                                        <div className="col-md-6 col-lg-3">
                                            <DTVWiseEmployeeAssignDDL
                                                DTVWiseEmployeeDDL={TalukaDDL}
                                                setDTVWiseEmployeeDDL={setTalukaDDL}
                                                DTVEmployeeWiseAssignData={TalukamployeeWiseAssignData}
                                                PopUpField={PopUpField}
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
                                                    PopUpField={PopUpField}
                                                    mandatory={true}
                                                    name="Field Assistant Name"
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                                <DTVWiseEmployeeAssignDDL
                                                    DTVWiseEmployeeDDL={VillageDDL}
                                                    setDTVWiseEmployeeDDL={setVillageDDL}
                                                    DTVEmployeeWiseAssignData={VillageEmployeeWiseAssignData}
                                                    PopUpField={PopUpField}
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
                                                    PopUpField={PopUpField}
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
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Taluka Name"

                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-4">
                                                <DistrictOfficerDataDDL
                                                    DistrictOfficerDDL={DistrictOfficerDDL}
                                                    setDistrictOfficerDDL={setDistrictOfficerDDL}
                                                    DistrictOfficerDDLData={DistrictOfficerDDLData}
                                                    PopUpField={PopUpField}
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
                                                    PopUpField={PopUpField}
                                                    mandatory={false}
                                                    name="Village Name"
                                                />
                                            </div>
                                        </>
                        }
                        {/* <div className="col-12 col-lg-2 clear">
                            <button type="button" className="btn btn-clear text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                                onClick={ClearFilter}
                            >
                                Clear
                            </button>

                        </div> */}



                        <div className="table-responsive mt-2">
                            <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "5%" }}>Sr No.</th>

                                        <th style={{ textAlign: "center" }}>Crop Name</th>
                                        <th style={{ textAlign: "center" }}>Total Demonstration Count</th>
                                        <th style={{ textAlign: "center" }}> Assign Demonstration Count </th>
                                        <th style={{ textAlign: "center" }}>Remaining Demonstration Count</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="text-center">1</td>
                                        <td>{rowData.cropName ? rowData.cropName : '-'}</td>
                                        <td>{rowData.demonstrationCount ? rowData.demonstrationCount : '-'}</td>
                                        <td>
                                            <div className="col-8 text-center mx-auto">
                                                <div className="input-box">
                                                    <input
                                                        name='assignedQty'
                                                        type="text"
                                                        className="form-control p-0 px-2"
                                                        placeholder={rowData?.assignCount}
                                                        // value={}
                                                        onChange={(e) => {
                                                            const reg = new RegExp('^[0-9]+$');
                                                            if (reg.test(e.target.value)) {
                                                                if (parseInt(e.target.value) <= parseInt(rowData?.demonstrationCount) && parseInt(e.target.value) >= 0) {
                                                                    // handleQuantityInputChange(e)
                                                                    setAssignBtnValidation(false)
                                                                    setAssignBtnValidation1(false)
                                                                    setAssignQty(e.target.value)
                                                                    // setAssignQty(e.target.value)
                                                                }
                                                                else {
                                                                    // handleDisableCheckbox(e)
                                                                    setAssignQty('0')
                                                                    toastErrorr('Please Enter Valid Quantity')
                                                                    setAssignBtnValidation(true)
                                                                    setAssignBtnValidation1(true)
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                AssignQty == '0' ?
                                                    (rowData?.demonstrationCount) - (rowData?.assignCount)
                                                    :
                                                    (rowData?.demonstrationCount) - AssignQty
                                            }
                                        </td>

                                        {/* <td>{rowData.remainCount ? rowData.remainCount : '-'}</td> */}

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12  clear">
                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light float-end allBtn"
                                // disabled={AssignBtnValidation}
                                disabled={Validation}
                                onClick={() => handleUpdateClick()}
                            >
                                Update
                            </button>

                        </div>

                    </div>
                </div>


            </Popup>
        </>
    )
}


