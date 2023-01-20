import { useState } from "react";
import Header from "../components/Header";
import MiniLoader from "../components/MiniLoader";
import production from "../../api/base";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post(`${production}/api/register`, {
        name,email,password
      })
      console.log(res)
      setLoading(true)
      res.data && window.location.replace('/login')
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
            <label className="mb-4">Username:</label>
            <input
              type="text"
              name="username"
              reqiured={true}
              onChange={(e) => setName(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-4">Email:</label>
            <input
              type="email"
              name="email"
              reqiured={true}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
          <div className="mb-2 flex flex-col items-start justify-center">
            <label className="mb-4">Password:</label>
            <input
              type="password"
              name="password"
              reqiured={true}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue rounded p-2"
            />
          </div>
            {error ? <div
              className="inline-block text-red-800 text-xs my-2"
            >
              {error}
            </div> : '' }
          <button className="border-none font-inherit cursor-pointer flex items-center gap-6 max-w-max-content py-2 px-12 font-medium text-lg uppercase rounded-lg transition-all bg-blue">
            {loading ? <MiniLoader /> : ""}
            <span className="ml-2 text-green">Register</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
