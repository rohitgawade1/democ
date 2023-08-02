
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const VendorMasterExport = (props) => {
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
                        <th>Vendor Code </th>
                        <th>State </th>
                        <th>District</th>
                        <th>Taluka</th>
                        {/* <th>Village Name</th> */}
                        <th>Vendor Name </th>
                        <th>Mobile Number</th>
                        <th>Vendor Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td>{item.rowNum ? item.rowNum : "-"}</td>
                                <td>{item.vendorCode ? item.vendorCode : "-"}</td>
                                <td>{item.stateName ? item.stateName : "-"}</td>
                                <td>{item.districtName ? item.districtName : "-"}</td>
                                <td>{item.talukaName ? item.talukaName : "-"}</td>
                                {/* <td>{item.village ? item.village : "-"}</td> */}
                                <td>{item.vendorName ? item.vendorName : "-"}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : "-"}</td>
                                <td>{item.address ? item.address : "-"}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}