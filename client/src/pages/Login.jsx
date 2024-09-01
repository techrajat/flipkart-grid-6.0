import { React } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login(props) {
  const navigate = useNavigate();

  const googleSignIn = useGoogleLogin({
    onSuccess: (codeResponse) => getUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUser = async (codeResponse) => {
    const token = codeResponse.access_token;
    if (token) {
      localStorage.setItem("token", token);
      let data = await fetch(`http://127.0.0.1:5000/getuser`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (data.status === 200) {
        data = await data.json();
        const user = data.user;
        localStorage.setItem("user", JSON.stringify(user));
        props.setLogged(true);
        props.setAnimation("Greeting");
        props.setText(`Hello ${user.name.split(' ')[0]}! How are you? Click on me to speak`);
        navigate("/recommend");
      } else {
        data = await data.json();
        document.getElementById("warn").innerHTML = data.error;
      }
    }
  };

  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = "rgb(78, 65, 65)";
    subtitle.style.textDecorationLine = "underline";
  }

  return (
    <div className="flex h-screen w-screen  items-center justify-center z-[100] bg-transparent">
      <div className=" flex items-center  justify-center bg-transparent z-[200]">
        <div className="bg-transparent px-6 rounded-lg shadow-lg shadow-pink-200 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-yellow-100 text-center">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-yellow-100 text-sm font-bold mb-2"
                htmlFor="username"
              >
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
              <label
                className="block text-yellow-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between relative bottom-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <div>
                <div className="container relative ">
                  <button type="button" className="login-with-google-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => googleSignIn()}>
                    Sign in with Google
                  </button>
                  <p id="warn"></p>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
