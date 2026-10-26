import { useState, type ChangeEvent } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";
import "./date-field.styles.css";

interface DateFieldProps {
    name: keyof PartyFormFields;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    isValid: boolean;
    errorMsg?: string;
}

export default function DateField({name, value, onChange, isValid, errorMsg}: DateFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = !isValid && canShowError;

    return (
        <>
            <input
                name={name}
                onBlur={()=>setCanShowError(true)}
                className={`input-field date-field ${(hasError) ? "invalid" : ""} ${!value ? "empty-value" : ""}`}
                value={value} 
                onChange={onChange}
                type="date"
            />
            {
                hasError && !!errorMsg &&
                <p className="error-message">{errorMsg}</p>
            }
        </>
    )
}