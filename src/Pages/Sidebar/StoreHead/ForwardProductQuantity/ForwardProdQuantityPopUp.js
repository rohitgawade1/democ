import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import { StoreNameDataDDL } from "../../../../Components/CommonDDL/StoreNameDataDDL";
import { StoreNameDDLAPI } from "../../../../Redux/DDLSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "../../../../Helper/Context";
import { ForwardedStockPostAPI } from "../../../../Redux/StockSlice/ForwardedStockSlice";

export default function ForwardProdQuantityPopUp({ open, handleCloseClick, QuantityPopUpHeading, PopUpField, handlePost }) {
    
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [dC_No, setdC_No] = useState('')
    const [dC_Date, setdC_Date] = useState('')
    const [Qty, setQty] = useState('')
    const [DispatchedT, setDispatchedT] = useState('')
    const [VehicleNo, setVehicleNo] = useState('')
    const [LorryReceiptNo, setLorryReceiptNo] = useState('')
    const [Freight, setFreight] = useState('')

    const [StoreNameDDL, setStoreNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })
    console.log('PopUpField', PopUpField)
    useEffect(() => {
        const data = { UserID, token }
        dispatch(StoreNameDDLAPI({ data, Flag: "ForwardStock" }))
    }, [])

    const { StoreNameData } = useSelector(state => state.StoreNameData)

    const handleForwardPost = () => {

        const data = {
            M_Product_PackDetailsID: PopUpField.rowData?.m_Product_PackDetailsID,
            BatchNo: PopUpField.rowData?.batchNo,
            MfgDate: PopUpField.rowData?.mfgDate,
            ExpDate: PopUpField.rowData?.expDate,
            Qty: Qty,
            DC_No: dC_No,
            DC_Date: dC_Date,
            FromDistributeM_UserID: UserID,
            ToDistributeM_UserID: StoreNameDDL.ID,
            DispatchedThrough: DispatchedT,
            VehicleNo: VehicleNo,
            LorryReceiptNo: LorryReceiptNo,
            FreightToPayPaid: Freight,
            M_UserID: UserID,
            token: token,
            handlePost: handlePost,
            handleCloseClick: handleCloseClick
        }
        dispatch(ForwardedStockPostAPI({ data }))
    }
    return (
        <>
            <Popup
                open={open}
                closeOnDocumentClick={false}
                onClose={handleCloseClick}
            >
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> {QuantityPopUpHeading} </div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        DC No.{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={dC_No}
                                        onChange={(e) => setdC_No(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        DC Date{" "}
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="joiningDate"
                                        value={dC_Date}
                                        onChange={(e) => setdC_Date(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-5 col-lg-6">
                                <StoreNameDataDDL
                                    StoreNameDDL={StoreNameDDL}
                                    setStoreNameDDL={setStoreNameDDL}
                                    StoreNameData={StoreNameData}
                                />
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        Quantity
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={Qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        Vehicle Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={DispatchedT}
                                        onChange={(e) => setDispatchedT(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        Vehicle No.
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={VehicleNo}
                                        onChange={(e) => setVehicleNo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        Lorry Receipt No.
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={LorryReceiptNo}
                                        onChange={(e) => setLorryReceiptNo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-5 col-lg-6">
                                <div className="form-group">
                                    <label className="d-block" htmlFor="NameofDepartment">
                                        Freight to Pay / Paid
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="joiningDate"
                                        value={Freight}
                                        onChange={(e) => setFreight(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-lg-6 clear">
                                    {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                                    <button
                                        type="button"
                                        className="btn btn-clear float-start mt-lg-2 allBtn mx-2"
                                        onClick={handleForwardPost}
                                    >
                                        Forward
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-clear float-start mt-lg-2 allBtn mx-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="col-6 col-lg-1 clear">
                                {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}
