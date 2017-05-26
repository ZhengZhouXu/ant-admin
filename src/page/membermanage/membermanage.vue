<template>
  <div class="member-manage">
    <el-row>
      <el-col>
        <div class="title">会员管理</div>
      </el-col>
    </el-row>

    <!--操作-->
    <el-row :gutter="3">
      <el-col :span="15">
        <el-button @click="forbid" type="danger">禁用</el-button>
        <el-button @click="recover" type="success">恢复</el-button>
        <el-button @click="resetPassword" type="info">重置密码</el-button>
        <el-button @click="resetPayPassword" type="info">重置支付密码</el-button>
      </el-col>
      <el-col :span="3">
        <el-select v-model="selects" placeholder="搜索字段">
          <el-option
            v-for="option in selectOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="searchText" placeholder="请输入内容" class="gt"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="search(1)" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <!--数据-->
    <el-row>
      <el-col>
        <!--表格-->
        <el-table ref="dataTable" border :data="tableData" style="width: 100%" @selection-change="(val) => selectedData = val">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="account" label="账号" />
          <el-table-column prop="nickname" label="昵称" />
          <el-table-column prop="time" label="注册时间" />
          <el-table-column prop="status" label="状态" >
            <template scope="scope">
              <span :style="{color: scope.row.status === 0 ? 'green': 'red'}">{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="qq" label="QQ" />
          <el-table-column prop="weixin" label="微信" />>
          <el-table-column prop="level" label="等级" />
          <el-table-column prop="watchNum" label="关注数" />
          <el-table-column prop="fansNum" label="粉丝数" />
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col class="flex-center">
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="pageCount" @current-change="pageChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {memberManageRequest} from '@/request'
  export default{
    data () {
      return {
        tableData: [],
        selectedData: [],
        selects: [], // 下拉列表选中的字段
        searchText: '',
        pageCount: 1,
        pageSize: 10
      }
    },
    created () {
      this.search(1)
    },
    methods: {
      forbid () {
        var ids = this.selectedData.map(item => item.id)

        memberManageRequest
          .forbid(ids)
          .then(({data}) => {
            if (data === 'NoError') {
              this.openSuccess(`成功修改 ${ids.length} 条记录`)
              this.selectedData.forEach(item => {
                item.status = 1
              })
              this.clearTableSelection()
            } else {
              this.openError('修改失败')
            }
          })
      },
      recover () {
        var ids = this.selectedData.map(item => item.id)

        memberManageRequest
          .recover(ids)
          .then(({data}) => {
            if (data === 'NoError') {
              this.openSuccess(`成功修改 ${ids.length} 条记录`)
              this.selectedData.forEach(item => {
                item.status = 0
              })
              this.clearTableSelection()
            } else {
              this.openError('修改失败')
            }
          })
      },
      clearTableSelection () {
        this.$refs.dataTable.clearSelection()
      },
      resetPassword () {
        memberManageRequest
          .resetPassword(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
            this.clearTableSelection()
          }).catch(() => this.openError('修改失败'))
      },
      resetPayPassword () {
        memberManageRequest
          .resetPayPassword(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
            this.clearTableSelection()
          }).catch(() => this.openError('修改失败'))
      },
      search (page = 1) {
        typeof page !== 'number' ? page = 1 : void 0
        // TODO:搜索
        var param = {
          page
        }
        param[this.selects] = this.searchText ? this.searchText : undefined

        memberManageRequest
          .search(param)
          .then(({data}) => {
            this.tableData = data.data
            this.pageCount = data.count
            this.pageSize = data.pageSize
          })
      },
      pageChange (page) {
        this.search(page)
      }
    },
    filters: {
      status (value) {
        switch (value) {
          case 0: return '正常'
          case 1: return '禁用'
        }
      }
    },
    computed: {
      ids () {
        return this.selectedData.map(item => item.id)
      },
      selectOptions () {
        let mapName = new Map([
          ['id', 'ID'],
          ['account', '账号'],
          ['nickname', '昵称'],
          ['status', '状态'],
          ['schoolName', '学校']
        ])

        return Array.from(mapName.keys())
          .filter(item => mapName.get(item))
          .map(item => {
            return {
              key: item,
              value: item,
              label: mapName.get(item)
            }
          })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .el-row
    margin-bottom: 20px
</style>
