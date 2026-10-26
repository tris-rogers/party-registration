import "./party-success.styles.css";

interface PartySuccessProps {
    successID: string;
}

export default function PartySuccess({successID = '123'}: PartySuccessProps) {
    return (
        <div className="success-message" role="status">
            <h2>Party created successfully</h2>
            <p>
                The party has been created successfully. Your reference ID is: <strong className="success-id">{successID}</strong>
            </p>
        </div>
    )
}