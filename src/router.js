import Vue from 'vue'
import Router from 'vue-router'
import Table from './views/Table.vue'
import Auth from './views/Auth.vue'
import App from './core/App'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/table',
      name: 'mytable',
      component: Table
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

router.beforeEach((to, from, next) =>{
	App.User.checkAuth()
		.then(_ => {
			if((to.path === '/' || to.path === '/auth')){
				next('/table')
			}else{
				next()
			}
		})
		.catch(_ => {
			if((to.path === '/' || to.path === '/table') && true){
				next('/auth')
			}else{
				next()
			}
		})
})

export default router