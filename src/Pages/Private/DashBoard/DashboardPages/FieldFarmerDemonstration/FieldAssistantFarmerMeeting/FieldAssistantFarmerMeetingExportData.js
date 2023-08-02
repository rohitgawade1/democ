
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const FieldAssistantFarmerMeetingExportData = (props) => {
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
                        <th>District </th>
                        <th>Crop Name</th>
                        <th>Total Farmer Meeting Target</th>
                        {searchName === "Completed" && ApiFlag === 'Completed' ? (
                            <>
                                <th>Completed Farmer Meeting Target</th>
                                <th>Officer Name</th>
                            </>
                        ) : searchName === "Pending" && ApiFlag === 'Pending' ? (
                            <>
                                <th>Completed Farmer Meeting Target</th>
                                <th>Pending Farmer Meeting Target</th>
                                <th>Officer Name</th>
                            </>
                        ) : (
                            <></>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr key={i}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.stateName ? item.stateName : '-'}</td>
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.cropName ? item.cropName : '-'}</td>
                                <td>{item.totalFarmermeetingTarget ? item.totalFarmermeetingTarget : '-'}</td>
                                {searchName === "Completed" && ApiFlag === 'Completed' ?
                                    <>
                                        <td>{item.total ? item.total : '-'}</td>
                                        <td>{item.total ? item.total : '-'}</td>
                                    </>
                                    : searchName === "Pending" && ApiFlag === 'Pending' ?
                                        <>
                                            <td>{item.total ? item.total : '-'}</td>
                                            <td>{item.total ? item.total : '-'}</td>
                                            <td>{item.total ? item.total : '-'}</td>
                                        </>
                                        :
                                        <></>
                                }
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}