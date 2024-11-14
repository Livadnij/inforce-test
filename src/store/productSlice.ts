import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductInterface, ProductStateInterface } from "../types";
import { createSlug } from "../utils/createSlug";

export const fetchProducts = createAsyncThunk<ProductInterface[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:3001/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    console.log(await response);
    return (await response.json()) as ProductInterface[];
  }
);

const initialState: ProductStateInterface = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  createModalState: false,
  deleteDialogStatus: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (
      state,
      action: PayloadAction<ProductInterface | null>
    ) => {
      state.currentProduct = action.payload;
    },
    openCreateModal: (
      state,
      action: PayloadAction<boolean | number | string>
    ) => {
      if (typeof action.payload === "boolean") {
        state.createModalState = action.payload;
      } else if (
        typeof action.payload === "string" ||
        typeof action.payload === "number"
      ) {
        const product = state.products.find(
          (element) => element.id === action.payload
        );
        state.currentProduct = product || null;
        state.createModalState = true;
      }
    },
    openDeleteDialog: (state, action: PayloadAction<boolean>) => {
      state.deleteDialogStatus = action.payload;
    },
    deleteProduct: (state) => {
      if (state.currentProduct === null) return;
      state.products = state.products.filter(
        (obj) => obj.id !== state.currentProduct?.id
      );
    },
    editProductsArray: (state, action: PayloadAction<ProductInterface>) => {
      const changeElementID = state.products.findIndex(
        (obj) => obj.id === action.payload.id
      );
      console.log(changeElementID, action.payload);
      if (changeElementID !== -1) {
        state.products[changeElementID] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductInterface[]>) => {
        state.products = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const selectProductBySlug = (slug: string) => (state: any) => {
  return state.products.products.find(
    (product: ProductInterface) => createSlug(product.name) === slug
  );
};

export default productSlice.reducer;
export const {
  openCreateModal,
  setCurrentProduct,
  editProductsArray,
  openDeleteDialog,
  deleteProduct,
} = productSlice.actions;
