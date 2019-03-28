<template>
	<el-row>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>媒体中心</el-breadcrumb-item>
				<el-breadcrumb-item>修改媒体视频</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<!--banner图修改-->
			<div class="plugins-tips">
				修改媒体视频
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item prop="name" label="视频名称">
					<el-input v-model="form.name" placeholder="业务名称长度不能超过20汉字"></el-input>
				</el-form-item>
				<el-upload class="upload-demo" :before-upload="beforeupload"  drag action="https://jsonplaceholder.typicode.com/posts/" style="margin-left:80px;">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<!--<div class="el-upload__tip" slot="tip" style="margin-bottom: 10px;">只能上传jpg/png文件，且不超过100KB，尺寸为150*150</div>-->
						</el-upload>
				<el-form-item>
						<el-button type="primary" @click="onSubmit('form')">保存</el-button>
						<el-button @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

	</el-row>

</template>

<script>
	export default {
		data() {
			return {
				form: { //form里面的参数
					name: ''
				},
				param: "", //表单要提交的参数
				src: "", //展示图片的地址
				token: sessionStorage.getItem('token')
			};
		},
		created() {
//      	console.log(JSON.parse(sessionStorage.getItem('listData')))
			
        },
		methods: {
			beforeRemove(file, fileList) {
				//return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//阻止upload的自己上传，进行再操作
			beforeupload(file) {
				console.log(file);
				//创建临时的路径来展示图片
				var windowURL = window.URL || window.webkitURL;

				this.src = windowURL.createObjectURL(file);
				//重新写一个表单上传的方法
				this.param = new FormData();
				this.param.append('file', file, file.name);
				return false;
			},
			//覆盖默认的上传行为
			httprequest() {

			},
			//重置
			resetForm(){
				this.form = {},
				this.param = '',
				this.src = ''
			},
			onSubmit() { //表单提交的事件
				var that = this;
				console.log(that.src)
				//下面append的东西就会到form表单数据的fields中；
				var Data = {
					mediaName : that.form.name,
					filePath : that.src,
					mediaId : JSON.parse(sessionStorage.getItem('listData')).mediaId
				}
				console.log(Data)
//				this.param.append('message', names);/
				//然后通过下面的方式把内容通过axios来传到后台
				//下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
				that.$request.post("/media/update",Data,that.token).then(function(result){
					console.log(result);
					
					if(result.data.success === '媒体更新成功'){
							that.$router.push('/VideoList')
						}else{
							that.$message.error('媒体更新失败');
						}
					
					
				})
//				this.$request.post("media/add").then(function(result) {
//					console.log(result);
//				})
//				              this.$reqs.post("file/vedio/upload", this.param, config).then(function(result) {
//				                  console.log(result);
//				              })
			}
		}
	}
</script>