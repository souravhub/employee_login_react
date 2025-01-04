import React from "react";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
            <div className="px-32 p-2 bg-blue-50">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Layout;
