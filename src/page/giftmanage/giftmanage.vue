<!-- 礼物管理 -->
<template>
  <div class="gift-manage">
    <el-row>
      <el-col>
        <div class="title">礼物管理</div>
      </el-col>
    </el-row>

    <!--数据-->
    <el-row>
      <el-col>
        <!--表格-->
        <el-table ref="dataTable" border :data="tableData" style="width: 100%" @selection-change="(val) => selectedData = val">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="picUrl" label="图片" >
            <template scope="scope">
              <img width="50" height="50" :src="scope.row.picUrl" alt="礼物图片">
            </template>
          </el-table-column>
           <el-table-column label="操作" width="100">
            <template scope="scope">
              <el-button type="text" size="small" @click="openModify(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--<el-row>
      <el-col class="flex-center">
        <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="pageCount" @current-change="pageChange"/>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import {giftManageRequest} from '@/request'
  /* eslint-disable no-unused-vars */
  import modify from './child/modify.vue'

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
      // this.search(1)
      let res = await giftManageRequest.getGitfList()
      this.tableData = res.data
    },
    methods: {
      openModify (row) {
        const h = this.$createElement
        let form = {}

        this.$msgbox({
          title: '消息',
          message: h(modify, {
            props: {
              name: row.name,
              price: row.price,
              id: row.id
            },
            key: row.id
          }),
          beforeClose: (action, instance, done) => {
            form = instance.$slots.default[0].componentInstance.$data.form
            done()
          }
        }).then(action => {
          if (action === 'confirm') {
            // 修改礼物的name和price
            giftManageRequest
              .modifyGift(form.id, form.name, form.price)
              .then(res => {
                if (res.data) {
                  this.tableData.forEach(item => {
                    if (item.id === form.id) {
                      item.name = form.name
                      item.price = form.price
                      item.picUrl = form.picUrl
                    }
                  })
                  this.openSuccess('修改成功!')
                }
              })
              .catch(e => {
                this.openError('修改失败，稍后再试!')
              })
          }
        })
      },
      // forbid () {
      //   var ids = this.selectedData.map(item => item.id)

      //   memberManageRequest
      //     .forbid(ids)
      //     .then(({data}) => {
      //       if (data === 'NoError') {
      //         this.openSuccess(`成功修改 ${ids.length} 条记录`)
      //         this.selectedData.forEach(item => {
      //           item.status = 1
      //         })
      //         this.clearTableSelection()
      //       } else {
      //         this.openError('修改失败')
      //       }
      //     })
      // },
      // recover () {
      //   var ids = this.selectedData.map(item => item.id)

      //   memberManageRequest
      //     .recover(ids)
      //     .then(({data}) => {
      //       if (data === 'NoError') {
      //         this.openSuccess(`成功修改 ${ids.length} 条记录`)
      //         this.selectedData.forEach(item => {
      //           item.status = 0
      //         })
      //         this.clearTableSelection()
      //       } else {
      //         this.openError('修改失败')
      //       }
      //     })
      // },
      // clearTableSelection () {
      //   this.$refs.dataTable.clearSelection()
      // },
      // resetPassword () {
      //   memberManageRequest
      //     .resetPassword(this.ids)
      //     .then(({data}) => {
      //       this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
      //       this.clearTableSelection()
      //     }).catch(() => this.openError('修改失败'))
      // },
      // resetPayPassword () {
      //   memberManageRequest
      //     .resetPayPassword(this.ids)
      //     .then(({data}) => {
      //       this.openSuccess(`成功修改 ${this.ids.length} 条记录`)
      //       this.clearTableSelection()
      //     }).catch(() => this.openError('修改失败'))
      // },
      // search (page = 1) {
      //   typeof page !== 'number' ? page = 1 : void 0
      //   // TODO:搜索
      //   var param = {
      //     page
      //   }
      //   param[this.selects] = this.searchText ? this.searchText : undefined

      //   memberManageRequest
      //     .search(param)
      //     .then(({data}) => {
      //       this.tableData = data.data
      //       this.pageCount = data.count
      //       this.pageSize = data.pageSize
      //     })
      // },
      pageChange (page) {
        this.search(page)
      }
    },
    // filters: {
    //   status (value) {
    //     switch (value) {
    //       case 0: return '正常'
    //       case 1: return '禁用'
    //     }
    //   }
    // },
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
