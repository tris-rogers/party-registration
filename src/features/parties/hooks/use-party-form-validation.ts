import { isValidDateOfBirth, isValidEmail, isValidPostcode } from "../../../shared/utils/validation";
import type { PartyFieldInfo, PartyFormFields } from "../types/party";

export const usePartyFormValidation = (relevantFields:PartyFieldInfo[], partyFields: PartyFormFields) => {
    const isFieldValueValid = (value: string, type?: string) => {
        if (!value) {
            return false;
        }
    
        if (type === "email") {
            return isValidEmail(value.replaceAll(" ", ""));
        }
    
        if (type === "postcode") {
            const normalisedPostcode = value.replaceAll(" ", "").toUpperCase();
            return isValidPostcode(normalisedPostcode);
        }
    
        if (type === "dateOfBirth") {
            return isValidDateOfBirth(value);
        }
    
        return value.trim().length > 0;
    };
    
    const isSubmitDisabled = relevantFields.some(({id, type}) => {
        const value = partyFields[id];
        return !isFieldValueValid(value, type);
    });

    return {
        isFieldValueValid,
        isSubmitDisabled
    }
}