import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import { StoreNameDataDDL } from "../../../../Components/CommonDDL/StoreNameDataDDL";
import { StoreNameDDLAPI } from "../../../../Redux/DDLSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "../../../../Helper/Context";
import { ForwardedStockPostAPI } from "../../../../Redux/StockSlice/ForwardedStockSlice";
import { MultipleForwardPopUpPostAPI, MultipleForwordTableDataAPI } from "../../../../Redux/StockSlice/AvailableStockSlice";
import moment from 'moment'

export default function AddMultipleForwardPopUp({ open, handleAddCloseClick, QuantityPopUpHeading, PopUpField, handlePost }) {

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

    const [AssignBtnValidation, setAssignBtnValidation] = useState(true)
    const [AssignBtnValidation1, setAssignBtnValidation1] = useState(false)
    const [gridData, setgridData] = useState([])
    const [AssignQty, setAssignQty] = useState(0)
    const [AssignData, setAssignData] = useState(0)
    const [AssignDataErr, setAssignDataErr] = useState(true)
    const [DDLInfo, setDDLInfo] = useState(false)

    const [IsPost, setIsPost] = useState(false)
    const [Validation, setValidation] = useState(true)
    const [Disabled, setDisabled] = useState(true)

    const [StoreNameDDL, setStoreNameDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(StoreNameDDLAPI({ data, Flag: "AvailableStock" }))
    }, [])

    const { StoreNameData } = useSelector(state => state.StoreNameData)

    // const handlePost = () => {
    //     setIsPost(!IsPost)
    //     handleIsPost()
    //     // ClearAssign()
    //     // handleClearPopUp()
    // }
    // const ClearAssignInput = () => {
    //     gridData.map(function (item) {
    //         delete item.bad;
    //         setgridData(item)
    //         // console.log(item);

    //         // return item;
    //     });
    // }

    useEffect(() => {
        const data = {
            DistributeUniqueNo: 0,
            UserID: UserID,
            token: token,
        }
        dispatch(MultipleForwordTableDataAPI({ data }))
    }, [IsPost])

    const { tableData, isLoading } = useSelector(state => state.MultipleForwordTableData)
   
    useEffect(() => {
        let tempData = tableData && tableData.length > 0 && tableData?.table.map((item) => ({ ...item, ischecked: false, isDisable: true, isAssignQTY: 0 }))
        setgridData(tempData)

    }, [tableData])

    const handleQuantityInputChange = (index, event) => {
        let data = [...gridData];
        if (event.target.value === "") {
            data[index][event.target.name] = 0;
            data[index].isDisable = true
        } else {
            let a = data[index][event.target.name] = parseInt(event.target.value);
            data[index].isAssignQTY = parseInt(event.target.value)

            if (data[index].qtyInHand === 0) {
                data[index].isDisable = (data[index].qtyInHand >= a)
            } else {
                data[index].isDisable = (data[index].qtyInHand >= a)
            }
        }
        setgridData(data)
        setAssignDataErr(false)
        handleQtyInputChange(index, event)
    }

    const handleQtyInputChange = (index, event) => {
        
        let allCheckData = ""
        gridData.forEach((item) => {
            if (item.assignedQty > 0 && item.assignedQty <= item.qtyInHand) {
                allCheckData = allCheckData + item.m_Product_PackDetailsID + "|" + item.batchNo + "|" + moment(item.mfgDate).format("DD-MM-YYYY") +
                    "|" + moment(item.expDate).format("DD-MM-YYYY") + "|" + item.assignedQty + ","

            }
        })
        setAssignData(allCheckData)
        // console.log(allCheckData)
    }

    const handleDisableCheckbox = (index, event) => {
        let data = [...gridData];
        let a = data[index][event.target.name] = parseInt(event.target.value);

        if (data[index].qtyInHand === 0) {
            data[index].isDisable = (data[index].qtyInHand >= a)
        } else {
            if (parseInt(event.target.value) > data[index].qtyInHand) {
                data[index].isDisable = (parseInt(event.target.value) < data[index].qtyInHand)
            } else {
                data[index].isDisable = !(data[index].qtyInHand >= a)
            }
        }
        setgridData(data)
        setAssignDataErr(true)
    }

    const handleOnCheckClick = (item, index, check) => {
        if (gridData) {
            let tempGridData = [...gridData]
            tempGridData[index].ischecked = check
            // console.log(tempGridData)
            setgridData(tempGridData)
        }
    }
    useEffect(() => {
        for (var i in gridData) {
            if (gridData[i].isDisable === false) {
                setAssignDataErr(true)
                break;
            }
        }
    }, [gridData])

    const handelAssignClicked = () => {
        const data = {
            Product_Stock_Distribute_Data: AssignData,
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
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(MultipleForwardPopUpPostAPI({ data }))
    }

    const { isPostLoading } = useSelector(state => state.FieldVisitAssignPostData)

    useEffect(() => {
        if (gridData && gridData.length > 0) {
            let count = 0
            gridData.every((item) => {
                if (item.ischecked) {
                    count = count + 1

                    return false
                }
                return true
            })
            if (count > 0) {
                setAssignBtnValidation(false)
            } else {
                setAssignBtnValidation(true)

            }
        } else {
            setAssignBtnValidation(true)

        }

    }, [gridData])



    return (
        <>
            <Popup
                open={open}
                closeOnDocumentClick={false}
                onClose={handleAddCloseClick}
            >
                <span className="close" onClick={handleAddCloseClick}>
                    &times;
                </span>
                <div className="call"> {QuantityPopUpHeading} </div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-3">
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
                            <div className="col-12 col-md-5 col-lg-3">
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

                            <div className="col-12 col-md-5 col-lg-3">
                                <StoreNameDataDDL
                                    StoreNameDDL={StoreNameDDL}
                                    setStoreNameDDL={setStoreNameDDL}
                                    StoreNameData={StoreNameData}
                                />
                            </div>
                            {/* <div className="col-12 col-md-5 col-lg-3">
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
                            </div> */}
                            <div className="col-12 col-md-5 col-lg-3">
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
                            <div className="col-12 col-md-5 col-lg-3">
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
                            <div className="col-12 col-md-5 col-lg-3">
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
                            <div className="col-12 col-md-5 col-lg-3">
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

                            <div className="table-responsive mt-3" style={{ height: '350px' }}>
                                <table id='orderTargetDecide' cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center", width: "8%" }}>Sr.No</th>
                                            <th style={{ textAlign: "center" }}>Product Name </th>
                                            <th style={{ textAlign: "center" }}>Pack Size</th>
                                            <th style={{ textAlign: "center", width: "20%" }}>Available Quantity</th>
                                            <th style={{ textAlign: "center", width: "25%" }}>Transfer Quantity</th>
                                            <th style={{ textAlign: "center", width: "20%" }}>Batch Code</th>
                                            <th style={{ textAlign: "center", width: "20%" }}>Manufacturing Date</th>
                                            <th style={{ textAlign: "center", width: "20%" }}>Expiry Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            gridData && gridData && gridData.length > 0 ? gridData.map((item, i) => (
                                                <tr key={i} className="text-center">
                                                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                                                    <td>{item.product_Name ? item.product_Name : '-'}</td>
                                                    <td>{item.packingSize ? item.packingSize : '-'}</td>
                                                    <td>{item.qtyInHand ? item.qtyInHand : '-'}</td>
                                                    <td>
                                                        <div className="col-8 text-center mx-auto">
                                                            <div className="input-box">
                                                                <input
                                                                    name='assignedQty'
                                                                    qtyerr='assignedQtyErr'
                                                                    type="text"
                                                                    className="form-control p-0 px-2 text-center"
                                                                    style={{ background: 'whitesmoke', borderColor: '#777777', borderWidth: '0.5px', textAlign: 'center' }}
                                                                    onChange={(e) => {
                                                                        const reg = new RegExp('^[0-9]+$');
                                                                        if (e.target.value === "") {
                                                                            handleQuantityInputChange(i, e)

                                                                        } else {
                                                                            if (reg.test(e.target.value)) {
                                                                                if (parseInt(e.target.value) <= parseInt(item.qtyInHand) && parseInt(e.target.value) >= 0) {
                                                                                    handleQuantityInputChange(i, e)
                                                                                    setAssignBtnValidation(false)
                                                                                    setAssignBtnValidation1(false)
                                                                                    setAssignDataErr(false)
                                                                                    // setAssignQty(e.target.value)
                                                                                }
                                                                                else {

                                                                                    handleDisableCheckbox(i, e)
                                                                                    // toastErrorr('Please Enter Valid Quantity')
                                                                                    setAssignDataErr(true)
                                                                                    setAssignBtnValidation(true)
                                                                                    setAssignBtnValidation1(true)
                                                                                    handleQtyInputChange(i, e)
                                                                                }
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                {/* {!item.isDisable && <text style={{ color: 'red' }}>Please Enter Valid Field Visit Count</text>} */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.batchNo ? item.batchNo : '-'}</td>
                                                    <td>{item.mfgDate ? item.mfgDate : '-'}</td>
                                                    <td>{item.expDate ? item.expDate : '-'}</td>
                                                </tr>
                                            )) : <tr>No data</tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-12 clear">
                                    {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}

                                    <button
                                        type="button"
                                        className="btn btn-clear float-end mt-lg-2 allBtn mx-2"
                                    >
                                        Cancel
                                    </button>
                                    {/* <button
                                        type="button"
                                        className="btn btn-clear float-end mt-lg-2 allBtn mx-2"
                                        // onClick={handleForwardPost}
                                    >
                                        Forward
                                    </button> */}
                                    <button type="button" className="btn  text-white mr-2 mt-4 mt-md-0 mt-lg-2 mx-2 waves-effect waves-light allBtn float-end"
                                        onClick={() => handelAssignClicked()}
                                        style={{ backgroundColor: "#60a53e", color: 'white' }}

                                    >
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}
