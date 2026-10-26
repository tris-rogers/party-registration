import { useState, type ChangeEvent } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";

interface TextFieldProps {
    name: keyof PartyFormFields;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    isValid: boolean;
    validationMsg?: string;
    errorMsg?: string;
    maxLength?: number;
    disabled: boolean;
}

export default function TextField({name, value, placeholder, onChange, isValid, validationMsg, errorMsg, maxLength, disabled}: TextFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = (!isValid && canShowError) || errorMsg;
    const msg = errorMsg || validationMsg;
    return (
        <>
            <input
                name={name}
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
                maxLength={maxLength}
                onBlur={()=>setCanShowError(true)}
                className={`input-field text-field ${(hasError) ? "invalid" : ""}`}
                type="text"
                disabled={disabled} 
            />
            {
                hasError && !!msg &&
                <p className="error-message">{msg}</p>
            }
        </> 
    )
}