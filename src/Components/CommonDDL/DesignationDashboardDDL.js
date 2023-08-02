import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DesignationDashboardDDL = (props) => {
    const { DesigDDL, setDesigDDL, DesignationDashboardDDLData, mandatory, PopUpField } = props
    useEffect(() => {
        handleDesigDDL()
    }, [DesignationDashboardDDLData])

    const handleDesigDDL = () => {
        if (DesignationDashboardDDLData && DesignationDashboardDDLData.table && DesignationDashboardDDLData.table.length > 0) {
            let list = DesignationDashboardDDLData.table.map((item, index) => ({
                value: item.m_DesignationID,
                label: item.designationName,
            }))

            setDesigDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDesigDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Designation</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: DesigDDL.ID, label: DesigDDL.Label }}
                onChange={(e) => {
                    e ?
                        setDesigDDL({ ...DesigDDL, ID: e.value, Label: e.label })
                        :
                        setDesigDDL({ ...DesigDDL, ID: 0, Label: "Select..." })

                }}
                options={DesigDDL.DDL}
            />
        </div>
    )
}