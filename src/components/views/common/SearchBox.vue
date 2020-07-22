<template>
  <div class="center-block custom-table" id="search-box">
    <div class="table-scrollable">
      <table class="table custom-style">
        <tbody>
          <slot class="filter" name="filter" />
        </tbody>
      </table>
    </div>
    <div class="button-el">
      <button class="btn btn-warning" 
              type="button" 
              style="float:right"
              @click="search()">
        <i class="fa fa-search"></i>
        <span>search</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBox",
  props: ['item', 'searchFilter'],
  methods: {
    search() {
      this.searchFilter()
    }
  }
}
</script>
<style scoped>
.table-scrollable {
  background: #fff;
  border: #cdcdcd 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
}
.custom-style{
  text-align:center; 
  vertical-align: middle; 
  margin-bottom:0px;
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

.custom-control-input[disabled] ~ .custom-control-label, .custom-control-input:disabled ~ .custom-control-label {
  color: #6c757d;
}

.custom-control-input[disabled] ~ .custom-control-label::before, .custom-control-input:disabled ~ .custom-control-label::before {
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
.button-el{
  height:40px; 
  clear:both; 
  margin-bottom:15px;
}
</style>

