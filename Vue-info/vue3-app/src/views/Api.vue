<template>
  <div>
    <button @click="handleClg">值打印</button>
    <h2>{{ num }}</h2>
    <h2>{{ obj3 }}</h2>
    <Setup />
  </div>
</template>

<script setup>
import Setup from "./Setup.vue"
import { ref, computed, reactive, watch,watchEffect,isRef,isReactive,unref,toRefs, toRaw } from "vue";
// export default {
  // setup() {
    const num = ref(1);
    const numCpt = computed(() => {
      return num.value + 1;
    });
    const numCpt2 = computed({
      get() {
        return num.value * 2;
      },
      set(newVal) {
        num.value = newVal + 1;
      },
    });
    const obj = reactive({
      a: 1,
      b: 2,
      c: { ca: "x", cb: {cba:"fff"} },
    });
    // const count = reactive(3)
    watch(obj, (newVal, oldVal) => {
      
    });

    watchEffect(()=>{
      // console.log(num.value)
    })
    
    // console.log(isRef(num))
    // console.log(isReactive(obj))
    // console.log(unref(num))
    let obj2 = toRefs(obj)
    let obj3 = toRaw(obj)


    function handleClg() {
      console.log(num.value);
    }

    setTimeout(() => {
      num.value = 3;
      // obj.c.cb.cba = "qwe"
    }, 1000);

    // return {
    //   num,
    //   numCpt,
    //   numCpt2,
    //   obj,
    // };
  // },
  // methods: {
    // handleClg() {
    //   console.log(this.v);
    // },
  // },
// };
</script>

<style>
</style>