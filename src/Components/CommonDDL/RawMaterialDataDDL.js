
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const RawMaterialDataDDL = (props) => {
    const { RawMaterialNameDDL, setRawMaterialNameDDL, RawMaterialNameData, PopUpField,mandatory } = props

    useEffect(() => {
        handleRawMaterialNameDDL()
    }, [RawMaterialNameData])

    const handleRawMaterialNameDDL = () => {
        if (RawMaterialNameData && RawMaterialNameData.table && RawMaterialNameData.table.length > 0) {
            let list = RawMaterialNameData.table.map((item, index) => ({
                value: item.id,
                label: item.rawMaterialName,
            }))

            setRawMaterialNameDDL({
                DDL: list,
                // ID: 0,
                // Label: "Select...",
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_RawMaterialID : '0',
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.rawMaterialName : "Select...",
            })
        }
        else {
            setRawMaterialNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Raw Material Name {mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: RawMaterialNameDDL.ID, label: RawMaterialNameDDL.Label }}
                onChange={(e) => {
                    e ?
                        setRawMaterialNameDDL({ ...RawMaterialNameDDL, ID: e.value, Label: e.label })
                        :
                        setRawMaterialNameDDL({ ...RawMaterialNameDDL, ID: 0, Label: "Select..." })

                }}
                options={RawMaterialNameDDL.DDL}
            />
        </div>
    )
}