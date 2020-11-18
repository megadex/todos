export default {
    namespaced: true,
	state: {
		loading: true,
		showModal: false
    },
    getters: {
		loading(state){
			return state.loading;
		},
		showModal(state){
			return state.showModal;
		}
    },
    mutations: {
		loading(state){
			state.loading = false;
		},
		showModal(state){
			state.showModal = !state.showModal;
		}
    },
    actions: {}
}