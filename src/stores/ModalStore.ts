import { create } from "zustand";

interface ModalState {
    title: string
    content: any
    footer: any
    width: string | null
    open: boolean
    setField : (field: keyof ModalState, value: any) => void 
}

const defaultValue ={
    title : '',
    content: '',
    footer: '',
    width: null,
    open: false,
}

export const useModalStore = create<ModalState>((set)=>({
    ...defaultValue,
    setField : (field,value)=>set((state)=>({...state,[field]:value})),
}))