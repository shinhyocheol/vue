import regionRoutes from './routes/regionRoutes'
import carrierRoutes from './routes/carrierRoutes'
import planCategoryRoutes from './routes/planCategoryRoutes'
import planRoutes from './routes/planRoutes'

import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'

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
      }, {
        path: 'tables',
        component: TablesView,
        name: '테이블 자료',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: '타임라인',
        meta: {description: 'Tasks page in the form of a timeline'}
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
