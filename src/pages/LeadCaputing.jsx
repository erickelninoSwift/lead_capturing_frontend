import React, { useState } from "react";

function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
}

const LeadCaputing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [customError, setCustomError] = useState("");
  const [message, setMessage] = useState("");

  const handleNname = (e) => {
    e.preventDefault();

    setName(() => e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();

    setEmail(() => e.target.value);
  };

  const handlePhonenumber = (e) => {
    e.preventDefault();

    setContact(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      setCustomError("Please do not leave empty fields");
      return setTimeout(() => setCustomError(""), 3000);
    }

    const response = await fetch(`http://localhost:8080/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        contact,
        date: formatDate(new Date()),
      }),
    });

    const datacaptured = await response.json();

    if (datacaptured.detail) {
      setCustomError(datacaptured.detail);
      return setTimeout(() => {
        return setCustomError("");
      }, 3000);
    } else {
      setMessage(datacaptured.message);
      setEmail("");
      setContact("");
      setName("");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="w-screen flex justify-center items-center h-[100%] bg-gray-50">
      <div className="flex justify-center h-[700px] w-screen items-center overflow-hidden px-2">
        <div className="">
          <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
            <div className="bg-blue-800 px-10 py-10 text-center text-white">
              <p className="font-serif text-2xl font-semibold tracking-wider">
                Lead Capturing App
              </p>
              <p className="text-center text-blue-100">
                Please provide your contact details
              </p>
            </div>

            <div className="space-y-4 px-8 py-10">
              <label className="block" htmlFor="name">
                <p className="text-gray-600">Name</p>
                <input
                  className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => handleNname(e)}
                />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-gray-600">Email Address</p>
                <input
                  className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-gray-600">Phone number</p>
                <input
                  className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                  type="text"
                  placeholder="Enter your Phone number"
                  value={contact}
                  onChange={(e) => handlePhonenumber(e)}
                />
              </label>
              <button
                className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
              {message && (
                <p className="text-sm h-[40px] w-[100%] flex justify-center items-center rounded-md bg-green-300 text-green-700">
                  {message}
                </p>
              )}
              {customError && (
                <p className="text-sm h-[40px] w-[100%] flex justify-center items-center rounded-md bg-red-400 text-red-900">
                  {customError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaputing;
