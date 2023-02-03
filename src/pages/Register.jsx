import { useState } from "react";
import Header from "../components/Header";
import MiniLoader from "../components/MiniLoader";
import production from "../../api/base";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate, Link } from "react-router-dom";
function Register() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const [name, setName] = useState("");
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
      title: "Succesfully Registered!, You can log in now",
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const res = await axios.post(`${production}/api/register`, {
        name,email,password
      })
      res.data && navigate('/login')
      welcomeAlert()
    } catch (err) {
      setLoading(false)
      setError(err.response.data.message)
      console.log(err)
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Header />
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col"
        >
          <div className="flex items-start flex-col">
            <label className="mt-4">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setName(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
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
          <button className="relative border-none font-inherit mt-4 cursor-pointer flex items-center justify-center gap-6 w-full h-14 py-2 px-12 font-medium text-lg uppercase rounded-lg transition-all bg-blue">
            {loading ? <MiniLoader /> : ""}
            <span className="text-green absolute">Register</span>
          </button>
          <div className="flex items-center mt-3">
            <p className="text-lg"> Already have an account? </p> <Link to="/login" className="text-lg text-blue ml-[5px] font-bold">Login</Link>
          </div>        </form>
      </div>
    </div>
  );
}

export default Register;
