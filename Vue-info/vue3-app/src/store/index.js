import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 1,
      name: 'Eduardo',
      num:100,
      isAdmin: true,
      items: [1,2,3],
      hasChanged: true,
    }
  },
  getters:{
    doubleCount:(state)=>{
      return state.count * 2
    }
  },
  actions: {
    increment(param1){
      console.log(param1)
      console.log(arguments)

      this.num +=2
      return 12333
    }
  }
})