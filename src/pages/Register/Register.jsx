import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Fixed import

import { toast } from "react-toastify";
import "./page.css";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    signUp(data.email, data.password)
      .then((result) => {
        console.log("Registered user:", result.user);
        navigate("/login");
        toast.success("✅ Registration successful!");
        reset();
      })
      .catch((err) => {
        console.error("Error registering:", err.message);
        toast.error(`❌ ${err.message}`);
      });
  };

  return (
    <div className="hero pg-bg min-h-96 p-3">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register Now</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            {/* Department */}
            <label className="label mt-4">
              <span className="label-text">Department</span>
            </label>
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className="select select-bordered w-full"
            >
              <option value="">Select your department</option>
              <option value="CSE">Computer Science & Engineering (CSE)</option>
              <option value="EEE">
                Electrical & Electronic Engineering (EEE)
              </option>
              <option value="Business">Business Administration</option>
              <option value="English">English</option>
              <option value="Law">Law</option>
              <option value="PublicHealth">Public Health</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}

            {/* Student ID */}
            <label className="label mt-4">
              <span className="label-text">Student ID</span>
            </label>
            <input
              type="text"
              placeholder="Student ID"
              {...register("studentId", { required: "Student ID is required" })}
              className="input input-bordered w-full"
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentId.message}
              </p>
            )}

            {/* Email */}
            <label className="label mt-4">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full"
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
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button type="submit" className="btn btn-neutral w-full mt-6">
              Register
            </button>
          </form>

          <p className="font-bold text-center mt-4">
            Already Have An Account?{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
