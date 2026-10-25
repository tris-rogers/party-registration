import { useState } from "react"
import type { PartyTypeSelection } from "../types/party";

export const usePartyType = () => {
    const [partyType, setPartyType] = useState<PartyTypeSelection>("");

    return {
        partyType,
        setPartyType
    }
}