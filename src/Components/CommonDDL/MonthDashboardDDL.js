

import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const MonthDashboardDDL = (props) => {
    const { MonthDDL, setMonthDDL, MonthDashboardData, mandatory, PopUpField } = props


    useEffect(() => {
        handleMonthDDL()
    }, [MonthDashboardData])

    const handleMonthDDL = () => {
        if (MonthDashboardData && MonthDashboardData.table && MonthDashboardData.table.length > 0) {
            let list = MonthDashboardData.table.map((item, index) => ({
                value: item.m_MonthID,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_MonthID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.month_Name : "Select..." : "Select..."
            })
        }
        else {
            setMonthDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Month
                {mandatory && <AstricSign />}</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                isDisabled={PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
                maxMenuHeight={150}
                value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                onChange={(e) => {
                    e ?
                        setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                        :
                        setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                }}
                options={MonthDDL.DDL}
            />
        </div>
    )
}