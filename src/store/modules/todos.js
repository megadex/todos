import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		items(state){
			return state.items;
		},
		itemsMap(state){
			let itemsMap = {};

			for(let i = 0; i < state.items.length; i++){
				let todo = state.items[i];
				itemsMap[todo.id] = todo;
			}

			return itemsMap;
		},
		item: (state, getters) => (id) => {
			return getters.itemsMap[id];
		}
	},
	mutations: {
		clearItems(state){
			state.items = [];
		},
		loadItems(state, data){
			state.items = data;
		}
	},
	actions: {
		loadItems(store){
			store.commit('clearItems');
			
			Vue.axios.get('todos')
			    .then(response => response.data)
			    .then(data => {
					store.commit('loadItems', data)
				})
				.catch(err => {
					console.log('Todos get err', err)
				})
				.finally(() => { 
					store.commit('settings/loading', null, { root: true }) 
			    })
		},
		addItem(store, item){
            Vue.axios.post('todos', item)
			    .then(response => response.data)
			    .then(data => {
				    store.commit('loadItems', data)
			    })
				.catch(err => {
					console.log('Todo post err', err)
				})
				.finally(() => { 
					store.commit('settings/loading', null, { root: true }) 
			    })
		},
		editItem(store, item){
            let id = item.id;

            Vue.axios.put(`todos/${id}`, item)
			    .then(response => response.data)
			    .then(data => {
				    store.commit('loadItems', data)
			    })
				.catch(err => {
					console.log('Todo put err', err)
				})
				.finally(() => { 
					store.commit('settings/loading', null, { root: true }) 
			    })
		},
		deleteItem(store, id){
			Vue.axios.delete(`todos/${id}`)
				.then(response => response.data)
				.then(data => {
					store.commit('loadItems', data);
				})
				.catch(err => {
					console.log('Todos get err', err)
				})
				.finally(() => { 
					store.commit('settings/loading', null, { root: true }) 
				})
		}
	}
};

/* function getProducts(){
	return [
		{
			id_todo: 10,
			title: 'Iphone 5',
			tasks: [{
				id_task: 1,
				description: 'task 1 10'
			},
			{
				id_task: 2,
				description: 'task 2 10'
			}]
		},
		{
			id_todo: 20,
			title: 'Iphone 6',
			tasks: [{
				id_task: 1,
				description: 'task 1 20'
			},
			{
				id_task: 2,
				description: 'task 2 20'
			}]
		},
		{
			id_todo: 30,
			title: 'Iphone 7',
			tasks: [{
				id_task: 1,
				description: 'task 1 30'
			},
			{
				id_task: 2,
				description: 'task 2 30'
			}]
		}
	]
} */