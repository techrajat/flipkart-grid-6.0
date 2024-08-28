import { React, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default function Login(props) {
  const navigate = useNavigate();

  const googleSignIn = useGoogleLogin({
    onSuccess: (codeResponse) => getUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const getUser = async (codeResponse) => {
    const token = codeResponse.access_token;
    if (token) {
      localStorage.setItem('token', token);
      let data = await fetch(`http://127.0.0.1:5000/getuser`, {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });
      if (data.status === 200) {
        data = await data.json();
        const user = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        props.setLogged(true);
        props.setPlayAudio(true);
        props.setScript("welcome");
        navigate('/');
      }
      else {
        data = await data.json();
        document.getElementById('warn').innerHTML = data.error;
      }
    }
  };

  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = 'rgb(78, 65, 65)';
    subtitle.style.textDecorationLine = 'underline';
  }

  return (
    <div className="flex h-screen w-screen">
      {/* Spline Animation (70% width) */}
      <div className="w-7/12 h-full">
        {/* <Spline scene="https://prod.spline.design/eh3gZzwZZj9sGf9R/scene.splinecode" /> */}
        {/* <Spline scene="https://prod.spline.design/ffrW6F75Z29jNfeP/scene.splinecode" /> */}
        <Spline scene="https://prod.spline.design/UUUtEBsOn9aEhGDb/scene.splinecode" />

      </div>

      {/* Login Form (30% width) */}
      <div className="w-5/12 h-full flex items-center justify-center bg-transparent z-[10]">
        <div className="bg-transparent  p-8 rounded-lg shadow-lg w-full max-w-md">
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
              <div>
                <Modal
                  isOpen={props.logoutModal}
                  onAfterOpen={afterOpenModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="Attention"
                  id={'custom-modal'}
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Attention</h2>
                  <button onClick={() => { props.setLogoutModal(false) }} id="logoutModalClose"><i className="fa-solid fa-xmark"></i></button>
                  <p className="modalMessage">You have been logged out. Please login again.</p>
                </Modal>
                <div className="container">
                  <h1>Sign in with Google</h1>
                  <button type="button" className="login-with-google-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => googleSignIn()}>
                    Sign in with Google
                  </button>
                  <p id="warn"></p>
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
