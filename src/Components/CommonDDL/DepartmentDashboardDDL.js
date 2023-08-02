import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DepartmentDashboardDDL = (props) => {
    const { DeptDDL, setDeptDDL, DepartmentDashboardDDLData,mandatory } = props
    useEffect(() => {
        handleDeptDDL();
    }, [DepartmentDashboardDDLData])
    // console.log(DeptDDLDataa);
    const handleDeptDDL = () => {
        if (DepartmentDashboardDDLData && DepartmentDashboardDDLData.table && DepartmentDashboardDDLData.table.length > 0) {
            let list = DepartmentDashboardDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_DepartmentID,
                label: item.departmentName,
            }))

            setDeptDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDeptDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Department {mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: DeptDDL.ID, label: DeptDDL.Label }}
                onChange={(e) => {
                    e ?
                    setDeptDDL({ ...DeptDDL, ID: e.value, Label: e.label })
                        :
                        setDeptDDL({ ...DeptDDL, ID: 0, Label: "Select..." })

                }}
                options={DeptDDL.DDL}
            // isDisabled
            />
        </div>
    )
}