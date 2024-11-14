export interface SizeInterface {
  width: number;
  height: number;
}

export interface CommentsInterface {
  id: number;
  productId: number | string;
  description: string;
  date: string;
}

export interface ProductInterface {
  id: number | string;
  imageUrl: string;
  name: string;
  count: number;
  size: SizeInterface;
  weight: string;
  comments: CommentsInterface[];
}

export interface ProductStateInterface {
  products: ProductInterface[];
  loading: boolean;
  error: string | null;
  currentProduct: ProductInterface | null;
  createModalState: boolean;
  deleteDialogStatus: boolean;
}
