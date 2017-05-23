<!-- 动态生成的页面 -->
<template>
  <div class="generate-page">
    <el-row type="flex" class="operate" :gutter="5">
      <el-col :span="4">
        <el-button type="info">添加</el-button>
        <el-button type="danger">删除</el-button>
      </el-col>
      <el-col :span="14">
        <el-select v-model="selects" multiple placeholder="排序字段">
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
        <el-button type="info">升序</el-button>
        <el-button type="info">降序</el-button>
      </el-col>
      <el-col :span="4">
        <el-input v-model="input" placeholder="请输入内容" class="gt"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="search">搜索</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-row>
      <el-col>
        <el-table border :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        selects: [],
        options: [{
          value: 'X',
          label: '选项1'
        }, {
          value: 'Y',
          label: '选项2'
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1520 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1520 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1520 弄'
        }]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .el-row
    margin-bottom: 30px
</style>
