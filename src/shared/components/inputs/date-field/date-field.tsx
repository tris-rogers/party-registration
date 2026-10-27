import { useState, type ChangeEvent, type ComponentProps } from "react";
import type { PartyFormFields } from "../../../../features/parties/types/party";
import "../inputs.styles.css";
import "./date-field.styles.css";

type DateFieldProps = Omit<ComponentProps<"input">, "type" | "name" | "value" | "onChange"> & {
  name: keyof PartyFormFields;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
  isValid: boolean;
  validationMsg?: string;
  errorMsg?: string;
};

export default function DateField({name, value, onChange, isValid, validationMsg, errorMsg, ...props}: DateFieldProps) {
    const [canShowError, setCanShowError] = useState(false);
    const hasError = !!((!isValid && canShowError) || errorMsg);
    const msg = errorMsg || validationMsg;

    return (
        <>
            <input
                {...props}
                name={name}
                onBlur={()=>setCanShowError(true)}
                className={`input-field date-field ${(hasError) ? "invalid" : ""} ${!value ? "empty-value" : ""}`}
                value={value} 
                onChange={onChange}
                type="date"
            />
            {
                hasError && !!msg &&
                <p className="error-message">{msg}</p>
            }
        </>
    )
}