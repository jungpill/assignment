import { create } from "zustand";

export type AlertType = 'success' | 'warn' | 'error' | null

interface AlertProps {
    message: string
    type: AlertType
    clear: () => void
    showSuccess: (message: string) => void;
    showWarn: (message: string) => void;
    showError: (message: string) => void;
}

export const useAlertStore = create<AlertProps>((set) => ({
    message: '',
    type: null,
    clear: () => set({type: null, message: ''}),
    showSuccess: (message: string) => set({type: 'success', message: message}),
    showWarn: (message: string) => set({type: 'warn',message: message}),
    showError: (message: string) => set({type: 'error',message: message})
}))