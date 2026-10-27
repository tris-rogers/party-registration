import type { PartyCreate } from "../../../generated";
import { isValidDateOfBirth, isValidEmail, isValidPostcode } from "../../../shared/utils/validation";
import type { ApiError, PartyFieldInfo, PartyFormFields, PartyType } from "../types/party";

export function normalizePartyFieldValue(value: string, type: string | undefined): string {
    
    if (type === "email") {
        return value.replace(" ", "");
    }
    if (type === "postcode") {
        return value.replace(" ", "").toUpperCase();
    }
        
    return value;
}

export const isFieldValueValid = (value: string, type?: string | undefined) => {
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

export const getFieldErrorMessage = (error: ApiError, id: string, name: string): string | undefined => {
    const foundError = error?.errors?.find((e) => e.field === id);

    if (foundError) {
        return foundError?.message.replaceAll(id, name);
    }
    return "";
};

export const buildPartyPayload = (partyType: PartyType, relevantFields: PartyFieldInfo[], partyFields: PartyFormFields): PartyCreate => {
    let payload: PartyCreate = {
        type: partyType,
        email: "",
        postcode: ""
    }

    relevantFields.forEach(({id, type}) => {
        payload[id] = normalizePartyFieldValue(partyFields[id], type);
    });

    return payload;
}