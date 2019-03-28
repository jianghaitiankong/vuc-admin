<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i>联系我们</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">增加基地</el-button>
			</div>
			<el-table :data="contactList" border class="table">
				<el-table-column type="index" label="序号"  width="55" align="center"></el-table-column>
				<el-table-column prop="contactHQ" label="基地分布" >
				</el-table-column>
				<el-table-column prop="contactAddress" label="基地地址" >
				</el-table-column>
				<el-table-column prop="contactUser" label="联系人" >
				</el-table-column>
				<el-table-column prop="contactPhone" label="联系电话" >
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 编辑弹出框 -->
		<!-- <el-dialog title="修改" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="基地总部">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="基地地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input v-model="form.contacts"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
		</el-dialog> -->

		<!-- 增加弹出框 -->
		<!-- <el-dialog title="增加基地" :visible.sync="addVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="基地总部">
					<el-input v-model="form.addName"></el-input>
				</el-form-item>
				<el-form-item label="基地地址">
					<el-input v-model="form.addNddress"></el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input v-model="form.addContacts"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.addTel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
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
				contactList: [],
				currentPage: 1,//当前页码
				pageSize : 10,//每页的条数
				editVisible: false,
				delVisible: false,
				// addVisible:false,//新增对话框是否显示
				form: {},
				idx: -1,
				token: sessionStorage.getItem("token"),
			}
		},
		created() {
			this.getData();
		},
	
		methods: {
			// 分页导航
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getData();
			},
			// 获取联系我们数据
			getData() {
				let that = this
				var data = {
							curPage : this.currentPage,
							pageSize : this.pageSize
						};
				that.$request.post('contact/selectAllContact', data, that.token).then(res => {
					if(res.data.success == "查询成功"){
						that.contactList = res.data.list;
					}else{
						that.$message.error(res.data.error);
					}
				}).catch(err => {
					that.$message.error(error);
				});
			},
			// 点击增加
			handleAdd(index, row) {
				this.$router.push('/AddContact')
			},
		
			//点击修改弹窗
			handleEdit(index, row) {
				// console.log(this.contactList[index])
				// this.idx = this.contactList[index].teamPId;
				sessionStorage.ContactInfo = JSON.stringify(this.contactList[index]);
				this.$router.push('/EditContact')
				// const item = this.contactList[index];
				// this.form = {
				// 	personName: item.personName,
				// 	articleContent: item.articleContent
				// };
				// this.editVisible = true;
			},
			// 保存修改--方法废弃	
			// saveEdit() {
			// 	this.$set(this.contactList, this.idx, this.form);
			// 	this.editVisible = false;
			// 	this.$message.success(`修改第 ${this.idx+1} 行成功`);
			// },
			// 点击删除
			handleDelete(index, row) {
				this.idx = this.contactList[index].contactId
				this.delVisible = true;
			},
			// 确定删除
			deleteRow() {
				let that = this
				var data = {
							contactId:that.idx
						};
				that.$request.post('contact/deleteAllContact', data, that.token).then(res => {
					if(res.data.success == "删除成功"){
						that.$message.success('删除成功');
						that.getData();
					}else{
						that.$message.error(res.data.error);
					}
				}).catch(err => {
					that.$message.error(error);
				});
				that.delVisible = false;
			}
		}
	}
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
		text-align: center
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