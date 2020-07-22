<template>
  <section class="content">
    <form id="searchForm">
      <search-box :search-filter="searchFilter">
        <template slot="filter">
          <tr>
            <th>시(도)</th>
            <td>
              <select class="form-control" 
                      name="sido"
                      v-model="sido" >
                <option value>구분타입</option>
                <option value="">One</option>
                <option value="">Two</option>
              </select>
            </td>
            <th>구(군)</th>
            <td>
              <input type="text"
                    class="form-control form-filter input-sm searchable"
                    name="gungu"
                    v-model="gungu"
                    />
            </td>
            <th>동</th>
            <td>
              <input type="text" 
                    class="form-control form-filter input-sm searchable" 
                    name="myundong" 
                    v-model="myundong" />
            </td>
            <th>지역명</th>
            <td>
              <input type="text" 
                    class="form-control form-filter input-sm searchable" 
                    name="regionName" 
                    v-model="regionName" />
            </td>
            <th>행정구역타입</th>
            <td>
              <select class="form-control" 
                      name="regionType" 
                      v-model="regionType" >
                <option value>코드타입</option>
                <option value="DI">DI</option>
                <option vlaue="SW">SW</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>지역구분</th>
            <td>
              <select class="form-control" 
                      name="regionSection" 
                      v-model="regionSection" >
                <option value>구분타입</option>
                <option value="">Y</option>
                <option value="">N</option>
              </select>
            </td>

            <th>위도</th>
            <td>
              <input type="text" 
                    class="form-control form-filter input-sm searchable" 
                    name="latitude" v-model="latitude" />
            </td>

            <th>경도</th>
            <td>
              <input type="text" 
                    class="form-control form-filter input-sm searchable" 
                    name="longitude" v-model="longitude" />
            </td>
            
            <th>삭제여부</th>
            <td>
              <select class="form-control" 
                      name="deleted" 
                      v-model="deleted" >
                <option value>구분타입</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </td>
          </tr>
        </template>
      </search-box>
    </form>
    <data-table :item="item" 
                :search="search" 
                :get-table="getRegions" 
                id="data-table" >
      <template slot="header">
        <th>법정코드</th>
        <th>시(도)</th>
        <th>구(군)</th>
        <th>동</th>
        <th>행정코드</th>
        <th>행정동번호</th>
        <th>소속행정동</th>
        <th>행정구역타입</th>
        <th>지역구분</th>
        <th>위도</th>
        <th>경도</th>
        <th>등록일시</th>
        <th>삭제여부</th>
        <th>메모</th>
        <th>기타</th>
      </template>
      <template slot="list" slot-scope="{row}">
        <td>{{row.b_dong_code}}</td>
        <td>{{row.sido}}</td>
        <td>{{row.gungu}}</td>
        <td>{{row.myundong}}</td>
        <td>{{row.h_dong_code}}</td>
        <td>{{row.region_regno}}</td>
        <td>{{row.region_name}}</td>
        <td>{{row.region_type_cd}}</td>
        <td>{{row.region_name}}</td>
        <td>{{row.latitude}}</td>
        <td>{{row.longitude}}</td>
        <td>{{row.reg_date}}</td>
        <td>{{row.is_deleted}}</td>
        <td>{{row.admin_memo}}</td>
        <td>
          <button class="btn btn-sm btn-info row_edit_btn">
            <i class="fa fa-file-alt"></i>수정
          </button>
          <button class="btn btn-sm btn-danger row_delete_btn">
            <i class="fa fa-file-alt"></i>삭제
          </button>
        </td>
      </template> 
    </data-table>
  </section>
</template>
<script>
import DataTable from "@/components/views/common/Table"
import SearchBox from "@/components/views/common/SearchBox"
export default {
  name: "RegionList",
  components: { DataTable, SearchBox },
  data() {
    return {
      selected: null,
      dataMap: [],
      regionName: null,
      regionType: null,
      regionSection: null,
      latitude: null,
      longitude: null,
      deleted: null,
      sido: null,
      gungu: null,
      myundong: null
    }
  },
  computed: {
    item () {
      return this.dataMap
    },
    search() {
      var dataMap = {
        "region_name": this.regionName,
        "region_type": this.regionType,
        "latitude": this.latitude,
        "longitude": this.longitude,
        "is_deleted": this.deleted,
        "sido": this.sido,
        "gungu": this.gungu,
        "myundong": this.myundong
      }
      return dataMap
    }
  },
  mounted() {
    this.handleAuth()
  },
  methods: {
    handleAuth() {
      var token = localStorage.getItem("ACCESS_TOKEN")
      if (!token) {
        alert("접근할 수 있는 인증토큰이 유효하지 않습니다. \n다시 로그인 해주시기바랍니다.")
        this.$store.dispatch('LOGOUT').then(() => this.$router.push(this.$rootpath + "/login"))
      } else {
        var params = new URLSearchParams()
        params.append("pageNum", 0)
        this.getRegions(params)
      }
    },
    getRegions(params = null) {
      this.$http.defaults.headers.common['x-access-token'] = localStorage.getItem("ACCESS_TOKEN")
      this.$http.get(this.$host + this.$rootpath + "/regions?" + params)
      .then(result => {
        this.dataMap = result.data.data.region_list
      }).catch(e => {
        switch (e.response.status) {
          case 401:
            alert("인증시간이 만료되었습니다. \n재로그인 해주시기 바랍니다.")
            console.log(e)
            this.$router.push(this.$rootpath + "/login")
            return false
          case 403:
            alert("접근 권한이 없습니다.")
            console.log(e)
            this.$router.push(this.$rootpath + "/login")
            return false
          case 404:
            alert("존재하지 않는 주소입니다.")
            console.log(e)
            this.$router.push(this.$rootpath + "/login")
            return false
          case 500:
            alert("서버측에 문제가 발생했습니다. \n관리자에게 문의바랍니다.")
            console.log("Reuqest Error Info : " + e)
            return false
          case 700:
            this.dataMap = []
            return false
        }
      })
    },
    searchFilter() {
      var params = new URLSearchParams()
      if (this.sido) {
        params.append("sido", this.sido)
      }
      if (this.gungu) {
        params.append("gungu", this.gungu)
      }
      if (this.myundong) {
        params.append("myundong", this.myundong)
      }
      if (this.regionName) {
        params.append("region_name", this.regionName)
      }
      if (this.regionType) {
        params.append("region_type", this.regionType)
      }
      if (this.latitude) {
        params.append("latitude", this.latitude)
      }
      if (this.longitude) {
        params.append("longitude", this.longitude)
      }
      if (this.deleted) {
        params.append("is_deleted", this.deleted)
      }
      params.append("pageNum", 0)
      this.getRegions(params)
    }
  }
}
</script>
<style scoped>
.btn:first-child {
  margin-right: 5px;
}
</style>
