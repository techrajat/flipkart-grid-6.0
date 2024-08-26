import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Login() {
  return (
    <div className="flex h-screen w-screen">
      {/* Spline Animation (70% width) */}
      <div className="w-7/12 h-full">
      {/* <Spline scene="https://prod.spline.design/eh3gZzwZZj9sGf9R/scene.splinecode" /> */}
      {/* <Spline scene="https://prod.spline.design/ffrW6F75Z29jNfeP/scene.splinecode" /> */}
      <Spline scene="https://prod.spline.design/UUUtEBsOn9aEhGDb/scene.splinecode" />

      </div>

      {/* Login Form (30% width) */}
      <div className="w-5/12 h-full flex items-center justify-center bg-richblack-950">
        <div className="bg-richblack-950  p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-yellow-100 text-center">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-yellow-100 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-yellow-100 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-6">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="rememberMe"
              />
              <label className="text-sm text-white" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
