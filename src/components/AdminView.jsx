import React from "react";
import { useSelector } from "react-redux";
import ProductTable from "./ProductTable";

const AdminView = () => {
  const isAdmin = useSelector((state) => state.isAdmin);

  return isAdmin ? (
    <div className="p-4">
      <ProductTable isAdmin={true} />
    </div>
  ) : null;
};

export default AdminView;
