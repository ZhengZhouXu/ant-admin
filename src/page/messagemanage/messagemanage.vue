<template>

 <div class="message-manage">
    <el-row>
      <el-col>
        <div class="title">消息管理</div>
      </el-col>
    </el-row>

    <!--操作-->
    <el-row :gutter="3">
      <el-col :span="15">
        <el-button @click="del" type="danger">删除</el-button>
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
          <el-table-column prop="messageInfo" label="内容" />
          <el-table-column prop="nickname" label="用户昵称" />
          <el-table-column prop="time" label="发表时间" >
            <template scope="scope">
              {{scope.row.time | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" >
            <template scope="scope">
              <span :style="{color: scope.row.status === 0 ? 'green': 'red'}">{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="collectNum" label="收藏数" />
          <el-table-column prop="commentNum" label="评论数" />
          <el-table-column prop="transpondNum" label="转发数" />
          <el-table-column prop="agreeNum" label="点赞数" />
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col class="flex-center">
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="pageCount" @current-change="page => search(page)"/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {messageManageRequest} from '@/request'

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
      search (page = 1) {
        typeof page !== 'number' ? page = 1 : void 0
        // TODO:搜索
        var param = {
          page
        }
        param[this.selects] = this.searchText ? this.searchText : undefined

        messageManageRequest
          .search(param)
          .then(({data}) => {
            this.tableData = data.data
            this.pageCount = data.count
            this.pageSize = data.pageSize
          })
      },
      del () {
        console.log(this.ids)
        messageManageRequest
          .del(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功操作${this.ids.length}条记录`)
            this.selectedData.forEach(s => {
              s.status = 1
              s.messageInfo = '该内容已删除'
            })
            this.clearTableSelection()
          })
          .catch(() => {
            this.openError('操作失败！')
          })
      },
      clearTableSelection () {
        this.$refs.dataTable.clearSelection()
      }
    },
    computed: {
      ids () {
        return this.selectedData.map(item => item.id)
      },
      selectOptions () {
        let mapName = new Map([
          ['id', 'ID'],
          ['messageInfo', '内容'],
          ['nickname', '昵称'],
          ['status', '状态']
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
    },
    filters: {
      status (value) {
        switch (value) {
          case 0: return '正常'
          case 1: return '删除'
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .el-row
    margin-bottom: 20px
</style>
