import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./solid-button.styles.css";

interface SolidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function SolidButton({children, ...props}: SolidButtonProps) {
    return (
        <button
            className="solid-button"
            {...props}
        >
            {children}
        </button>
    )
}