import type { ReactNode } from "react";

interface ErrorMessageProps {
    children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps): JSX.Element {
    return <p className="notice notice-error" role="alert">{children}</p>;
}
