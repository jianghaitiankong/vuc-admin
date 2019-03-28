<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>江海业务</el-breadcrumb-item>
				<el-breadcrumb-item>添加业务</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules2">
					<el-form-item prop="name" label="业务名称">
						<el-input v-model="ruleForm.name" placeholder="业务名称长度不能超过20汉字"></el-input>
					</el-form-item>
					<el-form-item prop="eng" label="英文名称">
						<el-input v-model="ruleForm.eng" placeholder="英文名称长度不能超过30字符"></el-input>
					</el-form-item>
					<el-form-item label="所属分类" prop="businessId">
						<el-select v-model="ruleForm.businessId" placeholder="请选择">
							<el-option  v-for="item in businessList" :key="item.businessId" :label="item.business" :value="item.businessId" ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业务内容" prop="desc">
						<el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 4}" placeholder="业务内容长度不能超过1000字符"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data: function() {
			var nameBlur = (rule, value, callback) => {
				if (!value) {
          			callback(new Error('业务名称不能为空！'));
        		}else if(value.length > 20){
					callback(new Error('业务名称长度不能超过20字符！'));
				}else{
					callback();
				}
			};
			var engBlur = (rule, value, callback) =>{
				if (!value) {
          			callback(new Error('英文名称不能为空！'));
        		}else if (!/^[a-zA-Z]/.test(value)) {
					return callback(new Error('英文名称输入错误'));
				}else if (value.length > 30) {
					callback(new Error('英文名称长度不能超过30字符！'));
				}else{
					callback();
				}
			};
			var businessIdBlur = (rule, value, callback) => {
				if (!value || value == '请选择') {
					callback(new Error('所属分类选择错误！'));
				}else{
					callback();
				}
			};
			var descBlur = (rule, value, callback) =>{
				if(!value){
					callback(new Error('业务内容不能为空！'));
				}else if (value.length > 1000) {
					callback(new Error('业务内容长度不能超过1000字符！'));
				}else{
					callback();
				}
			}
			
			return {
				ruleForm: {},
				businessId: '',
				businessList:[],
				token: sessionStorage.getItem('token'),
				rules2:{
					name:[
						{ validator: nameBlur, trigger: 'blur' }
					],
					eng:[
						{ validator: engBlur, trigger: 'blur' }
					],
					businessId:[
						{ validator: businessIdBlur, trigger: 'click' }
					],
					desc:[
						{ validator: descBlur, trigger: 'blur' }
					]
				},
			}
		},
		created(){
			this.getData()
		},
		methods: {
			//获取业务分类
			getData() {
				var that = this;
				var data = {
					'curPage': 1,
					'pageSize': 10,
				}
				this.$request.post('bus/selectAllBus', data, that.token).then(res => {
					console.log(res.data.list)
					that.businessList=res.data.list;
				}).catch(err => {
					console.log(error)
				});
			},
			//提交
			onSubmit(formName) {
				var that = this;
				var data = {
					'businessId':that.ruleForm.businessId,
					'businessTitleEng':that.ruleForm.eng,
					'businessTitle':that.ruleForm.name,
					'businessContent':that.ruleForm.desc
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$request.post('bus/insertBus', data, that.token).then(res => {
							console.log(res.data.list)
							if(res.data.success == '添加业务成功') {
								that.$message.success(res.data.success);
								that.$router.push('/BusinessList');
							} else {
								that.$message.error(res.data.error);
							}
						}).catch(err => {
							console.log(error)
						});
					} else {
						return false;
					}
				});
			},
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>