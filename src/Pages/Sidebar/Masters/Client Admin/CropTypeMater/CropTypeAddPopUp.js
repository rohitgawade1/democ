import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch } from 'react-redux';
import { CropTypePostAPI } from '../../../../../Redux/ClientAdminSlice/CropTypeSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function CropTypeAddPopUp({ open, handleAddCloseClick, PopUpField,handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [CropTypeTextField, setCropTypeTextField] = useState({
           
            cropTypeName:apiFlag === "Insert" ? '' : rowData?.cropTypeName,
        })

    const handleInputChange = (e) => {
        setCropTypeTextField({ ...CropTypeTextField, [e.target.name]: e.target.value })
    }

    const handleAddUpdate = () => {
        const addData = {
            M_CropTypeID: apiFlag === 'Insert' ? '0' : rowData?.m_CropTypeID,
            CropTypeName: CropTypeTextField?.cropTypeName,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(CropTypePostAPI({addData}))
    }

    const handleClear = () => {
        setCropTypeTextField({
           
            cropTypeName: ''
        })
    }
    // const {} = useSelector(state=>state.)



    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Crop Type Master</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Crop Type Name <AstricSign/></label>
                            <input
                                 className="form-control"
                                 id="cropTypeName"
                                 type="text"
                                 name="cropTypeName"
                                 value={CropTypeTextField.cropTypeName}
                                 onChange={(e)=>handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled ={
                                    CropTypeTextField.cropTypeName ==''
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
