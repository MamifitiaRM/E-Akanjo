import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

const useProductStore = create((set, get) => ({
  product: null,
  loading: false,
  setProduct: (newProduct) => set({ product: newProduct }),
  oneProduct: null,
  // Pour les filtres seulement
  productForCollections: null,
  setProductForCollections: (product) =>
    set({ productForCollections: product }),
  categoryFilter: {
    men: false,
    women: false,
    kids: false,
  },
  setCategoryFilter: (filter) => set({ categoryFilter: filter }),
  clothesFilter: "",
  setClothesFilter: (filter) => set({ clothesFilter: filter }),
  // fin

  addProduct: async ({
    image,
    name,
    description,
    category,
    subCategory,
    price,
    size,
  }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/product/add", {
        image,
        name,
        description,
        category,
        subCategory,
        price,
        size,
      });
      if (!res.data.status) {
        set({ loading: false });
        return toast.error(res.data.message);
      }
      toast.success("Produit ajouté");
      set({ loading: false, product: res.data.newProduct });
      get().getAllProduct();
    } catch (error) {
      toast.error(error);
      set({ loading: false, product: null });
    }
  },
  getAllProduct: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product/getProducts");
      set({
        loading: false,
        product: res.data.products,
        productForCollections: res.data.products,
      });
    } catch (error) {
      toast.error(error);
      set({ loading: false, product: null });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.delete("/product/deleteProduct/" + productId);
      set({ loading: false, product: res.data.products });
      get().getAllProduct();
    } catch (error) {
      toast.error(error);
      set({ loading: false, product: null });
    }
  },
  getSpecificProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/product/getProduct/${productId}`);
      set({ loading: false, oneProduct: res.data.product });
    } catch (error) {
      toast.error(error);
      set({ loading: false });
    }
  },
}));

export default useProductStore;
