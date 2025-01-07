import React from "react";
import { UserReport, AdminReport } from "@/components";
import { useSelector, useDispatch } from "react-redux";

function Home() {
    const userData = useSelector((state) => state.auth.userData);
    return (
        <div className="">
            {userData?.userType == "user" && <UserReport />}
            {userData?.userType == "admin" && <AdminReport />}
        </div>
    );
}

export default Home;
