import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, disableProduct } from "../redux/actions";

const ProductRow = ({ product, isAdmin }) => {
  const dispatch = useDispatch();

  return (
    <tr className={product.disabled ? "bg-gray-600" : ""}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>${product.price}</td>
      <td>{product.quantity}</td>
      <td>${product.value}</td>
      <td>
        {isAdmin ? (
          <>
            <button onClick={() => dispatch(deleteProduct(product.id))}>
              🗑️
            </button>
            <button onClick={() => console.log("Edit")}>✏️</button>
            <button onClick={() => dispatch(disableProduct(product.id))}>
              👁️
            </button>
          </>
        ) : (
          <>
            <button disabled>🗑️</button>
            <button disabled>✏️</button>
            <button disabled>👁️</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
