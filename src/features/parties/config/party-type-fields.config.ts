import type { PartyFieldInfo } from "../types/party";

export const PARTY_TYPE_FIELDS: PartyFieldInfo[] = [
        {
            id: "email",
            name: "Email",
            type: "email",
            validationMessage: "Please enter a valid email address.",
            partyType: ["Natural Person", "Legal Entity"],
            maxLength: 254,
            placeholder: "e.g. example@example.com"
        }, 
        {
            id: "postcode",
            name: "Postcode",
            type: "postcode",
            validationMessage: "Please enter a valid UK postcode.",
            partyType: ["Natural Person", "Legal Entity"],
            maxLength: 7,
            placeholder: "e.g. SW1A1AA"
        }, 
        {
            id: "fullName",
            name: "Full Name",
            validationMessage: "Please enter a name.",
            partyType: ["Natural Person"],
            placeholder: "Please enter.."
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
            maxLength: 160,
            placeholder: "Please enter.."
        }, 
        {
            id: "companyRegistrationNumber",
            name: "Company Registration Number",
            validationMessage: "Please provide a Company Registration Number.",
            partyType: ["Legal Entity"],
            maxLength: 8,
            placeholder: "Please enter.."
        }
    ];