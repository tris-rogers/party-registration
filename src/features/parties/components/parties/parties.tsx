import type { ReactNode } from "react"

import "./parties.styles.css";

interface PartiesProps {
    children: ReactNode;
}

export default function Parties({children}: PartiesProps) {
    return (
        <div className="parties-wrapper">
            {children}
        </div>
    )
}