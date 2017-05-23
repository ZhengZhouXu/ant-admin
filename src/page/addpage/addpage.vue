<!-- 添加页面 -->
<template>
<div class="add-page">

  <el-row class="step">
    <!-- 步骤1 -->
    <el-col :span="12" class="bd-rt">
      <el-row >
        <span class="step-title">步骤1 - 选择字段</span>
      </el-row>
      <el-row>
        <el-col class="flex-center flex-column">
          <el-select v-model="selectValue" placeholder="请选择数据库">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-transfer v-model="transferValue" :data="transferData"></el-transfer>
        </el-col>
      </el-row>
    </el-col>
    <!-- 步骤2 -->
    <el-col :span="12">
      <el-row >
        <span class="step-title">步骤2 - 选择功能</span>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名称"  />
            <el-table-column label="是否启用" >
              <template scope="scope">
                <el-switch v-model="scope.row.enable" on-text="" off-text="" />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <!-- 步骤3 -->
  <el-row class="step">
    <el-row>
      <span class="step-title">步骤3</span>
    </el-row>
    <el-row>
      <el-col :offset="1" span="7">
        <span>父菜单：</span>
        <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" placeholder="请选择父菜单" />
      </el-col>
      <el-col :offset="1" span="7">

          <span>菜单名称：</span>
          <el-input class="w200" placeholder="请输入菜单名"></el-input>
        </label>
      </el-col>
    </el-row>
  </el-row>

  <el-row type="flex" justify="center">
    <el-button type="success">确定添加</el-button>
  </el-row>
</div>
</template>

<script>
  export default{
    data () {
      return {
        transferData: [{
          key: 1,
          label: '选项1'
        }],
        transferValue: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        selectValue: [],
        tableData: [{
          name: '添加',
          enable: true
        }, {
          name: '删除',
          enable: false
        }]
      }
    }
  }
</script>

<style lang="sass" scoped>

  .step
    border: 1px solid #D3DCE6
    .step-title
      display: inline-block
      padding: 10px
      color: #fff
      background: #20A0FF
      border:
        bottom: 1px solid #D3DCE6
        right: 1px solid #D3DCE6
  .el-row
    margin-bottom: 50px
    .el-col
      .el-transfer
        display: inline-block
        margin: 0 auto
      .el-select
        margin-bottom: 20px
        width: 300px
  .bd-rt
    border-right: 1px solid #D3DCE6
</style>
