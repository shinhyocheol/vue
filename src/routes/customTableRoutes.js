
import CustomTableListView from '../components/views/DataList.vue'

const customTableRoutes = [
  {
    path: 'datatable',
    component: CustomDataListView,
    name: '데이터 테이블',
    meta: {description: '데이터 목록을 조회하실 수 있습니다.'}
  }
]
export default customTableRoutes
