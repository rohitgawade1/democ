
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const ArchievedOrderExportData = (props) => {
    const { ExcelData, name, searchName, ApiFlag,RoleID } = props
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
                        <th>Sr.No.</th>
                        {
                            RoleID == 7 || RoleID == 8 ?
                                <></>
                                :
                                <th>State</th>
                        }
                        <th>Season</th>
                        {
                            searchName === "Regional Manager (Nos)" && ApiFlag === 'RegionalManager' || searchName === "District Officer (Nos)" && ApiFlag === 'DisctrictOfficer' || searchName === "Sales Trainee (Nos)" && ApiFlag === 'SalesTrainee' ?
                                <th>District</th>
                                :
                                ''
                        }
                        {
                            searchName === "Sales Trainee (Nos)" && ApiFlag === 'SalesTrainee' ?
                                <th>Taluka</th>
                                :
                                ''
                        }

                        <th> Crop Name</th>
                        <th>Product Name</th>
                        <th>Pack Size</th>
                        <th>Target Quantity (Nos)</th>
                        <th>Achieved Quantity (Nos)</th>
                        <th>Officer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr key={i}>
                                <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                {
                                    RoleID == 7 || RoleID == 8 ?
                                        <></>
                                        :
                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                }
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                {
                                    searchName === "Regional Manager (Nos)" && ApiFlag === 'RegionalManager' || searchName === "District Officer (Nos)" && ApiFlag === 'DisctrictOfficer' || searchName === "Sales Trainee (Nos)" && ApiFlag === 'SalesTrainee' ?
                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                        :
                                        ''
                                }
                                {
                                    searchName === "Sales Trainee (Nos)" && ApiFlag === 'SalesTrainee' ?
                                        <td>
                                            {item.talukaName ? item.talukaName : '-'}  </td>
                                        :
                                        ''

                                }
                                <td>{item.cropName ? item.cropName : '-'}</td>
                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                <td>{item.packingSize ? item.packingSize : '-'}</td>
                                <td>{item.totalQuantity ? item.totalQuantity : '-'}</td>
                                <td>{item.achiveQty ? item.achiveQty : '-'}</td>
                                <td>{item.officerName ? item.officerName : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}