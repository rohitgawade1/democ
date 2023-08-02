
import { useEffect } from 'react'
import Select from 'react-select'

export const EmployeeNameDataDDL = (props) => {
    const { EmployeeNameDDL, setEmployeeNameDDL, EmployeeNameData } = props

  
    useEffect(() => {
        handleEmployeeDDL()
    }, [EmployeeNameData])

    const handleEmployeeDDL = () => {
        if (EmployeeNameData && EmployeeNameData.table && EmployeeNameData.table.length > 0) {
            let list = EmployeeNameData.table.map((item, index) => ({
                value: item.m_EmployeeID,
                label: item.employeeName,
            }))

            setEmployeeNameDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setEmployeeNameDDL({
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
                isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: EmployeeNameDDL.ID, label: EmployeeNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setEmployeeNameDDL({ ...EmployeeNameDDL, ID: e.value, Label: e.label })
                        :
                        setEmployeeNameDDL({ ...EmployeeNameDDL, ID: 0, Label: "Select..." })

                }}
                options={EmployeeNameDDL.DDL}
            />
        </div>
    )
}