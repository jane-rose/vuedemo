<template lang="html">
  <div class="shopCart">
    <div class="content" @click="showlist(food)">
      <div class="content-left">
        <div class="logo-wrapper" >
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'active' : totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc" v-show="totalPrice<100">
          另需配送费￥4元
        </div>
      </div>
      <div class="content-right" :class="{'enough' : totalPrice>=20}">
        <div class="pay">
          <!-- 还差￥{{}}元起送 -->
          {{totalMinPrice}}
        </div>
      </div>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="totalPrice > 0 && show" >
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content"  ref="listcontent">
          <ul>
            <li class="food" v-for="item in food">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>${{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper" >
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from './cartcontrol'
export default {
  props: ['deliveryPrice', 'minPrice', 'food'],
  data () {
    return {
      show: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.food.forEach(food => {
        total += food.count * food.price
      })
      return total
    },
    totalCount () {
      let count = 0
      this.food.forEach(food => {
        count += food.count
      })
      return count
    },
    totalMinPrice () {
      let price = 20
      this.food.forEach(food => {
        price -= food.count * food.price
      })
      price = price > 0 ? `还差${price}元起送` : '去结算'
      return price
    }
  },
  methods: {
    empty () {
      this.food.forEach(food => {
        food.count = 0
      })
      this.show = false
    },
    showlist (food) {
      if (food.some(val => val.count > 0)) {
        this.show = !this.show
      }
      this.$nextTick(() => {
        this.listcontent = new BScroll(this.$refs.listcontent, {
          click: true
        })
      })
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="css">
</style>
