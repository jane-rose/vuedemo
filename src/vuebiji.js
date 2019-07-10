// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'

const Home = { template: '<router-view></router-view>'}
const Default = { template: '<router-view></router-view>'}
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }
const WithParams = { template: '<div>{{ $route.params.id }}</div>' }

// 允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。
const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar },
        { path: 'baz', name: 'baz', component: Baz },
        { path: 'with-params/:id', component: WithParams },
        // relative redirect to a sibling route
        { path: 'relative-redirect', redirect: 'foo' }
      ]
    },
    // absolute redirect
   { path: '/absolute-redirect', redirect: '/bar' },
   // dynamic redirect, note that the target route `to` is available for the redirect function
   { path: '/dynamic-redirect/:id?',
     redirect: to => {
       const { hash, params, query } = to
       if (query.to === 'foo') {
         return { path: '/foo', query: null }
       }
       if (hash === '#baz') {
         return { name: 'baz', hash: '' }
       }
       if (params.id) {
         return '/with-params/:id'
       } else {
         return '/bar'
       }
     }
   },
   // named redirect
   { path: '/named-redirect', redirect: { name: 'baz' }},

   // redirect with params
   { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },

   // catch all redirect
   { path: '*', redirect: '/' }
  ]
})
Vue.use(Router)
Vue.config.productionTip = false

//导航守卫(导航表示路由正在发生改变)
// vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航
// 3种方式：全局的, 单个路由独享的, 或者组件级的
/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
      <h1>Redirect</h1>
      <ul>
        <li><router-link to="/relative-redirect">
          /relative-redirect (redirects to /foo)
        </router-link></li>
        <li><router-link to="/relative-redirect?foo=bar">
          /relative-redirect?foo=bar (redirects to /foo?foo=bar)
        </router-link></li>
        <li><router-link to="/absolute-redirect">
          /absolute-redirect (redirects to /bar)
        </router-link></li>
        <li><router-link to="/dynamic-redirect">
          /dynamic-redirect (redirects to /bar)
        </router-link></li>
        <li><router-link to="/dynamic-redirect/123">
          /dynamic-redirect/123 (redirects to /with-params/123)
        </router-link></li>
        <li><router-link to="/dynamic-redirect?to=foo">
          /dynamic-redirect?to=foo (redirects to /foo)
        </router-link></li>
        <li><router-link to="/dynamic-redirect#baz">
          /dynamic-redirect#baz (redirects to /baz)
        </router-link></li>
        <li><router-link to="/named-redirect">
          /named-redirect (redirects to /baz)
        </router-link></li>
        <li><router-link to="/redirect-with-params/123">
          /redirect-with-params/123 (redirects to /with-params/123)
        </router-link></li>
        <li><router-link to="/not-found">
          /not-found (redirects to /)
        </router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
