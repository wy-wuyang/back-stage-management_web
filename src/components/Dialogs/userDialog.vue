<template>
  <div class="dialog">
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item prop="name" label="姓名">
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input type="email" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="formData.identity" placeholder="身份">
              <el-option
                v-for="(formtype, index) in format_identity_list"
                :label="formtype.label"
                :value="formtype.value"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formData.status" placeholder="状态">
              <el-option
                v-for="(formtype, index) in format_status_list"
                :label="formtype.label"
                :value="formtype.value"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="dialog.show = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userDialog",
  data() {
    return {
      format_identity_list: [
        {
          value:"manager",
          label:"管理员"
        },
        {
          value:"employee",
          label:"普通员工"
        }],
      format_status_list: [
        {
          value:1,
          label:"启用"
        },
        {
          value:2,
          label:"禁用"
        }
        ],
      form_rules: {
        name: { required: true, message: "姓名不能为空", trigger: "blur" }
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          const url = `edit/${this.formData.id}`;
          this.$axios.post(`/api/users/${url}`, this.formData).then(() => {
            // 编辑成功
            this.$message({
              message: `用户信息修改成功`,
              type: "success"
            });
            // 隐藏Dialog框
            this.dialog.show = false;
            // 页面刷新
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
