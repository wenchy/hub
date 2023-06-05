<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '66px' : '202px'">
        <el-menu
          default-active="1-4-1"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="0" @click="toggleCollapse">
            <i class="el-icon-menu"></i>
            <template #title>
              <span>Toggle</span>
            </template>
          </el-menu-item>
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>App</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/file-explorer">file-explorer</el-menu-item>
              <el-menu-item index="/about">about</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>导航二</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header> Header {{ msg }}, Counter: {{ counter }} </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeLayout",
  props: {
    msg: String,
  },
  mounted() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  /* background-color: #545c64; */
}

.el-main {
  background-color: #e9eef3;
}
</style>