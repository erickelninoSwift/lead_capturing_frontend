import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Login from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import LeadCaputing from "./pages/LeadCaputing";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const Authtoken = cookies.AuthToken;

  console.log(new Date());
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={Authtoken ? <AdminPage /> : <LeadCaputing />}
        />
        <Route path="/login" element={!Authtoken && <Login />} />
        <Route path="/admin" element={Authtoken && <AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
