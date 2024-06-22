import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, updateProduct } from "./redux/actions";
import ToggleSwitch from "./components/ToggleSwitch";
import ProductTable from "./components/ProductTable";
import EditProductModal from "./components/EditProductModal";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { toggleAdmin } from "./redux/adminActions";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newData = data.map((item, index) => ({
          ...item,
          id: index + 1, // Assuming id starts from 1
        }));

        dispatch(setProducts(newData));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
  };

  return (
    <Container>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h4">Inventory Management</Typography>
        </Grid>
        <Grid item xs={3}>
          <ToggleSwitch
            isAdmin={isAdmin}
            toggleAdmin={() => dispatch(toggleAdmin())}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} marginTop={3}>
        <Grid item xs={3}>
          <Paper>
            <Typography>Total Product</Typography>
            <Typography>{products?.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography>Total Store Value</Typography>
            <Typography>
              $
              {products?.reduce((total, product) => {
                const { value } = product;
                const val = parseInt(
                  // eliminating '$' if it is there
                  value && value[0] === "$" ? value.slice(1) : value
                );
                total += val;
                return total;
              }, 0)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography>Out of Stocks</Typography>
            <Typography>
              {products?.filter((product) => product.quantity === 0).length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography>No of Category</Typography>
            <Typography>
              {new Set(products?.map((product) => product.category)).size}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <ProductTable isAdmin={isAdmin} onEditClick={handleEditClick} />
      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};

export default App;
