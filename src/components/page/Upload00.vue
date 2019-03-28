<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>首页大图替换</el-breadcrumb-item>
				<el-breadcrumb-item>修改图片</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!--<div class="content-title"></div>-->
			<div class="plugins-tips">
				banner图修改
			</div>
			<el-upload class="upload-demo" :action="action" :on-preview="handlePreview" ref="upload" :auto-upload="false" :on-remove="handleRemove" list-type="picture" accept="image/jpeg,image/jpg,image/png" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeupload" :limit='1'>
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				action: '',
			}
		},
		components: {

		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},

			//上传照片前的校验
			beforeupload(file) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;

				this.src = windowURL.createObjectURL(file);
				return false;
			},
			//上传
			submitUpload() {
				
				//然后通过下面的方式把内容通过axios来传到后台
				this.$request.imgPost("file/upload").then(function(result) {
					console.log(result);
				})
			},
			//上传成功
			uploadSuccess(res, file, fileList) {
				console.log(res)
				console.log(file)
				this.$message.success('上传成功')
			},
			//上传失败
			uploadError(err, file) {
				this.$message.error('上传失败')
			}
		},
		created() {

		}
	}
</script>

<style scoped>
	.content-title {
		font-weight: 400;
		line-height: 50px;
		margin: 10px 0;
		font-size: 22px;
		color: #1f2f3d;
	}
	
	.pre-img {
		width: 100px;
		height: 100px;
		background: #f8f8f8;
		border: 1px solid #eee;
		border-radius: 5px;
	}
	
	.crop-demo {
		display: flex;
		align-items: flex-end;
	}
	
	.crop-demo-btn {
		position: relative;
		width: 100px;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		margin-left: 30px;
		background-color: #409eff;
		color: #fff;
		font-size: 14px;
		border-radius: 4px;
		box-sizing: border-box;
	}
	
	.crop-input {
		position: absolute;
		width: 100px;
		height: 40px;
		left: 0;
		top: 0;
		opacity: 0;
		cursor: pointer;
	}
</style>