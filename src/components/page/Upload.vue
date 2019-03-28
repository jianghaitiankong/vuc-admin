<template>
	<el-row>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>首页大图替换</el-breadcrumb-item>
				<el-breadcrumb-item>修改图片</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!--banner图修改-->
			<div class="plugins-tips">
				banner图修改
			</div>
			<div id="upload">
				<label class="el-form-item__label" style="width: 80px;">上传图片</label>
				<el-upload class="upload-demo" :before-upload="beforeupload1" drag action="" style="margin-left:80px;">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip" style="margin-bottom: 10px;">只能上传jpg/png文件，且不超过2M，尺寸为1640*800</div>
				</el-upload>
				<el-form ref="form" :model="form" label-width="80px">
					<!-- <el-form-item label="活动名称">
						<el-input v-model="form.name" name="names" style="width:360px;"></el-input>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="onSubmit1">立即上传</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-col :span="7" style="position: absolute;top: 150px;left: 470px;">
				<div style="width:100%;overflow: hidden;margin-left:150px;">
					<img :src="src1" alt="" style="width:100%;" />
				</div>
			</el-col>

			<!--媒体中心-->
			<div class="plugins-tips">
				媒体中心大图修改
			</div>
			<div id="upload">
				<label class="el-form-item__label" style="width: 80px;">上传图片</label>
				<el-upload class="upload-demo" :before-upload="beforeupload2" drag action="" style="margin-left:80px;">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip" style="margin-bottom: 10px;">只能上传jpg/png文件，且不超过2M，尺寸为1640*800</div>
				</el-upload>
				<el-form ref="form" :model="form" label-width="80px">
					<!-- <el-form-item label="活动名称">
						<el-input v-model="form.name" name="names" style="width:360px;"></el-input>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="onSubmit2">立即上传</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!--展示选中图片的区域-->
			<el-col :span="7" style="position: absolute;top: 570px;left: 470px;">
				<div style="width:100%;overflow: hidden;margin-left:150px;">
					<img :src="src2" alt="" style="width:100%;" />
				</div>
			</el-col>
		
			<!--江海产品大图修改-->
			<div class="plugins-tips">
				江海产品大图修改
			</div>
			<div id="upload">
				<label class="el-form-item__label" style="width: 80px;">上传图片</label>
				<el-upload class="upload-demo" :before-upload="beforeupload3" drag action="" style="margin-left:80px;">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip" style="margin-bottom: 10px;">只能上传jpg/png文件，且不超过2M，尺寸为1640*800</div>
				</el-upload>
				<el-form ref="form" :model="form" label-width="80px">
					<!-- <el-form-item label="活动名称">
						<el-input v-model="form.name" name="names" style="width:360px;"></el-input>
					</el-form-item> -->
					<el-form-item>
						<el-button type="primary" @click="onSubmit3">立即上传</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!--展示选中图片的区域-->
			<el-col :span="7" style="position: absolute;top: 990px;left: 470px;">
				<div style="width:100%;overflow: hidden;margin-left:150px;">
					<img :src="src3" alt="" style="width:100%;" />
				</div>
			</el-col>
		</div>

	</el-row>

</template>

<script>
	export default {
		data() {
			return {
				form: { //form里面的参数
					bannerId: ''
				},
				param: "", //表单要提交的参数
				src1: "", //展示图片的地址
				src2: "", //展示图片的地址
				src3: "", //展示图片的地址
				token: sessionStorage.getItem("token"),//token
			};
		},
		methods: {
			beforeRemove(file, fileList) {
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//banner阻止upload的自己上传，进行再操作
			beforeupload1(file) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;
				this.src1 = windowURL.createObjectURL(file);
				//重新写一个表单上传的方法
				this.param = new FormData();
				this.param.append('file', file, file.name);
				return false;
			},
			onSubmit1() { //表单提交的事件
				let that = this;
				let bannerId = 1;
				//下面append的东西就会到form表单数据的fields中；
				that.param.append('bannerId', bannerId);
				//然后通过下面的方式把内容通过axios来传到后台
				//下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
				that.$request.imgPost("file/img/replace", that.param,that.token).then(function(result) {
					console.log(result.data.success);
					if(result.data.success == "图片替换成功"){
						that.$message.success("图片替换成功");
					}else{
						that.$message.error("图片替换失败");
					}
				}).catch(err => {
					that.$message.error(error);
				});
			
			},
			//媒体中心大图阻止upload的自己上传，进行再操作
			beforeupload2(file) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;

				this.src2 = windowURL.createObjectURL(file);
				//重新写一个表单上传的方法
				this.param = new FormData();
				this.param.append('file', file, file.name);
				return false;
			},
		
			onSubmit2() { //表单提交的事件
				let that = this;
				let bannerId = 2;
				//下面append的东西就会到form表单数据的fields中；
				that.param.append('bannerId', bannerId);
				//然后通过下面的方式把内容通过axios来传到后台
				//下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
				that.$request.imgPost("file/img/replace", that.param,that.token).then(function(result) {
					console.log(result.data.success);
					if(result.data.success == "图片替换成功"){
						that.$message.success("图片替换成功");
					}else{
						that.$message.error("图片替换失败");
					}
				}).catch(err => {
					that.$message.error(error);
				});
			},
			//江海产品大图阻止upload的自己上传，进行再操作
			beforeupload3(file) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;

				this.src3 = windowURL.createObjectURL(file);
				//重新写一个表单上传的方法
				this.param = new FormData();
				this.param.append('file', file, file.name);
				return false;
			},
		
			onSubmit3() { //表单提交的事件
				let that = this;
				let bannerId = 3;
				//下面append的东西就会到form表单数据的fields中；
				that.param.append('bannerId', bannerId);
				//然后通过下面的方式把内容通过axios来传到后台
				//下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
				that.$request.imgPost("file/img/replace", that.param,that.token).then(function(result) {
					console.log(result.data.success);
					if(result.data.success == "图片替换成功"){
						that.$message.success("图片替换成功");
					}else{
						that.$message.error("图片替换失败");
					}
				}).catch(err => {
					that.$message.error(error);
				});
			}
		}
	}
</script>