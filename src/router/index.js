import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import E404 from '../views/E404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    redirect: {name: 'items'}
  },
  {
    name: 'items',
    path: '/todos',
    component: Home
  },
  {
    name: 'item',
    path: '/todos/:id',
		component: Todo
  },
	{
		path: '*',
		component: E404
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
