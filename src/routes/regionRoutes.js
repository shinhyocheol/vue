
import RegionListView from '../components/views/regions/RegionList.vue'
import RegionInputView from '../components/views/regions/RegionInput.vue'

const regionRoutes = [
  {
    path: 'regions',
    component: RegionListView,
    name: '지역',
    meta: {description: '지역데이터 목록을 조회하실 수 있습니다.'}
  }, {
    path: 'regions/inputs',
    component: RegionInputView,
    name: '지역등록',
    meta: {description: '지역데이터를 등록 또는 수정할 수 있습니다.'}
  }
]
export default regionRoutes
