
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const TalukaDashboardDDL = (props) => {
    const { TalukaDDL, setTalukaDDL, TalukaDashboardDDLData,PopUpField,mandatory} = props

    useEffect(() => {
        handleTalukaDDL()
    }, [TalukaDashboardDDLData])

    const handleTalukaDDL = () => {
        if (TalukaDashboardDDLData && TalukaDashboardDDLData.table && TalukaDashboardDDLData.table.length > 0) {
            let list = TalukaDashboardDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_TalukaNameID,
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