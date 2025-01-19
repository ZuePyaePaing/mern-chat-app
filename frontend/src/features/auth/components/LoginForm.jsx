import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleLogin } from "../../../services/auth";
import useCookie from "react-use-cookie";
import { tailspin } from "ldrs";

tailspin.register();

const LoginForm = () => {
  const navigate = useNavigate();
  const [token, setToken] = useCookie("my_token");
  const [user, setUser] = useCookie("my_user");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await handleLogin(data);
    const jsonData = await response.json();

    if (response.ok) {
      setToken(jsonData.token);
      setUser(JSON.stringify(jsonData.user));
      navigate("/dashboard");
    }
    reset();
  };

  return (
    <div className=" max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
      <h1 className=" mt-6 text-3xl font-extrabold text-gray-900">
        Log in to your account
      </h1>
      <form
        className=" flex flex-col gap-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className=" mb-1 block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <input
            placeholder="eg. 2Ox9g@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            className=" px-4 py-2 mt-1 block w-full rounded-md border-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className=" text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className=" mb-1 block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            placeholder="eg.jLjoe1232"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            className={`${
              errors.password
                ? " border border-red-500 text-red-500"
                : "border-none"
            } px-4 py-2 mt-1 block w-full rounded-md shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.password && (
            <p className=" text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className=" flex justify-between">
          <div className=" flex gap-x-2 items-center">
            <input
              {...register("terms", {
                required: "Please accept terms and conditions",
              })}
              type="checkbox"
              className=" w-4 h-4"
            />
            {errors.terms ? (
              <p className=" text-red-500 text-sm">{errors.terms.message}</p>
            ) : (
              <span className=" text-sm">
                {" "}
                I agree to the terms and Conditions
              </span>
            )}
          </div>
          <Link
            to={"/forgot-password"}
            className=" text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot password
          </Link>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? (
              <l-tailspin
                size="20"
                stroke="2"
                speed="0.9"
                color="white"
              ></l-tailspin>
            ) : (
              " Sign in"
            )}
          </button>
        </div>
      </form>
      <div className="text-center">
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
