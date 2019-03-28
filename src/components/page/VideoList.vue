<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>媒体中心</el-breadcrumb-item>
				<el-breadcrumb-item>媒体视频列表</el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class="container">
        	<div class="handle-box">
				<el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加媒体视频</el-button>
			</div>
            <el-table :data="adminList" border class="table">
                <el-table-column prop='mediaId' label="ID" width="55">
                </el-table-column>
                <el-table-column prop='mediaName' label="媒体视频名称">
                </el-table-column>
                <el-table-column prop='updateTime' label="加入时间">
                </el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click = "select(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next,total" :total="total">
				</el-pagination>
			</div>
        </div>

        <!-- 编辑弹出框 -->
        <!--<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>-->

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
            	currentPage: 1, //当前页
            	pageSize: 10, //当前页条数
                is_search: false,
                editVisible: false,
                delVisible: false,
                total: 0,
                adminList: [{
                	mediaId:1,
					mediaName: "创投实战商学院开学典礼",
					updateTime: "2019-02-19"
				}, {
					mediaId:2,
					mediaName: "江海天空2019战略发布会",
					updateTime: "2019-02-19"
                }],
                token: sessionStorage.getItem('token')
            }
        },
        created() {
        	 this.queryData();
        },
        computed: {
        	
        },
        
        methods: {
        	// 分页导航
		    handleCurrentChange(val) {
		      this.currentPage = val;
		      console.log(this.currentPage);
		      this.queryTeam();
		    },
            // 添加视频
			handleAdd(index, row) {
				this.$router.push('/AddVideo');
				
			},
			handleEdit(index){
				console.log(index,'点击修改之后的index值')
				sessionStorage.setItem('listData', JSON.stringify(this.adminList[index]))
				this.$router.push('/modifyVideo');
			},
			select(index){
				console.log(index)
				this.delVisible = true
				var indexId = this.adminList[index].mediaId
				sessionStorage.setItem('indexId', indexId)
			},
			deleteRow(){
				var that = this;
				var data = {
					mediaId : Number(sessionStorage.getItem('indexId'))
				}
				that.$request.post("/media/delete",data,that.token)(function(result){
					console.log(result)
					if (result.data.success == '媒体删除成功') {
						console.log('进入了删除成功的判断')
						that.queryData()
					}else{
						that.$message.error('媒体删除失败');
					}
				})
				that.delVisible = false
			},
			queryData(){
				var that = this;
				var data = {
					curPage : that.currentPage,
					pageSize : that.pageSize
				}
				that.$request.post("/media/query",data,that.token).then(function(result){
					console.log(result) 
					if(result.data.success == "媒体查询成功"){
						that.adminList = result.data.list
						console.log(that.adminList,'赋值之后的that.adminList')
//						that.adminList.name = that.adminList.mediaName
//						mediaName
					}
				})
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
