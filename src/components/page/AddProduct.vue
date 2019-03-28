<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>江海产品</el-breadcrumb-item>
				<el-breadcrumb-item>添加产品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="ruleForm" :model="ruleForm" label-width="80px">
					<el-form-item prop="name" label="产品标题" :rules="[{ required: true, message: '产品标题不能为空'}]">
						<el-input v-model="ruleForm.name" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item prop="eng" label="英文标题" :rules="[{ required: true, message: '英文标题不能为空'}]">
						<el-input v-model="ruleForm.eng" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="所属分类" prop="productId" :rules="[{ required: true, message: '请选择产品分类'}]">
						<el-select v-model="ruleForm.productId" placeholder="请选择">
							<el-option  v-for="item in productList" :key="item.productId" :label="item.product" :value="item.productId" ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品内容" prop="desc" :rules="[{ required: true, message: '产品内容不能为空'}]">
						<el-input type="textarea" maxlength="1000" v-model="ruleForm.desc" :autosize="{ minRows: 4}"></el-input>
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
			return {
				ruleForm: {},
				productId: '',
				productList:[],
				token: sessionStorage.getItem('token')
			}
		},
		created(){
			this.getData()
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
			//提交
			onSubmit(formName) {
				var that = this;
				var data = {
					'productId':that.ruleForm.productId,
					'productTitleEng':that.ruleForm.eng,
					'productTitle':that.ruleForm.name,
					'productContent':that.ruleForm.desc
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$request.post('product/insertProduct', data, that.token).then(res => {
							if(res.data.success == '添加产品成功') {
								that.$message.success(res.data.success);
								that.$router.push('/ProductList');
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