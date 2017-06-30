<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange">
       <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {roleRequest} from '@/request'
  export default{
    props: {
      roleIds: Array
    },
    data () {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    async created () {
      var res = await roleRequest.getRoles()
      this.tableData = res.data
      this.tableData.forEach(item => {
        if (this.roleIds.includes(item.id)) {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        }
      })
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style scoped>
</style>
