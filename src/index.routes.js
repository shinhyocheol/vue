import regionRoutes from './routes/regionRoutes'
import carrierRoutes from './routes/carrierRoutes'
import planCategoryRoutes from './routes/planCategoryRoutes'
import planRoutes from './routes/planRoutes'

import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

import DashboardView from './components/views/Dashboard.vue'

const routes = [
  {
    path: '/mPlatform/1.0/login',
    component: LoginView
  },
  {
    redirect: '/mPlatform/1.0/login',
    path: '/mPlatform/1.0/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        // alias: '',
        component: DashboardView,
        name: '대시보드',
        meta: {description: 'Overview of environment'}
      },
      ...regionRoutes,
      ...carrierRoutes,
      ...planCategoryRoutes,
      ...planRoutes
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]
export default routes
