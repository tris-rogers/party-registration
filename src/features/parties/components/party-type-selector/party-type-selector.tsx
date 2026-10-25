import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PARTY_TYPES } from "../../config/party-types.config";
import type { PartyType, PartyTypeSelection } from "../../types/party";
import "./party-type-selector.styles.css";

interface PartyTypeSelectorProps {
    partyType: PartyTypeSelection;
    setPartyType: (type: PartyType)=>void;
}

export default function PartyTypeSelector({partyType, setPartyType}: PartyTypeSelectorProps) {

    const sliderWidth = 100 / PARTY_TYPES.length;
    const selectedIndex = PARTY_TYPES.findIndex((party) => party.id === partyType);
    
    return (
        <div className="party-type-selector-wrapper">
            
            <div className="party-type-btns-wrapper">
                {
                    PARTY_TYPES.map(p => {
                        const {id, name, icon} = p;
                        return (
                            <button 
                                key={id}
                                className={partyType === id ? 'btn-selected' : ''}
                                onClick={()=>setPartyType(id)}
                            >
                                <FontAwesomeIcon icon={icon} className="btn-icon" />
                                {name}
                            </button>
                        )
                    })
                }
                <div 
                    className={"btn-slider"}
                    style={{
                        width: `calc(${sliderWidth}% - 1rem)`,
                        transform: `translateX(${selectedIndex < 0 ? 0 : selectedIndex * 100}%)`,
                    }}
                ></div>
            </div>
        </div>
    )
}