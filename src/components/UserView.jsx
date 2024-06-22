import React from "react";
import { useSelector } from "react-redux";
import ProductTable from "./ProductTable";

const UserView = () => {
  const isAdmin = useSelector((state) => state.isAdmin);

  return !isAdmin ? (
    <div className="p-4">
      <ProductTable isAdmin={false} />
    </div>
  ) : null;
};

export default UserView;
