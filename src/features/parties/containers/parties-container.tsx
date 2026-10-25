import LargePartyTypeSelector from "../components/party-type-selector/large-party-type-selector";
import Parties from "../components/parties/parties";
import PartyHeader from "../components/party-header/party-header";
import PartyRegistration from "../components/party-registration/party-registration";
import { usePartyType } from "../hooks/use-party-type"
import PartyTypeSelector from "../components/party-type-selector/party-type-selector";
import PartyFields from "../components/party-fields/party-fields";
import { usePartyFields } from "../hooks/use-party-fields";

export default function PartiesContainer() {

    const {partyType, setPartyType} = usePartyType();
    const {fields, setPartyFields} = usePartyFields();

    return (
        <Parties>

            <LargePartyTypeSelector
                hasPartyType={!!partyType}
                setPartyType={setPartyType}
            />

            {
                !!partyType &&
                <>
                    <PartyHeader />

                    <PartyRegistration>
                        <PartyTypeSelector 
                            partyType={partyType} 
                            setPartyType={setPartyType} 
                        />
                        <PartyFields
                            partyType={partyType} 
                            partyFields={fields}
                            setPartyFields={setPartyFields}
                        />
                    </PartyRegistration>
                </>
            }

        </Parties>
        
    )
}