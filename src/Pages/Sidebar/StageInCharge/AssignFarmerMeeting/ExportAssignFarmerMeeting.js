

import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const ExportAssignFarmerMeeting = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-ExportAssignFarmerMeeting"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-ExportAssignFarmerMeeting" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>

                        <th>Sr.No.</th>
                        <th style={{ textAlign: "center" }}>Season </th>
                        <th style={{ textAlign: "center" }}>Month </th>
                        <th style={{ textAlign: "center" }}>Crop Type </th>
                        <th style={{ textAlign: "center" }}>Crop Name </th>
                        <th style={{ textAlign: "center" }}>Field Assistant Name</th>
                        <th style={{ textAlign: "center" }}>Village Name</th>
                        <th style={{ textAlign: "center" }}>Total Farmer Meeting Count</th>
                        <th style={{ textAlign: "center" }}>Assign Farmer Meeting Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item?.seasonName}</td>
                                <td>{item?.month_Name}</td>
                                <td>{item?.cropTypeName}</td>
                                <td>{item?.cropName}</td>
                                <td>{item?.tragetAssignToUser}</td>
                                <td>{item?.villageName}</td>
                                <td>{item?.remainMeetingCount}</td>
                                <td>{item?.assignMeetingCount}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}