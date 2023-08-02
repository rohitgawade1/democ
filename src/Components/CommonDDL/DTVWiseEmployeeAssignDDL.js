

import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DTVWiseEmployeeAssignDDL = (props) => {
    const { DTVWiseEmployeeDDL, setDTVWiseEmployeeDDL, DTVEmployeeWiseAssignData, mandatory, name, PopUpField } = props

// console.log(name,DTVEmployeeWiseAssignData)
    useEffect(() => {
        handleDeptDDL()
    }, [DTVEmployeeWiseAssignData])

    const handleDeptDDL = () => {
        if (DTVEmployeeWiseAssignData && DTVEmployeeWiseAssignData.table && DTVEmployeeWiseAssignData.table.length > 0) {
            let list = DTVEmployeeWiseAssignData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.paramID,
                label: item.paramName,
            }))
            if (name === 'Village Name') {
                setDTVWiseEmployeeDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_VillageNameID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.villageName : "Select..." : "Select..."
                })
            } else if (name === 'District') {
                setDTVWiseEmployeeDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_DistrictID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.districtName : "Select..." : "Select..."
                })
            } else {
                setDTVWiseEmployeeDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_TalukaNameID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.talukaName : "Select..." : "Select..."
                })
            }
        }
        else {
            setDTVWiseEmployeeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">{name ? name : `Taluka`}{mandatory && <AstricSign />}</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: DTVWiseEmployeeDDL.ID, label: DTVWiseEmployeeDDL.Label }}
                onChange={(e) => {
                    e ?
                        setDTVWiseEmployeeDDL({ ...DTVWiseEmployeeDDL, ID: e.value, Label: e.label })
                        :
                        setDTVWiseEmployeeDDL({ ...DTVWiseEmployeeDDL, ID: 0, Label: "Select..." })

                }}
                options={DTVWiseEmployeeDDL.DDL}
            />
        </div>
    )
}