import { create } from 'zustand'

export const useStoreTheme = create((set) => ({
  // Data
  theme: "light",

  // Setter
  setTheme: (payload) => {
    set({
      theme: payload
    })
  }
}))