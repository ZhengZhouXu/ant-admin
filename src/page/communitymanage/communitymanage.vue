<template>
 <div class="community-manage">
    <el-row>
      <el-col>
        <div class="title">社团管理</div>
      </el-col>
    </el-row>

    <!--操作-->
    <el-row :gutter="3">
      <el-col :span="15">
        <el-button @click="dissolve" type="danger">解散</el-button>
        <el-button @click="recover" type="success">恢复</el-button>
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
          <el-table-column prop="name" label="社团名" />
          <el-table-column prop="nickname" label="创建用户" />
          <el-table-column prop="time" label="发表时间" >
            <template scope="scope">
              {{scope.row.time | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="schoolName" label="学校名称" />
          <el-table-column prop="peopleNum" label="人数" />
          <el-table-column prop="topicNum" label="话题数" />
          <el-table-column prop="voteNum" label="票数" />
          <el-table-column prop="status" label="状态">
            <template scope="scope">
              <span :style="{color: scope.row.status === 0 ? 'green': 'red'}">{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
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
  import {communityManageRequest} from '@/request'
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

        var param = {
          page
        }
        param[this.selects] = this.searchText ? this.searchText : undefined

        communityManageRequest
          .search(param)
          .then(({data}) => {
            this.tableData = data.data
            this.pageCount = data.count
            this.pageSize = data.pageSize
          })
      },
      dissolve () {
        communityManageRequest
          .dissolve(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功操作${this.ids.length}条记录`)
            this.changeSelectStatus(1) // 修改状态
            this.clearTableSelection()
          })
          .catch(() => {
            this.openError('操作失败！')
          })
      },
      async recover () {
        try {
          await communityManageRequest.recover(this.ids)
          this.openSuccess(`成功操作${this.ids.length}条记录`)
          this.changeSelectStatus(0) // 修改状态
          this.clearTableSelection()
        } catch (error) {
          this.openError('操作失败！')
        }
      },
      changeSelectStatus (status) {
        this.tableData.forEach(item => {
          if (this.ids.includes(item.id)) {
            item.status = status
          }
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
          ['name', '社团名'],
          ['nickname', '创建者用户名'],
          ['schoolName', '学校名'],
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
          case 1: return '解散'
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .el-row
    margin-bottom: 20px
</style>
