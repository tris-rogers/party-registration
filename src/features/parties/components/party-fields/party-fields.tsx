import type { Dispatch, SetStateAction } from "react";
import TextField from "../../../../shared/components/inputs/text-field/text-field";
import { PARTY_TYPE_FIELDS } from "../../config/party-type-fields.config";
import type { PartyFormFields, PartyType } from "../../types/party"
import DateField from "../../../../shared/components/inputs/date-field/date-field";
import SolidButton from "../../../../shared/components/buttons/solid-button/solid-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./party-fields.styles.css";
import { usePartyFormValidation } from "../../hooks/use-party-form-validation";

interface PartyFieldsProps {
    partyType: PartyType;
    partyFields: PartyFormFields;
    setPartyFields: Dispatch<SetStateAction<PartyFormFields>>;
}

export default function PartyFields({partyType, partyFields, setPartyFields}: PartyFieldsProps) {
    const relevantFields = PARTY_TYPE_FIELDS.filter(p => p.partyType.includes(partyType));
    const {isSubmitDisabled, isFieldValueValid} = usePartyFormValidation(relevantFields, partyFields);

    return (
        <div className={"party-fields-wrapper"}>
            <form onSubmit={(e) => e.preventDefault()}>
                {
                    relevantFields.map(f => {
                        const {id, name, type, validationMessage, maxLength, placeholder} = f;
                        let value = partyFields[id];
                        const isValid = isFieldValueValid(value, type);

                        if (type === "email") {
                            value = value.replaceAll(" ", "");
                        }
                        if (type === "postcode") {
                            value = value.replaceAll(" ", "");
                            value = value.toUpperCase();
                        }
                         
                        return (
                            <div key={id} className="label-wrapper">
                                <label>
                                    <div className="label-text">{name} <span className="label-required">*</span></div>
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
                                                placeholder={placeholder} 
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
                <div className="submit-btn-wrapper">
                    <SolidButton type="submit" disabled={isSubmitDisabled}>
                        <FontAwesomeIcon icon={faCheck} className="btn-icon" /> Submit
                    </SolidButton>
                </div>
            </form>
        </div>
    )
}