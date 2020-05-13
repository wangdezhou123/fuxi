import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入首页
import Home from '../views/home/index.vue'

// 引入
import WelCome from '@/views/welcome/index.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/login', component: 箭头函数}
  // import使用:
  // 1. import xxx from xxx;  模块化导入  // 完整导入
  // 2. import(xxx)  函数调用 // 按需导入
  // 它们本质不是一回事
  // 如下是import()函数调用，好处是按需导入

  // @符号代表src目录的绝对路径名地址：E:\Vue92\everyday92\01pro\topline\src\
  // index.vue是默认索引文件，不用设置，自动会寻找，代码更节省，更优雅
  // name属性作用：编程式导航可以利用
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/home/welcome', name: 'welcome', component: WelCome }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  const ui = window.sessionStorage.getItem('userinfo')
  if (!ui && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
