import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, VisibilityOff } from "@mui/icons-material";
import { deleteProduct, disableProduct, updateProduct } from "../redux/actions";

const ProductTable = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({
    category: "",
    price: "",
    quantity: 0,
    value: "",
    name: "",
  });
  const products = useSelector((state) => state.products.products);

  const handleEditProduct = (product) => {
    if (product.disabled) return false;
    setSelectedProduct(product);
    setUpdatedProductData({
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      value: product.value,
      name: product.name,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdatedProductData({ ...updatedProductData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateProduct(selectedProduct.id, updatedProductData));
    closeModal();
  };
  const handleDelete = (product) => {
    if (product.disabled) return false;
    dispatch(deleteProduct(product.id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow
              key={product.id}
              className={product.disabled ? "bg-gray-100" : ""}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>${product.value}</TableCell>
              <TableCell>
                {
                  <>
                    <IconButton
                      disabled={product.disabled || !isAdmin}
                      onClick={() => handleDelete(product)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      disabled={product.disabled || !isAdmin}
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      disabled={product.disabled}
                      onClick={() => dispatch(disableProduct(product.id))}
                    >
                      <VisibilityOff />
                    </IconButton>
                  </>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg p-4"
          sx={{
            maxWidth: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          {selectedProduct && (
            <div className="space-y-4">
              <h4>{selectedProduct.name}</h4>
              <form>
                <div className="flex mb-4 space-x-4">
                  <TextField
                    label="Category"
                    name="category"
                    fullWidth
                    className="mr-2 text-white"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      style: { color: "#fff" }, // Ensure input text is white
                    }}
                    value={updatedProductData.category}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      style: { color: "#fff" }, // Ensure input text is white
                    }}
                    value={updatedProductData.price}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex mb-4 space-x-4">
                  <TextField
                    label="Quantity"
                    name="quantity"
                    fullWidth
                    className="mr-2"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      style: { color: "#fff" }, // Ensure input text is white
                    }}
                    value={updatedProductData.quantity}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    label="Value"
                    name="value"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#fff" },
                    }}
                    InputProps={{
                      style: { color: "#fff" }, // Ensure input text is white
                    }}
                    value={updatedProductData.value}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button onClick={closeModal} color="secondary">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default ProductTable;
