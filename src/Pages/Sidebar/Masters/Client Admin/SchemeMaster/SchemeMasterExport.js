
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const SchemeMasterExport = (props) => {
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

                        <th>Sr.No.</th>
                        <th>Scheme Type</th>
                        <th>Scheme Name</th>
                        <th>Product Category</th>
                        <th>Scheme From Date</th>
                        <th>Scheme To Date</th>
                        <th>Scheme Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td >{item.rowNum}</td>
                                <td>{item.schemeType ? item.schemeType : '-'}</td>
                                <td>{item.schemeName ? item.schemeName : '-'}</td>
                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                <td>{item.schemeDurationFromDate ? moment(item.schemeDurationFromDate).format("DD-MM-YYYY") : "-"}</td>
                                <td>{item.schemeDurationToDate ? moment(item.schemeDurationToDate).format("DD-MM-YYYY") : "-"}</td>
                                <td>{item.schemeDetails ? item.schemeDetails : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}