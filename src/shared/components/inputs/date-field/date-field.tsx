import { useState, type ChangeEvent } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";
import "./date-field.styles.css";

interface DateFieldProps {
    name: keyof PartyFormFields;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    isValid: boolean;
    validationMsg?: string;
    errorMsg?: string;
    disabled: boolean;
}

export default function DateField({name, value, onChange, isValid, validationMsg, errorMsg, disabled}: DateFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = (!isValid && canShowError) || errorMsg;
    const msg = errorMsg || validationMsg;

    return (
        <>
            <input
                name={name}
                onBlur={()=>setCanShowError(true)}
                className={`input-field date-field ${(hasError) ? "invalid" : ""} ${!value ? "empty-value" : ""}`}
                value={value} 
                onChange={onChange}
                type="date"
                disabled={disabled}
            />
            {
                hasError && !!msg &&
                <p className="error-message">{msg}</p>
            }
        </>
    )
}