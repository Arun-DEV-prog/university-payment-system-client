import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router"; // Fixed import
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn } = useContext(AuthContext); // Fixed: useContext instead of use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("✅ Login Successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error("❌ Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Login Now</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <label className="label mt-4">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div className="mt-2 text-right">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Login
            </button>

            <p className="font-bold text-center mt-4">
              Don't have an account?{" "}
              <Link className="text-blue-600" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
