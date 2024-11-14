import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Typography, Box, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { RootState, AppDispatch } from "../store";
import { ProductInterface } from "../types";
import Grid from "@mui/material/Grid2";
import SearchBar from "./SearchBar";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [productsSorted, setProductsSorted] = useState<
    ProductInterface[] | null
  >(null);

  const sortProductsByName = () => {
    if (!products) return;
    const sortedProducts = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setProductsSorted(sortedProducts);
  };

  const sortProductsByCount = () => {
    if (!products) return;
    const sortedProducts = [...products].sort((a, b) => b.count - a.count);
    setProductsSorted(sortedProducts);
  };

  const filterProductsByName = (searchName: string) => {
    if (!products) return;
    const filterdProducts = [...products].filter((product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setProductsSorted(filterdProducts);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    sortProductsByName();
  }, [products]);

  return (
    <Box>
      <SearchBar
        sortProductsByName={sortProductsByName}
        sortProductsByCount={sortProductsByCount}
        filterProductsByName={filterProductsByName}
      />
      <Box>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {productsSorted ? (
              productsSorted.map((product: ProductInterface) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <></>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
