<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <!-- 路由：动态显示不同的模板 -->
    <div  class="tab">
      <div  class="tab-item">
        <router-link  to="/goods">商品</router-link>
      </div>
      <div  class="tab-item">
        <router-link  to="/ratings">评论</router-link>
      </div>
      <div  class="tab-item">
        <router-link  to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :datas="datas" ref="view"></router-view>
    </keep-alive>
  </div>
</template>

<!-- The value property reflects the current text-content inside the input box, whereas the value attribute contains the initial text-content of the value attribute from the HTML source code. -->
<!-- for example -->
<input id="the-input" type="text" value="Name:">
<!-- theInput.value                 // returns "John"
theInput.getAttribute('value') // returns "Name:"
theInput.defaultValue          // returns "Name:" -->
<script>
import vheader from './components/modes/header.vue'
import axios from 'axios'
export default {
  data () {
    return {
      datas: {
        // 头部商户信息
        seller: {},
        // 商品信息
        goods: [],
        // 评论信息
        ratings: []
      }
    }
  },
  mounted () {
    axios.get('/static/data.json').then(res => {
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratings = res.data.ratings
      // console.log(res.data)
      this.$nextTick(() => {
        this.$refs.view.scroll()
      })
      // setTimeout(() => {
      //   this.$refs.view.scroll()
      // }, 20)
    })
    document.addEventListener('visibilitychange', this.changeTitle, false)
  },
  // 组件缓存，但是请求数据不缓存，每次都请求新的,
  activated () {
    axios.get('/static/data.json').then(res => {
      this.datas.seller = res.data.seller
      this.datas.goods = res.data.goods
      this.datas.ratings = res.data.ratings
    })
    this.$nextTick(() => {
      this.$refs.view.scroll()
    })
  },
  methods: {
    changeTitle () {
      // 切换标签页后，改变title
      if (document.hidden) {
        document.title = '去吧，皮卡丘！'
      } else {
        document.title = '欢迎回来'
      }
    }
    // detail (value) {
    //   this.foodDetails = value
    //   this.$refs.goodsDetail.showdetail()
    // }
  },
  components: {
    vheader
  }
}
</script>

<style>
.tab .tab-item a.router-link-exact-active {
  color: red;
}
#app {
  user-select: none;
}
</style>
