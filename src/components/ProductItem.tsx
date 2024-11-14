import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";

import { ProductInterface } from "../types";
import { createSlug } from "../utils/createSlug";
import {
  openCreateModal,
  openDeleteDialog,
  setCurrentProduct,
} from "../store/productSlice";

interface ProductItemProps {
  product: ProductInterface;
}

const Item = styled(Paper)({
  backgroundColor: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledImg = styled("img")`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const onEditProduct = () => {
    dispatch(openCreateModal(product.id));
  };

  const onDeleteProduct = () => {
    dispatch(setCurrentProduct(product));
    dispatch(openDeleteDialog(true));
  };

  const productLink = `/products/${createSlug(product.name)}`;

  return (
    <Grid size={3}>
      <Item>
        <StyledImg src={product.imageUrl} />
        <Link to={productLink}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
        </Link>
        <Box>
          <Typography variant="body1" gutterBottom>
            ID : {product.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Product Weight : {product.weight}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Count: {product.count}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Size:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Width: {product.size.width}, Height:{product.size.height}
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              Comments :
            </Typography>
            <ul>
              {product.comments.map((comment) => (
                <li key={comment.id}>{comment.description}</li>
              ))}
            </ul>
          </Box>
        </Box>
        <Box>
          <Button onClick={onEditProduct}>Edit</Button>
          <Button onClick={onDeleteProduct}>Delete</Button>
        </Box>
      </Item>
    </Grid>
  );
};

export default ProductItem;
