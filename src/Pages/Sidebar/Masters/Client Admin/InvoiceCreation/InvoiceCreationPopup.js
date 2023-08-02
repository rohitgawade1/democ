import React, { useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../../Helper/Context';


export default function InvoiceCreationPopup({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails


    const [productWiseRawMaterialTextField, setproductWiseRawMaterialTextField] = useState(
        {
            rawMaterialName: "",
            rawMaterialQuantity:""

        }
    )
    const handleInputChange = (e) => {
        setproductWiseRawMaterialTextField({ ...productWiseRawMaterialTextField, [e.target.name]: e.target.value })
    }

    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Invoice Creation</div>
            <div className="modal-body">

                {/* {isLoading && <Loading />} */}

                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Dealer Name </label>
                            <Select
                                isClearable
                                isSearchable
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Delivery Chalan Date </label>
                            <input
                                className="form-control"
                                id="rawMaterialName"
                                type="date"
                                name="rawMaterialName"
                                // value={productWiseRawMaterialTextField.rawMaterialName}
                                // onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Delivery Chalan No </label>
                            <Select
                                isClearable
                                isSearchable
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Order Date </label>
                            <input
                                className="form-control"
                                id="rawMaterialName"
                                type="date"
                                name="rawMaterialName"
                                // value={productWiseRawMaterialTextField.rawMaterialName}
                                // onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Order No </label>
                            <Select
                                isClearable
                                isSearchable
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Name </label>
                            <Select
                                isClearable
                                isSearchable
                            />
                        </div>
                    </div>
                   
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Quantity</label>
                            <input
                                className="form-control"
                                id="rawMaterialQuantity"
                                type="text"
                                name="rawMaterialName"
                                // value={productWiseRawMaterialTextField.rawMaterialQuantity}
                                // onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Amount</label>
                            <input
                                className="form-control"
                                id="rawMaterialQuantity"
                                type="text"
                                name="rawMaterialName"
                                // value={productWiseRawMaterialTextField.rawMaterialQuantity}
                                // onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Payment Mode </label>
                            <Select
                                isClearable
                                isSearchable
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" for="NameofDepartment">Document</label>
                            <input type="file" className="form-control"
                                name="filename"
                                accept=".png, .jpg, .jpeg"
                                // onChange={(e) => {
                                //     Photo(e)
                                // }}
                            />
                            {/* <span style={{ color: "red", fontSize: "13px" }}>{onGoingImageSizeError}</span> */}
                        </div>
                    </div>


                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                            // onClick={() => Add()}
                            >

                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                            // onClick={() => { popupBtn === 'Clear' ? handleClear() : handleAddCloseClick() }}
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
