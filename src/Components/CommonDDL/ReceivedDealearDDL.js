import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const ReceivedDealearDDL = (props) => {
    const { DealerDDL, setDealerDDL, DealerNameDDLData, mandatory, PopUpField } = props

    useEffect(() => {
        handleDelearNameDDL()
    }, [DealerNameDDLData])

    const handleDelearNameDDL = () => {
        // console.log(DealerNameDDLData)
        if (DealerNameDDLData && DealerNameDDLData.table && DealerNameDDLData.table.length > 0) {
            let list = DealerNameDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_DealerID,
                label: item.dealerName,
            }))

            setDealerDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setDealerDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
       
            <div className="form-group">
                <label className="d-block" htmlFor="NameofDepartment">Dealer Name</label>
                <Select
                    // isClearable
                    isSearchable
                    maxMenuHeight={150}
                    value={{ value: DealerDDL.ID, label: DealerDDL.Label }}
                    onChange={(e) => {
                        e ?
                            setDealerDDL({ ...DealerDDL, ID: e.value, Label: e.label })
                            :
                            setDealerDDL({ ...DealerDDL, ID: 0, Label: "Select..." })

                    }}
                    options={DealerDDL.DDL}
                />
            </div>
       
    )
}