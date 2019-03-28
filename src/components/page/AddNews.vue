<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>新闻动态</el-breadcrumb-item>
				<el-breadcrumb-item>添加新闻</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item prop="title" label="文章标题" :rules="[{ required: true, message: '请填写文章标题'}]">
						<el-input v-model="form.title" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item prop="desc" label="文章内容" :rules="[{ required: true, message: '请填写文章内容'}]">
						<el-input type="textarea" rows="5" maxlength="1000" v-model="form.desc" :autosize="{ minRows: 4}"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit('form')">保存</el-button>
						<el-button @click="resetForm('form')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				token: sessionStorage.getItem('token')
			}
		},
		methods: {
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			onSubmit(formName) {
				var that = this;
				var data = {
					'articleTitle': that.form.title,
					'articleContent': that.form.desc,
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$request.post("news/insertAllNews", data, that.token).then(res => {
							if(res.data.success == '添加新闻成功') {
								that.$message.success(res.data.success);
								that.$router.push('/NewsList');
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
			}
		}
	}
</script>