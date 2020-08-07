<!-- 공용 컴포넌트 (data-table.vue) 템플릿 -->
<template>
  <div class="row center-block custom-table" 
       id="data-table" 
       style="text-align:center;">
    <div class="table-scrollable">
      <table class="table table-bordered table-hover">
        <thead>
          <tr class="heading">
            <th width="50" v-if="checkbox">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" 
                       class="custom-control-input" 
                       id="customCheck" 
                       v-bind:model="allChecked" />
                <label class="custom-control-label" 
                       for="customCheck"></label>
              </div>
            </th>
            <slot name="header" />
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, index) in item">
            <tr :key="index">
              <td v-if="checkbox">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" 
                         class="custom-control-input" 
                         v-bind:id="'customCheck'+row.reg_no"
                         v-model="row.checked" />
                  <label class="custom-control-label" 
                         v-bind:for="'customCheck'+row.reg_no"></label>
                </div>
              </td>
              <slot name="list" :row="row"></slot>
            </tr>
          </template>
          <tr v-if="item.length === 0">
            <td colspan="20" class="text-center">검색 결과가 없습니다.</td>
          </tr> 
        </tbody>
      </table>
    </div>
    <!-- 테이블 페이징 컴포넌트 렌더링 -->
    <div class="paging-nav">
      <div class="paging-con">
        <template> 
          <paginate 
              v-model="currentPage" 
              :page-count="pagingCnt" 
              :page-range="10" 
              :margin-pages="0" 
              :click-handler="pagingHandle" 
              :prev-text="'이전'" 
              :next-text="'다음'" 
              :container-class="'pagination'" 
              :page-class="'page-item'"> 
          </paginate> 
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Paginate from 'vuejs-paginate'
export default {
  name: "DataTable",
  props: ['item', 'getTable', 'search', 'checkbox'],
  components: {Paginate},
  data () {
    return {
      currentPage: 1,
      count: 0
    }
  },
  computed: {
    allChecked: {
      get: function() {
        for (let i = 0, len = this.item.length; i < len; i++) {
          if (!this.item[i].checked) return false
        }
        return true
      },
      set: function(v) {
        for (let i = 0, len = this.item.length; i < len; i++) {
          this.item[i].checked = v
        }
      }
    },
    pagingCnt () {
      if (this.item.length !== 0) {
        this.count = Math.ceil((this.item[0].cnt * 1) / 15)
      } else {
        this.count = 0
      }
      return this.count
    }
  },
  methods: {
    pagingHandle (pageNum) {
      const params = new URLSearchParams()
      for (const key in this.search) {
        if (this.search[key]) {
          params.append(key, this.search[key])
        }
      }
      params.append("pageNum", (pageNum - 1) * 15)
      this.getTable(params)
    }
  }
}
</script>
<style scoped>
.paging-con {
  width: auto;
  height: auto;
  float: left;
  margin-left: 50%;
  transform:translate(-50%, 0);
}
.custom-table {
  background: #fff;
  border: #ececec 1px solid;
  border-radius: 5px;
}

.heading {
  background: #ebebeb;
  font-size: 1em;
}

.form-control {
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.custom-control {
  display: block;
  min-height: 1.5rem;
  margin-top: 2px;
}

.custom-control-inline {
  display: -ms-inline-flexbox;
  display: inline-flex;
  margin-right: 1rem;
}

.custom-control-input {
  left: 0;
  z-index: -1;
  width: 1.2rem;
  height: 1.25rem;
  float: left;
  opacity: 0;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #007bff;
  background-color: #007bff;
}

.custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #80bdff;
}

.custom-control-input:not(:disabled):active ~ .custom-control-label::before {
  color: #fff;
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
.custom-control-input[disabled] ~ .custom-control-label, 
.custom-control-input:disabled ~ .custom-control-label {
  color: #6c757d;
}
.custom-control-input[disabled] ~ .custom-control-label::before, 
.custom-control-input:disabled ~ .custom-control-label::before {
  background-color: #e9ecef;
}
.custom-control-label {
  vertical-align: middle;
  float: left;
}
.custom-control-label::before {
  position: absolute;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  pointer-events: none;
  content: "";
  background-color: #fff;
  border: #adb5bd solid 1px;
}
.custom-control-label::after {
  position: absolute;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  content: "";
  background: no-repeat 50% / 50% 50%;
}
.custom-checkbox .custom-control-label::before {
  border-radius: 0.25rem;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e");
}
.custom-checkbox
  .custom-control-input:indeterminate
  ~ .custom-control-label::before {
  border-color: #007bff;
  background-color: #007bff;
}
.custom-checkbox
  .custom-control-input:indeterminate
  ~ .custom-control-label::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e");
}
.custom-checkbox
  .custom-control-input:disabled:checked
  ~ .custom-control-label::before {
  background-color: rgba(0, 123, 255, 0.5);
}
.custom-checkbox
  .custom-control-input:disabled:indeterminate
  ~ .custom-control-label::before {
  background-color: rgba(0, 123, 255, 0.5);
}
.paging-nav{
  width: 100%;
  height: auto;
}
</style>
