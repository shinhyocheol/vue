<template>
  <div class="center-block custom-table" id="search-box">
    <div class="table-scrollable">
      <table class="table table-bordered custom-style">
        <tbody>
          <slot class="filter" name="filter" />
        </tbody>
      </table>
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
  border: #ececec 1px solid;
  border-radius: 5px;
  margin-bottom: 5px;
}
.custom-style{
  padding-bottom: 10px;
  padding-top: 10px;
  vertical-align: middle; 
  margin-bottom:0px;
}
</style>

