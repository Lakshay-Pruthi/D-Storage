import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

function Main() {
    return (
        <>

            <Outlet />
            <Footer />
        </>
    )
}

export default Main;