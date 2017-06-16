<template>
<div class="gift-modify">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  export default{
    data () {
      return {
        form: {
          name: this.name,
          price: this.price
        }
      }
    },
    props: {
      name: String,
      price: Number
    }
  }
</script>

<style lang="sass" scoped>
</style>
