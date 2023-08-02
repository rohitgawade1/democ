import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const StateDashboardDDL = (props) => {
    const { StateDDL, setStateDDL, StateDashboardDDLData } = props
    useEffect(() => {
        handleStateDDL();
    }, [StateDashboardDDLData])

    const handleStateDDL = () => {
        if (StateDashboardDDLData && StateDashboardDDLData.table && StateDashboardDDLData.table.length > 0) {
            let list = StateDashboardDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_StateNameID,
                label: item.stateName,
            }))

            setStateDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setStateDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">State <AstricSign/></label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: StateDDL.ID, label: StateDDL.Label }}
                onChange={(e) => {
                    e ?
                        setStateDDL({ ...StateDDL, ID: e.value, Label: e.label })
                        :
                        setStateDDL({ ...StateDDL, ID: 0, Label: "Select..." })

                }}
                options={StateDDL.DDL}
            // isDisabled
            />
        </div>
    )
}