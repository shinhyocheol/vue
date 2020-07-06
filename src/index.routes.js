import regionRoutes from './routes/regionRoutes'

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
      ...regionRoutes
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]
export default routes
