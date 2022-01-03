import { createStore } from 'vuex'

export const SystemStore = createStore({
    state: {
        editingToDoId: '',
        modalVisible: false,
    },
    mutations: {
        openModal(state, id: string): void {
            state.modalVisible = true;
            state.editingToDoId = id;
        },
    
        closeModal(state): void {
            state.modalVisible = false;
            state.editingToDoId = '';
        },
    }
});