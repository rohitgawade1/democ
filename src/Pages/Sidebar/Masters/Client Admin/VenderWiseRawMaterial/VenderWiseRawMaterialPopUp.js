import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../../Helper/Context';
import { RawMaterialDataDDL } from '../../../../../Components/CommonDDL/RawMaterialDataDDL';
import { RawMaterialNameDDLAPI, VendorNameDDLAPI } from '../../../../../Redux/DDLSlice';
import { useDispatch, useSelector } from 'react-redux';
import { VendorNameDDLData } from '../../../../../Components/CommonDDL/VendorNameDDLData';
import { VenderRawPostAPI } from '../../../../../Redux/ClientAdminSlice/VenderWiseRawMaterialSlice';

export default function VenderWiseRawMaterialPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [IsClear, setIsClear] = useState(false)
    const [VendorNameDDL, setVendorNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_VendorID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.vendorName,
    })
    const [RawMaterialNameDDL, setRawMaterialNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_RawMaterialID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.rawMaterialName,
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(VendorNameDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { VendorNameData } = useSelector(state => state.VendorNameDDLData)

    useEffect(() => {
        const data = { UserID, token }
        dispatch(RawMaterialNameDDLAPI({ data }))
    }, [])

    const { RawMaterialNameData } = useSelector(state => state.RawMaterialNameDDLData)

    const handleClear = () => {
        setIsClear(!IsClear)
        setVendorNameDDL({
            ...VendorNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setRawMaterialNameDDL({
            ...RawMaterialNameDDL,
            ID: 0,
            Label: "Select...",
        })
    }


    const handleAddUpdate = () => {
        const addData = {
            M_VendorWise_RawMaterialID: apiFlag === 'Insert' ? '0' : rowData?.m_VendorWise_RawMaterialID,
            M_VendorID:VendorNameDDL.ID,
            M_RawMaterialID:RawMaterialNameDDL.ID,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(VenderRawPostAPI({ addData }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Vendor Wise Raw Material</div>
            <div className="modal-body">

                {/* {isLoading && <Loading />} */}

                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <VendorNameDDLData
                            VendorNameDDL={VendorNameDDL}
                            setVendorNameDDL={setVendorNameDDL}
                            VendorNameData={VendorNameData}
                            PopUpField={PopUpField}
                            mandatory={true}
                        />
                    </div>
                    <div className="col-md-6 col-lg-6">

                        <RawMaterialDataDDL
                            RawMaterialNameDDL={RawMaterialNameDDL}
                            setRawMaterialNameDDL={setRawMaterialNameDDL}
                            RawMaterialNameData={RawMaterialNameData}
                            PopUpField={PopUpField}
                            mandatory={true}
                        />

                    </div>


                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                            onClick={() => handleAddUpdate()}
                            disabled = {
                                RawMaterialNameDDL.ID == 0 || RawMaterialNameDDL.ID == 0
                            }
                            >

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
