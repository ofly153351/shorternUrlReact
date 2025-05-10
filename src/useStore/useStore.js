import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) =>
        set({
          user: {
            userId: userData.userId,
            userName: userData.userName,
          },
        }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // ชื่อ key ใน localStorage
    }
  )
);