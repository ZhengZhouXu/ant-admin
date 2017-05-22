<!-- 动态生成的页面 -->
<template>
  <div class="generate-page">
    <div class="operate">
      <el-button type="info">添加</el-button>
      <el-button type="danger">删除</el-button>
      <el-select  multiple placeholder="请选择">
        <el-option
          v-for="i in 5"
          :key="i"
          :label="i.toString()"
          :value="i">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default{
  }
</script>

<style  scoped>
</style>
