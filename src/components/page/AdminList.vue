<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>管理员列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">增加管理员</el-button>
      </div>
      <el-table :data="adminList" border class="table">
        <el-table-column type="index" :index="indexMethod" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="userName" label="登录名"></el-table-column>
        <el-table-column label="操作" align="center" v-if="showLook!=='1'?false:true"  >
          <template slot-scope="scope" >
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button v-show="(showLook === '1'&& scope.row.id==showLook) ? false : true" 
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-else>
          <template slot-scope="scope"  >
             <el-button type="text" icon="el-icon-edit" v-show="(showLook !== '1'&& scope.row.id==showLook) ? true : false" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button v-show="(showLook !== '1'&& scope.row.id==showLook) ? true : false" 
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%" :close-on-click-modal="false">
      <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm2.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="passWord" v-model="ruleForm2.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit('ruleForm2')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: "",
				passWord: "",
        checkPass: "",
				id:''
      },
      dialogTitle: "",
      currentPage: 1, //当前页
      total: 0,
      pageSize: 10, //当前页条数
      is_search: false,
      editVisible: false,
			delVisible: false,
			handleType:'',
      operation:false,
      adminList: [],
      showLook:sessionStorage.getItem('id'),
      rules2: {
        userName: [
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        passWord: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      token: sessionStorage.getItem("token")
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    getData() {
      console.log(this)
      var that = this;
      var data = {
        curPage: that.currentPage,
        pageSize: that.pageSize
      };
      this.$request
        .post("cms/selectManager", data, that.token)
        .then(res => {
            res.data.list.forEach((val, index) => {
              console.log(val,index)
          if(val.userName === 'zhangsan'){
            this.operation = false
            return false
          }else{
            this.operation = true
            return
          }
            });
          that.adminList = res.data.list;
          that.total = res.data.rowsCount; //总条数
          that.articleId = res.data.articleId;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //点击编辑
    handleEdit(index, row) {
			this.ruleForm2.checkPass = ''
			this.ruleForm2.passWord = ''
			this.ruleForm2 = row
      this.editVisible = true
			this.dialogTitle = '编辑管理员'
			this.handleType = '1'
    },
    //点击保存
    handleAdd() {
			this.ruleForm2 = {}
      this.editVisible = true
			this.dialogTitle = '增加管理员'
			this.handleType = '2'
			
		},
		//点击删除
    handleDelete(index, row) {
			this.ruleForm2.id = row.id
      this.delVisible = true
    },
    //确认保存
    saveEdit(formName) {
			var that = this;
			var url = ''
			// 	this.handleType == 1 is handleEdit() of handleAdd()
			if(this.handleType === '1'){
				url = 'cms/editManager'
			}else{
				url = 'cms/insertManager'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
        this.$request
        .post(url, that.ruleForm2, that.token)
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            that.$message.success("更新成功")
						this.editVisible = false
						that.getData()
          } else {
            that.$message.error(res.data.error)
          }
        })
        .catch(err => {
          console.log(error)
        })
        }else{
          return false;
        }
      })
      
    },
    // 确定删除
    deleteRow() {
      var that = this;
      var data = {
        id: that.ruleForm2.id
      };
      // this.delVisible = true;
      this.$request
        .post("cms/deleteManager", data, that.token)
        .then(res => {
          console.log(res.data);
          if (res.data.success == "删除成功") {
            that.$message.success("删除成功");
            that.getData();
          } else {
            that.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(error);
        });
      this.delVisible = false;
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}
</style>