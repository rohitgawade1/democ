
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const UserMasterExport = (props) => {
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
                        <th style={{ textAlign: "center" }}>Role</th>
                        <th style={{ textAlign: "center" }}>Department Name</th>
                        <th style={{ textAlign: "center" }}>Designation Name</th>
                        <th style={{ textAlign: "center" }}>Employee Name</th>
                        <th style={{ textAlign: "center" }}>Table Username</th>
                        <th style={{ textAlign: "center" }}>UserName</th>
                        <th style={{ textAlign: "center" }}>Password</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Joining Date</th>
                        <th style={{ textAlign: "center" }}>Reporting Officer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.m_RoleName ? item.m_RoleName : '-'}</td>
                                <td>{item.departmentName ? item.departmentName : '-'}</td>
                                <td>{item.designationName ? item.designationName : '-'}</td>
                                <td>{item.employeeName ? item.employeeName : '-'}</td>
                                <td>{item.tableUserName ? item.tableUserName : '-'}</td>
                                <td>{item.userName ? item.userName : '-'}</td>
                                <td>{item.password ? item.password : '-'}</td>
                                <td>{item.isActiveStatus ? item.isActiveStatus : '-'}</td>
                                <td>{item.joiningDate ? moment(item.joiningDate).format("DD-MM-YYYY") : "-"}</td>
                                <td>{item.reportingOfficerEmployee}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}