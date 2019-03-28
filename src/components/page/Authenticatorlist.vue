<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>认证者列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="adminList" border class="table">
                <el-table-column type="index"  :index="indexMethod" label="ID" width="55" align="center">
                </el-table-column>
                <el-table-column prop='name' label="姓名">
                </el-table-column>
                <el-table-column prop='updateTime' label="加入时间">
                </el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" icon="el-icon-star-on" @click="lookAdd(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next,total" :total="total">
				</el-pagination>
			</div>
        </div>
        
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="85%">
           <lookAdd :lookAddCen="cent" />
           	<el-button type="primary" v-if="Submit">审核通过</el-button>
            <el-button type="primary" v-else>审核通过</el-button>
            <el-button type="primary" @click="editVisible = false" >取消</el-button>
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
import lookAdd from './AuthenticatroAdd'
    export default {
        components:{
            lookAdd
        },
        data() {
            return {
                currentPage: 1, //当前页
				total: 0,
				pageSize: 10, //当前页条数
                is_search: false,
                editVisible: false,
                delVisible: false,
                adminList:[],
                cent:{},
                lookShwo:false,
                Submit:true,
                token: sessionStorage.getItem('token'),
            }
        },
        created() {
            this.getData()
        },
        computed: {
        },
        methods: {
            //获取产品列表
			getData() {
				var that = this;
				var data = {
					'curPage': that.currentPage,
					'pageSize': that.pageSize,
				}
				this.$request.post('collection/selectCollectionCon', data, that.token).then(res => {
                    console.log(res.data.list)
					that.adminList = res.data.list;
					that.total = res.data.rowsCount; //总条数
					that.articleId = res.data.articleId
				}).catch(error => {
					console.log(error)
				});
			},
            //删除弹窗
			handleDelete(index, row) {
                console.log(row)
				this.id = this.adminList[index].collectionConId
				this.delVisible = true;
			},
            // 确定删除
			deleteRow() {
				var that = this;
				var data = {
					'collectionConId': that.id
				}
				that.delVisible = true;
				that.$request.post('collection/deleteCollectionCon', data, that.token).then(res => {
					if(res.data.success == "删除成功") {
						that.$message.success('删除成功');
						that.getData();
					} else {
						that.$message.error(res.data.error);
					}
				}).catch(err => {
					console.log(error)
				});
				that.delVisible = false;
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
            lookAdd(value){
                console.log(value)
                this.editVisible = true
                this.cent = value
                // this.$refs.AuthenticatroAdd.getUserType(value)
                // this.lookShwo = true
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
