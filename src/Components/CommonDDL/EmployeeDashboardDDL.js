
import { useEffect } from 'react'
import Select from 'react-select'

export const EmployeeDashboardDDL = (props) => {
    const { EmpDDL, setEmpDDL, EmployeeDashboardDDLData } = props


    useEffect(() => {
        handleEmployeeDDL()
    }, [EmployeeDashboardDDLData])

    const handleEmployeeDDL = () => {
        if (EmployeeDashboardDDLData && EmployeeDashboardDDLData.table && EmployeeDashboardDDLData.table.length > 0) {
            let list = EmployeeDashboardDDLData.table.map((item, index) => ({
                value: item.m_EmployeeID,
                label: item.employeeName,
            }))

            setEmpDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setEmpDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Employee Name</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: EmpDDL.ID, label: EmpDDL.Label }}
                onChange={(e) => {
                    e ?
                        setEmpDDL({ ...EmpDDL, ID: e.value, Label: e.label })
                        :
                        setEmpDDL({ ...EmpDDL, ID: 0, Label: "Select..." })

                }}
                options={EmpDDL.DDL}
            />
        </div>
    )
}