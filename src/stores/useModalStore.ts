import { create } from "zustand";

interface ModalState {
    data: any
    open: boolean
    width?: string
    setField : (field: keyof ModalState, value: any) => void 
    reset: () => void;
    children: any;
}

const defaultValue ={
    data: '',
    open: false,
    width: '',
    children: ''
}

export const useModalStore = create<ModalState>((set)=>({
    ...defaultValue,
    setField : (field,value)=>set((state)=>({...state,[field]:value})),
    reset: () => set(() =>({...defaultValue}))
}))