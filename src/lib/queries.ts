import { queryOptions } from "@tanstack/react-query";
import {
  getPublicProducts,
  getPublicReviews,
  getPublicSettings,
} from "@/lib/public-data.functions";

export type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  fabric: string | null;
  colors: string[];
  price: number;
  image_url: string | null;
  is_hit: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_active: boolean;
  sort_order: number;
};

export type Settings = {
  store_name: string;
  whatsapp: string;
  instagram: string;
  email: string;
  location: string;
  unit_price: number;
  min_pieces: number;
  color_choice_min: number;
  shipping_fee: number;
  pix_key: string;
  pix_code: string;
  nubank_link: string;
  hero_title: string;
  hero_subtitle: string;
};

export type Review = {
  id: string;
  name: string;
  city: string | null;
  stars: number;
  comment: string;
  is_active: boolean;
};

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    return (await getPublicProducts()) as Product[];
  },
});

export const allProductsQuery = queryOptions({
  queryKey: ["products", "all"],
  queryFn: async (): Promise<Product[]> => {
    return (await getPublicProducts()) as Product[];
  },
});

export const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: async (): Promise<Settings> => {
    return (await getPublicSettings()) as Settings;
  },
});

export const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async (): Promise<Review[]> => {
    return (await getPublicReviews()) as Review[];
  },
});
