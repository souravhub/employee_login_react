import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PenSquareIcon, Loader2 } from "lucide-react";
import axiosInstance from "../axiosConfig.js";
import { Button } from "@/components/index.js";

function UserDetails() {
    const fileInputRef = useRef(null);
    const [uploadedImgData, setUploadedImgData] = useState(null);
    const [profileImgUrl, setProfileImgUrl] = useState(
        "../../public/image/default_profile.png",
    );
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClickEdit = function () {
        fileInputRef.current.click();
    };

    const onselectFile = async function (event) {
        try {
            setIsSubmitting(true);
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            if (uploadedImgData && uploadedImgData.cldPublicId) {
                await axiosInstance.delete(`/api/v1/storage/upload`, {
                    cldPublicId: uploadedImgData.cldPublicId,
                });
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
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (uploadedImgData && uploadedImgData.cldPublicId) {
            setProfileImgUrl(uploadedImgData.url);
        } else if (userData?.profileImg?.imgUrl) {
            setProfileImgUrl(userData.profileImg.imgUrl);
        }
    }, [uploadedImgData]);

    return (
        <div className="min-h-[calc(100vh-8.5rem)] my-4">
            <section className="flex justify-center">
                <div className="relative">
                    <div className=" rounded-[50%] border-[1px] border-gray-400 h-32 w-32  flex justify-center items-center overflow-hidden">
                        <img
                            src={profileImgUrl}
                            alt=""
                            className="w-full h-full object-fill"
                        />
                    </div>
                    <Button
                        type="button"
                        className="absolute right-[-15px] bottom-[5px] px-2"
                        size="xs"
                        disabled={isSubmitting}
                        onClick={onClickEdit}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <PenSquareIcon size={20} />
                                <span>Edit</span>
                            </div>
                        )}
                    </Button>
                </div>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onInput={(e) => onselectFile(e)}
                />
            </section>
            <section>{userData?.name?.firstName}</section>
        </div>
    );
}

export default UserDetails;
