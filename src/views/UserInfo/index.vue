<template>
  <div class="userinfo">
    <el-table :data="userInfo" style="width: 100%" border>
      <el-table-column label="序号" type="index" align="center" width="60">
      </el-table-column>
      <el-table-column label="姓名" prop="name" align="center" width="120">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" align="center" width="200">
      </el-table-column>
      <el-table-column label="身份" prop="email" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.identity == "manager" ? "管理员" : "普通员工" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "启用" : "禁用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleStatus(scope.$index, scope.row)"
            >{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {
      userInfo: null,
      name_show: true
    };
  },
  methods: {
    handleStatus(index, item) {
      item.status == 1 ? (item.status = 2) : (item.status = 1);
      console.log(item);
      this.$axios.post(`/api/users/edit/${item._id}`,item)
      .then(res=>{
        console.log(res);
      })
    }
  },
  mounted() {
    this.$axios.get("/api/users/userinfo").then(res => {
      this.userInfo = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  color: red;
}
</style>
