import type { PartyFieldInfo, PartyFormFields } from "../types/party";
import { isFieldValueValid } from "../utils/party-form.utils";

export const usePartyFormValidation = (relevantFields:PartyFieldInfo[], partyFields: PartyFormFields) => {
    
    
    const isSubmitDisabled = relevantFields.some(({id, type}) => {
        const value = partyFields[id];
        return !isFieldValueValid(value, type);
    });

    return {
        isSubmitDisabled
    }
}