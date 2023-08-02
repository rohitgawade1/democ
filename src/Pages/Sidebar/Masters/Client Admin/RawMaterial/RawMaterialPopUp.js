import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch } from 'react-redux';
import { RawMaterialPostAPI } from '../../../../../Redux/ClientAdminSlice/RawMaterialSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function RawMaterialPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [IsClear, setIsClear] = useState(false)
    const [rawMaterialTextField, setrawMaterialTextField] = useState(
        {
            rawMaterialName: apiFlag === "Insert" ? '' : rowData?.rawMaterialName,

        }
    )
    const handleInputChange = (e) => {
        setrawMaterialTextField({ ...rawMaterialTextField, [e.target.name]: e.target.value })
    }
    const handleClear = () => {
        setIsClear(!IsClear)
        setrawMaterialTextField({
            rawMaterialName: "",

        })
    }

    const handleAddUpdate = () => {
        const data = {
            M_RawMaterialID: apiFlag === 'Insert' ? '0' : rowData?.m_RawMaterialID,
            RawMaterialName: rawMaterialTextField?.rawMaterialName,
            M_RawMaterial_CategoryID: '0',
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(RawMaterialPostAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Raw Material</div>
            <div className="modal-body">

                {/* {isLoading && <Loading />} */}

                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Raw Material Name <AstricSign /></label>
                            <input
                                className="form-control"
                                id="rawMaterialName"
                                type="text"
                                name="rawMaterialName"
                                value={rawMaterialTextField.rawMaterialName}
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
                                disabled={rawMaterialTextField.rawMaterialName == ''}
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
