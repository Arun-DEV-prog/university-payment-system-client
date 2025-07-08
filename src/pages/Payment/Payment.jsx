import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Payment = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Calculate total of fees dynamically
  const total = Object.values(watch()).reduce((sum, val) => {
    return typeof val === "string" && !isNaN(Number(val))
      ? sum + Number(val || 0)
      : sum;
  }, 0);

  const semesterOptions = [
    "Spring 2025",
    "Summer 2025",
    "Fall 2025",
    "Winter 2025",
  ];

  const onSubmit = async (data) => {
    // Extract fees and rest fields
    const { studentId, semester, ...fees } = data;

    // Calculate total amount
    const amount = Object.values(fees)
      .map(Number)
      .reduce((a, b) => a + b, 0);

    // Build payment payload
    const paymentData = {
      studentId,
      studentEmail: user?.email,
      studentName: user?.name || user?.displayName || "Anonymous",
      semester,
      amount,
      breakdown: fees,
      status: "Pending", // initial status
    };

    console.log("Sending payment data:", paymentData);

    // Basic validation to avoid empty user info
    if (!paymentData.studentEmail || !paymentData.studentName) {
      alert("User information is missing. Please login properly.");
      return;
    }

    try {
      // Save payment info in DB
      await axios.post("http://localhost:3000/payments", paymentData);

      // Initiate payment process
      const response = await axios.post(
        "http://localhost:3000/order",
        paymentData
      );

      // Redirect to payment gateway if URL received
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        alert("Failed to start payment.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        University Fee Payment
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Student Name (read-only) */}
        <div>
          <label className="block text-black mb-1">Student Name:</label>
          <input
            type="text"
            value={user?.name || user?.displayName || ""}
            readOnly
            className="w-full border border-gray-300 px-4 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Student Email (read-only) */}
        <div>
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        {/* Student ID (user input) */}
        <div>
          <label className="block text-gray-700 mb-1">Student ID:</label>
          <input
            type="text"
            placeholder="Enter your Student ID"
            {...register("studentId", {
              required: "Student ID is required",
              minLength: { value: 5, message: "Too short" },
            })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.studentId && (
            <span className="text-red-500 text-sm">
              {errors.studentId.message}
            </span>
          )}
        </div>

        {/* Semester Dropdown */}
        <div>
          <label className="block text-gray-700 mb-1">Select Semester:</label>
          <select
            {...register("semester", { required: "Please select a semester" })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose Semester --</option>
            {semesterOptions.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
          {errors.semester && (
            <span className="text-red-500 text-sm">
              {errors.semester.message}
            </span>
          )}
        </div>

        {/* Fee Inputs */}
        {[
          "semesterFee",
          "registrationFee",
          "libraryFee",
          "labFee",
          "hostelFee",
          "otherFee",
        ].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 mb-1 capitalize">
              {field.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              {...register(field, {
                required: false,
                min: { value: 0, message: "Amount cannot be negative" },
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[field] && (
              <span className="text-red-500 text-sm">
                {errors[field].message}
              </span>
            )}
          </div>
        ))}

        {/* Total */}
        <p className="text-lg font-semibold pt-4">
          Total: <span className="text-green-600">${total}</span>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
