import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../../../../Helper/Context';
import { CropNamePostAPI } from '../../../../../Redux/ClientAdminSlice/CropNameSlice';
import { CropTypeDDLAPI, SeasonDDLAPI } from '../../../../../Redux/DDLSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function CropNameAddPopUp({ open, handleAddCloseClick, PopUpField, handlePost,CropTypeDDLData }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

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

    const [CropNameTextField, setCropNameTextField] = useState(
        {
            CropName: apiFlag === "Insert" ? '' : rowData?.cropName,

        }
    )
    const handleInputChange = (e) => {
        setCropNameTextField({ ...CropNameTextField, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
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
        setCropNameTextField({
           
            CropName: ''
        })
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
        const data = { UserID, token }
        dispatch(SeasonDDLAPI({ data }))
    }, [])

    const { SeasonDDLData } = useSelector(state => state.SeasonDDLData)

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

    const handleAddUpdate = () => {
        const data = {
            M_CropID: apiFlag === 'Insert' ? '0' : rowData?.m_CropID,
            M_CropTypeID: CropTypeDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            CropName: CropNameTextField?.CropName,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(CropNamePostAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Crop Name Master</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Crop Type Name <AstricSign/></label>
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
                            <label className="d-block" htmlFor="NameofDepartment">Season <AstricSign/></label>
                            <Select
                                // isClearable
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
                                options={SeasonDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Crop Name <AstricSign/></label>
                            <input
                                type="text"
                                className='form-control'
                                name='CropName'
                                value={CropNameTextField.CropName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled = {
                                    CropTypeDDL.ID == 0 || SeasonDDL.ID ==0 ||
                                    CropNameTextField.CropName == ''
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
