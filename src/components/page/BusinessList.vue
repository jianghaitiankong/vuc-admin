<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>江海业务</el-breadcrumb-item>
				<el-breadcrumb-item>业务列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        	<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加业务</el-button>
			</div>
            <el-table :data="businessList" border class="table" ref="">
               <el-table-column type="index" :index="indexMethod" label="序号" width="55" align="center">
                </el-table-column>
                <el-table-column prop='businessTitle' label="业务列表">
                </el-table-column>
                <el-table-column prop='business' label="所属分类" align="center">
                </el-table-column>
                <el-table-column prop="updateTime" width="200" label="更新时间" align="center">
				</el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next,total" :total="total">
				</el-pagination>
			</div>
        </div>
		<!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="45%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="产品标题">
                    <el-input v-model="form.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="英文标题">
                    <el-input maxlength="30" v-model="form.eng"></el-input>
                </el-form-item>
                <el-form-item label="产品内容">
                    <el-input type="textarea" maxlength="1000" v-model="form.desc" autosize></el-input>
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

<script>
    export default {
        data() {
            return {
            	idx: -1,
            	currentPage: 1, //当前页
				total: 0,
				pageSize: 10, //当前页条数
                delVisible:false,
                editVisible:false,
                form: {},
                businessList: [],
                token: sessionStorage.getItem('token')
            }
        },
        created() {
        	this.getData()
        },
        computed: {
            
        },
        methods: {
        	//获取业务列表
			getData() {
				var that = this;
				var data = {
					'curPage': that.currentPage,
					'pageSize': that.pageSize,
				}
				this.$request.post('bus/selectBus', data, that.token).then(res => {
					console.log(res.data.list)
					that.businessList = res.data.list;
					that.total = res.data.rowsCount; //总条数
					that.articleId = res.data.articleId
				}).catch(err => {
					console.log(error)
				});
			},
        	// 分页导航
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getData();
			},
			//解决索引只排序当前页的问题,增加函数自定义索引序号
			indexMethod(index) {
				return(this.currentPage - 1) * this.pageSize + index + 1;
			},
             //点击编辑
            handleEdit(index, row) {
              	this.businessConId = this.businessList[index].businessConId;
              	this.businessId = this.businessList[index].businessId;
				const item = this.businessList[index];
				this.form = {
					name: item.businessTitle,
					desc: item.businessContent,
					eng:item.businessTitleEng
				}
				this.editVisible = true; 
            },
            // 保存编辑
			saveEdit() {
				var that = this;
				var data = {
					'businessId':that.businessId,
					'businessConId': that.businessConId,
					'businessTitleEng':that.form.eng,
					'businessTitle':that.form.name,
					'businessContent':that.form.desc
				}
				this.$request.post('bus/updateBus', data, that.token).then(res => {
					console.log(res.data)
					if(res.data.success == "更新业务成功") {
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
            // 添加产品
			handleAdd(index, row) {
				this.$router.push('/AddBusiness');
			},
            //删除弹窗
			handleDelete(index, row) {
				this.id = this.businessList[index].businessConId;
				this.delVisible = true;
			},
            // 确定删除
            deleteRow(){
                var that = this;
				var data = {
					'businessConId': that.id
				}
				this.delVisible = true;
				this.$request.post('bus/deleteBus', data, that.token).then(res => {
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
