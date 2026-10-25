import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type PartyType = 'Natural Person' | 'Legal Entity';

// Allows an empty string before the user selects a party type.
export type PartyTypeSelection = PartyType | '';

export interface PartyFormFields {
    email: string;
    postcode: string;
    fullName: string;
    dateOfBirth: string;
    registeredName: string;
    companyRegistrationNumber: string;
}

// A union of all valid field names in PartyFormFields e.g "email" | "postcode" etc.
// export type PartyFieldName = keyof PartyFormFields;
export type PartyFieldInfo = {
  id: keyof PartyFormFields;
  name: string;
  type?: string;
  validationMessage?: string;
  partyType: PartyType[];
  maxLength?: number;
  placeholder?: string;
}

export interface PartyTypes {
    id: PartyType;
    name: string;
    icon: IconDefinition;
    fieldsKey: string;
}