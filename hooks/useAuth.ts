import { create } from 'zustand';

// Define the store type
interface AuthState {
  jwt: string;
  loader: boolean;
  setLoader: (loader: boolean) => void;
  setJwt: (jwt: string) => void;
}

// Create the Zustand store with proper type annotation
const useAuthManage = create<AuthState>((set) => ({
  jwt: "",
  loader: false,
  setLoader: (loader: boolean) => set({ loader }),
  setJwt: (jwt: string) => set({ jwt }),
}));

export default useAuthManage;