import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const VillageDataDDL = (props) => {
    const { VillageData, VillageDDL, setVillageDDL, PopUpField,mandatory } = props

    useEffect(() => {
        handleVillageDataDDL()
    }, [VillageData])

    const handleVillageDataDDL = () => {
        // console.log(DeptDDLDataa)
        if (VillageData && VillageData.table && VillageData.table.length > 0) {
            let list = VillageData.table.map((item, index) => ({
                value: item.id,
                label: item.villageName,
            }))

            setVillageDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_VillageNameID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.villageName : "Select..." : "Select..."
                
            })
        }
        else {
            setVillageDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Village Name{mandatory && <AstricSign/>}</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: VillageDDL.ID, label: VillageDDL.Label }}
                onChange={(e) => {
                    e ?
                        setVillageDDL({ ...VillageDDL, ID: e.value, Label: e.label })
                        :
                        setVillageDDL({ ...VillageDDL, ID: 0, Label: "Select..." })

                }}
                options={VillageDDL.DDL}
            />
        </div>
    )
}