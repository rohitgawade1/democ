
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const SeasonDataDDL = (props) => {
    const { SeasonDDL, setSeasonDDL, SeasonDDLData, mandatory, PopUpField } = props

    useEffect(() => {
        handleSeasonDDL()
    }, [SeasonDDLData])

    const handleSeasonDDL = () => {
        // console.log(DeptDDLDataa)
        if (SeasonDDLData && SeasonDDLData.table && SeasonDDLData.table.length > 0) {
            let list = SeasonDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
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