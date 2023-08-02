
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const SeasonDashboardDDL = (props) => {
    const { SeasonDDL, setSeasonDDL, SeasonDashboardData, mandatory, PopUpField } = props

    useEffect(() => {
        handleSeasonDDL()
    }, [SeasonDashboardData])

    const handleSeasonDDL = () => {
        // console.log(DeptDDLDataa)
        if (SeasonDashboardData && SeasonDashboardData.table && SeasonDashboardData.table.length > 0) {
            let list = SeasonDashboardData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_SeasonID,
                label: item.seasonName,
            }))

            setSeasonDDL({
                DDL: list,
                // ID:  0 ,
                // Label: "Select...",
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_SeasonID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.seasonName : "Select..." : "Select..."
                
            })
        }
        else {
            setSeasonDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Season {mandatory && <AstricSign />}</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                isDisabled = { PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
                maxMenuHeight={150}
                value={{ value: SeasonDDL.ID, label: SeasonDDL.Label }}
                onChange={(e) => {
                    e ?
                        setSeasonDDL({ ...SeasonDDL, ID: e.value, Label: e.label })
                        :
                        setSeasonDDL({ ...SeasonDDL, ID: 0, Label: "Select..." })

                }}
                options={SeasonDDL.DDL}
            />
        </div>
    )
}