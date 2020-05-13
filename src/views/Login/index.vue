<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 绘制登录form表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <img src="./logo_index.png" alt />

        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码">
            <i slot="prefix" class="iconfont icon-iconfontshouji"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:left;" prop="xieyi">
          <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息，表示是否选中 -->
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px;"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%;" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 对gt.js文件进行导入
// gt.js文件本身没有做导出动作，所以就直接导入即可，此时系统增加一个全局变量，名称为 initGeeTest
// import './gt.js'
import '@/assets/iconfont/iconfont.css'
export default {
  name: '',
  data () {
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请无条件遵守规则'))
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '17631389579', // 手机号码
        code: '246810', // 验证码
        xieyi: true // 协议复选框
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '验证码必填' }],
        xieyi: [{ validator: xieyiTest }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return false
        }
        this.loginAct()
        // A. 人机交互验证
        // axios获得极验的秘钥信息
        // const pro = this.$http({
        //   url: '/mp/v1_0/captchas/' + this.loginForm.mobile,
        //   method: 'get'
        // })
        // pro
        //   .then(result => {
        //     console.log(result) // 极验的秘钥信息
        //     // console.log(result.data) // 极验的秘钥信息
        //     // 从result里边解构下述的data对象出来(对象结构赋值)
        //     const { data } = result.data
        //     // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
        //     window.initGeetest(
        //       {
        //         // 以下配置参数来自服务端 SDK
        //         gt: data.gt,
        //         challenge: data.challenge,
        //         offline: !data.success,
        //         new_captcha: true,
        //         product: 'bind' // 设置验证窗口样式的
        //       }, captchaObj => {
        //         // 这里可以调用验证实例 captchaObj 的实例方法
        //         captchaObj
        //           .onReady(() => {
        //             // 验证码ready之后才能调用verify方法显示验证码(可以显示窗口了)
        //             captchaObj.verify() // 显示验证码窗口
        //           })
        //           .onSuccess(() => {
        //             // 行为校验正确的处理
        //             // B. 验证账号，登录系统
        //
        //           })
        //           .onError(() => {
        //             // 行为校验错误的处理
        //           })
        //       }
        //     )
        //   })
        //   .catch(err => {
        //     return this.$message.error('获取极验秘钥失败：' + err)
        //   })
      })
    },
    loginAct () {
      const p = this.$http({
        method: 'post',
        url: 'mp/v1_0/authorizations',
        data: this.loginForm
      })
      p.then(rst => {
        // console.log(rst)
        window.sessionStorage.setItem(
          'userinfo',
          JSON.stringify(rst.data.data)
        )

        this.$router.push({ name: 'home' })
      })
      p.catch(cuo => {
        // console.log('获得数据错误了' + cuo)
        this.$message.error('手机号或验证码错误:' + cuo)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: gray;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./login_bg.jpg");
  background-size: cover;
  .login-box {
    width: 410px;
    height: 340px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
      text-align: center;

      img {
        width: 60%;
        margin: 20px auto;
      }
    }
  }
}
</style>
