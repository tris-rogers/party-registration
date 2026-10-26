import type { Dispatch, SetStateAction } from "react";
import TextField from "../../../../shared/components/inputs/text-field/text-field";
import { PARTY_TYPE_FIELDS } from "../../config/party-type-fields.config";
import type { PartyFormFields, PartyType } from "../../types/party"
import DateField from "../../../../shared/components/inputs/date-field/date-field";
import SolidButton from "../../../../shared/components/buttons/solid-button/solid-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./party-fields.styles.css";
import { usePartyFormValidation } from "../../hooks/use-party-form-validation";
import type { CreatePartyError, PartyCreate, PartyCreated } from "../../../../generated";

interface CreatePartyProps {
    submit: (payload: PartyCreate)=>Promise<PartyCreated>;
    isLoading: boolean;
    error: CreatePartyError | null;
    clearError: (id: string)=>void;
}

interface PartyFieldsProps {
    partyType: PartyType;
    partyFields: PartyFormFields;
    setPartyFields: Dispatch<SetStateAction<PartyFormFields>>;
    createPartyProps: CreatePartyProps;
}

export default function PartyFields({partyType, partyFields, setPartyFields, createPartyProps}: PartyFieldsProps) {
    const relevantFields = PARTY_TYPE_FIELDS.filter(p => p.partyType.includes(partyType));
    const {isSubmitDisabled, isFieldValueValid} = usePartyFormValidation(relevantFields, partyFields);
    const {submit, isLoading, error, clearError} = createPartyProps;

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (isSubmitDisabled) {
            return;
        }
        
        let payload: PartyCreate = {
            type: partyType,
            email: "",
            postcode: ""
        };

        relevantFields.forEach(r => {
            payload = {
                ...payload,
                [r.id]: partyFields[r.id]
            }
        })

        try {
            await submit(payload); 
        } catch (error) {
            console.error({error})
        }
    }
    
    return (
        <div className={"party-fields-wrapper"}>
            {
                error?.errors?.length &&
                <div className="general-error-msg-wrapper">
                    <p className="general-error-msg">Please correct the errors below and then re-submit</p>
                    <p className="more-info">If the error persists please contact support.</p>
                </div>
            }
            <form onSubmit={handleSubmit}>
                {
                    relevantFields.map(f => {
                        const {id, name, type, maxLength, placeholder} = f;
                        let validationMessage = f.validationMessage;
                        let value = partyFields[id];
                        const isValid = isFieldValueValid(value, type);
                        let fieldError = "";

                        if (type === "email") {
                            value = value.replaceAll(" ", "");
                        }
                        if (type === "postcode") {
                            value = value.replaceAll(" ", "");
                            value = value.toUpperCase();
                        }

                        if (error && error?.errors?.length) {
                            const foundError = error.errors.find(e => e.field === id);
                            if (foundError) {
                                fieldError = foundError.message.replaceAll(id, name);
                            }
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
                                                onChange={(e)=>{
                                                    clearError(id);
                                                    setPartyFields(prev => ({
                                                        ...prev,
                                                        [id]: e.target.value
                                                    }))}
                                                } 
                                                isValid={isValid}
                                                validationMsg={validationMessage}
                                                errorMsg={fieldError}
                                                disabled={isLoading}
                                            />
                                            :
                                            <TextField 
                                                name={id} 
                                                value={value}
                                                placeholder={placeholder} 
                                                onChange={(e)=>{
                                                    clearError(id);
                                                    setPartyFields(prev => ({
                                                        ...prev,
                                                        [id]: e.target.value
                                                    }))}
                                                } 
                                                isValid={isValid}
                                                validationMsg={validationMessage}
                                                errorMsg={fieldError} 
                                                maxLength={maxLength}
                                                disabled={isLoading}
                                            />
                                    }
                                </label>
                            </div>
                        )
                    })
                }
                <div className="submit-btn-wrapper">
                    <SolidButton 
                        type="submit" 
                        disabled={isSubmitDisabled || isLoading}
                    >
                        <FontAwesomeIcon 
                            icon={isLoading ? faSpinner : faCheck} 
                            className={`btn-icon ${isLoading ? 'fa-spin' : ''}`} 
                        /> 
                        Submit
                    </SolidButton>
                </div>
            </form>
        </div>
    )
}