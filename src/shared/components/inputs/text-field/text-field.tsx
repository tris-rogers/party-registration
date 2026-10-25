import { useState, type ChangeEvent } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";

interface TextFieldProps {
    name: keyof PartyFormFields;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    isValid: boolean;
    errorMsg?: string;
    maxLength?: number;
}

export default function TextField({name, value, onChange, isValid, errorMsg, maxLength}: TextFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = !isValid && canShowError;
    return (
        <>
            <input
                name={name}
                onBlur={()=>setCanShowError(true)}
                className={`input-field text-field ${(hasError) ? "invalid" : ""}`}
                type="text" 
                value={value} 
                onChange={onChange}
                maxLength={maxLength}
            />
            {
                hasError && !!errorMsg &&
                <p className="error-message">{errorMsg}</p>
            }
        </> 
    )
}