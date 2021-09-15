import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/sign',
		name: 'Sign',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
	},
	{
		path: '/head',
		name: 'Head',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/head.vue')
	},
	{
		path: '/gedan',
		name: 'gedan',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/gedan.vue')
	},
	{
		path: '/mycomment',
		name: 'myComment',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/myComment.vue')
	}
	
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
