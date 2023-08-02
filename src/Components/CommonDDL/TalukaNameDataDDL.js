
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const TalukaNameDataDDL = (props) => {
    const { TalukaDDL, setTalukaDDL, TalukaDDLData,PopUpField,mandatory} = props

    useEffect(() => {
        handleTalukaDDL()
    }, [TalukaDDLData])

    const handleTalukaDDL = () => {
        if (TalukaDDLData && TalukaDDLData.table && TalukaDDLData.table.length > 0) {
            let list = TalukaDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.talukaName,
            }))

            setTalukaDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_TalukaNameID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.talukaName : "Select..." : "Select..."
                
            })
        }
        else {
            setTalukaDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Taluka {mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                // isDisabled = { PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
                isSearchable
                maxMenuHeight={150}
                value={{ value: TalukaDDL.ID, label: TalukaDDL.Label }}
                onChange={(e) => {
                    e ?
                        setTalukaDDL({ ...TalukaDDL, ID: e.value, Label: e.label })
                        :
                        setTalukaDDL({ ...TalukaDDL, ID: 0, Label: "Select..." })

                }}
                options={TalukaDDL.DDL}
            />
        </div>
    )
}