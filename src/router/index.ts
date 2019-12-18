import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { loadBrokers } from '@/utils/api/broker'
import { loadConnections } from '@/utils/api/connection'
import { BrokerModel } from '@/views/brokers/types'
import { ConnectionModel } from '@/views/Connections/types'

Vue.use(Router)

const router: Router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepAlive && savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Connections') {
    const connections: ConnectionModel[] | [] = loadConnections() || []
    if (connections.length) {
      next({ path: `/recent_connections/${connections[0].id}` })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
