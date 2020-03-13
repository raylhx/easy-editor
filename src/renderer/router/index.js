import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Edit from '@/pages/edit'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '*',
    redirect: '/edit'
  }
  ]
})
