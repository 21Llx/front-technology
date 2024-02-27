<template>
  <div class="box" @mouseenter="onStop" @mouseleave="onStart">
    <span :style="{transform: `translateX(-${left}px)`}" class="text" v-for="item in sliderData" :key="item.title"> {{ item.title }}</span>
  </div>
</template>
<script>

export default {
  name: "HorizontalTextSlider",
  data() {
    return {
      sliderData: [
        {
          title: "美国作家杰罗姆·大卫·塞林格创作的唯一一部长篇小说",
          link: "javascript:;",
        },
        {
          title: "首次出版于1951年",
          link: "javascript:;",
        },
        {
          title:
            "塞林格将故事的起止局限于16岁的中学生霍尔顿·考尔菲德从离开学校到纽约游荡的三天时间内",
          link: "javascript:;",
        },
        {
          title:
            "并借鉴了意识流天马行空的写作方法，充分探索了一个十几岁少年的内心世界",
          link: "javascript:;",
        },
        {
          title:
            "愤怒与焦虑是此书的两大主题，主人公的经历和思想在青少年中引起强烈共鸣",
          link: "javascript:;",
        },
      ],
      left: 0,
      setp: 1,
      interval: null,
      fpsAn: 0,
      startFps: 0,
      endFps:0,
      moveAn: 0,
    };
  },
  created(){
    // this.onStart()
    this.fpsAn = requestAnimationFrame(this.getFps)

  },
  methods: {
    onStart(){
      this.interval = setInterval(()=>{
        this.left +=2
        if(this.left>280){
          this.sliderData.push(this.sliderData.shift())
          this.left = 0
        }
      },20)
    },
    onStop(){
      clearInterval(this.interval)
    },
    getFps(timestamp){
      if(this.fpsAn==2){
        this.startFps = timestamp
      }
      if(this.fpsAn==3){
        this.endFps = timestamp
        const fps = Math.floor(1000 / (this.endFps - this.startFps))
        console.log(fps)
        if (fps === 120) {
          this.step = 0.5
        }
        
      }
      this.fpsAn = requestAnimationFrame(this.getFps)
      if(this.fpsAn>3){
        cancelAnimationFrame(this.fpsAn)
        this.moveAn = requestAnimationFrame(this.leftMove)
      }
      
    },
    leftMove(){
      if(this.left>280){
        this.sliderData.push(this.sliderData.shift()) // 将第一条数据放到最后
        this.left = 0
      }else{
        this.left += this.setp
      }
      this.moveAn = requestAnimationFrame(this.leftMove)
    }
  }
};
</script>
<style lang="scss">
.box {
  width: 1200px;
  height: 50;
  border: 1px solid #ccc;
  margin: 100px auto;
  white-space: nowrap;
  overflow: hidden;
  .text{
    display: inline-block;
    width: 280px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 20px;
  }
}
</style>
