import { createRouter, createWebHistory } from 'vue-router'
import AppMain from './components/AppMain.vue'
import PersonalAccount from './components/PersonalAccount.vue'
import AppTests from './components/AppTests.vue'
import CreateTest from './components/CreateTest.vue'

export default createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'main',
      component: AppMain
    },
    {
      path: '/account',
      name: 'account',
      component: PersonalAccount
    },
    {
      path: '/tests/:testId?',
      name: 'tests',
      component: AppTests
    },
    {
      path: '/create-test',
      name: 'createTest',
      component: CreateTest
    }
  ]
})
