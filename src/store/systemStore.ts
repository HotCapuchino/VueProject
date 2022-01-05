export const systemStore = {
    state: {
        editingToDoId: '',
        modalVisible: false,
    },
    mutations: {
        openModal(state: any, id: string): void {
            state.modalVisible = true;
            state.editingToDoId = id;
        },
    
        closeModal(state: any): void {
            state.modalVisible = false;
            state.editingToDoId = '';
        },
    }
};