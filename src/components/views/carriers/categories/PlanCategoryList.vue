<template>
  <section class="content">
    <form id="searchForm">
      <search-box>
        <template slot="filter">
          <tr>
            <th>통신사</th>
            <td>
              <select class="form-control" 
                      name="carrierRegno" 
                      v-model="carrierRegno" >
                <option value>구분타입</option>
                <option value="1">SK</option>
                <option value="2">KT</option>
                <option value="3">LG</option>
              </select>
            </td>
            <th>데이터타입</th>
            <td>
              <select class="form-control" 
                      name="dataType" 
                      v-model="dataType" >
                <option value>구분타입</option>
                <option value="5G">5G</option>
                <option value="LTE">LTE</option>
                <option value="3G">3G</option>
              </select>
            </td>
            <th>카테고리명</th>
            <td>
              <input type="text"
                    class="form-control form-filter input-sm searchable"
                    name="categoryName"
                    v-model="categoryName"/>
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
            <td>
              <button class="btn btn-sm btn-warning" 
                      type="button" 
                      @click="searchFilter()">
                <i class="fa fa-search"></i>
              </button>
            </td>
          </tr>
        </template>
      </search-box>
    </form>
    <data-table :item="item" 
                :search="search" 
                :get-table="getPlanCategories" 
                id="data-table" >
      <template slot="header">
        <th></th>
        <th>카테고리 번호</th>
        <th>통신사</th>
        <th>카테고리명</th>
        <th>데이터 타입</th>
        <th>등록시간</th>
        <th>삭제여부</th>
        <th>비고</th>
      </template>
      <template slot="list" slot-scope="{row}">
        <td>
          <img  style="width:40px; height:40px;"
                :src="'http://127.0.0.1:8080/mPlatform/1.0/static/img'+row.carrier_img_path" 
          />
        </td>
        <td>{{row.plan_category_regno}}</td>
        <td>{{row.carrier_name}}</td>
        <td>{{row.category_name}}</td>
        <td>{{row.data_type}}</td>
        <td>{{row.reg_date}}</td>
        <td>{{row.is_deleted}}</td>
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
  name: "PlanCategoryList",
  components: { DataTable, SearchBox },
  data() {
    return {
      selected: null,
      dataMap: [],
      carrierRegno: null,
      dataType: null,
      categoryName: null,
      deleted: null
    }
  },
  computed: {
    item () {
      return this.dataMap
    },
    search() {
      var dataMap = {
        "carrier_regno": this.carrierRegno,
        "data_type": this.dataType,
        "category_name": this.categoryName,
        "is_deleted": this.deleted
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
      if (token === null || token === "") {
        alert("해당 페이지에 대한 접근권한이 없습니다.")
        this.$router.push(this.$rootpath + "/login")
      } else {
        var params = new URLSearchParams()
        params.append("pageNum", 0)
        this.getPlanCategories(params)
      }
    },
    getPlanCategories(params = null) {
      var token = localStorage.getItem("ACCESS_TOKEN")
      this.$http.defaults.headers.common['x-access-token'] = token
      this.$http.get(this.$host + this.$rootpath + "/plans/categories?" + params)
      .then(result => {
        this.dataMap = result.data.data.plan_category_list
      }).catch(e => {
        switch (e.response.status) {
          case 401:
            alert("인증시간이 만료되었습니다. \n재로그인 해주시기 바랍니다.")
            console.log(e)
            this.$router.push(this.$rootpath + "/login")
            return false
          case 403:
            alert("인증에 문제가 발생했습니다.")
            console.log(e)
            this.$router.push(this.$rootpath + "/login")
            return false
          case 404:
            alert("존재하지 않는 페이지입니다.")
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
      if (this.carrierRegno) {
        params.append("carrier_regno", this.carrierRegno)
      }
      if (this.dataType) {
        params.append("data_type", this.dataType)
      }
      if (this.deleted) {
        params.append("category_name", this.categoryName)
      }
      if (this.deleted) {
        params.append("is_deleted", this.deleted)
      }
      params.append("pageNum", 0)
      this.getPlanCategories(params)
    }
  }
}
</script>
<style>
.btn:first-child {
  margin-right: 5px;
}
</style>
