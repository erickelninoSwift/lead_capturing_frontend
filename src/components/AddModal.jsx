import React, { useState } from "react";

function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
}

const AddModal = ({ setAddleadModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [customError, setCustomError] = useState("");

  const handleAddmemeber = async (e) => {
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
      setAddleadModal(false);
      setEmail("");
      setContact("");
      setName("");
    }
  };
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
        <div className="flex items-center pb-3 border-b text-black">
          <h3 className="text-xl font-bold flex-1"></h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
            onClick={() => setAddleadModal(false)}
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            ></path>
          </svg>
        </div>

        <div className="bg-blue-800 px-10 py-10 text-center text-white">
          <p className="font-serif text-2xl font-semibold tracking-wider">
            Add Lead
          </p>
          <p className="text-center text-blue-100">Enter contact details </p>
        </div>

        <div className="space-y-4 px-8 py-10">
          <label className="block" htmlFor="name">
            <p className="text-gray-600">Name</p>
            <input
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block" htmlFor="name">
            <p className="text-gray-600">Email Address</p>
            <input
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block" htmlFor="name">
            <p className="text-gray-600">Phone number</p>
            <input
              className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
              type="text"
              placeholder="Enter your Phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
        </div>
        {customError && (
          <p className="text-sm h-[35px] w-[90%] mx-auto flex justify-center items-center rounded-md bg-red-400 text-red-900">
            {customError}
          </p>
        )}
        <div className="border-t flex justify-end pt-6 space-x-4">
          <button
            type="button"
            className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={() => setAddleadModal(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            onClick={(e) => handleAddmemeber(e)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
