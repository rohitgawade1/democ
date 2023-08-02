
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const InvoiceCreationExportExcel = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-FarmerMasterExport"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-FarmerMasterExport" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>

                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                        <th>Invoice No / Invoice Date</th>
                        <th>Order No. / Order Date </th>
                        <th>District </th>
                        <th>Dealer Name </th>
                        {/* <th>Product Name</th> */}
                        <th>Order Amount (Rs)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr key={i}>
                                <td align='center'>{item.rowNum}</td>
                                <td>
                                    {item.invoiceNumber ? item.invoiceNumber : '-'}
                                    < hr style={{ color: "#172b4d" }} />
                                    {item.invoiceDate ? moment(item.invoiceDate).format("DD-MM-YYYY") : '-'}
                                </td>
                                <td>
                                    {item.orderNumber ? item.orderNumber : '-'}
                                    < hr style={{ color: "#172b4d" }} />
                                    {item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}
                                </td>
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                {/* <td>
                                <span style={{ cursor: "pointer" }}
                                    onClick={() => productDetailsPopUpClick(item)}
                                >
                                    <u> Name </u>
                                </span>
                            </td> */}
                                <td>{item.orderAmt ? item.orderAmt : '-'}</td>
                                <td>
                                    {item.statusName ? item.statusName : '-'}</td>

                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}