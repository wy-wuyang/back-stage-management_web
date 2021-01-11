<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按照时间筛选">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            size="small"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            size="small"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity == 'manager'"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableDate" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column label="日期" prop="date" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time">{{ scope.row.date }}</i>
            <span style="margin-left: 10px"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="收支类型"
          prop="type"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="收支描述"
          prop="describe"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column label="收入" prop="income" align="center" width="100">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" prop="expend" align="center" width="100">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账户现金"
          prop="cash"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="operation"
          align="center"
          fixed="right"
          width="180"
          v-if="user.identity == 'manager'"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagenation">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <my-Dialog
      :dialog="dialogDate"
      :formData="formData"
      @update="getProfile"
    ></my-Dialog>
  </div>
</template>

<script>
import myDialog from "@/components/myDialog";
export default {
  name: "fundlist",
  data() {
    return {
      tableDate: [],
      allTableDate: [],
      filterTableDate: [],
      dialogDate: {
        show: false,
        title: "add"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      paginations: {
        //分页相关数据
        page_index: 1, //当前位于哪页
        total: 0, //总数
        page_size: 5, //每页显示条数
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    myDialog
  },
  created() {},
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableDate = res.data;
          this.filterTableDate = res.data;
          // 设置分页数据
          this.setPaginations();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleAdd() {
      this.dialogDate = {
        show: true,
        title: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleEdit(index, row) {
      this.dialogDate = {
        show: true,
        title: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(() => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableDate = this.allTableDate.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 获取数据总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableDate[i]) {
          tables.push(this.allTableDate[i]);
        }
        this.tableDate = tables;
      }
    },
    setPaginations() {
      this.paginations.total = this.allTableDate.length;
      this.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableDate = this.allTableDate.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSearch() {
      // 筛选功能
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();

      this.allTableDate = this.filterTableDate.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });

      this.setPaginations();
    }
  }
};
</script>
<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagenation {
  text-align: right;
  margin-top: 15px;
}
</style>
