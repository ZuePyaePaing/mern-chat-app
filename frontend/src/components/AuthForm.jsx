import React from "react";
import { useForm } from "react-hook-form";
import Container from "./Container";
import { tailspin } from "ldrs";
import { toast } from "react-hot-toast";
import { useNavigate,Link } from "react-router-dom";

tailspin.register();

const AuthForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url =
        import.meta.env.VITE_API_URL + (isLogin ? "/login" : "/register");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      if (isLogin) {
        navigate("/");
      } else {
        navigate("/login");
      }
      toast.success(result.message);

      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Container className={"flex items-center justify-center"}>
      <div className="flex flex-col items-center gap-y-4 w-[400px] bg-slate-300 rounded-lg shadow-lg p-4">
        <h1 className="font-bold text-2xl">{isLogin ? "Login" : "Register"}</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 w-full"
        >
          {!isLogin && (
            <div className="flex flex-col gap-y-2 w-full">
              <label htmlFor="name" className=" font-bold text-base">
                Name
              </label>
              <input
                id="name"
                className={` text-base font-normal bg-slate-100 p-2 rounded-sm  outline-none ${
                  errors.name
                    ? " border border-red-500 text-red-500"
                    : "border-none"
                }`}
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                placeholder="eg.John"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="email" className=" font-bold text-base">
              Email
            </label>
            <input
              className={` text-base font-normal bg-slate-100 p-2 rounded-sm ${
                errors.email
                  ? "border border-red-500 text-red-500"
                  : "border-none"
              } outline-none`}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="eg.john@example"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="password" className=" font-bold text-base">
              Password
            </label>
            <input
              className=" text-base font-normal bg-slate-100 p-2 rounded-sm border-none outline-none"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {!isLogin && (
            <div className="flex flex-col gap-y-2 w-full">
              <label htmlFor="confirmPassword" className=" font-bold text-base">
                Confirm Password
              </label>
              <input
                className={` text-base font-normal bg-slate-100 p-2 rounded-sm ${
                  errors.confirmPassword
                    ? "border border-red-500 text-red-500"
                    : "border-none"
                }  outline-none`}
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                  required: "Confirm Password is required",
                })}
                placeholder="********"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
          <div className=" self-start flex items-center justify-between">
            <div>
              <input
                type="checkbox"
                className=" size-4"
                {...register("terms", { required: true })}
              />
              {errors.terms ? (
                <p className="text-red-500 text-sm">
                  Please accept the terms and conditions
                </p>
              ) : (
                <p className=" text-sm">I agree to the terms and conditions</p>
              )}
            </div>
          
              <Link to="/forget-password" className=" self-start font-medium hover:text-blue-600 text-sm text-blue-500">forget password?</Link>
           
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" w-full bg-blue-500 text-white font-bold p-2 rounded-sm disabled:bg-blue-400"
          >
            {isSubmitting ? (
              <l-tailspin
                size="18"
                stroke="5"
                speed="0.9"
                color="black"
              ></l-tailspin>
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default AuthForm;
