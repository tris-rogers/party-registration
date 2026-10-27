import { useState } from "react";
import { createParty, type CreatePartyError, type PartyCreate, type PartyCreated } from "../../../generated";
import { submitParty } from "../services/party-service";

export function useCreateParty() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CreatePartyError | null>(null);
  const [successID, setSuccessID] = useState<string | null>(null);

  const submit = async (payload: PartyCreate):Promise<PartyCreated> => {
    setIsLoading(true);
    setError(null);
    setSuccessID(null);

    try {


        const partyData = await submitParty(payload);
      
        setSuccessID(partyData.id);
        return partyData;

    } catch (err: unknown) {
        const apiError = err as CreatePartyError;
        setError(apiError);
        throw err;

    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (id: string) => {
    setError(prev => {
        if (prev?.errors.length) {
            const filteredErrors = prev.errors.filter(e => e.field !== id);

            if (filteredErrors.length === 0) {
                return null;
            }   

            return {
                ...prev,
                errors: filteredErrors
            }
        }
        return prev;
    })
  }

  return {
    submit, 
    isLoading, 
    error, 
    clearError,
    successID
  };
}