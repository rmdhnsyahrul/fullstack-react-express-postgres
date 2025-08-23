import React from "react";
import { useAuth } from "../providers";

const Navbar = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <div className="h1">Movie List App</div>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
};

export default Navbar;
