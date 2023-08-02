import React, { useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { FinanacialTargetUpdateAPI } from '../../../../Redux/StateInChargeSlice/FinancialTargetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../../../Helper/Loading'
import { RegExNumbersOnly } from '../../../../Helper/regEx/RegExOnlyText'
import { toastErrorr, toastSuccesss } from '../../../../Helper/ToastMessage'

export default function PaymentCollectionTargetPopUp({ open, handleCloseClick, PopUpField, UserID, token, handlePost }) {

    const { popupFlag, rowData, apiFlag } = PopUpField

    const dispatch = useDispatch()
    const [FinancialText, setFinancialText] = useState( apiFlag === "Insert" ? '' : rowData?.totalFinancialTargetAmt.toFixed(2),)
    const[FinincialTextError, setFinincialTextError] = useState('')
    const handleInputChange = (e) => {
        setFinancialText({ ...FinancialText, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
        const data = {
            T_PaymentTarget_DefineID: rowData?.t_PaymentTarget_DefineID,
            M_FinancialYearID: rowData?.m_FinancialYearID,
            M_MonthID: rowData?.m_MonthID,
            FinancialTargetAmt: FinancialText,
            M_UserID: UserID,
            Flag: popupFlag,
            token: token,
            handlePost: handlePost,
            handleCloseClick: handleCloseClick,         
        }
        dispatch(FinanacialTargetUpdateAPI({ data }))
    }

    const { isLoading } = useSelector(state => state.FinanacialTargetUpdateData)

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckNumbersOnly = (e) => {
        handleInputChange(e)
        const IsValid = RegExNumbersOnly(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    return (
        <>
            {isLoading && <Loading />}
            <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> Financial Target</div>
                <div className="modal-body">
                    <div className="row details-row">

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Financial Target(Rs)</label>
                                <input
                                    className="form-control"
                                    id="FinancialTargetAmt"
                                    type="text"
                                    name="FinancialTargetAmt"
                                    placeholder={FinancialText}
                                    // value={FinancialText}
                                    // onChange={(e) => setFinancialText(e.target.value)}
                                    // value={FinancialText.FinancialTargetAmt}
                                    // onChange={(e) => handleCheckNumbersOnly(e)}
                                    onChange={
                                        (e) => {
                                            console.log(e.target.value < rowData?.totalFinancialTargetAmt.toFixed(2))
                                            if(e.target.value < rowData?.totalFinancialTargetAmt.toFixed(2)){
                                            //    toastSuccesss("Please Enter")
                                               setFinancialText(e.target.value)
                                               setFinincialTextError('')
                                                // handleCheckNumbersOnly(e)
                                            } else{
                                                // toastErrorr('Please Enter Valid Quantity')
                                                setFinincialTextError('Please Enter Valid Quantity')
                                            }
                                           
                                        }
                                    }
                                />
                                {
                                    IsValidNumbers && <text style={{ color: 'red' }}>Please enter Number Only</text>
                                }
                                {
                                  FinincialTextError != '' && <text style={{ color: 'red' }}>{FinincialTextError}</text>  
                                }
                            </div>
                        </div>

                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    disabled={FinincialTextError}
                                    onClick={handleUpdate}
                                >
                                    <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                    {popupFlag}
                                </button>

                                <button
                                    type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
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


