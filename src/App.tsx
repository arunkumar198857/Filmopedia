import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    );
}
