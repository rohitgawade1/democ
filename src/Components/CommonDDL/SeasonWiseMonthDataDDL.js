
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const SeasonWiseMonthDataDDL = (props) => {
    const { MonthDDL, setMonthDDL, SeasonWiseMonthData ,mandatory,PopUpField} = props


    useEffect(() => {
        handleMonthDDL()
    }, [SeasonWiseMonthData])

    const handleMonthDDL = () => {
        if (SeasonWiseMonthData && SeasonWiseMonthData.table && SeasonWiseMonthData.table.length > 0) {
            let list = SeasonWiseMonthData.table.map((item, index) => ({
                value: item.m_MonthID,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_MonthID :0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.month_Name :"Select..." : "Select..."
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
            <label className="d-block" htmlFor="NameofDepartment">Month{mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                isDisabled = { PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
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