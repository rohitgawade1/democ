


import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const ExportPaymentCollectTarget = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls474ExportAssignOrder12"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-xls474ExportAssignOrder12" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>

                        <th style={{ textAlign: "center", width: "5%" }}>Sr.No.</th>
                        <th style={{ textAlign: "center" }}>Season</th>
                        <th style={{ textAlign: "center" }}>Month</th>
                        <th style={{ textAlign: "center" }}>District</th>
                        <th style={{ textAlign: "center" }}>District Officer</th>
                        <th style={{ textAlign: "center" }}>Product Name</th>
                        {/* <th style={{ textAlign: "center" }}>Total Amount </th> */}
                        <th style={{ textAlign: "center" }}>Remaining Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td>{item?.rowNum}</td>
                                <td>{item?.seasonName}</td>
                                <td>{item?.month_Name}</td>
                                <td>{item?.districtName}</td>
                                <td>{item?.districtOfficerName}</td>
                                <td>{item?.product_Name}</td>
                                <td>{item?.remainFinancialTargetAmt}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}