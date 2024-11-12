import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { selectProductBySlug } from "../store/productSlice";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import {
  openCreateModal,
  openDeleteDialog,
  setCurrentProduct,
} from "../store/productSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const product = useSelector(selectProductBySlug(slug || ""));

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
          Count: {product.count}
        </Typography>
        <Box>
          <Typography variant="body1" gutterBottom>
            Comments :
          </Typography>
          <ul>
            {product.comments.map((comment: string, index: number) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box>
        <Button
          onClick={() => {
            dispatch(openCreateModal(product.id));
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            dispatch(setCurrentProduct(product));
            dispatch(openDeleteDialog(true));
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  ) : (
    <Typography>Cant find correct product</Typography>
  );
}
