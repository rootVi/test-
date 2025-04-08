import { gettoCart } from '@/etkinlikler/gettoCart'
import { create } from 'zustand'

interface CartState {
  items: any[]; // You can replace `any[]` with a more specific type
  fetchItems: (userId: any, jwt: any) => Promise<void>; // Function signature
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  fetchItems: async (userId, jwt) => {
    const data = await gettoCart(userId, jwt);
    set({ items: data });
  },
}));

export default useCartStore;