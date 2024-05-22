import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
const Login = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="flex h-[700px] w-screen items-center overflow-hidden px-2">
      {signIn ? (
        <LoginPage setSignInnow={setSignIn} />
      ) : (
        <RegisterPage setSignInnow={setSignIn} />
      )}
    </div>
  );
};

export default Login;
