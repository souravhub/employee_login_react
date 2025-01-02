import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import axiosInstance from "../axiosConfig.js";
import { Button, Card, EditProfile, ImgEditBtn } from "@/components/index.js";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function UserDetails() {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [uploadedImgData, setUploadedImgData] = useState(null);
    const [profileImgUrl, setProfileImgUrl] = useState(
        "../../public/image/default_profile.png",
    );
    const userData = useSelector((state) => state.auth.userData);
    const [imgUploading, setImgUploading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const onClickEdit = function () {
        fileInputRef.current.click();
    };

    const onselectFile = async function (event) {
        try {
            setImgUploading(true);
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            if (uploadedImgData && uploadedImgData.cldPublicId) {
                await axiosInstance.delete(
                    `/api/v1/storage/delete?cldPublicId=${uploadedImgData.cldPublicId}&fileType=image`,
                );
            }
            const res = await axiosInstance.post(
                `/api/v1/storage/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            setUploadedImgData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            fileInputRef.current.value = null;
            setImgUploading(false);
        }
    };

    const handleUpdate = async function () {
        const { cldPublicId, url } = uploadedImgData;
        try {
            setImgUploading(true);
            if (userData.profileImg.cldPublicId) {
                await axiosInstance.delete(
                    `/api/v1/storage/delete?cldPublicId=${userData.profileImg.cldPublicId}&fileType=image`,
                );
            }
            const res = await axiosInstance.put(`/api/v1/users/update-info`, {
                profileImg: { cldPublicId, imgUrl: url },
            });
            const { refreshToken } = JSON.parse(
                localStorage.getItem("empLogin:user"),
            );

            const userInfo = {
                ...res.data.data,
                refreshToken,
            };

            localStorage.setItem("empLogin:user", JSON.stringify(userInfo));
            dispatch(authLogin({ userData: userInfo }));
            setUploadedImgData(null);
        } catch (error) {
            console.log(error);
        } finally {
            setImgUploading(false);
        }
    };

    useEffect(() => {
        if (uploadedImgData && uploadedImgData.cldPublicId) {
            setProfileImgUrl(uploadedImgData.url);
        } else if (userData?.profileImg?.imgUrl) {
            setProfileImgUrl(userData.profileImg.imgUrl);
        }
    }, [uploadedImgData, userData]);

    return (
        <div className="min-h-[calc(100vh-10.5rem)] my-4">
            <section className="flex justify-center">
                <div className="relative">
                    <div className=" rounded-[50%] border-[1px] border-gray-400 h-32 w-32  flex justify-center items-center overflow-hidden">
                        <img
                            src={profileImgUrl}
                            alt=""
                            className="w-full h-full object-fill"
                        />
                    </div>
                    <ImgEditBtn
                        onClickEdit={onClickEdit}
                        onClickUpdate={handleUpdate}
                        editBtnLoading={imgUploading}
                        updateBtnLoading={imgUploading}
                        imgUploaded={uploadedImgData ? true : false}
                    />
                    {/* <Button
                        type="button"
                        className="absolute right-[-15px] bottom-[5px] px-2"
                        size="xs"
                        disabled={imgUploading}
                        onClick={onClickEdit}
                    >
                        {imgUploading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <PenSquareIcon size={20} />
                                <span>Edit</span>
                            </div>
                        )}
                    </Button> */}
                </div>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onInput={(e) => onselectFile(e)}
                />
            </section>
            <Card className="mt-8">
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">User Details</h2>
                    <Button size="sm" onClick={() => setOpenDialog(true)}>
                        Edit Info
                    </Button>
                </div>
                <div className="mt-4 flex justify-between flex-wrap">
                    <div className="">
                        <span className="text-lg font-bold mr-4">Name:</span>
                        <span className="text-lg">
                            {userData?.name?.firstName}{" "}
                            {userData?.name?.lastName}
                        </span>
                    </div>
                    <div className="">
                        <span className="text-lg font-bold mr-4">Email:</span>
                        <span className="text-lg">{userData?.email}</span>
                    </div>
                    <div className="">
                        <span className="text-lg font-bold mr-4">
                            User Name:
                        </span>
                        <span className="text-lg">{userData?.userName}</span>
                    </div>
                </div>
                <div className="mt-4 flex justify-between flex-wrap">
                    <div className="">
                        <span className="text-lg font-bold mr-4">
                            User Type:
                        </span>
                        <span className="text-lg">
                            {userData?.userType &&
                                userData?.userType.toUpperCase()}
                        </span>
                    </div>
                    <div className="">
                        <span className="text-lg font-bold mr-4">
                            Job Profile:
                        </span>
                        <span className="text-lg">{userData?.jobProfile}</span>
                    </div>
                </div>
            </Card>
            <AlertDialog open={openDialog}>
                <AlertDialogTrigger></AlertDialogTrigger>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
                <AlertDialogContent className="min-w-96">
                    <EditProfile onClose={() => setOpenDialog(false)} />
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default UserDetails;
