import { createRouter, createWebHashHistory } from 'vue-router'
import HistoryView from '@/views/HistoryView.vue'
import TableView from '@/views/TableView.vue'
import CloudView from '@/views/CloudView.vue'
import SearchView from '@/views/SearchView.vue'
import SpeakView from '@/views/SpeakView.vue'

const routes = [
  {
    path: '/historyview/',
    name: 'HistoryView',
    component: HistoryView
  },
  {
    path: '/',
    name: 'TableView',
    component: TableView
  },
  {
    path: '/cloudview/',
    name: 'CloudView',
    component: CloudView
  },
  {
    path: '/searchview/',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/speakview/',
    name: 'SpeakView',
    component: SpeakView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
