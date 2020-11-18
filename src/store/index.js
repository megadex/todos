import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import todos from './modules/todos'
import settings from './modules/appSettings'

export const store = new Vuex.Store({
	modules: {
		todos,
		settings
	},
	strict: process.env.NODE_ENV !== 'production'
});