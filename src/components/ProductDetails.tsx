import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";

import { selectProductBySlug } from "../store/productSlice";
import {
  openCreateModal,
  openDeleteDialog,
  setCurrentProduct,
} from "../store/productSlice";
import { CommentsInterface } from "../types";

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const product = useSelector(selectProductBySlug(slug || ""));

  const onEditProduct = () => {
    dispatch(openCreateModal(product.id));
  };

  const onDeleteProduct = () => {
    dispatch(setCurrentProduct(product));
    dispatch(openDeleteDialog(true));
  };

  return product ? (
    <Box>
      <img src={product.imageUrl} />
      <Box>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Product Weight : {product.weight}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Size:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Width: {product.size.width}, Height:{product.size.height}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Count: {product.count}
        </Typography>
        <Box>
          <Typography variant="body1" gutterBottom>
            Comments :
          </Typography>
          <ul>
            {product.comments.map((comment: CommentsInterface) => (
              <li key={comment.id}>{comment.description}</li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box>
        <Button onClick={onEditProduct}>Edit</Button>
        <Button onClick={onDeleteProduct}>Delete</Button>
      </Box>
    </Box>
  ) : (
    <Typography>Cant find correct product</Typography>
  );
};

export default ProductDetails;
