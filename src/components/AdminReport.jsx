import React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, SelectInput, DatePicker } from ".";
import moment from "moment";
import axiosInstance from "../axiosConfig.js";
import { useSelector, useDispatch } from "react-redux";
import { setTodayInfo, setAllInfo } from "@/store/loginInfoSlice";
import { setUserList } from "@/store/authSlice";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function AdminReport() {
    const dispatch = useDispatch();
    const allLoginInfo = useSelector((state) => state.loginInfo.allInfo);
    const userList = useSelector((state) => state.auth.userList);
    const [selectedUser, setSelectedUser] = useState("");
    const [curTab, setCutTab] = useState("date");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateFilterChange = (value) => {
        setSelectedUser(value);
        fetchLoginDataByDate();
    };

    const fetchLoginDataByDate = async () => {
        try {
            const res = await axiosInstance.get(
                `/login-info/all-users-login-docs?date=${moment(selectedDate).format("YYYY-MM-DD")}&page=1&limit=30`,
            );
            dispatch(setAllInfo(res.data?.data?.list || []));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await axiosInstance.get(`/users/user-list`);
            dispatch(setUserList(res?.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    const onSelectDate = (value) => {
        setSelectedDate(value);
    };

    useEffect(() => {
        fetchLoginDataByDate();
    }, []);
    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <Card className="my-4 p-4">
            <div className="flex justify-between items-center mb-4">
                {/* <p className="text-xl font-medium">All Report</p> */}
                <Tabs defaultValue="date" className="">
                    <TabsList>
                        <TabsTrigger
                            value="date"
                            onClick={() => setCutTab("date")}
                        >
                            By Date
                        </TabsTrigger>
                        <TabsTrigger
                            value="user"
                            onClick={() => setCutTab("user")}
                        >
                            By User
                        </TabsTrigger>
                    </TabsList>
                    {/* <TabsContent value="account">
                        Make changes to your account here.
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent> */}
                </Tabs>
                {curTab === "user" && (
                    <SelectInput
                        options={userList}
                        labelKey="name"
                        valueKey="_id"
                        value={selectedUser}
                        className="w-40"
                        selectClassName="text-sm font-medium py-[6px]"
                        onSelect={onDateFilterChange}
                    />
                )}
                {curTab === "date" && (
                    <DatePicker
                        selectedDate={selectedDate}
                        onSelectDate={(value) => onSelectDate(value)}
                    />
                )}
            </div>
            <Table>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="text-black">User Name</TableHead>
                        <TableHead className="text-black">User Type</TableHead>
                        <TableHead className="text-black">Date</TableHead>
                        <TableHead className="text-black">Login Time</TableHead>
                        <TableHead className="text-black">
                            Logout Time
                        </TableHead>
                    </TableRow>
                </TableHeader>
                {!allLoginInfo.length && (
                    <TableCaption className="text-center mb-4 text-xl font-bold">
                        No Data Found
                    </TableCaption>
                )}
                {allLoginInfo && (
                    <TableBody>
                        {allLoginInfo.map((info) => (
                            <TableRow
                                key={info._id}
                                className="hover:bg-muted/50"
                            >
                                <TableCell>
                                    {info?.userInfo?.userName}
                                </TableCell>
                                <TableCell>
                                    {info?.userInfo?.userType?.toUpperCase()}
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
                                        moment(info.logoutInfo?.time).format(
                                            "hh:mm A",
                                        )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
        </Card>
    );
}

export default AdminReport;
