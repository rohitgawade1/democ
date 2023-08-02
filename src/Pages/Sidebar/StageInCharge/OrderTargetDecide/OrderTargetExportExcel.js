
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const OrderTargetExportExcel = (props) => {
    const { ExcelData, name } = props
    return (
        <div style={{ display: 'inline', marginLeft: '0px' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table="table-to-xls474"
                className="download-table-xls-button float-end btn btn-export btn-md pt-1 pb-1 pl-3 pr-3 mx-3"
                filename={name}
                sheet={name}
                buttonText="Export"
                style={{ borderColor: 'black' }}
            />


            <table id="table-to-xls474" style={{ display: 'none', width: '100%' }}>

                <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>

                        <th style={{ textAlign: "center" }}>Sr.No.</th>
                        <th style={{ textAlign: "center" }}>Season</th>
                        <th style={{ textAlign: "center" }}>Month</th>
                        <th style={{ textAlign: "center" }}>Crop Type</th>
                        <th style={{ textAlign: "center" }}>Crop Name</th>
                        <th style={{ textAlign: "center" }}>Product Category</th>
                        <th style={{ textAlign: "center" }}>Product Sub Category</th>
                        <th style={{ textAlign: "center" }}>Product Name</th>
                        <th style={{ textAlign: "center" }}>Pack Size</th>
                        <th style={{ textAlign: "center" }}>Quantity (Physical target)</th>
                        <th style={{ textAlign: "center" }}>Calculated Financial Target (Lac)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td>{i + 1}</td>
                                <td>{item?.seasonName}</td>
                                <td>{item?.m_MonthID}</td>
                                <td>{item?.cropTypeName}</td>
                                <td>{item?.cropName}</td>
                                <td>{item?.categoryName}</td>
                                <td>{item?.subCategoryName}</td>
                                <td>{item?.product_Name}</td>
                                <td>{item?.packingSize}</td>
                                {/* <td>{item?.m_UnitID} {item?.unitName}</td> */}
                                <td>{item?.totalQuantity}</td>
                                <td>{item?.total_Amt} </td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}