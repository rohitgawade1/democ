import React from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'

export default function AssignOrderTargetPopUp({ open, handleassignCloseClick, PopUpField,setPopUpField }) {

    const { popupFlag,assignPopUp } = PopUpField

    return (
        <>
            <Popup className='popups' open={open} closeOnDocumentClick={false} onClose={handleassignCloseClick}>
                <span className="close" onClick={handleassignCloseClick}>
                    &times;
                </span>
                <div className="call">Assign Order Target </div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Taluka Name</label>
                                <Select
                                    isClearable
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Sales Trainee Name</label>
                                <Select
                                    isClearable
                                    isSearchable
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-3 clear">
                            <button type="button" className="btn addBtn text-white mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 waves-effect waves-light allBtn"
                            // onClick={() => addButtonClick()}
                            >
                                Submit
                            </button>
                        </div>

                    
                        
                       
                    </div>
                </div>


            </Popup>
          
        </>
    )
}


