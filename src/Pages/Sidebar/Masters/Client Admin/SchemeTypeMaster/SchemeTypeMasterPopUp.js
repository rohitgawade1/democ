import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch } from 'react-redux';
import { SchemeTypePostAPI } from '../../../../../Redux/ClientAdminSlice/SchemeTypeMasterSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function SchemeTypeMasterPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [IsClear, setIsClear] = useState(false)
    const [SchemeTypeTextField, setSchemeTypeTextField] = useState(
        {
            schemeType: apiFlag === 'Insert' ? '' : rowData?.schemeType,

        }
    )
    const handleInputChange = (e) => {
        setSchemeTypeTextField({ ...SchemeTypeTextField, [e.target.name]: e.target.value })
    }
    const handleClear = () => {
        setIsClear(!IsClear)
        setSchemeTypeTextField({
            schemeType:''
        })
    }


    const handleAddUpdate = () => {
        const data = {
            M_SchemeTypeID: apiFlag === 'Insert' ? '0' : rowData?.m_SchemeTypeID,
            SchemeType: SchemeTypeTextField?.schemeType,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(SchemeTypePostAPI({ data }))
    }


    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Scheme Type Master </div>
            <div className="modal-body">

                {/* {isLoading && <Loading />} */}

                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Scheme Type <AstricSign/></label>
                            <input
                                className="form-control"
                                id="schemeType"
                                type="text"
                                name="schemeType"
                                value={SchemeTypeTextField.schemeType}
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
                                SchemeTypeTextField.schemeType == ''
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
