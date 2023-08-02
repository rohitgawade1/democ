
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const ApprovalOrderExportExcel = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls474"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-xls474" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr>
                        <th style={{ textAlign: "center", width: "5%" }}>Sr.No.</th>
                        <th>Order Received Date</th>
                        <th>District</th>
                        <th>Dealer Name</th>
                        {/* <th>Product Details</th> */}
                        <th>Order Amount (Rs)</th>
                        <th>Employee Name</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                {/* <td>
                                    <span style={{ cursor: "pointer" }}
                                        onClick={() => productDetailsPopUpClick(item)}
                                    >
                                        <u> PopUp </u>
                                    </span>
                                </td> */}
                                <td>{item.orderAmt ? item.orderAmt : '-'}</td>
                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}