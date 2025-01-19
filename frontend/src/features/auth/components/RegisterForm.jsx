import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { handleRgister } from "../../../services/auth";
import { toast } from "react-hot-toast";
const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await handleRgister(data);
    const josnData = await res.json();
    if (res.ok) {
      toast.success(josnData.message);
      navigate("/login");
    } else {
      toast.error(josnData.message);
    }
    reset();
  };

  return (
    <div className=" max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
      <h1 className=" md:text-3xl text-xl font-extrabold text-gray-900">
        Create an account
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-y-5"
      >
        <div>
          <label className=" mb-1 block text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="eg. John Doe"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className=" mt-1 block w-full rounded-md border-gray-400 shadow-lg px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className=" text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <label className=" mb-1 block text-sm font-semibold text-gray-700">
            Confirm Password
          </label>
          <input
            placeholder="eg.jLjoe1232"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            type="password"
            className={`${
              errors.confirmPassword
                ? "border border-red-500 text-red-500"
                : "border-none"
            } px-4 py-2 mt-1 block w-full rounded-md shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.confirmPassword && (
            <p className=" text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
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
              
              I agree to the terms and Conditions
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>

      <div className=" text-center">
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
