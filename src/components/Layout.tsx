import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const {user}= useAuth();

  function toggleSidebar() {
    setOpen((prev) => !prev);
  }

  return (
    
    <div className="flex min-h-screen flex-col">
     <Header title={`chattErr`} onToggleSidebar={toggleSidebar} />
       <div className=" flex justify-end ">
        {user ? (
          <h5 className="text-emerald-400 pr-6 mr-4"> Welcome {user.login} !</h5>
        ) : (
          <h5 className="text-orange-500 pr-6 mr-4">To see all features Log in, please</h5>
        )}
      </div>
      <div className="flex flex-1">
      {user && <Sidebar open={open} onClose={() => setOpen(false)} />}  
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>  
      <Footer />
    </div>
  );
}
