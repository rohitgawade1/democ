
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";

export const ApprovedReceivedExportData = (props) => {
    const { ExcelData, name, searchName, ApiFlag, RoleID } = props
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


            {/* <table id="table-to-FarmerMasterExport" style={{ display: 'none', width: '100%' }}> */}
            {
                searchName === "Received" && ApiFlag === 'Received' ?
                    <table id="table-to-FarmerMasterExport" style={{ display: 'none', width: '100%' }}>
                        <h5><span>&emsp;</span></h5>

                        <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                        <tr><td></td></tr>
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>State</th>
                                <th>District</th>
                                <th>Dealer Name</th>
                                <th>Order Received Date</th>
                                <th>Product Quantity</th>
                                <th>Order Amount (Rs)</th>
                                <th>Officer Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                        <td>{item.stateName ? item.stateName : '-'}</td>
                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                        <td>{item.dealerName ? item.dealerName : '-'}</td>
                                        <td style={{ textAlign: 'left' }}>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                        <td style={{ textAlign: 'center' }} >
                                            <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                // onClick={() => productDetailsPopUpClick(item)}
                                            >
                                                {item.totalOrderQuantity ? item.totalOrderQuantity : '-'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'left' }}>{item.orderAmt ? item.orderAmt : '-'}</td>
                                        <td>{item.employeeName ? item.employeeName : '-'}</td>
                                        <td>{item.statusName ? item.statusName : '-'}</td>
                                    </tr>
                                )) : <tr>No data</tr>
                            }

                        </tbody>
                    </table>
                    :
                    searchName === "Approved" && ApiFlag === 'Approved' ?
                        <table id="table-to-FarmerMasterExport" style={{ display: 'none', width: '100%' }}>
                            <h5><span>&emsp;</span></h5>

                            <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                            <tr><td></td></tr>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Order Date</th>
                                    <th>Order No</th>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Dealer Name</th>
                                    <th>Product Quantity</th>
                                    <th>Order Amount (Rs)</th>
                                    <th>Officer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center' }} className='w-5'>{item.rowNum}</td>
                                            <td style={{ textAlign: 'left' }}>{item.orderDate ? moment(item.orderDate).format("DD-MM-YYYY") : '-'}</td>
                                            <td>{item.orderNumber ? item.orderNumber : '-'}</td>
                                            <td>{item.stateName ? item.stateName : '-'}</td>
                                            <td>{item.districtName ? item.districtName : '-'}</td>
                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                            <td style={{ textAlign: 'center' }} >
                                                <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                    // onClick={() => productDetailsPopUpClick(item)}
                                                >
                                                    Click
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                            <td>{item.employeeName ? item.employeeName : '-'}</td>

                                        </tr>
                                    )) : <tr>No data</tr>
                                }
                            </tbody>
                        </table>
                        :
                        <table id="table-to-FarmerMasterExport" style={{ display: 'none', width: '100%' }}>
                            <h5><span>&emsp;</span></h5>

                            <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                            <tr><td></td></tr>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    {
                                        RoleID == 7 || RoleID == 8 ?
                                            <></>
                                            :
                                            <th>State</th>
                                    }
                                    <th>District</th>
                                    <th>Dealer Name</th>
                                    <th>Product Quantity</th>
                                    {/* <th>Order Received Date</th> */}
                                    <th>Order Amount (Rs)</th>
                                    <th>Officer Name</th>
                                    <th>Reject Remark</th>
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
                                            <td>{item.districtName ? item.districtName : '-'}</td>
                                            <td>{item.dealerName ? item.dealerName : '-'}</td>
                                            <td style={{ textAlign: 'center' }} >
                                                <span className="btn btn-outline-primary text-white mr-2 mt-md-0 mt-lg-1 mx-2 waves-effect waves-light"
                                                    // onClick={() => productDetailsPopUpClick(item)}
                                                >
                                                    Click
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>{item.orderAmt ? item.orderAmt.toFixed(2) : '-'}</td>
                                            <td>{item.employeeName ? item.employeeName : '-'}</td>
                                            <td>{item.remark ? item.remark : '-'}</td>
                                        </tr>
                                    )) : <tr>No data</tr>
                                }

                            </tbody>
                        </table>

            }




            {/* <h5><span>&emsp;</span></h5>

                <h4 style={{ textAlign: 'center', fontSize: 16 }}>{name}</h4>

                <tr><td></td></tr>

                <thead className="thead-dark" >
                    <tr style={{ backgroundColor: '#495057', color: "#fff", border: '1px solid' }}>
                        <th style={{ textAlign: "center", width: "10%" }}>Sr.No.</th>
                        <th>State</th>
                        <th>Season</th>
                        {
                            searchName === "Regional Manager" && ApiFlag === 'RegionalManager' || searchName === "District Officer" && ApiFlag === 'DisctrictOfficer' || searchName === "Sales Trainee" && ApiFlag === 'SalesTrainee' ?
                                <th>District</th>
                                :
                                ''
                        }
                        {
                            searchName === "Sales Trainee" && ApiFlag === 'SalesTrainee' ?
                                <th>Taluka</th>
                                :
                                ''
                        }

                        <th>Crop Name</th>
                        <th>Product name</th>
                        <th>Packing Size</th>
                        <th>Quantity</th>
                    </tr> */}
            {/* </thead> */}
            {/* <tbody> */}
            {/* {
                        ExcelData && ExcelData.table && ExcelData.table.length > 0 ? ExcelData.table.map((item, i) => (
                            <tr style={{ textAlign: "center" }}>
                                <td align='center'>{item.rowNum}</td>
                                <td>{item.stateName ? item.stateName : '-'}</td>
                                <td>{item.seasonName ? item.seasonName : '-'}</td>
                                {
                                    searchName === "Regional Manager" && ApiFlag === 'RegionalManager' || searchName === "District Officer" && ApiFlag === 'DisctrictOfficer' || searchName === "Sales Trainee" && ApiFlag === 'SalesTrainee' ?
                                        <td>{item.districtName ? item.districtName : '-'}</td>
                                        :
                                        ''
                                }
                                {
                                    searchName === "Sales Trainee" && ApiFlag === 'SalesTrainee' ?
                                        <td>
                                            {item.districtName ? item.districtName : '-'}  </td>
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
            </table> */}
        </div>
    )
}