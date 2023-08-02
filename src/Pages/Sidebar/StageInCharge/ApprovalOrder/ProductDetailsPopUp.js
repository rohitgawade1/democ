import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context';
import { ApprovalOrderPopUpTableDataAPI } from '../../../../Redux/StateInChargeSlice/ApprovalOrderSlice';

export default function ProductDetailsPopUp({ open, handleCloseClick, ProductDetailsPopUpHeading, PopUpField, Flag }) {
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    // ----------pagination-------------
    const [PerPageCount, setPerPageCount] = useState(10)
    const [TotalCount, setTotalCount] = useState(0)
    const [To, setTo] = useState(10)
    const [From, setFrom] = useState(1)
    const [rowNo, setrowNo] = useState(1)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [IsSearch, setIsSearch] = useState(false)
    const [IsClear, setIsClear] = useState(false)
    const [IsPost, setIsPost] = useState(false)
    const [Remark, setRemark] = useState("")
    const [Date, setDate] = useState('')
    const [YearValue, setYearValue] = useState(0)
    useEffect(() => {
        const data = {
            T_OrderPunch_Wise_DetailID: 0,
            T_OrderPunchID: rowData?.t_OrderPunchID,
            M_StatusID: 0,
            UserID: UserID,
            token: token,
            From: From,
            To: To,
        }

        dispatch(ApprovalOrderPopUpTableDataAPI({ data, Flag: Flag }))

    }, [To, IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.ApprovalOrderPopUpTableData)

    return (
        <>
  
            <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> {ProductDetailsPopUpHeading} </div>
                <div className="modal-body">
                    <div className="row details-row">
                        <div className="table-responsive ">
                            <table cellPadding="0" cellSpacing="0" border="0" className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                                        <th>Product Category</th>
                                        <th>Product Name </th>
                                        <th>Pack Size</th>
                                        <th>Unit Rate (Rs)</th>
                                        <th>Quantity(Nos)</th>
                                        <th>Amount(Rs)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData && tableData.table && tableData.table.length > 0 ? tableData.table.map((item, i) => (
                                            <tr key={i}>
                                                <td align='center'>{item.rowNum}</td>
                                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                                <td align='center'>{item.packingSize ? item.packingSize : '-'}</td>
                                                <td align='center'>{item.unitRate ? item.unitRate.toFixed(2) : '-'}</td>
                                                <td align='center'>{item.orderQuantity ? item.orderQuantity : '-'}</td>
                                                <td align='center'>{item.totalAmt ? item.totalAmt.toFixed(2) : '-'}</td>

                                            </tr>
                                        )) : <tr>No data</tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='col-12'>
                            <h6 className="float-end">Total Amount : {rowData?.orderAmt} </h6>
                        </div>
                    </div>
                </div>


            </Popup>
        </>
    )
}


