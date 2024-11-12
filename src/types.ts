export interface SizeInterface {
  width: number;
  height: number;
}

export interface ProductInterface {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: SizeInterface;
  weight: string;
  comments: string[];
}

export interface ProductStateInterface {
  products: ProductInterface[];
  loading: boolean;
  error: string | null;
  currentProduct: ProductInterface | null;
  createModalState: boolean;
  deleteDialogStatus: boolean;
}
