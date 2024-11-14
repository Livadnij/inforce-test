import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ProductInterface } from "../../types";

export const useProductModal = () => {
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

  return {
    dispatch,
    currentProduct,
    createModalState,
    getAllProducts,
  };
};
