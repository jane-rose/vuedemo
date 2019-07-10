<template lang="html">
  <transition name="move">
    <div class="detailWrapper" v-show="show" ref="detailWrapper">
        <div class="foodDetail">
          <div class="back" @click="showAndInit()">
            <i class="icon-arrow_lift"></i>
          </div>
          <img :src="foodDetails.image" alt="" height="425" width="100%">
          <div class="info">
            <div class="title">
              {{foodDetails.name}}
            </div>
            <div class="desc">
              <span>月售{{foodDetails.sellCount}}</span>
              <span>好评率{{foodDetails.rating}}%</span>
            </div>
            <div class="price">
              <span class="unit">￥</span>
              {{foodDetails.price}}
            </div>
            <transition name="fade">
              <div class="shopCart" @click="add($event)" v-show="foodDetails.count === 0 || foodDetails.count === undefined">
                <div class="text">
                  加入购物车
                </div>
              </div>
            </transition>
            <cartcontrol ref="cartcontrol" :food="foodDetails"></cartcontrol>
          </div>
          <div class="divider">
          </div>
          <div class="desc">
            <div class="title">商品介绍</div>
            <div class="content">{{foodDetails.info}}</div>
          </div>
          <div class="divider">
          </div>
          <div class="evaluation">
            <div class="title">
              商品评价
            </div>
            <div class="classify">
              <span v-for="(item, index) in classify" class="item" :class="{'active' : item.active, 'bad': index === 2, 'badActive' : index === 2 && item.active}" @click="classifyClick(item)">
                {{item.name}}
                <span>{{item.count}}</span>
              </span>
            </div>
            <div class="switch" @click="flag=!flag">
              <span class="icon-check_circle" :class="{'on' : !flag}"></span>
              <span class="text">只爱看有内容的评价</span>
            </div>
            <div class="evel-list">
              <ul>
                <li class="evel" v-for="item in filterContent">
                  <div class="userInfo">
                    <div class="time">
                      {{item.rateTime}}
                    </div>
                    <div class="user">
                      <span>{{item.rateTime}}</span>
                      <img :src="item.avatar" alt="" width="12" height="12">
                    </div>
                  </div>
                  <div class="content">
                    <span class="icon" :class="item.rateType > 0 ? 'icon-thumb_down' : 'icon-thumb_up'"></span>
                    <span class="text">{{item.text}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from './cartcontrol'
export default {
  props: ['foodDetails'],
  data () {
    return {
      show: false,
      classify: [
        {name: "全部", count: 0, comment: [], active: true},
        {name: "吐槽", count: 0, comment: [], active: false},
        {name: "推荐", count: 0, comment: [], active: false},
      ],
      comments: [],
      flag: false
    }
  },
  mounted () {
    // this.$nextTick()

  },
  methods: {
    showdetail () {
      this.show = true
      this.$nextTick(() => {
        this.comments = this.foodDetails.ratings
        this.foodDetails.ratings.forEach(val => {
          this.classify[0].count++
          this.classify[0].comment.push(val)
          if (val.rateType) {
            this.classify[2].count++
            this.classify[2].comment.push(val)
          }
          if (val.rateType === 0) {
            this.classify[1].count++
            this.classify[1].comment.push(val)
          }
        })
      })
      this.$nextTick(() => {
        if (!this.detailWrapper) {
          this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
            click: true
          })
        } else {
          this.detailWrapper.refresh()
        }
      })
    },
    add () {
      this.$refs.cartcontrol.addCart(event)
    },
    classifyClick (item) {
      this.comments = item.comment
      this.classify.forEach(val => {
        val.active = false
      })
      item.active = true
    },
    updateBS () {
      this.$nextTick(() => {
        this.detailWrapper.refresh()
      })
    },
    showAndInit () {
      this.show = false
      this.classify.forEach(val => {
        val.count = 0
        val.comment = []
      })
    }
  },
  computed: {
    filterContent () {
      this.updateBS()
      let arr = []
      if (!this.flag) {
        this.comments.forEach(val => {
          if (val.text.length > 0) {
            arr.push(val)
          }
        })
        return arr
      } else {
        return this.comments
      }
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="css">
</style>
