

import { useEffect } from 'react'
import Select from 'react-select'

export const ProductNameDashboardDDL = (props) => {
    const { ProductNameDDL, setProductNameDDL, ProductNameDashboardData, PopUpField} = props

    useEffect(() => {
        handleProductNameDDL()
    }, [ProductNameDashboardData])

    const handleProductNameDDL = () => {
        if (ProductNameDashboardData && ProductNameDashboardData.table && ProductNameDashboardData.table.length > 0) {
            let list = ProductNameDashboardData.table.map((item, index) => ({
                value: item.m_ProductID,
                label: item.product_Name,
            }))
            setProductNameDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_ProductID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.product_Name : "Select..." ,            
            })
        }
        else {
            setProductNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Product Name</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: ProductNameDDL.ID, label: ProductNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setProductNameDDL({ ...ProductNameDDL, ID: e.value, Label: e.label })
                        :
                        setProductNameDDL({ ...ProductNameDDL, ID: 0, Label: "Select..." })

                }}
                options={ProductNameDDL.DDL}
            />
        </div>
    )
}