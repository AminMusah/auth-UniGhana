import { useState } from "react";
import Header from "../components/Header";
import MiniLoader from "../components/MiniLoader";
import production from "../../api/base";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate,useNavigate } from "react-router-dom";
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
      const res = await axios.post(`${production}/api/register`, {
        name,email,password
      })
      setLoading(true)
      res.data && navigate('/login')
      welcomeAlert()
    } catch (err) {
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
          <button className="border-none font-inherit mt-4 cursor-pointer flex items-center gap-6 max-w-max-content py-2 px-12 font-medium text-lg uppercase rounded-lg transition-all bg-blue">
            {loading ? <MiniLoader /> : ""}
            <span className="ml-2 text-green">Register</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
