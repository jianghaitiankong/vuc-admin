<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i>江海业务</el-breadcrumb-item>
				<el-breadcrumb-item>业务分类</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!--<div class="handle-box">
				<el-button type="primary" class="mr10" @click="add">添加分类</el-button>
			</div>-->
			<el-table :data="businessList" border class="table" ref="">
				<el-table-column type="index" label="序号" width="55" align="center">
				</el-table-column>
				<el-table-column prop='business' label="业务分类" width="100" align="center">
				</el-table-column>
				<el-table-column prop='businessEng' label="英文分类名称" width="120" align="center">
				</el-table-column>
				<el-table-column prop='businessHomepageCon' label="首页展示文字" align="center">
				</el-table-column>
				<el-table-column prop='businessCon' label="详情页展示文字" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="分类名称">
                    <el-input v-model="form.name" maxlength="20" clearable></el-input>
                </el-form-item>
                <el-form-item label="英文分类名称">
                    <el-input v-model="form.eng" maxlength="30" clearable></el-input>
                </el-form-item>
                <el-form-item label="首页展示文字">
                    <el-input type="textarea" maxlength="1000" v-model="form.indexText" :autosize="{ minRows: 4}"></el-input>
                </el-form-item>
                <el-form-item label="详情页展示文字">
                    <el-input type="textarea" maxlength="1000" v-model="form.detailsText" :autosize="{ minRows: 4}"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button v-if="addButton" type="primary" @click="saveEdit">确 定</el-button>
                <el-button v-else type="primary" @click="updateEdit">更 新</el-button>
            </span>
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
			return {
				addButton:false,
				delVisible: false,
				editVisible: false,
				currentPage: 1, //当前页
				pageSize: 10, //当前页条数
				form: {},
				businessList: [],
				token: sessionStorage.getItem('token')
			}
		},
		created() {
			this.getData();
		},
		computed: {

		},
		methods: {
			//获取业务分类
			getData() {
				var that = this;
				var data = {
					'curPage': that.currentPage,
					'pageSize': that.pageSize,
				}
				this.$request.post('bus/selectAllBus', data, that.token).then(res => {
					console.log(res.data.list)
					that.businessList=res.data.list;
				}).catch(err => {
					console.log(error)
				});
			},
			//点击添加
//			add(){
//				this.addButton = true;
//				this.editVisible = true;
//			},
			//确认添加
//			saveEdit(){
//				var that = this;
//				var data = {
//					'businessCon': that.form.detailsText,
//					'businessHomepageCon': that.form.indexText,
//					'business':that.form.name,
//					'businessEng':that.form.eng
//				}
//				this.$request.post('bus/insertAllBus', data, this.token).then(res => {
//					console.log(res.data.list)
//					if(res.data.success == '添加业务列表成功') {
//						that.$message.success('添加成功');
//						that.getData();
//					} else {
//						that.$message.error(res.data.error);
//					}
//				}).catch(err => {
//					console.log(error)
//				});
//				this.editVisible = false;
//			},
			//点击编辑
			handleEdit(index, row) {
				this.idx = this.businessList[index].businessId;
				const item = this.businessList[index];
				this.form = {
						name: item.business,
						eng: item.businessEng,
						indexText:item.businessHomepageCon,
						detailsText:item.businessCon
				}
				this.editVisible = true;
			},
			// 保存编辑
			updateEdit() {
				var that = this;
				var data = {
					'businessId': that.idx,
					'businessCon': that.form.detailsText,
					'businessHomepageCon': that.form.indexText,
					'business':that.form.name,
					'businessEng':that.form.eng
				}
				console.log(that.idx)
				this.$request.post('bus/updateAllBus', data, that.token).then(res => {
					console.log(res.data)
					if(res.data.success == "更新业务列表成功") {
						that.$message.success('更新成功');
						that.getData();
					} else {
						that.$message.error(res.data.error);
					}
				}).catch(err => {
					console.log(error)
				});
				this.editVisible = false;
            },
			//删除弹窗
			handleDelete(index, row) {
				this.id = this.businessList[index].businessId
				this.delVisible = true;
			},
			// 确定删除
			deleteRow() {
				var that = this;
				var data = {
					'businessId': that.id
				}
				console.log(that.id)
				this.delVisible = true;
				this.$request.post('bus/deleteAllBus', data, that.token).then(res => {
					console.log(res.data)
					if(res.data.success == "删除成功") {
						that.$message.success('删除成功');
						that.getData();
					} else {
						that.$message.error(res.data.error);
					}
				}).catch(err => {
					console.log(error)
				});
				this.delVisible = false;
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