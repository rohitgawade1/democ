
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const PaymentCollectionTargetExportData = (props) => {
    const { ExcelData, name, searchName, ApiFlag } = props
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
                    <tr>
                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                        <th>State</th>
                        <th>Season</th>
                        {
                            searchName === "Regional Manager" && ApiFlag === 'RegionalManager' || searchName === "District Officer" && ApiFlag === 'DisctrictOfficer' ?
                                <th>District</th>
                                :
                                ''
                        }

                        <th>Crop Name</th>
                        <th>Product name</th>
                        <th>Packing Size</th>
                        <th>Financial Target(Lacs)</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr key={i}>
                            <td align='center'>{item.rowNum}</td>
                            <td>{item.stateName ? item.stateName : '-'}</td>
                            <td>{item.seasonName ? item.seasonName : '-'}</td>
                            {
                                  searchName === "Regional Manager" && ApiFlag === 'RegionalManager' || searchName === "District Officer" && ApiFlag === 'DisctrictOfficer'?
                                    <td>{item.districtName ? item.districtName : '-'}</td>
                                    :
                                    ''
                            }
                           
                            <td>{item.cropName ? item.cropName : '-'}</td>
                            <td>{item.product_Name ? item.product_Name : '-'}</td>
                            <td>{item.packingSize ? item.packingSize : '-'}</td>
                            <td>{item.totalQuantity ? item.totalQuantity : '-'}</td>
                        </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}