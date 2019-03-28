<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>团队管理</el-breadcrumb-item>
				<el-breadcrumb-item>添加人员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box" style="position: relative;">
				<el-form ref="form" :model="form" label-width="80px" :rules="rules">
					<div id="upload">
						<label class="el-form-item__label" style="width: 80px;">上传照片</label>
						<el-upload class="upload-demo" :before-upload="beforeupload"  drag action="" style="margin-left:80px;">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<div class="el-upload__tip" slot="tip" style="margin-bottom: 10px;">只能上传jpg/png文件，且不超过100KB，尺寸为150*150</div>
						</el-upload>
					</div>
					<!--展示选中图片的区域-->
					<el-col :span="7" style="margin-left:150px;position: absolute;top: 10px;left: 470px;">
						<div style="width:100%;overflow: hidden;">
							<img :src="src" alt="" style="width:100%;" />
						</div>
					</el-col>
					<el-form-item prop="name" label="姓名" >
						<el-input v-model="form.name" maxlength="20" name="name" style="width:360px;"></el-input>
					</el-form-item>
					<el-form-item prop="JobTitle" label="职位">
						<el-input v-model="form.JobTitle" maxlength="100"></el-input>
					</el-form-item>
					<el-form-item prop="principal" label="主要负责" >
						<el-input v-model="form.principal" maxlength="100"></el-input>
					</el-form-item>
					<el-form-item prop="presentation" label="介绍">
						<el-input type="textarea" maxlength="1000" :autosize="{ minRows: 4}" v-model="form.presentation"></el-input>
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
	data: function() {
		return {
			form: {},
			param: "", //表单要提交的参数
			src: "", //展示图片的地址
			token: sessionStorage.getItem('token'),
			rules: {
				name : [{ 
					required: true,
					message: '请输入姓名',
					trigger: 'blur'
				}],
				JobTitle: [{ 
					required: true,
					message: '请输入职位',
					trigger: 'blur'
				}],
				principal:[{ 
					required: true,
					message: '请填写主要负责内容',
					trigger: 'blur'
				}],
				presentation :[{ 
					required: true,
					message: '请填写个人介绍',
					trigger: 'blur'
				}],
			}
		}
	},

	methods: {
		//阻止upload的自己上传，进行再操作
		beforeupload(file) {
			//创建临时的路径来展示图片
			var windowURL = window.URL || window.webkitURL;
			this.src = windowURL.createObjectURL(file);
			//重新写一个表单上传的方法
			this.param = new FormData();
			this.param.append('file', file, file.name);
			return false;
		},
		//重置
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},

		//上传图片以及添加人员
		onSubmit(formName) {
			var that = this;
			that.$refs[formName].validate((valid) => {
				if(valid) {
					that.$request.imgPost("file/upload",this.param,that.token).then(function(result) {
						if(result.data.success === '文件上传成功'){
					 	var data = {
								imgName : result.data.filePath,//图片名字
								personName : that.form.name,//人员名字
								position :  that.form.JobTitle,//职位
								duty :  that.form.principal,//主要职责
								introduce : that.form.presentation//介绍
							}
							that.$request.post('/team/person/add', data, that.token).then(res => {
								// console.log(res.data.success)
								if(res.data.success == '人员添加成功' ){
									that.$message.success('人员添加成功');
									that.$router.push('/Team')
								}
							}).catch(err => {
								that.$message.error('人员添加失败');
							});
						}
					})
				} else {
					that.$message.error("请先填写必填项");
					return false;
				}
			});


		

		}
	}
}
</script>