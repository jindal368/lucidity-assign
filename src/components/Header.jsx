import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdmin } from "../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.isAdmin);

  return (
    <header className="p-4 flex justify-between items-center bg-gray-800">
      <h1 className="text-2xl">Inventory Stats</h1>
      <button
        className="bg-green-500 px-4 py-2 rounded"
        onClick={() => dispatch(toggleAdmin())}
      >
        {isAdmin ? "Switch to User" : "Switch to Admin"}
      </button>
    </header>
  );
};

export default Header;
