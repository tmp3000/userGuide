/**
 * Created by Hsiang on 2017/2/28.
 *
 * 初始化导航
 * 内建历史记录数组, 类似于一个stack, 这个能正确反映当前app的浏览历史记录
 *
 * router路由在页面切换的时候会发出两个事件:
 *
 * onRouteChangeBefore(router.beforeEach): 路由器切换之前
 * onRouteChangeAfter(router.afterEach): 路由切换之后, 页面进入渲染阶段
 *
 * 需要根据上面的onRouteChangeBefore事件, 判断Nav级别(而不是页面的生命周期)的切换事件:
 *
 * onNavEnter: 导航前进
 * onNavLeave: 导航后退
 *
 * 完成的功能如下:
 *
 * 1. 内建导航记录
 * 2. 根据routeChange发出navChange相关事件
 * 3. $nav为标示当前导航状态及全局事件触发, 并不操作导航(window.history), 导航操作(go/back..)由$router进行
 *
 */

export class NavContorller {

  constructor (Vue, router) {
    this._h = [] // 存储当前导航的历史记录, 内容为 route object（路由信息对象）
    this._d = 'forward' // forward/backward
    this.isAppCompInit = false // App组件是否已完成Init, 表示基础页面是否准备完毕
    this._r = router
    this.length = 0

    // 监听路由变化, 维护本地历史记录
    this._r && this._r.beforeEach((to, from, next) => {
        let stackLength = this._h.length
        if (stackLength <= 1) {
          /**
           * 当本地维护的历时记录为空或, 意味着页面为首次进入, 并未初始化,
           * 此时, 可能我们是从app中的某个页面进入的,
           * 因此, 需要判断下history.length, 此时, 不显示back按钮
           *
           * 同理, length=1也同样处理
           * */
          this._pushHistory(Vue, {to, from, next})
        } else {
          let _previous = this._h[stackLength - 2]
          if (to.name !== _previous.name) {
            this._pushHistory(Vue, {to, from, next})
          } else {
            this._popHistory(Vue, {to, from, next})
          }
        }
      }
    )
  }

  // -------- private --------
  /**
   * push to history
   * */
  _pushHistory (Vue, {to, from, next}) {
    this._h.push(to)
    this.length++
    if (this._isPageChange({to, from})) {
      this._d = 'forward'
      this._emit(Vue, 'onNavEnter', {to, from, next})
    } else {
      this._d = ''
      next()
    }
  }

  /**
   * pop history record
   * */
  _popHistory (Vue, {to, from, next}) {
    // 激活了浏览器的后退,这里只需要更新状态
    this._h.pop()
    this.length--
    if (this._isPageChange({to, from})) {
      this._d = 'backward'
      this._emit(Vue, 'onNavLeave', {to, from, next})
    } else {
      this._d = ''
      next()
    }
  }

  _emit (Vue, eventName, {to, from, next}) {
    if (!this.isAppCompInit) {
      this.isAppCompInit = true
      next()
    } else {
      !!Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit(eventName, {to, from, next})
    }
  }

  /**
   * 判断是否是主页面的切换
   * 默认主页面为第一级:
   * /#/page1
   * /#/page2
   *
   * 二级页面
   * /#/page1/tab1
   * /#/page1/modal1
   * */
  _isPageChange ({to, from}) {
    let _isFromPage = from.matched.length === 1
    let _isToPage = to.matched.length === 1
    return _isFromPage || _isToPage
  }

  // -------- public --------
  /**
   * 获取当前的页面进行的方向
   * */
  getDirection () {
    return this._d
  }

  /**
   * 判断是否能返回
   * */
  canGoBack () {
    return this._h.length > 1
  }

  /**
   * 获取历史记录的第一个
   * */
  first () {
    return this._h[0]
  }

  /**
   * 获取当前激活的页面
   * 获取最后一个历史记录
   * */
  getActive () {
    return this._h[this._h.length - 1]
  }

  /**
   * 获取上一个历史记录
   * */
  getPrevious () {
    return this._h[this._h.length - 2]
  }

  /**
   * 获取当前的导航记录
   * */
  getHistory () {
    return this._h
  }

  /**
   * 返回传入的route是历史记录中的第几条
   * */
  indexOf (route) {
    return this._h.indexOf(route)
  }

  /**
   * 返回root页面
   * */
  toRoot () {
    let _len = this.length
    for (var i = 0; _len > i; i++) {
      this._r.back()
    }
  }
}