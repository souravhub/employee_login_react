import React from "react";
import { useState, useEffect } from "react";
import { SelectInput, Button, LoginLogoutInfo, Card } from "./index";
import moment from "moment";
import axiosInstance from "../axiosConfig.js";
import { useSelector, useDispatch } from "react-redux";
import { setTodayInfo, setAllInfo } from "@/store/loginInfoSlice";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function UserReport() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const allLoginInfo = useSelector((state) => state.loginInfo.allInfo);
    const [dateFilter, setDateFilter] = useState(0);

    const onDateFilterChange = async (value) => {
        setDateFilter(value);
        const startDate = moment().subtract(value, "days").format("YYYY-MM-DD");
        const endDate = moment().format("YYYY-MM-DD");
        try {
            const res = await axiosInstance.get(
                `/login-info/user-login-docs?startDate=${startDate}&endDate=${endDate}&page=1&limit=30`,
            );
            dispatch(
                setAllInfo({ data: res.data?.data?.list || [], key: "user" }),
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onDateFilterChange(dateFilter);
    }, []);

    return (
        <>
            <LoginLogoutInfo onLoginLogout={onDateFilterChange} />
            <Card className="my-4 p-4">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-medium">Your Report</p>
                    <SelectInput
                        options={[
                            { text: "Today", value: 0 },
                            { text: "Last 7 Days", value: 6 },
                            { text: "Last 30 Days", value: 29 },
                        ]}
                        labelKey="text"
                        valueKey="value"
                        value={dateFilter}
                        className="w-40"
                        selectClassName="text-sm font-medium py-[6px]"
                        onSelect={onDateFilterChange}
                    />
                </div>
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="text-black">
                                User Name
                            </TableHead>
                            <TableHead className="text-black">
                                User Type
                            </TableHead>
                            <TableHead className="text-black">Date</TableHead>
                            <TableHead className="text-black">
                                Login Time
                            </TableHead>
                            <TableHead className="text-black">
                                Logout Time
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    {(!allLoginInfo["user"] ||
                        !allLoginInfo["user"].length) && (
                        <TableCaption className="text-center mb-4 text-xl font-bold">
                            No Data Found
                        </TableCaption>
                    )}
                    {allLoginInfo["user"] && (
                        <TableBody>
                            {allLoginInfo["user"].map((info) => (
                                <TableRow
                                    key={info._id}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell>{userData?.userName}</TableCell>
                                    <TableCell>
                                        {userData?.userType?.toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {moment(info.createdAt).format(
                                            "DD MMM,  YYYY",
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(info.loginInfo?.time).format(
                                            "hh:mm A",
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {info.logoutInfo?.time &&
                                            moment(
                                                info.logoutInfo?.time,
                                            ).format("hh:mm A")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </Card>
        </>
    );
}

export default UserReport;
