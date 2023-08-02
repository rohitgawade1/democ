
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const NoOfDealerExportData = (props) => {
    const { ExcelData, name, RoleID } = props
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
                        <th >Sr.No.</th>
                        {
                            RoleID == 7 || RoleID == 8 ?
                                <></>
                                :
                                <th>State</th>
                        }
                        <th>District</th>
                        <th>Taluka</th>
                        <th>Dealer Name</th>
                        <th>Dealer Address</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                {
                                    RoleID == 7 || RoleID == 8 ?
                                        <></>
                                        :
                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                }
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.talukaName ? item.talukaName : '-'}</td>
                                <td>{item.dealerName ? item.dealerName : '-'}</td>
                                <td>{item.dealerAddress ? item.dealerAddress : '-'}</td>
                                <td>{item.mobileNumber ? item.mobileNumber : '-'}</td>
                                <td>{item.emailID ? item.emailID : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}