

import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const ExportDemonstration = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-ExportDemonstration"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-ExportDemonstration" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>

                        <th>Sr.No.</th>
                        <th>Season</th>
                        <th>Month</th>
                        <th>Crop Type</th>
                        <th>Crop Name</th>
                        <th>Farmer Meeting Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                <td>{item.month_Name ? item.month_Name : '-'}</td>
                                <td>{item.cropTypeName ? item.cropTypeName : '-'}</td>
                                <td>{item.cropName ? item.cropName : '-'}</td>
                                <td>{item.demonstrationCount ? item.demonstrationCount : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}