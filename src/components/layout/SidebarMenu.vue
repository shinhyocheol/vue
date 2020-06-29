<template>
  <ul class="sidebar-menu">
    <li class="header">메뉴</li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-table"></i>
        <span class="treeview-title">지역</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/regions" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">데이터 조회</span>
          </a>
        </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-table"></i>
        <span class="treeview-title">제조사 및 모델</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/regions" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">제조사</span>
          </a>
        </router-link>
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/regions" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">시리즈</span>
          </a>
        </router-link>
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/regions" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">모델</span>
          </a>
        </router-link>
      </ul>
    </li>

    <li class="treeview">
      <a href="#">
        <i class="fa fa-table"></i>
        <span class="treeview-title">통신사 및 요금제</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/carriers" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">통신사</span>
          </a>
        </router-link>
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/planCategories" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">카테고리</span>
          </a>
        </router-link>
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/plans" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">요금제</span>
          </a>
        </router-link>
      </ul>
    </li>

    <li class="treeview">
      <a href="#">
        <i class="fa fa-dashboard"></i>
        <span class="treeview-title">대시보드</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" 
                     class="pageLink" 
                     to="/mPlatform/1.0/dashboard" 
                     v-if="user.level == 1">
          <a>
            <i class="fa fa-circle-o"></i>
            <span class="page">대시보드</span>
          </a>
        </router-link>
      </ul>
    </li>

    <li class="header">래퍼런스</li>
    <router-link tag="li" 
                 class="pageLink" 
                 to="/404" 
                 v-if="user.level == 1">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page">404</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: "SidebarMenu",
  props: ["user"]
}
</script>
<style>
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
