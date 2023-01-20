import { useState,useContext } from "react";
import Header from "../components/Header";
import MiniLoader from "../components/MiniLoader";
import production from "../../api/base";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  let { isAuth, setIsAuth } = useContext(UserContext);  
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const welcomeAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Log In Succesfull, Welcome!",
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`${production}/api/login`, {
        email,
        password,
      });
      setLoading(true)
      const token = res.data.token;
      const userId = res.data.user._id;
      localStorage.setItem("token", token);
      localStorage.setItem("user", userId);
      setIsAuth(true);
      res.data && navigate('/dashboard')
      welcomeAlert()
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Header />
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col"
        >
          <div className="flex flex-col items-start">
            <label className="mt-4">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
          <div className="mb-2 flex flex-col items-start justify-center">
            <label className="mt-4">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
            {error ? <div
              className="inline-block text-red-800 text-xs my-2"
            >
              {error}
            </div> : '' }
          <button className="border-none font-inherit mt-4 cursor-pointer flex items-center gap-6 max-w-max-content py-2 px-12 font-medium text-lg uppercase rounded-lg transition-all bg-blue">
            {loading ? <MiniLoader /> : ""}
            <span className="ml-2 text-green">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
