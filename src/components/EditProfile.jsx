import React from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input, SelectInput, Button } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import axiosInstance from "../axiosConfig.js";

function EditProfile({ onClose, ...props }) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async function (data) {
        const { firstName, lastName, email, userName, userType, jobProfile } =
            data;
        const apiBody = {
            firstName,
            lastName,
            email,
            userName,
            userType,
            jobProfile,
        };
        try {
            const res = await axiosInstance.put(`/users/update-info`, apiBody);

            const { refreshToken } = JSON.parse(
                localStorage.getItem("empLogin:user"),
            );

            const userData = {
                ...res.data.data,
                refreshToken,
            };

            localStorage.setItem("empLogin:user", JSON.stringify(userData));
            dispatch(authLogin({ userData }));
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        reset({
            firstName: userData?.name?.firstName || "",
            lastName: userData?.name?.lastName || "",
            email: userData?.email || "",
            userName: userData?.userName || "",
            userType: userData?.userType || "",
            jobProfile: userData?.jobProfile || "",
        });
    }, [userData]);
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">Edit Profile</p>
                <X
                    className="h-4
                5 w-5 cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-wrap"
                aria-modal={true}
            >
                <Input
                    label="First Name"
                    placeholder="Enter Your First Name"
                    invalid={errors.firstName}
                    invalidMsg={errors?.firstName?.message || ""}
                    className="mb-4"
                    {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                            value: 3,
                            message:
                                "First name must be at least 3 characters long",
                        },
                    })}
                />
                <Input
                    label="First Name"
                    placeholder="Enter Your Last Name"
                    invalid={errors.lastName}
                    invalidMsg={errors?.lastName?.message || ""}
                    className="mb-4"
                    {...register("lastName", {
                        required: "Last name is required",
                    })}
                />
                <Input
                    label="Email"
                    placeholder="Enter Your email address"
                    invalid={errors.email}
                    invalidMsg={errors?.email?.message || ""}
                    className="mb-4"
                    disabled
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                <Input
                    label="User Name"
                    placeholder="Enter User Name"
                    invalid={errors.userName}
                    invalidMsg={errors?.userName?.message || ""}
                    className="mb-4"
                    {...register("userName", {
                        required: "User name is required",
                    })}
                />
                <SelectInput
                    options={[
                        { text: "User", value: "user" },
                        { text: "Admin", value: "admin" },
                    ]}
                    disabled
                    labelKey="text"
                    valueKey="value"
                    label="User Type"
                    invalid={errors.userType}
                    invalidMsg={errors?.userType?.message || ""}
                    className="mb-4"
                    {...register("userType", {
                        required: "User type is required",
                    })}
                />
                <SelectInput
                    options={[
                        "Frontend Developer",
                        "Backend Developer",
                        "Architect",
                        "UX Designer",
                        "Project Manager",
                    ]}
                    label="Job Profile"
                    invalid={errors.jobProfile}
                    invalidMsg={errors?.jobProfile?.message || ""}
                    className="mb-4"
                    {...register("jobProfile", {
                        required: "Job profile is required",
                    })}
                />
                <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Update"}
                </Button>
            </form>
        </>
    );
}

export default EditProfile;
