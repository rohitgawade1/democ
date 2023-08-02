
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const FieldExpensesExport = (props) => {
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
                        <th>District</th>
                        <th>Date</th>
                        <th>Department Name</th>
                        <th>Employee Name</th>
                        {
                            searchName === "Travelling Expenses" && ApiFlag === 'TravellingExpenses' ?
                                <th>Travelling Place</th>
                                : searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                    <th>Lodging  Place</th>
                                    :
                                    <th>Field Day  </th>
                        }
                        <th>Expenses(Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr key={i}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.stateName ? item.stateName : '-'}</td>
                                <td>{item.districtName ? item.districtName : '-'}</td>
                                <td>{item.dailyExpensesDate ? moment(item.dailyExpensesDate).format("DD-MM-YYYY") : '-'}</td>
                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                {
                                    searchName === "Travelling Expenses" && ApiFlag === 'TravellingExpenses' ?
                                        <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                        : searchName === "Lodging Expenses" && ApiFlag === 'LodgingExpenses' ?
                                            <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                            :
                                            <td>{item.travellingPlace ? item.travellingPlace : '-'}</td>
                                }
                                <td>{item.expensesAmt ? item.expensesAmt : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}