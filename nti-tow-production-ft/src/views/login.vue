<template>
  <div class="login h-flex-center">
    login
    <el-form label-width="80px" :model="form">
      <el-form-item label="账号">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  components: {},

  computed: {},

  watch: {},

  created() { },
  mounted() { },
  methods: {
    login() {
      login(this.form).then((res) => {
        if (res.code === 200) {
          this.$store.commit("login", res.data);
          this.$message.success("登录成功");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  padding-top: 100px;
  width: 400px;
  height: 300px;
  margin: 0 auto;
  /* border:  1px solid gray; */
}
</style>
