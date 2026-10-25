import { useState } from "react";
import type { PartyType } from "../../types/party";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./large-party-type-selector.styles.css";
import { PARTY_TYPES } from "../../config/party-types.config";

interface LargePartyTypeSelectorProps {
    hasPartyType: boolean;
    setPartyType: (type: PartyType) =>void;
}

export default function LargePartyTypeSelector({hasPartyType, setPartyType}: LargePartyTypeSelectorProps) {

    const [removeNode, setRemoveNode] = useState(false);

    const handleTransitionEnd = (e: React.TransitionEvent) => {
        if (e.target === e.currentTarget) {
            setRemoveNode(true);
        }
    }

    if (hasPartyType && (removeNode || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        return null;
    }

    return (
        <div 
            className={`large-party-type-selector-wrapper ${hasPartyType ? "hide" : ""}`}
            onTransitionEnd={handleTransitionEnd}
            inert={hasPartyType}
        >
            <h1 className="party-type-heading">
                What type of <span className="accent-word">Party</span> would you like to register?
            </h1>

            {
                PARTY_TYPES.map(p => {
                    const {id, name, icon} = p;
                    return (
                        <button 
                            key={id}
                            className="select-party-type-button"
                            onClick={()=>setPartyType(id)}
                        >
                            <div className="btn-text">{name}</div>
                            <FontAwesomeIcon 
                                className="btn-icon" 
                                icon={icon} 
                            />
                        </button>
                    )
                })
            }
        </div>
    )
}