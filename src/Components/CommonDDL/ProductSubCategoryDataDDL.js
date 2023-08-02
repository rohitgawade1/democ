
import { useEffect } from 'react'
import Select from 'react-select'


export const ProductSubCategoryDataDDL = (props) => {
    const {ProductSubCategoryDDL, setProductSubCategoryDDL,ProductSubCatDDLData, PopUpField} = props

    useEffect(() => {
        handleSubProductCatDDL()
    }, [ProductSubCatDDLData])

    const handleSubProductCatDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductSubCatDDLData && ProductSubCatDDLData.table && ProductSubCatDDLData.table.length > 0) {
            let list = ProductSubCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.subCategoryName,
            }))
            setProductSubCategoryDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_Product_SubCategoryID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.subCategoryName : "Select..." ,
            })
        }
        else {
            setProductSubCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Product Sub Category</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: ProductSubCategoryDDL.ID, label: ProductSubCategoryDDL.Label }}
                onChange={(e) => {
                    e ?
                        setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: e.value, Label: e.label })
                        :
                        setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: 0, Label: "Select..." })

                }}
                options={ProductSubCategoryDDL.DDL}
            />
        </div>
    )
}