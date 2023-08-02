
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const FarmerMasterExport = (props) => {
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
                        <th>Farmer Code </th>
                        <th>State</th>
                        <th>District </th>
                        <th>Taluka</th>
                        <th>Village Name </th>
                        <th>Farmer Name </th>
                        <th>Mobile No.</th>
                        <th>Farmer land details(Acre)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td>{i + 1}</td>
                                <td>{item.farmerCode ? item.farmerCode : "-"}</td>
                                <td>{item.stateName ? item.stateName : "-"}</td>
                                <td>{item.districtName ? item.districtName : "-"}</td>
                                <td>{item.talukaName ? item.talukaName : "-"}</td>
                                <td>{item.villageName ? item.villageName : "-"}</td>
                                <td>{item.fullName ? item.fullName : "-"}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : "-"}</td>
                                <td>{item.farmerLandDetails ? item.farmerLandDetails : "-"}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}