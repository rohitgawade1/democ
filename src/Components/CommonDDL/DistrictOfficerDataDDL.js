

import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DistrictOfficerDataDDL = (props) => {
    const { DistrictOfficerDDLData, setDistrictOfficerDDL, DistrictOfficerDDL, mandatory, name, PopUpField, AssignToDDL } = props

    useEffect(() => {
        handleDeptDDL()
        // console.log('DistrictOfficerDDLData' , PopUpField)
    }, [DistrictOfficerDDLData])

    const handleDeptDDL = () => {
        if (DistrictOfficerDDLData && DistrictOfficerDDLData.table && DistrictOfficerDDLData.table.length > 0) {
            let list = DistrictOfficerDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_EmployeeID,
                m_UserID: item.m_UserID,
                label: item.employeeName,
            }))
            if (name === 'Field Assistant Name') {
                setDistrictOfficerDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_EmployeeID : 0 : '0',
                    m_UserID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.tragetAssignToUserID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.tragetAssignToUser : "Select..." : "Select..."
                })
            } else if (name === 'Sales Trainee Name') {
                setDistrictOfficerDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_EmployeeID : 0 : '0',
                    m_UserID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.tragetAssignToUserID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.tragetAssignToUser : "Select..." : "Select..."
                })
            } else {
                setDistrictOfficerDDL({
                    DDL: list,
                    ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_EmployeeID : 0 : '0',
                    m_UserID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.districtOfficerID : 0 : '0',
                    Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.districtOfficerName : "Select..." : "Select..."
                })
            }
        }
        else {
            setDistrictOfficerDDL({
                DDL: [],
                m_UserID: 0,
                ID: 0,
                Label: "Select...",
            })
        }

    }

    
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">{name ? name : `District Officer`}{mandatory && <AstricSign />}</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: DistrictOfficerDDL.ID, label: DistrictOfficerDDL.Label, m_UserID: DistrictOfficerDDL.m_UserID }}
                onChange={(e) => {
                    e ?
                        setDistrictOfficerDDL({ ...DistrictOfficerDDL, ID: e.value, Label: e.label, m_UserID: e.m_UserID })
                        :
                        setDistrictOfficerDDL({ ...DistrictOfficerDDL, ID: 0, Label: "Select...", m_UserID: 0 })

                }}
                options={DistrictOfficerDDL.DDL}
            />
        </div>
    )
}