
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const VendorNameDDLData = (props) => {
    const { VendorNameDDL, setVendorNameDDL, VendorNameData, PopUpField,mandatory } = props
   
    useEffect(() => {
        handleVendorNameDDL()
    }, [VendorNameData])

    const handleVendorNameDDL = () => {
        if (VendorNameData && VendorNameData.table && VendorNameData.table.length > 0) {
            let list = VendorNameData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_VendorID,
                label: item.vendorName,
            }))

            setVendorNameDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_VendorID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.vendorName : "Select..." ,
            })
        }
        else {
            setVendorNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Vendor Name {mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: VendorNameDDL.ID, label: VendorNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setVendorNameDDL({ ...VendorNameDDL, ID: e.value, Label: e.label })
                        :
                        setVendorNameDDL({ ...VendorNameDDL, ID: 0, Label: "Select..." })

                }}
                options={VendorNameDDL.DDL}
            />
        </div>
    )
}