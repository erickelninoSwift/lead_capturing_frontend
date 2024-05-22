import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setSignInnow }) => {
  const [email, setEmail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    e.preventDefault();

    setEmail(() => e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();

    setPassword(() => e.target.value);
  };

  const handleRePassword = (e) => {
    e.preventDefault();

    setConfirmPassword(() => e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Make sure all field are filled");
      return setTimeout(() => setErrorMessage(""), 3000);
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password dont match ");
      return setTimeout(() => setErrorMessage(""), 3000);
    }
    const response = await fetch(`http://localhost:8080/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const datareceived = await response.json();
    if (datareceived.detail) {
      setErrorMessage(datareceived.detail);
    } else {
      setMessage(datareceived.message);
      setCookie("Email", datareceived.email);
      setCookie("AuthToken", datareceived.token);
      navigate("/");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
      <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-blue-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
      <div className="mx-auto mb-2 space-y-3">
        <h1 className="text-center text-3xl font-bold text-gray-700">
          Register
        </h1>
        <p className="text-gray-500">Register to create your account</p>
      </div>

      <div>
        <div className="relative mt-2 w-full">
          <input
            type="text"
            id="email"
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={email}
            onChange={(e) => handleEmail(e)}
          />
          <label
            htmlFor="email"
            className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
          >
            {" "}
            Enter Your Email{" "}
          </label>
        </div>
      </div>

      <div>
        <div className="relative mt-2 w-full">
          <input
            type="password"
            id="password"
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <label
            htmlFor="password"
            className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
          >
            {" "}
            Enter Your Password
          </label>
        </div>
      </div>

      <div>
        <div className="relative mt-2 w-full">
          <input
            type="password"
            id="password1"
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => handleRePassword(e)}
          />
          <label
            htmlFor="password1"
            className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
          >
            {" "}
            Confirm Your Password
          </label>
        </div>
      </div>
      <div className="flex w-full items-center">
        <button
          className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </button>
      </div>
      <p className="text-center text-gray-600">
        you already have an account?{" "}
        <a
          href="#"
          className="whitespace-nowrap font-semibold text-gray-900 hover:underline gap-2"
          onClick={() => setSignInnow(true)}
        >
          Login
        </a>
      </p>
      {message && (
        <p className="text-sm h-[40px] w-[100%] flex justify-center items-center rounded-md bg-green-300 text-green-700">
          {message}
        </p>
      )}
      {errorMesage && (
        <p className="text-sm h-[40px] w-[100%] flex justify-center items-center rounded-md bg-red-400 text-red-900">
          {errorMesage}
        </p>
      )}
    </div>
  );
};

export default RegisterPage;
