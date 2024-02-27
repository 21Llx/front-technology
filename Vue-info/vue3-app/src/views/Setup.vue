<template>
  <h2>Setup</h2>
  <h2 @click="count++">{{count}}</h2>
  <h2>{{comCount}}</h2>
  <h2 @click="comCount2++">{{comCount2}}</h2>
  <h2>{{ obj }}</h2>
</template>

<script>
import {ref,computed,reactive,watchEffect} from "vue"
export default {
  setup(){
    const count = ref(1)
    const comCount = computed(()=>count.value * 2)
    const comCount2 = computed({
      get(){
        return count.value +2
      },
      set(value){
        console.log(value)
        count.value = value -1
      }
    })
    const obj = reactive({a:"wqe",b:{b:123}})
    watchEffect(()=>{
      console.log(count.value)
    })
    watchEffect(()=>{
      console.log(comCount.value)
    })
    setTimeout(()=>{
      obj.a=2333
      obj.f="fff"
    },1000)
    return {
      count,
      comCount,
      comCount2,
      obj
    }
  },
  mounted(){

  },
}
</script>

<style>

</style>