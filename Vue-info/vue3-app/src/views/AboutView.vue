<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="toHome">to Home</button>
    <button @click="add">Add</button>
    <button @click="reset">reset</button>
    <button @click="aboutIncrement('xxx')">aboutIncrement</button>
    <button @click="clgStore">clgStore</button>
  </div>
</template>
<script>
import { useCounterStore } from "../store";
import { mapState, mapActions } from "pinia";

import { useRoute } from "vue-router";
export default {
  name: "HomeView",
  data() {
    return {
      counterStore: useCounterStore(),
    };
  },
  computed: {
    ...mapState(useCounterStore, {
      aboutNum: "num",
    }),
  },
  created() {
    // const route = useRoute();
    console.log(this.$route.params)
    // this.counterStore.$subscribe((action,state)=>{
    //   console.log(action)
    //   console.log(state)
    // })

    // this.counterStore.$onAction((info)=>{
    //   console.log(info)
    //   info.args.push("qweewq")
    //   info.args.push({a:123})
    //   info.after((result)=>{
    //     console.log(result)
    //   })
    // })
  },
  methods: {
    ...mapActions(useCounterStore, {
      aboutIncrement: "increment",
    }),
    toHome() {
      this.$router.push("/");
    },
    add() {
      this.counterStore.count++;
    },
    reset() {
      this.counterStore.$reset();
    },
    clgStore() {
      console.log(this.aboutNum);
    },
  },
};
</script>
