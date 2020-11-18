<!--
<template>
    <h1>{{ msg }}</h1>
</template>
 -->
<template>
	<div class="container">
		<h1>{{ msg }}</h1>
		<!-- <router-link :to="'/todos/' + todos[0].id" tag="a">Add to Todos</router-link> -->
		

        <app-add-todo></app-add-todo>

		<div v-if="empty">Todos not found!</div>
		<section>
		<div 
		    v-if="loading" 
		    class="loading"
		>
            Загрузка...
        </div>
		<div v-else class="todos">
			<div 
			    v-for="(todo, index) in todos" :key="index" 
			    class="todos-item"
			>
			    <h3>{{ index }} - {{ todo.title }}</h3>
				<ul>
				    <li>{{ todo.tasks[0].description }}</li>
					<li>{{ todo.tasks[1].description }}</li>
				</ul>
				
				<router-link :to="'/todos/' + todo.id">Update</router-link>
				<button 
				    @click="showModalMet(todo)"
				>
					Delete
				</button>
			</div>
		</div>
		</section>
		<app-modal v-if="showModal" 
		  @cancel-delete="hideModalMet" 
		  @delete="deleteItem(dataTodo.id)" 
		>
           <h3 slot="header">Delete Todo: {{ dataTodo.title }}</h3>
		   <p slot="body">Are you sure?</p>
        </app-modal>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'

import AppAddTodo from '@/components/AddTodo.vue'
import AppModal from '@/components/Modal.vue'

export default {
    name: 'Todos',
    props: {
        msg: String
	},
    components: {
	  AppAddTodo,
      AppModal
    },
	data() {
		return {
			dataTodo: null
		}
	},
    computed: {
		...mapGetters('todos', {
			todos: 'items'
		}),
		...mapGetters('settings', [
			'loading',
			'showModal'
		]),
		/* idTodoModal(id) {
            return this.idTodo = id;
		}, */
		empty() {
			setTimeout(() => {
				this.todos.length === 0;
			}, 500)
		}
	},
	methods: {
		/* ...mapActions('todos', [
			'deleteItem'
		]),
		...mapMutations('settings', [
			'showModal'
		]), */
		showModalMet(todo){
			this.$store.commit('settings/showModal');
            this.dataTodo = todo;
		},
		hideModalMet(){
			this.$store.commit('settings/showModal');
            this.dataTodo = null;
		},
		deleteItem(id){
			this.$store.dispatch('todos/deleteItem', id);
			this.$store.commit('settings/showModal');
		}
	},
	created(){
		this.$store.dispatch('todos/loadItems');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
	max-width: 1140px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.todos {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;

  &-item {
	flex-basis: 25%;
    /* flex-grow: 1; */
    max-width: 100%;
  }
}
</style>
