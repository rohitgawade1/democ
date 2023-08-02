import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../../../Helper/Loading';
import { VenderPostAPI } from '../../../../../Redux/ClientAdminSlice/VenderSlice';
import { DistrictNameDDLAPI, StateNameDDLAPI, TalukaNameDDLAPI, VillageDDLAPI } from '../../../../../Redux/DDLSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';
import { RegExMobile, RegExOnlyText } from '../../../../../Helper/regEx/RegExOnlyText';
import { VillageDataDDL } from '../../../../../Components/CommonDDL/VillageDataDDL';

export default function VenderAddPopUp({ open, handleCloseClick, PopUpField, handlePost, YearValue }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [IsClear, setIsClear] = useState(false)
    const [StateDDL, setStateDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_StateNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
    })
    const [DistrictDDL, setDistrictDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_DistrictNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
    })

    const [TalukaDDL, setTalukaDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_TalukaNameID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
    })

    const [VillageDDL, setVillageDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })


    const dispatch = useDispatch()

    const { tableData, isLoading } = useSelector(state => state.DepartmentPostData)

    const [venderTextField, setvenderTextField] = useState(
        {
            vendorName: apiFlag === "Insert" ? "" : rowData?.vendorName,
            venderAddress: apiFlag === "Insert" ? "" : rowData?.address,
            mobileNumber: apiFlag === "Insert" ? "" : rowData?.mobileNumber
        }
    )

    const handleInputChange = (e) => {
        setvenderTextField({ ...venderTextField, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
        setIsClear(!IsClear)
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

        setvenderTextField({
            vendorName: '',
            venderAddress: '',
            mobileNumber: ''
        })
    }

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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_StateNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.stateName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_DistrictNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.districtName,
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
                ID: apiFlag === "Insert" ? 0 : rowData?.m_TalukaNameID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.talukaName,
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

    useEffect(() => {
        const data = { UserID, token, StateDDL, TalukaDDL, DistrictDDL }
        dispatch(VillageDDLAPI({ data }))
    }, [StateDDL.ID, TalukaDDL.ID, DistrictDDL.ID])
    const { VillageData } = useSelector(state => state.VillageDDLData)

    const Add = () => {
        const addData = {
            M_VendorID: apiFlag === 'Insert' ? '0' : rowData?.m_VendorID,
            M_FinancialYearID: YearValue,
            M_StateNameID: StateDDL.ID,
            M_DistrictNameID: DistrictDDL.ID,
            M_TalukaNameID: TalukaDDL.ID,
            VendorName: venderTextField?.vendorName,
            Address: venderTextField?.venderAddress,
            MobileNumber: venderTextField?.mobileNumber,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleCloseClick,
            handleClear:handleClear
        }
        dispatch(VenderPostAPI({ addData }))
    }
    const [IsValidText, setIsValidText] = useState(false)
    const handleCheckText = (e) => {
        handleInputChange(e)
        const IsValid = RegExOnlyText(e.target.value)
        setIsValidText(IsValid)
        return IsValid
    }

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckMobileNo = (e) => {
        handleInputChange(e)
        const IsValid = RegExMobile(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
            <span className="close" onClick={handleCloseClick}>
                &times;
            </span>
            <div className="call">Vender Master</div>
            <div className="modal-body">
                {isLoading && <Loading />}
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">State <AstricSign /></label>
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">District <AstricSign /></label>
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
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Taluka <AstricSign /></label>
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
                    <div className="col-md-6 col-lg-6">
                        <VillageDataDDL
                            VillageDDL={VillageDDL}
                            setVillageDDL={setVillageDDL}
                            VillageData={VillageData}
                            mandatory={true}
                        />
                    </div>

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Vender Name <AstricSign /></label>
                            <input
                                className="form-control"
                                id="vendorName"
                                type="text"
                                name="vendorName"
                                value={venderTextField.vendorName}
                                onChange={(e) => handleCheckText(e)}
                            />
                            {
                                IsValidText && <text style={{ color: 'red' }}>Please enter Alphabets characters only</text>
                            }
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Mobile Number</label>
                            <input
                                className="form-control"
                                id="venderName"
                                type="text"
                                name="mobileNumber"
                                value={venderTextField.mobileNumber}
                                onChange={(e) => handleCheckMobileNo(e)}
                            />
                            {
                                IsValidNumbers && <text style={{ color: 'red' }}>Please enter Valid Mobile Number</text>
                            }
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Vender Address</label>
                            <input
                                className="form-control"
                                id="venderName"
                                type="text"
                                name="venderAddress"
                                value={venderTextField.venderAddress}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => Add()}
                                disabled={
                                    StateDDL.ID == 0 || DistrictDDL.ID == 0 || TalukaDDL.ID.ID ||
                                    venderTextField.vendorName == ''
                                    // venderTextField.mobileNumber == '' ||
                                    // venderTextField.venderAddress == ''
                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                onClick={() => { popupBtn === 'Clear' ? handleClear() : handleCloseClick() }}
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
