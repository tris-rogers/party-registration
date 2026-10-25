import { useState } from "react"
import { PARTY_FIELDS_INITIAL_VALUES } from "../config/party-fields-initial-values.config";
import type { PartyFormFields } from "../types/party";
// import { PARTY_TYPE_FIELDS } from "../config/party-type-fields.config";


export const usePartyFields = () => {
    const [partyFields, setPartyFields] = useState<PartyFormFields>(PARTY_FIELDS_INITIAL_VALUES);

    return {
        fields: partyFields, setPartyFields
    }
}