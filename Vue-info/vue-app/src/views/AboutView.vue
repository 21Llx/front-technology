<template>
  <div class="m-slider" :style="`height: ${height}px; width: ${totalWidth}px;`" @mouseenter="onStop" @mouseleave="onStart">
    <a
      :style="`will-change: transform; transform: translateX(${-left}px); line-height: ${height}px; width: ${width-20}px;`"
      class="u-slide-title"
      v-for="(item, index) in sliderData"
      :key="index"
      :title="item.title"
      :href="item.link"
      @click="onClick(item.title)">
      {{ item.title || '--' }}
    </a>
  </div>
</template>
<script>
export default {
  name: 'HorizontalTextSlider',
  props: {
    sliderData: { // 滚动文字数组
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    totalWidth: { // 滚动区域总宽度
      type: Number,
      default: 1200
    },
    height: { // 滚动区域高度
      type: Number,
      default: 45
    },
    amount: { // 滚动区域展示条数
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      left: 0,
      fpsRaf: null, // fps回调标识
      moveRaf: null, // 一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义
      start: 0,
      end: 0,
      step: 1 // 默认移动参数（120fps: 0.5, 60fps: 1）
    }
  },
  computed: {
    width () { // 滚动文字每条的固定宽度
      return Math.floor(this.totalWidth / this.amount)
    }
  },
  created () {
    this.fpsRaf = requestAnimationFrame(this.getFPS)
  },
  methods: {
    getFPS (timestamp) {
      // 单位ms，用1000ms/两个时间的间隔≈刷新频率fps
      // console.log('timestamp:', timestamp)
      if (this.fpsRaf === 2) {
        this.start = timestamp
      }
      if (this.fpsRaf === 3) {
        this.end = timestamp
        // 计算屏幕刷新率
        const fps = Math.floor(1000 / (this.end - this.start))
        if (fps === 120) {
          this.step = 0.5
        }
      }
      this.fpsRaf = requestAnimationFrame(this.getFPS)
      if (this.fpsRaf > 3) {
        cancelAnimationFrame(this.fpsRaf)
        this.onStart()
      }
    },
    onClick (title) { // 通知父组件点击的标题
      this.$emit('click', title)
    },
    onStop () { // 暂停动画
      cancelAnimationFrame(this.moveRaf)
    },
    onStart () { // 开始动画
      if (this.sliderData.length > this.amount) { // 超过amount条开始滚动
        this.moveRaf = requestAnimationFrame(this.moveLeft)
      }
    },
    moveLeft () {
      if (this.left >= this.width) {
        this.sliderData.push(this.sliderData.shift()) // 将第一条数据放到最后
        this.left = 0
      } else {
        this.left += this.step // 每次移动step（px）
      }
      this.moveRaf = requestAnimationFrame(this.moveLeft)
    }
  }
}
</script>
<style lang="scss">
.m-slider {
  margin: 60px auto;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px #D3D3D3;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  .u-slide-title {
    display: inline-block;
    margin-left: 20px;
    font-size: 14px;
    color: #333;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: #1890FF;
    }
  }
}
</style>