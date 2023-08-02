import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const OfficerNameDataDDL = (props) => {
    const { OfficerNameDDL, setOfficerNameDDL, OfficerNameDDLData, mandatory,PopUpField,name } = props

    useEffect(() => {
        handleOfficerNameDDL()
    }, [OfficerNameDDLData])
    
    const handleOfficerNameDDL = () => {
        if (OfficerNameDDLData && OfficerNameDDLData.table && OfficerNameDDLData.table.length > 0) {
            let list = OfficerNameDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_EmployeeID,
                label: item.employeeName,
            }))

            setOfficerNameDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.orderPunchByM_EmployeeID :0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.employeeName :"Select..." : "Select..."
            })
        }
        else {
            setOfficerNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">{name ? name : `Officer name`}{mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: OfficerNameDDL.ID, label: OfficerNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setOfficerNameDDL({ ...OfficerNameDDL, ID: e.value, Label: e.label })
                        :
                        setOfficerNameDDL({ ...OfficerNameDDL, ID: 0, Label: "Select..." })

                }}
                options={OfficerNameDDL.DDL}
            />
        </div>
    )
}