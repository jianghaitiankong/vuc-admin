<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i>联系我们</el-breadcrumb-item>
				<el-breadcrumb-item>修改基地</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box" style="position: relative;">
				<el-form ref="form" :model="form" label-width="80px" :rules="rules">
					<div id="upload">
						<label class="el-form-item__label" style="width: 80px;">上传图片</label>
						<el-upload class="upload-demo"  :before-upload="beforeupload" drag action="" style="margin-left:80px;">
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
					<el-form-item prop="contactHQ" label="基地总部">
						<el-input v-model="form.contactHQ" name="names" style="width:360px;"></el-input>
					</el-form-item>
					<el-form-item prop="contactAddress" label="基地地址">
						<el-input v-model="form.contactAddress"></el-input>
					</el-form-item>
					<el-form-item prop="contactUser" label="联系人" >
						<el-input v-model="form.contactUser"></el-input>
					</el-form-item>
					<el-form-item prop="contactPhone" label="手机" >
						<el-input v-model="form.contactPhone" maxlength="11"></el-input>
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
    // var cellphoneReg = (rule, value, callback) => {
    //   if (!/^1[34578]\d{9}$/.test(value)) {
		// 		console.log(22222222)
    //     callback(new Error("请输入正确的手机号"));
    //   }
    // };
    return {
      form: {},
      param: "", //表单要提交的参数
      src: "", //展示图片的地址
      token: sessionStorage.getItem("token"),
      rules: {
        contactHQ: [
          {
            required: true,
            message: "请填写基地总部名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "基地总部名称长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        contactAddress: [
          {
            required: true,
            message: "请填写基地地址",
            trigger: "blur"
          },
          {
            min: 2,
            max: 100,
            message: "基地地址长度在 2 到 100 个字符",
            trigger: "blur"
          }
        ],
        contactUser: [
          {
            required: true,
            message: "请填写联系人",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "联系人名字长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: '请填写手机号',
            trigger: "blur",
            // validator: cellphoneReg
					},
				
        ]
      }
    };
  },
  created(){
    this.form = JSON.parse(sessionStorage.ContactInfo) ;
    console.log(this.form)
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
    onSubmit(formName) {
			const item = JSON.parse(sessionStorage.ContactInfo);
      var that = this;
     	this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$request.imgPost("file/upload", this.param , that.token).then(function(result) {
              if (result.data.success === "文件上传成功") {
                var data = {
                  icon: result.data.filePath, //图片名字
                  contactHQ: that.form.contactHQ, //基地总部
                  contactAddress: that.form.contactAddress, //基地位置
                  contactUser: that.form.contactUser, //联系人
                  contactPhone: that.form.contactPhone, //联系电话
                  contactId : item.contactId
                };
                that.$request.post("contact/updateAllContact", data, that.token).then(res => {
                    console.log(res.data);
                    if (res.data.success == "更新成功") {
                      that.$message.success("更新成功");
                      that.$router.push("/Contact");
                    }else{
											 that.$message.error(res.data.error);
										}
                  }).catch(err => {
										console.log(error)
                    that.$message.error(error);
                  });
              }
            });
        } else {
          that.$message.error("请先填写必填项");
          return false;
        }
      });
    }
  }
};
</script>