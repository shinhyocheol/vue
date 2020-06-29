import PlanCategoryListView from '../components/views/carriers/categories/PlanCategoryList.vue'

const planCategoryRoutes = [
  {
    path: 'planCategories',
    component: PlanCategoryListView,
    name: '요금제 카테고리',
    meta: {description: '요금제 카테고리 목록을 조회하실 수 있습니다.'}
  }
]
export default planCategoryRoutes
