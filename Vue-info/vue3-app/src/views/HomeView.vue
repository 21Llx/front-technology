<template>
  <div>
    <h1>this is home</h1>
    <button @click="toAbout">to About</button>
    <button @click="clgStore">clg</button>
  </div>
</template>

<script>
import {useCounterStore } from "../store"
import { mapState,mapWritableState } from 'pinia'
export default {
  name: 'HomeView',
  data() {
    return {
      counterStore: useCounterStore(),
    };
  },
  created(){},
  computed:{
    ...mapState(useCounterStore,{
      homeName: 'name',
      homeCount: "count",
      homeDoubleCount: "doubleCount"
    }),
    ...mapWritableState(useCounterStore,{
      homeNum: "num"
    })
  },
  methods: {
    toAbout(){
      this.$router.push({
        name: "about",
        query:{id:"xxxx"},
        params:{
          a:123
        },
        hash:"#er"
      })
    },
    clgStore(){
      this.homeNum++
      console.log(this.homeCount)
      console.log(this.homeName)
      console.log(this.homeDoubleCount)
    }
  }
}
</script>
