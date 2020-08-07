<template>
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
          <alert :dismissible="true"
                  type="info"
                  :iconClasses="['fa', 'fa-check']"
                  title="You can view the current status of application for merchants.">
            <span>* 요청 반려는 반드시 충분한 사유가 존재해야하며 신청자에게 공지해야 합니다.</span>
          </alert>
          
      </div>
    </div>
    <form id="searchForm">
      <search-box :search-filter="searchFilter">
        <template slot="filter">
          <tr>
            <th>승인요청</th>
            <td colspan="30">
              <div class="form-inline">
                <div style="float:left">
                  <input type="checkbox" 
                        class="form-check-input" 
                        id="approvalAllCheck"
                        @click="checkAllStatus"
                        v-model="statusAllChecked">
                  <label for="approvalAllCheck"
                        class="form-check-label">전체</label>
                </div>
                <div v-for="(status, index) in statuses"
                     :key="index"
                     style="float:left">
                  <input :value="status.val"
                        v-bind:id="'approvalStatus'+index"
                        type="checkbox"
                        class="form-check-input"
                        @click="checkStatus"
                        v-model="approvalStatus">
                  <label 
                        v-bind:for="'approvalStatus'+index"
                        class="form-check-label">{{status.name}}</label>      
                </div>
              </div>
            </td>
            <td rowspan="3">
              <div class="button-el">
                <button class="btn btn-warning" 
                        type="button" 
                        @click="searchFilter()">
                  <i class="fa fa-search"></i>
                  <span>검색</span>
                </button>
              </div>
            </td>
          </tr> 
          <tr>
            <th width="100">
              <select class="form-control" 
                      name="searchType"
                      v-model="searchType">
                <option selected >검색 타입을 선택해주세요.</option>
                <option value="email">이메일</option>
                <option value="name">이름</option>
                <option value="nickName">닉네임</option>
                <option value="storeName">매장명</option>
              </select>
            </th>      
            <td colspan="10">
              <div class="form-inline">
                <div class="form-group">
                  <input type="text"
                        class="form-control"
                        name="searchText"
                        v-model="searchText">
                </div>
              </div>
            </td>
            <th width="200">연락처</th>      
            <td>
              <div class="form-inline">
                <div class="form-group">
                  <select class="form-control" 
                      name="userPhone1"
                      v-model="userPhone1">
                    <option selected >선택해주세요.</option>
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="019">019</option>
                  </select> 
                </div>
                <div class="form-group">
                  <input type="text"
                        class="form-control"
                        name="userPhone2"
                        v-model="userPhone2" />
                </div>
                <div class="form-group">
                  <input type="text"
                        class="form-control"
                        name="userPhone3"
                        v-model="userPhone3" />
                </div>
              </div>
            </td> 
          </tr>
          <tr>
            <th>승인요청일</th>
            <td colspan="10">
              <div class="form-inline">
                <div class="form-group">
                  <date-picker :language="ko"
                               :value="applyStartDate"
                               :input-class="'form-control'"
                               :format="'yyyy-MM-dd'" 
                               :name="'applyStartDate'"
                               :v-model="applyStartDate"
                               @selected="changeStartDate"
                               />
                </div>
                <div class="form-group">
                  <date-picker :language="ko"
                               :value="applyEndDate"
                               :input-class="'form-control'" 
                               :format="'yyyy-MM-dd'"
                               :name="'applyEndDate'"
                               :v-model="applyEndDate"
                               @selected="changeEndDate"
                               />
                </div>
                <div class="form-group">
                  <button type="button" 
                          class="btn btn-primary" 
                          @click="searchDateTypeChange('all')">
                          전체
                  </button>
                  <button type="button" 
                          class="btn btn-primary" 
                          @click="searchDateTypeChange('day')">
                          오늘
                  </button>
                  <button type="button" 
                          class="btn btn-primary" 
                          @click="searchDateTypeChange('week')">
                          최근 7일
                  </button>
                  <button type="button" 
                          class="btn btn-primary" 
                          @click="searchDateTypeChange('month')">
                          최근 30일
                  </button>
                </div>
              </div>
            </td>
          </tr> 
        </template>
      </search-box>
    </form>
    <data-table :item="item" 
                :search="search" 
                :get-table="getStores" 
                :checkbox="false"
                id="data-table" >
      <template slot="header">
        <th>신청번호</th>
        <th>구분</th>
        <th>가맹점명</th>
        <th>대표자명</th>
        <th>사업자번호</th>
        <th>도로명 주소</th>
        <th>건물번호</th>
        <th>소개글</th>
        <th>승인여부</th>
        <th>신청날짜</th>
        <th>비고</th>
      </template>
      <template slot="list" slot-scope="{row}">
        <td>{{row.approval_regno}}</td>
        <td>{{row.type}}</td>
        <td>{{row.store_name}}</td>
        <td>{{row.president_name}}</td>
        <td>{{row.business_no}}</td>
        <td>{{row.road_address}}</td>
        <td>{{row.building_code}}</td>
        <td>{{row.welcome_note}}</td>
        <td>{{row.approval}}</td>
        <td>{{row.reg_date}}</td>
        <td>
          <button class="btn btn-sm btn-info row_edit_btn">
            <i class="fa fa-file-alt"></i>승인
          </button>
          <button class="btn btn-sm btn-danger row_delete_btn">
            <i class="fa fa-file-alt"></i>반려
          </button>
        </td>
      </template> 
    </data-table>
  </section>
