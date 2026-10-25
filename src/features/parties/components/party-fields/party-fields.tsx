import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import TextField from "../../../../shared/components/inputs/text-field/text-field";
import { PARTY_TYPE_FIELDS } from "../../config/party-type-fields.config";
import type { PartyFormFields, PartyType } from "../../types/party"
import { isValidDateOfBirth, isValidEmail, isValidPostcode } from "../../../../shared/utils/validation";
import "./party-fields.styles.css";
import DateField from "../../../../shared/components/inputs/date-field/date-field";

interface PartyFieldsProps {
    partyType: PartyType;
    partyFields: PartyFormFields;
    setPartyFields: Dispatch<SetStateAction<PartyFormFields>>;
}

export default function PartyFields({partyType, partyFields, setPartyFields}: PartyFieldsProps) {
    return (
        <div className={"party-fields-wrapper"}>
            <form>
                {
                    PARTY_TYPE_FIELDS.filter(p => p.partyType.includes(partyType)).map(f => {
                        const {id, name, type, validationMessage, maxLength} = f;
                        let value = partyFields[id];
                        let isValid = !!value;

                        if (type === "email") {
                            value = value.replaceAll(" ", "");
                            isValid = isValidEmail(value);
                        }
                        if (type === "postcode") {
                            value = value.replaceAll(" ", "");
                            isValid = isValidPostcode(value);
                        }
                        if (type === "dateOfBirth") {
                            isValid = isValidDateOfBirth(value);
                        }
                        
                        return (
                            <div key={id} className="label-wrapper">
                                <label>
                                    <div className="label-text">{name}</div>
                                    {
                                        type === "dateOfBirth" ?
                                            <DateField
                                                name={id} 
                                                value={value} 
                                                onChange={(e)=>setPartyFields(prev => ({
                                                    ...prev,
                                                    [id]: e.target.value
                                                }))} 
                                                isValid={isValid}
                                                errorMsg={validationMessage}
                                            />
                                            :
                                            <TextField 
                                                name={id} 
                                                value={value} 
                                                onChange={(e)=>setPartyFields(prev => ({
                                                    ...prev,
                                                    [id]: e.target.value
                                                }))} 
                                                isValid={isValid}
                                                errorMsg={validationMessage} 
                                                maxLength={maxLength}
                                            />
                                    }
                                </label>
                            </div>
                        )
                    })
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}