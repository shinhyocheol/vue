import PlanListView from '../components/views/carriers/categories/plans/PlanList.vue'

const planRoutes = [
  {
    path: 'plans',
    component: PlanListView,
    name: '요금제 카테고리',
    meta: {description: '요금제 목록을 조회하실 수 있습니다.'}
  }
]
export default planRoutes
