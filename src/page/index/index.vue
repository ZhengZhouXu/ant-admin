<template>

  <div class="index">
    <el-row class="head">
      <el-col :span="24">
        <span class="title lt">乐疯网后台管理</span>
        <span class="user rt">管理员 xuxule</span>
      </el-col>
    </el-row>

    <el-row class="tac">
      <el-col :span="3">
        <el-menu class="el-menu-vertical-demo" @select="menuSelect" @open="" @close="" theme="dark">

          <el-submenu index="usermanage">
            <template slot="title"><i class="icon-user"></i> 用户管理</template>
            <el-menu-item index="membermanage">会员管理</el-menu-item>
            <el-submenu index="1-2">
              <template slot="title">后台管理员</template>
              <el-menu-item index="1-2-1" >账号管理</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>全局配置</template>
            <el-menu-item index="addPage" add="123">添加页面</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>

    <el-col :span="21">
      <el-tabs v-model="activeTab" type="border-card" closable @tab-remove="closeTab" @tab-click="tabSelect">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.title" :name="tab.name">
          <tabContent :component="tab.component"></tabContent>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import tabContent from '@/components/tabcontent/tabcontent'
  export default{
    data () {
      return {
        activeTab: 'home',
        tabs: [{
          title: '首页',
          name: 'home',
          component: 'home'
        }]
      }
    },
    beforeCreate () {
      this.$router.push('/')
    },
    methods: {
      menuSelect (key) {
        this._addNewTab(key)
      },
      tabSelect (tab) {
        this.$router.push('/' + tab.name)
      },
      closeTab (closeTabName) {
        let tabs = this.tabs
        let index = tabs.findIndex((tab) => tab.name === closeTabName)
        if (this.activeTab === closeTabName) {
          let newActiveTab = tabs[index + 1] || tabs[index - 1]
          newActiveTab ? this.activeTab = newActiveTab : void 0
        }
        tabs = tabs.splice(index, 1)
      },
      _addNewTab (key) {
        if (!this.tabs.find(tab => tab.name === key)) {
          this.tabs.push({
            title: this._getTabTitle(key),
            name: key,
            component: key
          })
        }
        this.activeTab = key
      },
      _getTabTitle (key) {
        switch (key) {
          case 'addPage': return '添加页面'
        }
      }
    },
    components: {
      tabContent
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../style/base.sass'
  .index
    height: 100%
    .head
      padding: 15px
      background-color: #324157
      color: #fff
      border-bottom: 1px solid rgba(#ccc, 0.5)
    .tac, .el-col.el-col-3, .el-menu
      height: 100%

</style>
