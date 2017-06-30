<template>
<div class="role-manage">
  <el-row>
    <!-- 角色 -->
    <el-col :span="10" class="list">
      <h1>角色</h1>
      <el-row v-for="role in roles" :key="role.id" class="item">
        <!--<span v-if="!role.isModify"  @click="test(role)">{{role.name}}123</span>
        <input v-else v-model="role.name" @keyup.enter="role.isModify = false"/>-->
        <el-checkbox v-model="role.checked" @change="selectRole(role.powers, $event)"><input placeholder="输入角色名" v-model="role.name" @keyup.enter="role.isModify = false"/></el-checkbox>
      </el-row>
      <el-row  v-if="!roles || roles.length===0" class="item">
        <span class="no-roles">暂无角色</span>
      </el-row>
    </el-col>

    <!-- 操作 -->
    <el-col :offset="1" :span="2" class="operate flex-center">
      <el-button type="success" @click="addRole">添加角色</el-button>
      <el-button type="danger" @click="delRole">删除角色</el-button>
      <el-button type="" @click="sure">确定</el-button>
    </el-col>

    <!-- 权限 -->
    <el-col :span="10" :offset="1" class="list">
      <h1>权限</h1>
      <el-row v-for="power in powers" :key="power.id" class="item">
        <el-checkbox v-model="power.checked">{{power.name}}</el-checkbox>
      </el-row>
      <el-row  v-if="!powers || powers.length===0" class="item">
        <span class="no-roles">暂无权限</span>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import {roleRequest} from '@/request'
  export default{
    data () {
      return {
        roles: [],
        powers: []
      }
    },
    async created () {
      let powserRes = await roleRequest.powserList()
      this.powers = powserRes.data.map(item => {
        item.checked = false
        return item
      })

      let roleRes = await roleRequest.getRoles()
      this.roles = roleRes.data.map(item => {
        item.checked = false
        return item
      })
    },
    methods: {
      addRole () {
        this.roles.push({id: 0, checked: false})
      },
      async delRole () {
        // 直接删除刚添加,还未提交的角色
        this.roles = this.roles.filter(role => !role.checked || role.id)

        if (!this.roles) {
          this.openSuccess('操作成功！')
          return
        }

        let ids = this.roles.filter(role => role.checked).map(role => role.id)

        if (!ids || ids.length === 0) {
          this.openSuccess('操作成功！')
          return
        }

        let res = await roleRequest.deleteRole(ids)
        if (res.data === 'NoError') {
          this.roles = this.roles.filter(role => !ids.includes(role.id))
          this.openSuccess('操作成功！')
        } else {
          this.openSuccess('操作失败，稍后再试！')
        }
      },
      async sure () {
        // 确认当前修改的内容
        let role = this.roles.filter(item => item.checked)
        if (role.length !== 1) return this.openError('只能选择1个角色保存！')

        role = role[0]
        if (!role.name) return this.openError('保存角色必须有角色名！')

        let powers = this.powers.filter(item => item.checked).map(item => item.id)
        let res = await roleRequest.modifyRole(role.id, powers, role.name)

        if (res.data === 'NoError') {
          role.powers = powers
          this.openSuccess('操作成功！')
        } else {
          this.openError(res.data)
        }
      },
      selectRole (ids, e) {
        if (e.target.checked) {
          this.powers.forEach((item) => {
            if (ids.includes(item.id)) {
              item.checked = true
            }
          })
        } else {
          this.powers.forEach(item => {
            item.checked = false
          })
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  h1
    font-size: 20px
    margin: 10px 5px
    padding-bottom: 5px
    border-bottom: 1px solid #d1dbe5
  .no-roles
    color: #ccc
  .list
    border: 1px solid #d1dbe5
    padding: 10px
    height: 500px
    .item
      margin: 10px 5px
  .operate
    flex-direction: column
    height: 500px
    .el-button
      margin: 10px 0px

</style>
