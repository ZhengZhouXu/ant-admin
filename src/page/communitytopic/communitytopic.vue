<template>
  <div class="community-topic">
    <el-row>
      <el-col>
        <div class="title">社团帖子管理</div>
      </el-col>
    </el-row>

    <!--操作-->
    <el-row :gutter="3">
      <el-col :span="15">
        <el-button @click="deleteTopic" type="danger">删除</el-button>
        <el-button @click="recoverTopic" type="success">恢复</el-button>
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
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="content" label="内容" />
          <el-table-column prop="createTime" label="时间" >
            <template scope="scope">
              {{scope.row.createTime | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" >
            <template scope="scope">
              <span :style="{color: scope.row.status === 0 ? 'green': 'red'}">{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="commentNum" label="评论数" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="associationName" label="社团名" />
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
  import {communityTopicRequest} from '@/request'
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
      async deleteTopic () {
        let res = await communityTopicRequest.deleteTopic(this.ids)
        if (res.status === 200 && res.data === 'NoError') {
          this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
          this.selectedData.forEach(s => {
            s.status = 1
          })
          this.clearTableSelection()
        } else {
          this.openError('修改失败')
        }
      },
      async recoverTopic () {
        let res = await communityTopicRequest.recoverTopic(this.ids)
        if (res.status === 200 && res.data === 'NoError') {
          this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
          this.selectedData.forEach(s => {
            s.status = 0
          })
          this.clearTableSelection()
        } else {
          this.openError('修改失败')
        }
      },
      clearTableSelection () {
        this.$refs.dataTable.clearSelection()
      },
      resetPassword () {
        communityTopicRequest
          .resetPassword(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
            this.clearTableSelection()
          }).catch(() => this.openError('修改失败'))
      },
      resetPayPassword () {
        communityTopicRequest
          .resetPayPassword(this.ids)
          .then(({data}) => {
            this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
            this.clearTableSelection()
          }).catch(() => this.openError('修改失败'))
      },
      search (page = 1) {
        typeof page !== 'number' ? page = 1 : void 0
        var param = {
          page
        }
        param[this.selects] = this.searchText ? this.searchText : undefined

        communityTopicRequest
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
    computed: {
      ids () {
        return this.selectedData.map(item => item.id)
      },
      selectOptions () {
        let mapName = new Map([
          ['id', 'ID'],
          ['title', '标题'],
          ['content', '内容'],
          ['username', '用户名'],
          ['associationName', '社团名'],
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
    }
  }
</script>

<style lang="sass" scoped>
  .el-row
    margin-bottom: 20px
</style>
