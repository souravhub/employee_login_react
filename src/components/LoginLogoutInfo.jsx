import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, ConfirmDialog } from "./index";
import moment from "moment";
import axiosInstance from "../axiosConfig.js";
import { useSelector, useDispatch } from "react-redux";
import { setTodayInfo } from "@/store/loginInfoSlice";
import { Loader2 } from "lucide-react";

function LoginLogoutInfo({ onLoginLogout }) {
    const dispatch = useDispatch();
    const todayLoginData = useSelector((state) => state.loginInfo.todayInfo);
    const userData = useSelector((state) => state.auth.userData);
    const [loginSubmitting, setLoginSubmitting] = useState(false);
    const [logoutSubmitting, setLogoutSubmitting] = useState(false);
    const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

    const submitLoginTime = async () => {
        setLoginSubmitting(true);
        try {
            const res = await axiosInstance.post(`/login-info/create`, {});
            dispatch(setTodayInfo(res.data.data));
            onLoginLogout();
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoginSubmitting(false);
        }
    };

    const initLogout = () => {
        setLogoutConfirmModal(true);
    };

    const submitLogoutTime = async () => {
        setLogoutSubmitting(true);
        try {
            const res = await axiosInstance.post(
                `/login-info/logout-update`,
                {},
            );
            dispatch(setTodayInfo(res.data.data));
            setLogoutConfirmModal(false);
            onLoginLogout();
        } catch (error) {
            console.log(error.message);
        } finally {
            setLogoutSubmitting(false);
        }
    };

    const fetchTodayLoginInfo = async () => {
        if (todayLoginData) return;
        try {
            const res = await axiosInstance.get(`/login-info/today-login`);
            dispatch(setTodayInfo(res.data.data));
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchTodayLoginInfo();
    }, []);
    return (
        <>
            <Card className="my-4">
                <div className="flex justify-between items-center p-2">
                    <span className="text-3xl inline-block">
                        Welcome!! {userData?.name.firstName || ""}
                    </span>
                    {!todayLoginData && (
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold">
                                Please Submit
                            </span>
                            <Button
                                size="sm"
                                className="px-4 bg-green-500 hover:bg-green-600"
                                onClick={submitLoginTime}
                            >
                                {loginSubmitting && (
                                    <Loader2 className="animate-spin" />
                                )}
                                Login
                            </Button>
                            <span className="text-lg font-semibold">Time</span>
                        </div>
                    )}
                    {todayLoginData?.loginInfo?.time && (
                        <span className="text-lg font-semibold">
                            You logged in today at{" "}
                            {moment(todayLoginData.loginInfo.time).format(
                                "hh:mm A",
                            )}
                        </span>
                    )}
                    {todayLoginData?.loginInfo?.isDone &&
                        !todayLoginData?.logoutInfo?.isDone && (
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold">
                                    Please Submit
                                </span>
                                <Button
                                    size="sm"
                                    className="px-4 bg-red-500 hover:bg-red-600"
                                    onClick={initLogout}
                                >
                                    {logoutSubmitting && (
                                        <Loader2 className="animate-spin" />
                                    )}
                                    Logout
                                </Button>
                                <span className="text-lg font-semibold">
                                    Time
                                </span>
                            </div>
                        )}
                    {todayLoginData?.logoutInfo?.time && (
                        <span className="text-lg font-semibold">
                            You logged out today at{" "}
                            {moment(todayLoginData.logoutInfo.time).format(
                                "hh:mm A",
                            )}
                        </span>
                    )}
                </div>
            </Card>
            {logoutConfirmModal && (
                <ConfirmDialog
                    isOpen={logoutConfirmModal}
                    onCancel={() => setLogoutConfirmModal(false)}
                    onConfirm={submitLogoutTime}
                />
            )}
        </>
    );
}

export default LoginLogoutInfo;
