<template>
  <div>
    <!-- HTML代码 必须有大盒子包裹  可以直接在static下直接访问-->
    <!-- {{seller}} star-->
    <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
            <img :src="seller.avatar" alt="logo" width="64" height="64">
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}} / {{seller.deliveryTime}}分钟送达
            </div>
            <div class="supports">
              <div class="supports_desc">
                <span class="icon decrease"></span>
                <span class="text">{{seller.supports[0].description}}</span>
              </div>
            </div>
          </div>
          <div style="cursor:pointer" class="support-count" @click="show=!show">
            <span class="count">{{seller.supports.length + '个'}}</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div style="cursor:pointer" class="bulletin-wrapper" @click="show = !show">
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div class="detail"  v-show="show">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <!-- TODO 评分 -->
                <star  :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line">

                </div>
                <div class="text">
                  优惠信息
                </div>
                <div class="line">

                </div>
              </div>
              <ul class="supports">
                <li class="support-item" v-for="item in seller.supports">
                  <span class="icon" :class="icon[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line">

                </div>
                <div class="text">
                  商家公告
                </div>
                <div class="line">

                </div>
              </div>
              <div class="bulletin">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
          <div style="cursor:pointer" class="detail-close" @click="show=!show">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
    <!-- star -->
  </div>
</template>

<script>
import icon from './icon'
import star from './star.vue'
export default {
  props: ['seller'],
  components: {
    star
  },
  data () {
    return {
      icon: icon,
      show: false
    }
  }
}
</script>
<!-- scoped 当写上时，当前这个模板和当前模板下的子模板运用这个样式 -->
<style scoped>
</style>
