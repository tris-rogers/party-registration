import type { PartyFieldInfo } from "../types/party";

export const PARTY_TYPE_FIELDS: PartyFieldInfo[] = [
        {
            id: "email",
            name: "Email",
            type: "email",
            validationMessage: "Please enter a valid email address.",
            partyType: ["Natural Person", "Legal Entity"],
            maxLength: 254
        }, 
        {
            id: "postcode",
            name: "Postcode",
            type: "postcode",
            validationMessage: "Please enter a valid UK postcode.",
            partyType: ["Natural Person", "Legal Entity"],
            maxLength: 7
        }, 
        {
            id: "fullName",
            name: "Full Name",
            validationMessage: "Please enter a name.",
            partyType: ["Natural Person"]
        }, 
        {
            id: "dateOfBirth",
            name: "Date Of Birth",
            type: "dateOfBirth",
            validationMessage: "Please enter your date of birth.",
            partyType: ["Natural Person"]
        },
        {
            id: "registeredName",
            name: "Registered Name",
            validationMessage: "Registered name cannot be empty.",
            partyType: ["Legal Entity"],
            maxLength: 160
        }, 
        {
            id: "companyRegistrationNumber",
            name: "Company Registration Number",
            validationMessage: "Please provide a Company Registration Number",
            partyType: ["Legal Entity"]
        }
    ];