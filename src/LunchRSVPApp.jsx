// LunchRSVPApp.jsx
import React, { useState } from "react";
import { QRCode } from "react-qr-code"; // Fixed named import

export default function LunchRSVPApp() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [qrData, setQrData] = useState("");

  const submitRSVP = async () => {
    if (!name || !date) return alert("Please enter all fields");
    const payload = `${name}|${date}`;
    setQrData(payload);
    setSubmitted(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzrjtXU47B8GWvJBLPGsAr5Raav8Dsj3wW7oFYUids-E-es-uXlD0LNc2jv3bIsWK0Q/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, date }),
      });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Lunch RSVP</h1>

      {!submitted ? (
        <div className="space-y-4">
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={submitRSVP}
          >
            Submit & Get QR
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-lg font-semibold">Show this QR at the lunch counter:</p>
          {qrData && typeof qrData === 'string' && (
            <div className="mt-4 bg-white p-4 inline-block">
              <QRCode value={String(qrData)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
