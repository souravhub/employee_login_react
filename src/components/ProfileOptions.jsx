import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout } from "../store/authSlice.js";
import axiosInstance from "../axiosConfig.js";
import { ConfirmDialog } from "./index.js";

function ProfileOptions() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const [profileImgUrl, setProfileImgUrl] = useState(
        "../../public/image/default_profile.png",
    );
    const [logoutConfirmModal, setLogoutConfirmModal] = useState(false);

    const initLogout = async function () {
        try {
            await axiosInstance.post(`/users/logout`);
        } catch (error) {
            console.log(error.message);
        } finally {
            dispatch(authLogout());
            localStorage.removeItem("empLogin:token");
            localStorage.removeItem("empLogin:user");
            navigate("/login");
            setLogoutConfirmModal(false);
        }
    };

    useEffect(() => {
        if (userData?.profileImg?.imgUrl) {
            setProfileImgUrl(userData?.profileImg?.imgUrl);
        } else {
            setProfileImgUrl("/image/default_profile.png");
        }
    }, [userData]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={profileImgUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => navigate("/user-details")}
                    >
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => setLogoutConfirmModal(true)}
                    >
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {logoutConfirmModal && (
                <ConfirmDialog
                    isOpen={logoutConfirmModal}
                    onCancel={() => setLogoutConfirmModal(false)}
                    onConfirm={initLogout}
                />
            )}
        </>
    );
}

export default ProfileOptions;
