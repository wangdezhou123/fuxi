<template>
  <el-container>
    <el-aside :width="isCollapse?'65px':'200px'">
      <el-menu
        background-color="#353B4E"
        text-color="#fff"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/home/welcome" :width="isCollapse?'65px':'200px'">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :width="isCollapse?'65px':'200px'">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="/home/article">文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="{width:isCollapse?'65px':'200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            slot="prefix"
            :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
            style="cursor:pointer;"
            @click="isCollapse=!isCollapse"
          ></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>

        <div id="rt">
          <el-input type="text" placeholder="请输入搜索的文章内容" style="width:300px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span style="margin:0 10px;">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="tuichu()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 子路由组件显示占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  // 计算属性应用
  computed: {
    // 获得账户名称
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    // 获得账户头像
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  },
  data () {
    return {
      isCollapse: false // false:展开   true:折叠
    }
  },
  methods: {
    tuichu () {
      // 确认
      this.$confirm('确认要退出系统么?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空sessionStorage数据
          window.sessionStorage.clear()
          // 导航到登录页面
          this.$router.push({ name: 'login' })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #323745;
  }
  .el-header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 9px;
    min-width: 950px;
    #lt {
      height: 100%;
      width: 40%;
      background-color: white;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      height: 100%;
      width: 50%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
  .el-main {
    background-color: #f2f3f5;
  }
}
</style>
