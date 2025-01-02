import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { buttonVariants, ProfileOptions } from "../index.js";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <header className="shadow sticky z-50 top-0 bg-amber-300 px-32 flex flex-wrap justify-between items-center h-[4.5rem]">
            <Link to="/" className="flex items-center">
                <img
                    src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                    className="mr-3 h-12"
                    alt="Logo"
                />
            </Link>
            <div className="flex items-center">
                {!authStatus && (
                    <Link
                        to="/login"
                        className={buttonVariants({
                            variant: "default",
                        })}
                    >
                        Log in
                    </Link>
                )}
                {authStatus && <ProfileOptions />}
            </div>
        </header>
    );
}
