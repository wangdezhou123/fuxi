<template>
  <div>
    <!--搜索卡片区-->
    <el-card class="box-card">
      <!--命名插槽，头部内容-->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!--匿名插槽，内容主体-->
      <div class="text item">
        <!--el-form搜索表单区域-->
        <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
          <el-form-item label="文章状态：">
            <el-radio v-model="searchForm.status" label>全部</el-radio>
            <el-radio v-model="searchForm.status" :label="0">草稿</el-radio>
            <el-radio v-model="searchForm.status" :label="1">待审核</el-radio>
            <el-radio v-model="searchForm.status" :label="2">审核通过</el-radio>
            <el-radio v-model="searchForm.status" :label="3">审核失败</el-radio>
            <el-radio v-model="searchForm.status" :label="4">已删除</el-radio>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select v-model="searchForm.channel_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in channelList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
              <!-- <el-option label="css3" value="102"></el-option>
              <el-option label="JS高级" value="103"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  // 监听器设置
  watch: {
    // 被检测的成员: function (newV, oldV) {
    //   // newV:数据变化后样子
    //   // oldV:数据变化前样子
    // }
    // 被检测成员一般就是data成员,它们的名称保持一致
    timetotime: function (newV) {
      // 把接收到的时间信息一分为二给到 begin_pubdate 和 end_pubdate
      if (newV) {
        this.searchForm.begin_pubdate = newV[0]
        this.searchForm.end_pubdate = newV[1]
      } else {
        // 清除时间信息
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
    }
  },
  created () {
    // 获得频道信息
    this.getChannelList()
  },
  data () {
    return {
      channelList: [],
      timetotime: '', // 临时接收时间范围信息

      // 搜索表单数据对象
      searchForm: {
        begin_pubdate: '', // 文章发布开始时间
        end_pubdate: '', // 文章发布结束时间
        channel_id: '', // 频道id
        status: 0 // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
      }
    }
  },
  methods: {
    getChannelList () {
      this.$http({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/channels',
        methods: 'get'
      })
        .then(rst => {
          // console.log(rst)
          this.channelList = rst.data.data.channels
        })
        .catch(cuo => {
          // console.log('获取数据错误了' + cuo)
          return this.$message.error('获取频道列表失败' + cuo)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
