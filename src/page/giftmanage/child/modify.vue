<template>
<div class="gift-modify">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="图片上传">
      <el-upload
        class="avatar-uploader"
        :action="`http://localhost:2682/admin/File/GiftImgUpload?id=${id}`"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <input type="hidden" :value="form.id">
  </el-form>
</div>
</template>

<script>
  export default{
    data () {
      return {
        form: {
          name: this.name,
          price: this.price,
          id: this.id,
          picUrl: ''
        }
      }
    },
    props: {
      name: String,
      price: 0,
      id: 0
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.form.picUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload {
    border: 1px solid #d9d9d9 !important;
  }
</style>
