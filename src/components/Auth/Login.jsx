import React, { useEffect } from "react";
import { Input, Button } from "../index";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axiosConfig.js";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice.js";
import { Loader2 } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const submit = async function (data) {
        const { email, password } = data;

        const apiBody = {
            email,
            userName: email,
            password,
        };

        const res = await axiosInstance.post(`/api/v1/users/login`, apiBody);
        const { accessToken, refreshToken, user } = res.data.data;
        const userData = {
            ...user,
            refreshToken,
        };
        localStorage.setItem("empLogin:token", accessToken);
        localStorage.setItem("empLogin:user", JSON.stringify(userData));
        dispatch(authLogin({ userData }));
        navigate("/");
    };

    return (
        <>
            <div className="w-1/2 m-auto my-4">
                <form
                    onSubmit={handleSubmit(submit)}
                    className="flex flex-wrap"
                >
                    <Input
                        type="text"
                        label="Email or User Name"
                        placeholder="Enter Your email address or user name"
                        invalid={errors.email}
                        invalidMsg={errors?.email?.message || ""}
                        className="mb-4"
                        {...register("email", {
                            required: "Email or username is required",
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
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
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>
            <div className="flex h-64 items-center">
                <Link
                    to="/signup"
                    className="bg-blue-700 p-2 text-yellow-300 rounded-md"
                >
                    Go to Sign Up Page
                </Link>
            </div>
        </>
    );
}

export default Login;
