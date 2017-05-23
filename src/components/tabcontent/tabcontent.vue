<script>
  export default{
    render (h) {
      return h(this.component)
    },
    components: {
      home: resolve => require(['@/page/home/home'], resolve),
      generatePage: resolve => require(['@/components/generatepage/generatepage'], resolve),
      addPage: resolve => require(['@/page/addpage/addpage'], resolve)
    },
    props: {
      component: {
        required: true
      }
    }
  }
</script>

<style scoped>
</style>
