<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i>江海产品</el-breadcrumb-item>
				<el-breadcrumb-item>产品分类</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-table :data="productList" border class="table" ref="">
				<el-table-column type="index" label="序号" width="55" align="center">
				</el-table-column>
				<el-table-column prop='product' label="产品分类">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="分类名称">
                    <el-input v-model="form.product" maxlength="20"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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

<script>export default {
	data() {
		return {
			delVisible: false,
			editVisible: false,
			form: {},
			token: sessionStorage.getItem('token'),
			productList: []
		}
	},
	created() {
		this.getData();
	},
	computed: {

	},
	methods: {
		//获取产品分类
		getData() {
			var that = this;
			var data = {
				'curPage': 1,
				'pageSize': 10,
			}
			this.$request.post('product/selectAllProduct', data, that.token).then(res => {
				console.log(res.data.list)
				that.productList=res.data.list;
			}).catch(err => {
				console.log(error)
			});
		},
		//点击编辑弹窗
		handleEdit(index, row) {
			this.idx = this.productList[index].productId;
			console.log(this.idx)
			const item = this.productList[index];
			this.form = {
				product: item.product
			}
			this.editVisible = true;
		},
		// 保存编辑
		saveEdit() {
			var that = this;
			var data = {
				'productId': that.idx,
				'product': that.form.product
			}
			console.log(that.idx)
			this.$request.post('product/updateAllProduct', data, that.token).then(res => {
				console.log(res.data)
				if(res.data.success == "更新产品类表成功") {
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
		// 确定删除
		deleteRow() {
			this.tableData.splice(this.idx, 1);
			this.$message.success('删除成功');
			this.delVisible = false;
		}
	}
}</script>

<style scoped>.handle-box {
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
}</style>