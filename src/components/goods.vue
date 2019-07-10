<template>
    <!-- HTML代码 必须有大盒子包裹 goodDetails 可以直接在static下直接访问-->
  <div class="goods">
    <scroll class="menu-wrapper" ref="menuItem" :data="datas"
     :pulldown="pulldown" @pulldown="loadData" >
      <ul>
        <li class="menu-item" v-for="item in datas.goods" ref="menuLi" @click="showFoods">
          <span class="text">
            <span class="iconMap" v-show="item.type>0" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
        <li>
          <div class="loading-wrapper"></div>
        </li>
      </ul>
    </scroll>
    <scroll class="foods-wrapper" ref="foodsWrapper" :data="datas"
    :pulldown="pulldown" @pulldown="loadData" :pullup="pullup" @scrollToEnd="loadData2">
      <ul ref="goodUl">
        <li class="food-list food-list-hook" v-for="item in datas.goods" ref="goodLi">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="food in item.foods" @click="detail(food)">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                  <div class="price">
                    <span class="newPrice">
                      <span class="unit">$</span>{{food.price}}
                    </span>
                    <span class="oldPrice">
                      <span class="unit">$</span>{{food.price}}
                    </span>
                  </div>
                  <!-- 加在这里  -->
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" ></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="loading-wrapper"></div>
        </li>
      </ul>
    </scroll>
    <shopcart :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shopcart>
    <foodDetail :foodDetails="foodDetails" ref="foodDetail"></foodDetail>
  </div>
</template>

<script>
import foodDetail from './modes/foodDetail'
import axios from 'axios'
import scroll from './modes/scroll'
import cartcontrol from './modes/cartcontrol.vue'
import shopcart from './modes/shopcart'
import BScroll from 'better-scroll'
import icon from './modes/icon.js'
export default {
  props: ['datas'],
  data () {
    return {
      icon: icon,
      foodDetails: {},
      pulldown: true,
      pullup: true
    }
  },
  computed: {
    food () {
      let arr = []
      //  回调里的参数 1.value 2.index
      this.datas.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count > 0) {
            arr.push(food)
          }
        })
      })
      return arr
    }
  },
  created () {
    this.loadData()
    this.loadData2()
    // dom更新完之后 === window.onload
    // dom更新完 => new BScroll() => ajax获取到了数据 => dom
  },
  // 等待dom更新后执行的回调函数 === window.onload
  // dom更新完 => new BScroll => get数据 => dom更新
  methods: {
    scroll () {
      /* eslint-disable no-new */
      this.foodsWrapper = new BScroll(this.$refs['foodsWrapper'], {
        click: true
      })
      this.menuItem = new BScroll(this.$refs['menuItem'], {
        click: true
      })
    },
    detail (value) {
      this.foodDetails = value
      this.$refs.foodDetail.showdetail()
    },
    loadData () {
      axios.get('/static/data0.json').then((res) => {
        this.datas.goods = res.data.goods
        console.log(res.data.goods, this.datas.goods)
      })
      this.$nextTick(() => {
        if (!this.foodsWrapper) {
          this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
            click: true
          })
          this.foodsWrapper.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.loadData()
            }

          })
        } else {
          console.log(1);
          this.foodsWrapper.refresh()
        }
        if (!this.menuItem) {
          this.menuItem = new BScroll(this.$refs.menuItem, {
            click: true
          })
          this.menuItem.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.loadData()
            }

          })
        } else {
          this.menuItem.refresh()
        }

      })
    },
    loadData2 () {
      axios.get('/static/data1.json').then((res) => {
        this.datas.goods = res.data.goods.concat(this.datas.goods)
      })
      this.$nextTick(() => {
        if (!this.foodsWrapper) {
          this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
            click: true
          })
          this.foodsWrapper.on('scrollEnd', () => {
            // 上拉动作
            if (this.foodsWrapper.y <= (this.foodsWrapper.maxScrollY + 50)) {
              this.loadData2()
            }
          })
        } else {
          this.$nextTick(() => {
            console.log(2);
            this.foodsWrapper.refresh()
          })
        }
        if (!this.menuItem) {
          this.menuItem = new BScroll(this.$refs.menuItem, {
            click: true
          })
          this.menuItem.on('scrollEnd', () => {
            // 下拉动作
            if (this.menuItem.y <= (this.menuItem.maxScrollY + 50)) {
              this.loadData2()
            }
          })
        } else {
          this.$nextTick(() => {
            this.menuItem.refresh()
          })
        }
      })
    },
    showFoods () {
      //点击menu显示每一种类的开头。。。没实现暂时
    }
  },
  components: {
    shopcart,
    cartcontrol,
    scroll,
    foodDetail
  }
}
</script>
<!-- scoped 当写上时，当前这个模板和当前模板下的子模板运用这个样式 -->
<style >
  .goods .loading-wrapper {
    position: absolute;
    left: 50%;
    top: -20px;
    /*固定loading*/
    /*垂直水平居中*/
    margin: -20px 0 0 -20px;
    width: 20px;
    height: 20px;
    border: 2px solid;
    border-color: #333 #333 transparent;
    border-radius: 50%;
    box-sizing: border-box;
    /*动画时间1s，线性变化，无限循环*/
    animation: loading 1s linear infinite;
  }
  /* , .goods .menu-wrapper .menu-item-selected */
  .goods .menu-wrapper .menu-item.activeWhite{
    background-color: rgba(0,0,0,.5)
  }
  @keyframes loading{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
