<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>加入我们</el-breadcrumb-item>
				<el-breadcrumb-item>发布招聘</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item prop="hiring" :rules="[{ required: true, message: '请填写招聘岗位'}]" label="招聘岗位">
						<el-input v-model="form.hiring" maxlength="20" placeholder="请填写招聘岗位"></el-input>
					</el-form-item>
					<el-form-item prop="workplace" :rules="[{ required: true, message: '请填写工作地点'}]" label="工作地点">
						<el-input v-model="form.workplace" maxlength="20" placeholder="请填写工作地点"></el-input>
					</el-form-item>
					<el-form-item prop="numbers" :rules="[{ required: true, message: '请填写招聘人数'}, { type: 'number', message: '招聘人数必须为数字值'}]" label="招聘人数">
						<el-input v-model.number="form.numbers" maxlength="3" placeholder="请填写招聘人数,格式为数字"></el-input>
					</el-form-item>
					<el-form-item prop="money" :rules="[{ required: true, message: '请填写薪资水平'}]" label="薪资水平">
						<el-input v-model="form.money" maxlength="50" placeholder="请填写薪资水平,例如10-12k"></el-input>
					</el-form-item>
					<el-form-item prop="duty" :rules="[{ required: true, message: '请填写岗位职责'}]" label="岗位职责">
						<el-input type="textarea" maxlength="1000" :autosize="{ minRows: 10}" placeholder="请填写岗位职责" v-model="form.duty"></el-input>
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
				form: {
					hiring: '',
					workplace: '',
					numbers: '',
					money: '',
					duty: ''
				},
				token: sessionStorage.getItem('token')
			}
		},
		methods: {
			//重置
			resetForm(form) {
				this.$refs[form].resetFields();
			},
			onSubmit(formName) {
				var that = this;
				var data = {
					hiring: that.form.hiring,
					workplace: that.form.workplace,
					numbers: that.form.numbers,
					money: that.form.money,
					duty: that.form.duty
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$request.post("join/insertAllJoin", data, that.token).then(res => {
//							console.log(res.data)
							if(res.data.success == '添加成功') {
								that.$message.success('添加成功');
								that.$router.push('/JobList');
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