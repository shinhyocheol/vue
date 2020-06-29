
import CarrierListView from '../components/views/carriers/CarrierList.vue'

const carrierRoutes = [
  {
    path: 'carriers',
    component: CarrierListView,
    name: '통신사',
    meta: {description: '통신사 목록을 조회하실 수 있습니다.'}
  }
]
export default carrierRoutes
