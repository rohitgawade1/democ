
import { useEffect } from 'react'
import Select from 'react-select'
import moment from "moment";
import { AstricSign } from '../../Helper/AstricSign'

export const AssignToDataDDL = (props) => {
    const { AssignToDDL, setAssignToDDL, AssignToData,PopUpField } = props


    useEffect(() => {
        handleFieldDayDDL()
    }, [AssignToData])

    const handleFieldDayDDL = () => {
        if (AssignToData && AssignToData.table && AssignToData.table.length > 0) {
            let list = AssignToData.table.map((item, index) => ({
                value: item.id,
                label: item.officerName,
            }))

            setAssignToDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.assignOfficerIndicatorID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." : PopUpField?.rowData?.assignOfficerIndicatorName : "Select..." ,
            
            })
        }
        else {
            setAssignToDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment"> Assign To <AstricSign /></label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: AssignToDDL.ID, label: AssignToDDL.Label }}
                onChange={(e) => {
                    e ?
                        setAssignToDDL({ ...AssignToDDL, ID: e.value, Label: e.label })
                        :
                        setAssignToDDL({ ...AssignToDDL, ID: 0, Label: "Select..." })

                }}
                options={AssignToDDL.DDL}
            />
        </div>
    )
}