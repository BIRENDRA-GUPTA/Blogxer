import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { api } from "../../config.js";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import logo from "../../assets/OIP.jpg";

const endPoint = api.endPoint;

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.auth.isAuthenticated);
  const [data, setData] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      toast.error(`All fields are required !! 🙂`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setLoading(true);

    const res = await fetch(`${endPoint}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resP = await res.json();
    console.log(resP);
    if (resP.success === true) {
      toast.success("Login Successfully 🔥", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(loginUser(resP));
    } else {
      toast.error(`${resP.error}!! 🙂`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLoading(false);
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  if (state) return <Navigate replace to="/" />;
  else {
    return (
      <>
        <div className="mt-10 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="border card-auth p-10 w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h5 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                Log in to your account
              </h5>
              <p className="mt-2 text-center text-xl text-gray-600">
                Enter Your Details
              </p>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={submit}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {loading ? <Loader /> : "Sign in"}
                </button>
              </div>
              <div className="text-sm text-center">
                <Link
                  to="/register"
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account? Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