</template>
<script>
import DataTable from '@/components/views/common/Table'
import SearchBox from '@/components/views/common/SearchBox'
import common from '@/components/mixins/common'
import DatePicker from 'vuejs-datepicker'
import {en, ko} from 'vuejs-datepicker/dist/locale'
import Alert from '@/components/widgets/Alert'

export default {
  name: "DataList",
  mixins: [common],
  components: {
    DataTable,
    SearchBox,
    Alert,
    DatePicker
  },
  data() {
    return {
      selected: null,
      dataMap: [],
      searchType: null,
      searchText: null,
      userPhone1: null,
      userPhone2: null,
      userPhone3: null,
      en: en,
      ko: ko,
      applyStartDate: this.defaultDate("start"),
      applyEndDate: this.defaultDate("end"),
      statuses: [
        { "val": "Y", "name": "승인" },
        { "val": "W", "name": "대기" },
        { "val": "F", "name": "반려" }
      ],
      approvalStatus: [],
      statusAllChecked: false
    }
  },
  computed: {
    item () {
      return this.dataMap
    },
    search() {
      let dataMap = {
        "searchType": this.searchType,
        "searchText": this.searchText,
        "userPhone1": this.userPhone1,
        "userPhone2": this.userPhone2,
        "userPhone3": this.userPhone3,
        "applyStartDate": this.applyStartDate,
        "applyEndDate": this.applyEndDate
      }
      return dataMap
    }
  },
  mounted() {
    this.handleAuth()
  },
  methods: {
    handleAuth() {
      let token = localStorage.getItem("ACCESS_TOKEN")
      if (!token) {
        alert("인증토큰이 유효하지 않습니다. \n다시 로그인 해주시기바랍니다.")
        delete this.$http.defaults.headers.common['x-access-token'] // x-access-token 객체 삭제 처리
        this.$store.dispatch('LOGOUT').then(() => this.$router.push(this.$rootpath + "/login"))
      } else {
        let params = new URLSearchParams()
        params.append("pageNum", 0)
        this.getStores(params)
      }
    },
    getStores(params = null) {
      let token = localStorage.getItem("ACCESS_TOKEN")
      this.$http.defaults.headers.common['x-access-token'] = token
      this.$http.get(this.$host + this.$rootpath + "/stores/apply?" + params)
      .then(result => {
        this.dataMap = result.data.data.store_apply_list
      }).catch(e => {
        common.methods.handleException(e)
      })
    },
    searchFilter() {
      let params = new URLSearchParams()
      if (this.searchType) {
        params.append("search_type", this.searchType)
      }
      if (this.searchText) {
        params.append("search_text", this.searchText)
      }
      if (this.userPhone1 || this.userPhone2 || this.userPhone3) {
        let userPhone = ""
        if (this.userPhone1) userPhone += this.userPhone1
        if (this.userPhone2) userPhone += this.userPhone2
        if (this.userPhone3) userPhone += this.userPhone3
        params.append("user_phone", userPhone)
      }
      if (this.applyStartDate) {
        let date = new Date(this.applyStartDate)
        let formatDate = common.methods.dateFormatString(date)
        params.append("apply_start_date", formatDate)
      }
      if (this.applyEndDate) {
        let date = new Date(this.applyEndDate)
        let formatDate = common.methods.dateFormatString(date)
        params.append("apply_end_date", formatDate)
      }
      params.append("approval", this.approvalStatus)
      params.append("pageNum", 0)
      this.getStores(params)
    },
    defaultDate(type) {
      let date = new Date()
      if (type === "start") {
        date.setDate(date.getDate() - 7)
      }
      return date
    },
    changeStartDate(date) {
      this.applyStartDate = date
    },
    changeEndDate(date) {
      this.applyEndDate = date
    },
    searchDateTypeChange(type) {
      if (type === "all") {
        this.applyStartDate = null
        this.applyEndDate = null
      } else if (type === "day") {
        let date = new Date()
        this.applyStartDate = date
        this.applyEndDate = date
      } else if (type === "week") {
        let startDate = new Date().setDate(new Date().getDate() - 7)
        let endDate = new Date()
        this.applyStartDate = startDate
        this.applyEndDate = endDate
      } else if (type === "month") {
        let startDate = new Date().setMonth(new Date().getMonth() - 1)
        let endDate = new Date()
        this.applyStartDate = startDate
        this.applyEndDate = endDate
      }
    },
    checkAllStatus: function() {
      this.approvalStatus = []
      if (!this.statusAllChecked) {
        for (let index = 0; index < this.statuses.length; index++) {
          this.approvalStatus.push(this.statuses[index].val.toString())
        }
      }
    },
    checkStatus: function() {
      this.statusAllChecked = false
    }
  }
}
</script>
<style scoped>
.custom-img{
  width:40px; 
  height:40px;
}
.custom-img2{
  width: 100px;
  height: 70px;
}
.form-inline{
  padding-left: 10px;
}
.form-inline label {
  margin-right: 20px;
}
.form-inline button {
  margin-right: 10px;
}
.form-inline .btn-primary:first-child{
  margin-left: 15px;
}
.button-el{
  height:40px; 
  clear:both; 
  text-align: center;
}
</style>
