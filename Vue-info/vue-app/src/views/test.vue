<template>
  <div class="test-box">
    <div>
      <el-button>
        xxxx
      </el-button>
    </div>
    <div style="flex:1">
      <vxe-table
    ref="xTable1"
    height="auto"
    :scroll-y="{ enabled: true }"
  >
    <vxe-column type="seq" width="100"></vxe-column>
    <vxe-column field="name" title="Name" sortable></vxe-column>
    <vxe-column field="sex" title="Sex"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
    <vxe-column field="address" title="Address" show-overflow></vxe-column>
  </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  mounted() {
    this.$nextTick(() => {
      const $table = this.$refs.xTable1;
      this.mockList(1000).then((data) => {
        console.log(data)
        if ($table) {
          $table.loadData(data);
        }
      });
    });
  },
  methods: {
    mockList(size) {
      return new Promise((resolve) => {
        const list = [];
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index}`,
            sex: "0",
            num: 123,
            age: 18,
            num2: 234,
            rate: 3,
            address: "shenzhen",
          });
        }
        resolve(list);
      });
    },
  },
};
</script>

<style scoped>
  .test-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
box-sizing: border-box;
  }
</style>