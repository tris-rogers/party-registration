import type { ReactNode } from "react";
import "./party-registration.styles.css";

interface PartyRegistrationProps {
    children: ReactNode;
}

export default function PartyRegistration({children}: PartyRegistrationProps) {
    return (
            <div className="party-registration-form-wrapper">
                <div className="party-registration-form">
                    {children}
                </div>
            </div>
    )
}