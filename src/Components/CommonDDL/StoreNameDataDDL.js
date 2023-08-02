
import { useEffect } from 'react'
import Select from 'react-select'

export const StoreNameDataDDL = (props) => {
    const { StoreNameDDL, setStoreNameDDL, StoreNameData, PopUpField } = props

    useEffect(() => {
        handleStoreNameDDL()
    }, [StoreNameData])

    const handleStoreNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (StoreNameData && StoreNameData.table && StoreNameData.table.length > 0) {
            let list = StoreNameData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_UserID,
                label: item.storeName,
            }))
            setStoreNameDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_Product_CategoryID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.categoryName : "Select...",
            })
        }
        else {
            setStoreNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Store Name</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                isDisabled={PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
                value={{ value: StoreNameDDL.ID, label: StoreNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setStoreNameDDL({ ...StoreNameDDL, ID: e.value, Label: e.label })
                        :
                        setStoreNameDDL({ ...StoreNameDDL, ID: 0, Label: "Select..." })

                }}
                options={StoreNameDDL.DDL}
            />
        </div>
    )
}