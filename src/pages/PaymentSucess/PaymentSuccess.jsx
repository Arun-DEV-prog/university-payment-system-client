import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const tranId = params.get("tran_id");
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    if (tranId) {
      axios
        .get(`http://localhost:3000/invoice/${tranId}`)
        .then((res) => setInvoice(res.data))
        .catch((err) => console.error("Invoice fetch error:", err));
    }
  }, [tranId]);

  const handleDownload = () => {
    const element = invoiceRef.current;

    if (!element || !window.html2pdf) {
      alert("Invoice not ready or PDF library missing.");
      return;
    }

    setTimeout(() => {
      window
        .html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `Invoice_${tranId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }, 300);
  };

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = invoiceRef.current.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload back to full app
  };

  if (!invoice) {
    return <p className="text-center mt-10 text-lg">Loading invoice...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
        🎓 Payment Successful
      </h2>

      {/* Printable Invoice */}
      <div
        ref={invoiceRef}
        className="bg-white border p-6 rounded-md shadow space-y-2"
      >
        <h3 className="text-lg font-semibold text-center">
          University Invoice
        </h3>
        <p>
          <strong>Transaction ID:</strong> {invoice.transactionId}
        </p>
        <p>
          <strong>Student Name:</strong> {invoice.studentName}
        </p>
        <p>
          <strong>Student Email:</strong> {invoice.studentEmail}
        </p>
        <p>
          <strong>Student ID:</strong> {invoice.studentId}
        </p>
        <p>
          <strong>Semester:</strong> {invoice.semester}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-green-700">{invoice.status}</span>
        </p>

        <h4 className="font-semibold pt-4">Fee Breakdown:</h4>
        <ul className="list-disc pl-5">
          {Object.entries(invoice.breakdown || {}).map(([key, value]) => (
            <li key={key}>
              {key.replace(/([A-Z])/g, " $1")}: ৳{value}
            </li>
          ))}
        </ul>

        <p className="text-lg font-bold pt-4">Total Paid: ৳{invoice.amount}</p>
        <p>
          <strong>Date:</strong> {new Date(invoice.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownload}
          disabled={!invoice}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          📄 Download Invoice PDF
        </button>

        <button
          onClick={handlePrint}
          disabled={!invoice}
          className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          🖨️ Print Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
