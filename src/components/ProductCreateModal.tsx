import React, { useState, useEffect } from "react";
import { Modal, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { editProductsArray, openCreateModal } from "../store/productSlice";
import { ProductInterface } from "../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 2,
  display: "flex",
  flexDirection: "column",
};

export default function ProductCreateModal() {
  const dispatch = useDispatch<AppDispatch>();
  const currentProduct = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const createModalState = useSelector(
    (state: RootState) => state.products.createModalState
  );
  const getAllProducts: ProductInterface[] = useSelector(
    (state: RootState) => state.products.products
  );

  function getNextId(objects: ProductInterface[]): number {
    const currentBiggestId = objects.reduce(
      (max, obj) => (Number(obj.id) > Number(max.id) ? obj : max),
      objects[0]
    );
    return Number(currentBiggestId.id) + 1;
  }

  const [product, setProduct] = useState<ProductInterface>({
    id: currentProduct?.id ?? -1,
    imageUrl: currentProduct?.imageUrl ?? "https://picsum.photos/500",
    name: currentProduct?.name ?? "",
    count: currentProduct?.count ?? 0,
    size: currentProduct?.size ?? { width: 0, height: 0 },
    weight: currentProduct?.weight ?? "",
    comments: currentProduct?.comments ?? [],
  });

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct]);

  const handleClose = () => {
    dispatch(openCreateModal(false));
    setProduct({
      id: -1,
      imageUrl: "https://picsum.photos/500",
      name: "",
      count: 0,
      size: { width: 0, height: 0 },
      weight: "",
      comments: [],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSizeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      size: {
        ...prevProduct.size,
        [name]: Number(value),
      },
    }));
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedComments = [...product.comments];
    updatedComments[index] = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      comments: updatedComments,
    }));
  };

  const handleSubmit = () => {
    if (Number(product.id) > -1) {
      dispatch(editProductsArray(product));
      dispatch(openCreateModal(false));
    } else {
      const newId = getNextId(getAllProducts);
      const newProduct = {
        ...product,
        id: newId,
      };
      console.log(newProduct);
      dispatch(editProductsArray(newProduct));
      dispatch(openCreateModal(false));
    }
  };

  return (
    <Modal
      open={createModalState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6">
          {product.id === 0 ? "Create Product" : "Edit Product"}
        </Typography>

        <TextField
          name="name"
          label="Product Name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="count"
          label="Product Count"
          value={product.count}
          onChange={handleChange}
          type="number"
          fullWidth
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="width"
            label="Size width"
            value={product.size.width}
            onChange={handleSizeChange}
            type="number"
            fullWidth
          />
          <TextField
            name="height"
            label="Size height"
            value={product.size.height}
            onChange={handleSizeChange}
            type="number"
            fullWidth
          />
        </Box>

        <TextField
          name="imageUrl"
          label="Product Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="weight"
          label="Product Weight"
          value={product.weight}
          onChange={handleChange}
          fullWidth
        />

        <Typography>Comments</Typography>
        {product.comments.map((comment, index) => (
          <TextField
            key={index}
            name={`comment-${index}`}
            value={comment}
            onChange={(e) => handleCommentChange(e, index)}
            placeholder="Comment"
            fullWidth
          />
        ))}

        <Button onClick={handleSubmit} variant="contained" color="primary">
          {product.id === 0 ? "Create Product" : "Save Changes"}
        </Button>
      </Box>
    </Modal>
  );
}
