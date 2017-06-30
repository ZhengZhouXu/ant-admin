<template>
<div class="role-manage">
  <div class="gift-manage">
    <el-row>
      <el-col>
        <div class="title">后台用户管理</div>
      </el-col>
    </el-row>

    <!--数据-->
    <el-row>
      <el-col>
        <!--表格-->
        <el-table ref="dataTable" border :data="tableData" style="width: 100%" @selection-change="(val) => selectedData = val">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="username" label="账号" />
          <el-table-column prop="picUrl" label="角色" >
            <template scope="scope">
              <!--<img width="50" height="50" :src="scope.row.picUrl" alt="礼物图片">-->
              <span v-for="name in scope.row.roleNames">
                {{name}},
              </span>
            </template>
          </el-table-column>
           <el-table-column label="操作" width="100">
            <template scope="scope">
              <el-button type="text" size="small" @click="openRoles(scope.row)">添加角色</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import {roleRequest} from '@/request/index.js'
  import roles from './child/roles.vue'

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
    async created () {
      let res = await roleRequest.getAdminUser()
      this.tableData = res.data
    },
    methods: {
      openRoles (row) {
        const h = this.$createElement
        /* eslint-disable no-unused-vars */
        let selectIds = null
        let selectNames = null
        console.log(row.roleIds)
        this.$msgbox({
          title: '请选择角色',
          message: h(roles, {
            props: {
              roleIds: row.roleIds
            }
          }),
          beforeClose (action, instance, done) {
            selectIds = instance
                          .$slots
                          .default[0]
                          .componentInstance
                          .$data
                          .multipleSelection
                          .map(item => {
                            return item.id
                          })
            selectNames = instance
                            .$slots
                            .default[0]
                            .componentInstance
                            .$data
                            .multipleSelection
                            .map(item => {
                              return item.name
                            })
            done()
          }
        }).then((action, a) => {
          if (action === 'confirm') {
            roleRequest
              .saveUserRoles(row.id, selectIds)
              .then(res => {
                row.roleNames = selectNames
                this.openSuccess('修改成功')
              })
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
