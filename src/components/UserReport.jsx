import React from "react";
import { useState, useEffect } from "react";
import { SelectInput, Button, LoginLogoutInfo } from "./index";
import moment from "moment";
import axiosInstance from "../axiosConfig.js";
import { useSelector, useDispatch } from "react-redux";
import { setTodayInfo } from "@/store/loginInfoSlice";

function UserReport() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const [userType, setUserType] = useState(0);

    const onDateFilterChange = async (value) => {
        setUserType(value);
        const startDate = moment().subtract(value, "days").format("YYYY-MM-DD");
        const endDate = moment().format("YYYY-MM-DD");
        try {
            const res = await axiosInstance.get(
                `/login-info/user-login-docs?startDate=${startDate}&endDate=${endDate}&page=1&limit=5`,
            );
            console.log(res.data.data, "res.data.data");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onDateFilterChange(userType);
    }, []);

    return (
        <>
            <LoginLogoutInfo />
            <div className="flex items-center justify-between">
                <p className="text-2xl font-medium">Your Report</p>
                <SelectInput
                    options={[
                        { text: "Today", value: 0 },
                        { text: "Last 7 Days", value: 6 },
                        { text: "Last 30 Days", value: 29 },
                    ]}
                    labelKey="text"
                    valueKey="value"
                    value={userType}
                    className="w-40"
                    onChange={onDateFilterChange}
                />
            </div>
        </>
    );
}

export default UserReport;
