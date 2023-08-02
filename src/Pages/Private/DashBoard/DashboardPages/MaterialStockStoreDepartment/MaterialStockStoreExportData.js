
import ReactHTMLTableToExcel from "react-html-table-to-excel"

export const MaterialStockStoreExportData = (props) => {
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
                        <th >Sr.No.</th>
                        <th>Product Category</th>
                        <th>Product  Sub Category</th>
                        <th>Product Name </th>
                        <th>Packing Size</th>
                        <th>Quantity</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{i + 1}</td>
                                <td>{item.categoryName ? item.categoryName : '-'}</td>
                                <td>{item.subCategoryName ? item.subCategoryName : '-'}</td>
                                <td>{item.product_Name ? item.product_Name : '-'}</td>
                                <td>{item.packingSize ? item.packingSize : '-'}</td>
                                <td>{item.qtyInHand ? item.qtyInHand : '-'}</td>
                            </tr>
                        )) : <tr>No data</tr>
                    }
                </tbody>
            </table>
        </div>
    )
}