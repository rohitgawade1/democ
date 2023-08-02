import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { AstricSign } from '../../../../../../Helper/AstricSign';
import { convertAfterImageBase64 } from '../../../../../../Helper/convertAfterImageBase64';
import { ApprovalOrderApprovedRejectAPI } from '../../../../../../Redux/StateInChargeSlice/ApprovalOrderSlice';
import { useAuthState } from '../../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../../../../Helper/Loading';


export default function CreateActionPopUp({ open, handleCloseClick, PopUpField, handlePost, YearValue }) {

    const { popupFlag, popupBtn, apiFlag, rowData, createActionPopUp } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    console.log(rowData?.invoiceDocument)
    const [afterDocument, setafterDocument] = useState(rowData?.invoiceDocument)
    const [InvoiceNumber, setInvoiceNumber] = useState('')
    const [InvoiceDate, setInvoiceDate] = useState('')
    const [Loader, setLoader] = useState(false)

    const Document = async (e) => {
        // console.log(e);
        const file = e.target.files[0]
        console.log(file);
        const base64 = await convertAfterImageBase64(file)
        setafterDocument(base64.split(',')[1])
    }


    // const [CreateActionTextField, setCreateActionTextField] = useState({
    //     InvoiceNumber: rowData?.invoiceNumber,
    //     InvoiceDate: rowData?.invoiceDate,
    //     // InvoiceDocument: rowData?.invoiceDocument,
    //     // InvoiceDocument: apiFlag === " Insert" ? '' : rowData?.invoiceDocument,
    // })

    // const handleInputChange = (e) => {
    //     setCreateActionTextField({ ...CreateActionTextField, [e.target.name]: e.target.value })
    // }

    // console.log(afterDocument)

    const handleAddCloseClick = () => {
        setLoader(false)
        handleCloseClick()
    }

    const handleInsertUpdate = () => {
        setLoader(true)
        const data = {
            T_OrderPunchID: PopUpField.rowData?.t_OrderPunchID,
            M_FinancialYearID: YearValue,
            M_MonthID: rowData?.m_MonthID,
            Remark: '',
            InvoiceNumber: InvoiceNumber,
            InvoiceDate: InvoiceDate,
            InvoiceDocument: afterDocument,
            InvoiceDocumentType: '.pdf',
            M_UserID: UserID,
            token: token,
            Flag: "Invoice",
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ApprovalOrderApprovedRejectAPI({ data }))
        // console.log(data)
    }
    const { isLoading } = useSelector(state => state.ApprovalOrderApprovedReject)
    return (
        <>
            {/* {isLoading && <Loading />} */}
            <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call">Create Action</div>
                <div className="modal-body">
                    {Loader && <Loading />}
                    <div className="row details-row">
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Invoice Date </label>
                                <input
                                    type="Date"
                                    className='form-control'
                                    name='InvoiceDate'
                                    value={InvoiceDate}
                                    // onChange={(e) => handleInputChange(e)}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Invoice No. </label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='InvoiceNumber'
                                    // value={CreateActionTextField.InvoiceNumber}
                                    // onChange={(e) => handleInputChange(e)}
                                    value={InvoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" for="NameofDepartment">Invoice Document<AstricSign /></label>
                                <input type="file" className="form-control"
                                    name="filename"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        Document(e)
                                    }}
                                />
                                {/* <span style={{ color: "red", fontSize: "13px" }}>{onGoingImageSizeError}</span> */}
                            </div>
                        </div>

                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    onClick={handleInsertUpdate}
                                    disabled={isLoading || Loader}
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    Create
                                </button>

                                <button
                                    type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                // onClick={() => handleClear()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}
