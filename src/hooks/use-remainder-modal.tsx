import { create} from 'zustand'; 

type ReminderStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void, 
    
}

export const useReminderModal = create<ReminderStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen : false })
})); 

