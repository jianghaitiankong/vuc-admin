<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>关于我们</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px" :rules='rulesAbout'>

					<el-form-item prop="desc" label="修改">
						<el-input type="textarea" rows="5" v-model="form.desc" :autosize="{ minRows: 4}"></el-input>
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
			var descBlur = (rule, value, callback) => {
				if(!value) {
					callback(new Error('修改的内容不能为空！'))
				} else if(value.length > 2000) {
					callback(new Error('修改的内容不能超过2000字符！'))
				} else {
					callback();
				}
			}
			return {
				form: {
					desc: ''
				},
				token: sessionStorage.getItem('token'),
				rulesAbout: {
					desc: [{
						validator: descBlur,
						trigger: 'blur'
					}],
				},
			}
		},
		created() {
			this.getAbout()
		},
		methods: {
			getAbout() {
				var about = {}
				this.$request.post("aboutMe/selectAboutUs", about, this.token).then(res => {
					this.form = {
						desc: res.data.list[0].aboutUs
					}
				}).catch(err => {
					console.log(error)
				});
			},
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			onSubmit(formName) {
				var that = this;
				var data = {
					'aboutUs': that.form.desc,
					'aboutUsId': 1
				}
				that.$refs[formName].validate((valid) => {
					if(valid) {
						this.$request.post("aboutMe/updateAboutUs", data, that.token).then(res => {
							if(res.data.success == '更新成功') {
								that.$message.success(res.data.success);
								this.getAbout()
							} else {
								that.$message.error(res.data.error);
							}
						}).catch(err => {
							console.log(error)
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>