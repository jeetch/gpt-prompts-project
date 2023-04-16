import {create} from 'zustand';



interface SubmitPromptModalStore {
  isOpen: boolean,
  onOpen: () => void;
  onClose: () => void;
}

const useSubmitPromptModal = create<SubmitPromptModalStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useSubmitPromptModal;