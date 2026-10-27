import { useState, type ChangeEvent, type ComponentProps } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";

type TextFieldProps = Omit<ComponentProps<"input">, "type" | "name" | "value" | "onChange"> & {
  name: keyof PartyFormFields;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
  isValid: boolean;
  validationMsg?: string;
  errorMsg?: string;
};

export default function TextField({name, value, onChange, isValid, validationMsg, errorMsg, ...props}: TextFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = !!((!isValid && canShowError) || errorMsg);
    const msg = errorMsg || validationMsg;
    return (
        <>
            <input
                {...props}
                name={name}
                value={value} 
                onChange={onChange}
                onBlur={()=>setCanShowError(true)}
                className={`input-field text-field ${(hasError) ? "invalid" : ""}`}
                type="text"
            />
            {
                hasError && !!msg &&
                <p className="error-message">{msg}</p>
            }
        </> 
    )
}