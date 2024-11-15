import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteProduct, openDeleteDialog } from "../store/productSlice";

export default function ProductDeleteDialog() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(openDeleteDialog(false));
  };

  const handleDelete = () => {
    dispatch(deleteProduct());
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={useSelector(
          (state: RootState) => state.products.deleteDialogStatus
        )}
        onClose={handleClose}
      >
        <DialogTitle>Delete Product.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
