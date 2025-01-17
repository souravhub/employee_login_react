import React, { useEffect } from "react";
import { Input, SelectInput, Button, Card } from "../index";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axiosConfig.js";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState("user");
    const [jobProfile, setJobProfile] = React.useState("user");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const submit = async function (data) {
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const {
            firstName,
            lastName,
            email,
            userName,
            userType,
            password,
            jobProfile,
            confirmPassword,
        } = data;

        const apiBody = {
            name: { firstName, lastName },
            email,
            userName,
            userType,
            password,
            jobProfile,
        };

        const res = await axiosInstance.post(`/users/register`, apiBody);
        navigate("/login");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8.5rem)]">
            <div className="w-2/5 my-4">
                <p className="text-3xl font-bold mb-6 text-center">
                    Welcome to Sign Up Page
                </p>
                <Card className="px-6 py-4 ">
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="flex flex-wrap"
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
                            labelKey="text"
                            valueKey="value"
                            label="User Type"
                            value={userType}
                            onSelect={(value) => setUserType(value)}
                            invalid={errors.userType}
                            invalidMsg={errors?.userType?.message || ""}
                            className="mb-4 w-full"
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
                            value={jobProfile}
                            onSelect={(value) => setJobProfile(value)}
                            invalid={errors.jobProfile}
                            invalidMsg={errors?.jobProfile?.message || ""}
                            className="mb-4 w-full"
                            {...register("jobProfile", {
                                required: "Job profile is required",
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Password"
                            invalid={errors.password}
                            invalidMsg={errors?.password?.message || ""}
                            className="mb-4"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            invalid={errors.confirmPassword}
                            invalidMsg={errors?.confirmPassword?.message || ""}
                            className="mb-8"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Loading..." : "Sign Up"}
                        </Button>
                    </form>
                    <div className="text-right mt-2">
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className=" text-blue-500 underline"
                            >
                                Go to Sign In Page
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignUp;
