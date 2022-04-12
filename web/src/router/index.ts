import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import(/* webpackChunkName: "blogPost" */ '../views/BlogPost.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "tools" */ '../views/Tools.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import(/* webpackChunkName: "change-password" */ '../views/ChangePassword.vue')
  },
  {
    path: '/tfa/:challenge',
    name: 'TFA',
    component: () => import(/* webpackChunkName: "tfa" */ '../views/Tfa.vue')
  },
  {
    path: '/hagame3d',
    name: 'HaGame3D',
    component: () => import(/* webpackChunkName: "hagame3d" */ '../views/HaGame3D.vue')
  },
  {
    path: '/testimonial/:id',
    name: 'Testimonial',
    component: () => import(/* webpackChunkName: "testimonial" */ '../views/Testimonial.vue')
  },
  {
    path: '/service/:id?',
    name: 'Service',
    component: () => import(/* webpackChunkName: "service" */ '../views/Service.vue')
  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: () => import(/* webpackChunkName: "invoice" */ '../views/Invoice.vue')
  },
  {
    path: '/quote/:id',
    name: 'Quote',
    component: () => import(/* webpackChunkName: "quote" */ '../views/Quote.vue')
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "payment" */ '../views/PaymentConfirmation.vue')
  },
  {
    path: '/xl2sql',
    name: 'Xl2Sql',
    component: () => import(/* webpackChunkName: "Xl2Sql" */ '../views/Xl2sql.vue')
  },
  {
    path: 'unauthorized',
    name: 'Unauthorized',
    component: () => import(/* webpackChunkName: "unauthorized" */ '../views/Unauthorized.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "pageNotFound" */ '../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
