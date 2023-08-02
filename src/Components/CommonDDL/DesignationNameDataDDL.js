import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DesignationNameDataDDL = (props) => {
    const { DesigDDL, setDesigDDL, DesigDDLData, mandatory, PopUpField } = props
    useEffect(() => {
        handleDesigDDL()
    }, [DesigDDLData])

    const handleDesigDDL = () => {
        if (DesigDDLData && DesigDDLData.table && DesigDDLData.table.length > 0) {
            let list = DesigDDLData.table.map((item, index) => ({
                value: item.id,
                label: item.designationName,
            }))

            setDesigDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDesigDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Designation</label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: DesigDDL.ID, label: DesigDDL.Label }}
                onChange={(e) => {
                    e ?
                        setDesigDDL({ ...DesigDDL, ID: e.value, Label: e.label })
                        :
                        setDesigDDL({ ...DesigDDL, ID: 0, Label: "Select..." })

                }}
                options={DesigDDL.DDL}
            />
        </div>
    )
}