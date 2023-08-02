import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const StateNameDataDDL = (props) => {
    const { StateDDL, setStateDDL, StateDDLData } = props
    useEffect(() => {
        handleStateDDL();
    }, [StateDDLData])

    const handleStateDDL = () => {
        if (StateDDLData && StateDDLData.table && StateDDLData.table.length > 0) {
            let list = StateDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
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