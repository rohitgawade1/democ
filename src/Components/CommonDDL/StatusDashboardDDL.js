
import { useEffect } from 'react'
import Select from 'react-select'

export const StatusDashboardDDL = (props) => {
    const { StatusDDL, setStatusDDL, StatusDashboardDDLData } = props


    useEffect(() => {
        handleStatusDDL()
    }, [StatusDashboardDDLData])

    const handleStatusDDL = () => {
        if (StatusDashboardDDLData && StatusDashboardDDLData.table && StatusDashboardDDLData.table.length > 0) {
            let list = StatusDashboardDDLData.table.map((item, index) => ({
                value: item.m_StatusID,
                label: item.statusName,
            }))

            setStatusDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setStatusDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Status</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: StatusDDL.ID, label: StatusDDL.Label }}
                onChange={(e) => {
                    e ?
                        setStatusDDL({ ...StatusDDL, ID: e.value, Label: e.label })
                        :
                        setStatusDDL({ ...StatusDDL, ID: 0, Label: "Select..." })

                }}
                options={StatusDDL.DDL}
            />
        </div>
    )
}