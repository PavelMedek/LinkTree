import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://linktree-server.onrender.com/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast("You are Logged successfully");
          localStorage.setItem("LinkTreeToken", data.token);
          router.push("/dashboard");
        }
        if (data.status === "not found") {
          toast.error("User not found");
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <section
        className={
          styles.background + " min-h-screen flex justify-center items-center"
        }
      >
        <div className="main">
          <div className="content border-2 px-4 py-8 rounded-2xl shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center">
              You’re now among top creators
            </h1>
            <p className="text-center">Access your Dashboard</p>
            <p className="text-center py-5 font-bold text-gray-500">
              Start building your Hub
            </p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
                <img className="w-6 mr-2" src="/svg/email.svg" alt="" />
                <input
                  className="focus:outline-none"
                  type="email"
                  placeholder="Enter your emain"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>

              <input
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="password"
                placeholder="Set a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="submit"
                value="Login"
                className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
              />
            </form>
          </div>
          <h4 className="text-center text-white pt-3">
            New Here?{" "}
            <Link className="font-bold text-red-400" href="/apply">
              Apply
            </Link>
          </h4>
        </div>
      </section>
    </>
  );
};

export default Login;
