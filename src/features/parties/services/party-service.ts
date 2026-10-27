import { createParty, type PartyCreate } from "../../../generated";

export async function submitParty(payload: PartyCreate) {
    const response = await createParty({body: payload});
    return response.data;
}