<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
      <div class="ratings-content">
        <div class="info">
          <div class="mark">
            <div class="num">
              {{datas.seller.score}}
            </div>
            <div class="text">
              综合评分
            </div>
            <div class="contrast">
              高于周边商家{{datas.seller.rankRate}}%
            </div>
          </div>
          <div class="stars">
            <div class="serviceScore">
              <span class="text">服务态度</span>
              <star :size="36" :score="datas.seller.serviceScore"></star>
              <span class="num">{{datas.seller.serviceScore}}</span>
            </div>
            <div class="foodScore">
              <span class="text">美食评分</span>
              <star :size="36" :score="datas.seller.foodScore"></star>
              <span class="num">{{datas.seller.foodScore}}</span>
            </div>
            <div class="deliveryTime">
              <span class="text">送达时间</span>
              <span class="time">{{datas.seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="divider">
        </div>
        <div class="evaluation">
          <div class="classify">
            <span v-for="(item, index) in classify" class="item" :class="{'active' : item.active, 'bad': index === 2, 'badActive' : index === 2 && item.active}" @click="classifyClick(item)">
              {{item.name}}
              <span>{{item.count}}</span>
            </span>
          </div>
          <div class="switch" @click="flag=!flag">
            <span class="icon-check_circle" :class="{'on' : !flag}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in filterContent">
                <div class="avatar">
                  <img :src="item.avatar" alt="" width="12" height="12">
                </div>
                <div class="content">
                  <div class="user">
                    <span class="name">{{item.username}}</span>
                    <span class="rateTime">{{item.rateTime}}</span>
                  </div>
                  <div class="star-wrapper">
                    <star class="star" :score="item.score" :size="24"></star>
                    <span class="deliveryTime">{{item.deliveryTime}}</span>
                  </div>
                  <div class="text">
                    {{item.text}}
                  </div>
                  <div class="recommend">
                    <span class="icon" :class="item.rateType > 0 ? 'icon-thumb_down' : 'icon-thumb_up'"></span>
                    <span class="dish" v-for="recom in item.recommend">{{recom}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from './modes/star'
export default{
  props: ['datas'],
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
    this.$nextTick(() => {
      this.comments = this.datas.ratings
      this.datas.ratings.forEach(val => {
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
      if (!this.ratingsWrapper) {
        this.ratingsWrapper = new BScroll(this.$refs.ratingsWrapper,{
          click: true
        })
      }else {
        this.ratingsWrapper.refresh()
      }
    })
  },
  methods: {
    classifyClick (item) {
      this.comments = item.comment
      this.classify.forEach(val => {
        val.active = false
      })
      item.active = true
    },
    updateBS () {
      this.$nextTick(() => {
        if (!this.ratingsWrapper) {
          this.ratingsWrapper = new BScroll(this.$refs.ratingsWrapper,{
            click: true
          })
        }else {
          this.ratingsWrapper.refresh()
        }
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
    star
  }
}
</script>
<style>
</style>
