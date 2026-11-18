export default function ErrorMessage({ children }) {
    return <p className="notice notice-error" role="alert">{children}</p>;
}
