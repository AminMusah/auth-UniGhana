import Header from "../components/Header";
import { useState,useEffect } from "react";

import axios from "axios";
import production from "../../api/base";

function Dashboard() {
  const [user, setUser] = useState("");

  const userId = localStorage.getItem("user");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${production}/api/user/${userId}`);
      setUser(res.data.name);
    };
    getUser();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Header />
      <div className="sm:text-8xl flex "> <span className="mr-4">Welcome,</span><span>{user}!</span>
</div>
    </div>
  );
}

export default Dashboard;
