
import { useEffect } from 'react'
import Select from 'react-select'

export const ProductCategoryDataDDL = (props) => {
    const {ProductCategoryDDL, setProductCategoryDDL , ProductCatDDLData, PopUpField} = props

    useEffect(() => {
        handleProductCatDDL()
    }, [ProductCatDDLData])

    const handleProductCatDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductCatDDLData && ProductCatDDLData.table && ProductCatDDLData.table.length > 0) {
            let list = ProductCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_Product_CategoryID,
                label: item.categoryName,
            }))
            setProductCategoryDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_Product_CategoryID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.categoryName : "Select..." ,
            })
        }
        else {
            setProductCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Product Category</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                isDisabled = { PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
                value={{ value: ProductCategoryDDL.ID, label: ProductCategoryDDL.Label }}
                onChange={(e) => {
                    e ?
                        setProductCategoryDDL({ ...ProductCategoryDDL, ID: e.value, Label: e.label })
                        :
                        setProductCategoryDDL({ ...ProductCategoryDDL, ID: 0, Label: "Select..." })

                }}
                options={ProductCategoryDDL.DDL}
            />
        </div>
    )
}