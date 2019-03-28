<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i>团队人员列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" class="mr10" @click="add">添加人员</el-button>
			</div>
			<el-table :data="NewsList" border class="table">
				<el-table-column type="index" :index="indexMethod" label="序号" width="55" align="center"></el-table-column>
				<el-table-column prop="personName" label="姓名" sortable align="center">
				</el-table-column>
				<el-table-column prop='position' label="职位" align="center">
				</el-table-column>
				<el-table-column prop="duty"  label="主要负责" align="center">
				</el-table-column>
				<el-table-column prop="introduce"  label="介绍" align="center">
				</el-table-column>
				<el-table-column label="操作" width="180" align="center" prop='teamPId'>
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next,total" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 修改弹出框 -->
		<!-- <el-dialog title="修改" :visible.sync="editVisible" width="80%">
			<el-form ref="NewsList" :model="form" label-width="90px">
				<el-form-item label="文章标题">
					<el-input v-model="form.personName"></el-input>
				</el-form-item>
				<el-form-item label="文章内容">
					<el-input type="textarea" rows="5" v-model="form.articleContent"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog> -->
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
    return {
      NewsList: [],
      currentPage: 1, //当前页
      total: 0,
      pageSize: 10, //当前页条数
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,
      token: sessionStorage.getItem("token"),
    };
  },
  created() {
    this.queryTeam();
  },
  computed: {},
  methods: {
    //查询人员
    queryTeam() {
      let that = this;
      let data = {
        curPage: that.currentPage,
        pageSize: that.pageSize
      };
      this.$request.post("team/person/query", data, that.token).then(res => {
        that.NewsList = res.data.list;
        that.total = res.data.rowsCount; //总条数
      })
      .catch(err => {
        that.$message.error(error);
      });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryTeam();
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //增加人员跳转
    add() {
      this.$router.push("/AddCrew");
    },

  
    //点击修改弹窗
    handleEdit(index, row) {
      sessionStorage.TeamPerson = JSON.stringify(this.NewsList[index]);
      this.$router.push("/EditCrew");
    },
    // 保存修改
    // saveEdit(formName) {
    //   方法废弃
    // },
    //删除弹窗
    handleDelete(index, row) {
      this.id = this.NewsList[index].teamPId;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      let that = this;
      let data = {
        teamPId: that.id
      };
      this.delVisible = true;
      this.$request.post("/team/person/delete", data, that.token).then(res => {
        if (res.data.success == "人员删除成功") {
          that.$message.success("人员删除成功");
          that.queryTeam();
        } else {
          that.$message.error(res.data.error);
        }
      }).catch(err => {
        that.$message.error(error);
      });
      this.delVisible = false;
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