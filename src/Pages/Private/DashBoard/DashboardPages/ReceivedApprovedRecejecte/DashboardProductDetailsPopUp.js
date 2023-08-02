import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../../Helper/Context';
import { ApprovalOrderPopUpTableDataAPI } from '../../../../../Redux/StateInChargeSlice/ApprovalOrderSlice';
import { ProductDetailsPopUpTableDataAPI } from '../../../../../Redux/DashboardSlice/OrderApprovalStatusSlice';
import { Loading } from '../../../../../Helper/Loading';

export default function DashboardProductDetailsPopUp({ open, handleCloseClick, ProductDetailsPopUpHeading,PopUpField,Flag }) {
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
            OrderPunchByM_EmployeeID:0,
            token: token,
            ShowBy:'Web',
            From: From,
            To: To,
        }
        dispatch(ProductDetailsPopUpTableDataAPI({ data, Flag: Flag }))

    }, [To, IsPost, From])

    const { tableData, isLoading } = useSelector(state => state.ProductDetailsPopUpTableData)

    return (
        <>
         {isLoading && <Loading />}
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
                                        <th>Quantity</th>
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
                                                <td>{item.packingSize ? item.packingSize : '-'}</td>
                                                <td>{item.unitRate ? item.unitRate : '-'}</td>
                                                <td>{item.orderQuantity ? item.orderQuantity : '-'}</td>
                                                <td>{item.totalAmt ? item.totalAmt : '-'}</td>

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


