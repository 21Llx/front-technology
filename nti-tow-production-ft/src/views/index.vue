<template>
  <div class="page h-flex-col">
    <el-form label-width="80px" inline size="mini" :model="queryParams">
      <el-form-item label="开始时间">
        <el-date-picker value-format="yyyy-MM-dd hh:mm:ss" v-model="queryParams.startTime" type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker value-format="yyyy-MM-dd hh:mm:ss" v-model="queryParams.endTime" type="datetime"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="flex: 1">
      <el-table :data="list" border stripe height="100%">
        <el-table-column label="时间" prop="logTime" width="200"></el-table-column>
        <el-table-column label="IP地址" prop="ip" width="200"></el-table-column>
        <el-table-column label="日志" prop="info" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="padding-top:10px">
      <el-pagination background layout="prev, pager, next,total,sizes" size="mini" :page-sizes="sizes"
        :current-page="queryParams.pageIndex" :page-size="queryParams.pageSize" :total="total"
        @current-change="pageChange" @size-change="sizeChange"></el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="showDetail" width="80%">
      <el-descriptions border :column="1">
        <el-descriptions-item label="IP">{{ detail.ip }}</el-descriptions-item>
        <el-descriptions-item label="记录时间">{{
          detail.logTime
        }}</el-descriptions-item>
        <el-descriptions-item label="日志信息" contentClassName="desc-content">{{ detail.info }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { getLogById, getLogList } from "@/api/api";
export default {
  data() {
    return {
      list: [],
      pageSize: 10,
      total: 0,
      pageIndex: 1,
      showDetail: false,
      queryParams: {
        startTime: "",
        endTime: "",
        pageSize: 10,
        pageIndex: 1,
      },
      detail: {},
      sizes: [10, 20, 30, 40, 50],
    };
  },
  components: {},

  computed: {},

  watch: {},

  created() {
    this.getList();
  },
  mounted() { },
  methods: {
    getList() {
      getLogList(this.queryParams).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },
    toDetail(e) {
      getLogById(e.id).then((res) => {
        this.detail = res.data;
        this.showDetail = true;
      });
    },
    pageChange(e) {
      this.queryParams.pageIndex = e;
      this.getList();
    },
    sizeChange(e) {
      this.queryParams.pageSize = e;
      this.queryParams.pageIndex = 1;
      this.getList();
    },
  },
};
</script>

<style scoped>
</style>
