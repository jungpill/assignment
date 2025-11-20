import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Menu = "대시보드" | "매장관리" | "결제내역"

interface SidebarState {
  item: Menu;
  setItem: (item: Menu) => void;
  reset: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      item: "대시보드",              
      setItem: (item) => set({ item }),
      reset: () => set({ item: "대시보드" }),
    }),
    {
      name: "sidebar-menu",
    }
  )
);