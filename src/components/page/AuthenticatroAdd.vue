<template>
	<div class="authentication">
		<div class="container" style="min-height: 1000px;">
			<el-form :inline="true" :rules="rules" ref="form" :model="form">
				<!--基本信息-->
				<div class="inforTitle">
					<h2>基本信息</h2>
				</div>
				<h3 v-if="regisertInf">注册信息</h3>
				<!-- 创业者、投资人、合伙人的注册信息 -->
				<div class="form-box basic width110" v-if="Reginformation">
					<el-form-item prop="name" label="姓名：">
						{{form.name}}
					</el-form-item>
					<el-form-item prop="cellphone" label="手机：">
						{{form.cellphone}}
					</el-form-item>
					<el-form-item prop="gender" label="性别：">
						{{form.gender}}
					</el-form-item>
					<el-form-item prop="wechat" label="微信号：">
						{{form.wechat}}
					</el-form-item>
					<el-form-item prop="nationality" label="国籍：">
						{{form.nationality}}
					</el-form-item>
					<el-form-item prop="email" label="邮箱：">
						{{form.email}}
					</el-form-item>
					<el-form-item prop="nation" label="民族：">
						{{form.nation}}
					</el-form-item>
					<el-form-item prop="idType" label="证件类型：">
						{{form.idType}}
					</el-form-item>
					<el-form-item prop="maritalStatus" label="婚姻状况：">
						{{form.maritalStatus}}
					</el-form-item>
					<el-form-item prop="idTypeNumber" label="证件号：">
						{{form.idTypeNumber}}
					</el-form-item>
				</div>
				<!-- 创业者、投资人、合伙人的教育信息  -->
				<h3 v-if="Eduinformation">教育信息</h3>
				<div v-if="Eduinformation" class="form-box width80">
					<el-form-item label="最高学历：" class="hiEducation width110" prop="education" align="center" style="width:1000px">
						{{form.education}}
					</el-form-item>
					<el-form-item prop="school" label="学校：">
						{{form.school}}
					</el-form-item>
					<el-form-item prop="professional" label="专业：">
						{{form.professional}}
					</el-form-item>
					<el-form-item prop="graduationDate" label="毕业时间：">
						{{form.graduationDate}}
					</el-form-item>
				</div>
				<!-- 创业者、投资人、合伙人 的工作信息 -->
				<h3 v-if="Workinformation">工作信息</h3>
				<div v-if="Workinformation" class="form-box basic width110 border-bottom">
					<el-form-item prop="work" label="单位：">
						{{form.work}}
					</el-form-item>
					<el-form-item prop="duty" label="职务：">
						{{form.duty}}
					</el-form-item>
					<el-form-item prop="rank" label="职级：">
						{{form.rank}}
					</el-form-item>
					<el-form-item prop="city" label="所在地区： ">
						{{form.city}}
					</el-form-item>
					<el-form-item prop="workbackground" label="工作经历： ">
						{{form.workbackground}}
					</el-form-item>
				</div>

				<!-- FA注册信息 -->
				<div class="form-box basic width110" v-if="FAReginformation">
					<el-form-item prop="CorporateName" label="公司名称：">
						{{form.CorporateName}}
					</el-form-item>
					<el-form-item prop="operationAddress" label="运营地址：">
						{{form.operationAddress}}
					</el-form-item>
				</div>
				<!-- 基金管理公司注册信息 -->
				<div class="form-box basic width110" v-if="FundReginformation">
					<el-form-item prop="CorporateName" label="公司名称：">
						{{form.CorporateName}}
					</el-form-item>
					<el-form-item prop="operationAddress" label="运营地址：">
						{{form.operationAddress}}
					</el-form-item>
					<el-form-item prop="Fundmanagementscale" label="基金管理规模：">
						{{form.Fundmanagementscale}}
					</el-form-item>
					<el-form-item prop="TeamIntroduction" label="团队介绍：">
						{{form.TeamIntroduction}}
					</el-form-item>
				</div>
				<!-- 投资机构注册信息 -->
				<div class="form-box basic width110" v-if="InvestReginformation">
					<el-form-item prop="CorporateName" label="公司名称：">
						{{form.CorporateName}}
					</el-form-item>
					<el-form-item prop="operationAddress" label="运营地址：">
						{{form.operationAddress}}
					</el-form-item>
					<el-form-item prop="Investmanagementscale" label="公司规模：">
						{{form.Investmanagementscale}}
					</el-form-item>
					<el-form-item prop="TeamIntroduction" label="团队介绍：">
						{{form.TeamIntroduction}}
					</el-form-item>
				</div>
				<h3 v-if="RegterInformation">注册联系人</h3>
				<!-- FA、基金管理公司、投资机构 的注册联系人-->
				<div class="form-box basic width110  border-bottom" v-if="RegterInformation">
					<el-form-item prop="name" label="姓名：">
						{{form.name}}
					</el-form-item>
					<el-form-item prop="cellphone" label="手机：">
						{{form.cellphone}}
					</el-form-item>
					<el-form-item prop="wechat" label="微信号：">
						{{form.wechat}}
					</el-form-item>
					<el-form-item prop="email" label="邮箱：">
						{{form.email}}
					</el-form-item>
					<el-form-item prop="post" label="职务：">
						{{form.post}}
					</el-form-item>
				</div>

				<!-- 政府单位注册信息 -->
				<div class="form-box basic width110" v-if="GovReginformation">
					<el-form-item prop="govUnitName" label="单位名称：">
						{{form.govUnitName}}
					</el-form-item>
					<el-form-item prop="govUnitAddress" label="所在地区：">
						{{form.govUnitAddress}}
					</el-form-item>
					<el-form-item prop="Jurisdiction" label="管辖范围：">
						{{form.Jurisdiction}}
					</el-form-item>
				</div>
				<h3 v-if="GovRegerinformation">注册联系人</h3>
				<!-- 政府单位注册联系人 -->
				<div class="form-box basic width110 border-bottom" v-if="GovRegerinformation">
					<el-form-item prop="name" label="姓名：">
						{{form.name}}
					</el-form-item>
					<el-form-item prop="department" label="部门：">
						{{form.department}}
					</el-form-item>
					<el-form-item prop="post" label="职务：">
						{{form.post}}
					</el-form-item>
					<el-form-item prop="cellphone" label="电话：">
						{{form.cellphone}}
					</el-form-item>
					<el-form-item prop="wechat" label="微信：">
						{{form.wechat}}
					</el-form-item>
					<el-form-item prop="email" label="邮箱：">
						{{form.email}}
					</el-form-item>
				</div>

				<h3 v-if="Tourist">联络信息</h3>
				<!-- 游客联络信息 -->
				<div class="form-box basic width110 border-bottom" v-if="Tourist">
					<el-form-item prop="identity" label="身份：">
						{{form.identity}}
					</el-form-item>
					<el-form-item prop="cellphone" label="电话：">
						{{form.cellphone}}
					</el-form-item>
					<el-form-item prop="wechat" label="微信号：">
						{{form.wechat}}
					</el-form-item>
					<el-form-item prop="email" label="邮箱：">
						{{form.email}}
					</el-form-item>
					<el-form-item prop="tourAddress" label="所在地区：">
						{{form.tourAddress}}
					</el-form-item>
				</div>

				<!--特征信息-->
				<div class="inforTitle">
					<h2>特征信息</h2>
				</div>
				<!--如果角色选择为创业者，则显示-->
				<div class="ESTP" v-if="ESTP">
					<h3>创业履历</h3>
					<div class="form-box basic width150">
						<el-form-item label="是否为首次创业：" prop="firstBusiness">
							{{form.firstBusiness}}
						</el-form-item>
						<el-form-item v-if="form.firstBusiness=='否' " label="创业经历与成果： " prop="achievement">
							{{form.achievement}}
						</el-form-item>
						<el-form-item label="工作经历： " prop="businessbackground">
							{{form.businessbackground}}
						</el-form-item>
					</div>
					<h3>当前创业情况</h3>
					<div class="form-box basic">
						<el-form-item label="创业领域：" prop="entrepreneurship">
							{{form.entrepreneurship}}
						</el-form-item>
						<el-form-item label="创业目标： " prop="AnnualRevenue" class="reset-input">
							<div class="target">
								每年营收：
								{{form.AnnualRevenue}}
							</div>
							<div class="target">
								融资规模：
								{{form.financingScale}}
							</div>
							<div class="target">
								客户规模：
								{{form.customerSize}}
							</div>
							<div class="target">
								企业规模：
								{{form.scale}}
							</div>
							<div class="target">
								其他：
								{{form.targetElse}}
							</div>
						</el-form-item>
						<el-form-item label="创业项目概述： " prop="summarize">
							{{form.summarize}}
						</el-form-item>
						<el-form-item label="创业性成果： " prop="CGAnnualRevenue" class="reset-input">
							<div class="target">
								每年营收：
								{{form.CGAnnualRevenue}}
							</div>
							<div class="target">
								融资规模：
								{{form.CGfinancingScale}}
							</div>
							<div class="target">
								客户规模：
								{{form.CGcustomerSize}}
							</div>
						</el-form-item>
					</div>
					<h3>意见诉求</h3>
					<div class="form-box basic width110 border-bottom">
						<el-form-item label="资源需求：" prop="resourceNeeds">
							{{form.resourceNeeds}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为投资人，则显示-->
				<div class="investor" v-if="investor">
					<h3>投资背景</h3>
					<div class="form-box basic width150">
						<el-form-item label="个人金融资产：" prop="financialAssets" style="width: 100%;">
							{{form.financialAssets}}
							{{form.entrepreneurship}}
						</el-form-item>
					</div>
					<h3>投资经历</h3>
					<div class="form-box basic width150">
						<el-form-item prop="PastInvestments" label="过往投资项目：">
							{{form.PastInvestments}}
						</el-form-item>
						<el-form-item prop="CastConditionAfter" label="投后情况：">
							{{form.CastConditionAfter}}
						</el-form-item>
					</div>
					<h3>投资倾向</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="fieldInvestment" label="投资领域：">
							{{form.fieldInvestment}}
						</el-form-item>
						<el-form-item prop="investmentStage" label="投资阶段：">
							{{form.investmentStage}}
						</el-form-item>
						<el-form-item prop="otherPreferences" label="其他喜好：">
							{{form.otherPreferences}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为FA机构，则显示-->
				<div class="FAInstitution" v-if="FAInstitution">
					<h3>业务</h3>
					<div class="form-box basic width150">
						<el-form-item prop="businessDirection" label="业务方向：">
							{{form.businessDirection}}
						</el-form-item>
						<el-form-item prop="coveringDomain" label="覆盖领域：">
							{{form.coveringDomain}}
						</el-form-item>
						<el-form-item prop="clientType" label="客户类型：">
							{{form.clientType}}
						</el-form-item>
						<el-form-item prop="FAinvestmentStage" label="业务特色：">
							{{form.FAinvestmentStage}}
						</el-form-item>
						<el-form-item prop="onlinePlatform" label="有无线上对接平台：">
							{{form.onlinePlatform}}
						</el-form-item>
					</div>
					<h3>成果资质</h3>
					<div class="form-box basic width150">
						<el-form-item prop="typicalCase" label="典型案例：">
							{{form.typicalCase}}
						</el-form-item>
						<el-form-item prop="LicenceQualification" label="牌照资质：">
							{{form.LicenceQualification}}
						</el-form-item>
						<el-form-item prop="partner" label="合作伙伴：">
							{{form.partner}}
						</el-form-item>
					</div>
					<h3>诉求调研</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="fundType" label="基金类型：">
							{{form.fundType}}
						</el-form-item>
						<el-form-item prop="FundPhase" label="基金阶段：">
							{{form.FundPhase}}
						</el-form-item>
						<el-form-item prop="businessDirections" label="业务发展方向：">
							{{form.businessDirections}}
						</el-form-item>
						<el-form-item prop="CustomerDirection" label="客户发展方向：">
							{{form.CustomerDirection}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为合伙人，则显示-->
				<div class="Partner" v-if="Partner">
					<h3>类别</h3>
					<div class="form-box basic width150">
						<el-form-item prop="NaturePartner" label="合伙人性质：">
							{{form.NaturePartner}}
						</el-form-item>
						<el-form-item prop="PartnershipMode" label="合伙人方式：">
							{{form.PartnershipMode}}
						</el-form-item>
					</div>
					<h3>资源圈</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="fieldExpertise" label="擅长领域：">
							{{form.fieldExpertise}}
						</el-form-item>
						<el-form-item prop="property" label="属性：">
							{{form.property}}
						</el-form-item>
						<el-form-item prop="territory" label="地域：">
							{{form.territory}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为基金管理公司，则显示-->
				<div class="fundcompany" v-if="fundcompany">
					<h3>业务</h3>
					<div class="form-box basic width150">
						<el-form-item prop="MainGundType" label="主营基金类型：">
							{{form.MainGundType}}
						</el-form-item>
						<el-form-item prop="CFundPhase" label="基金阶段：">
							{{form.CFundPhase}}
						</el-form-item>
						<el-form-item prop="CfieldExpertise" label="覆盖领域：">
							{{form.CfieldExpertise}}
						</el-form-item>
						<el-form-item prop="Functerritory" label="在管基金：">
							{{form.Functerritory}}
						</el-form-item>
						<el-form-item prop="CinvestmentStage" label="业务特色：">
							{{form.CinvestmentStage}}
						</el-form-item>
						<el-form-item prop="onlinePlatform" label="有无线上对接平台：">
							{{form.onlinePlatform}}
						</el-form-item>
					</div>
					<h3>成果资质</h3>
					<div class="form-box basic width150">
						<el-form-item prop="TypicalExitCase" label="典型退出案例：">
							{{form.TypicalExitCase}}
						</el-form-item>
						<el-form-item prop="LicenceQualification" label="牌照资质：">
							{{form.LicenceQualification}}
						</el-form-item>
						<el-form-item prop="partner" label="合作伙伴：">
							{{form.partner}}
						</el-form-item>
					</div>
					<h3>诉求调研</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="fundType" label="基金类型：">
							{{form.fundType}}
						</el-form-item>
						<el-form-item prop="CfieldInvestment" label="投资领域：">
							{{form.CfieldInvestment}}
						</el-form-item>
						<el-form-item prop="Fundother" label="其它：">
							{{form.Fundother}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为投资机构，则显示-->
				<div class="InvestmentInstitution" v-if="InvestmentInstitution">
					<h3>业务</h3>
					<div class="form-box basic width150">
						<el-form-item prop="InvestmentDirection" label="投资方向：">
							{{form.InvestmentDirection}}
						</el-form-item>
						<el-form-item prop="IfieldInvestment" label="投资领域：">
							{{form.IfieldInvestment}}
						</el-form-item>
						<el-form-item prop="IinvestmentStage" label="业务特色：">
							{{form.IinvestmentStage}}
						</el-form-item>
						<el-form-item prop="onlinePlatform" label="有无线上对接平台：">
							{{form.onlinePlatform}}
						</el-form-item>
					</div>
					<h3>成果资质</h3>
					<div class="form-box basic width150">
						<el-form-item prop="LicenceQualification" label="牌照资质：">
							{{form.LicenceQualification}}
						</el-form-item>
						<el-form-item prop="TypicalExitCase" label="典型退出案例：">
							{{form.TypicalExitCase}}
						</el-form-item>
						<el-form-item prop="partner" label="合作伙伴：">
							{{form.partner}}
						</el-form-item>
					</div>
					<h3>投资诉求</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="ISInvestmentDirection" label="投资方向：">
							{{form.ISInvestmentDirection}}
						</el-form-item>
						<el-form-item prop="ISfieldInvestment" label="投资领域：">
							{{form.ISfieldInvestment}}
						</el-form-item>
						<el-form-item prop="Isother" label="其它：">
							{{form.Isother}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为政府，则显示-->
				<div class="government" v-if="government">
					<h3>政府资源</h3>
					<div class="form-box basic width150">
						<el-form-item prop="provideResources" label="提供资源：">
							{{form.provideResources}}
						</el-form-item>
						<el-form-item prop="ReferPolicy" label="参考政策：">
							{{form.ReferPolicy}}
						</el-form-item>
					</div>
					<h3>需求调研</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="introductionType" label="引进类型：">
							{{form.introductionType}}
						</el-form-item>
						<el-form-item prop="IntroductionTarget" label="引进目标：">
							{{form.IntroductionTarget}}
						</el-form-item>
						<el-form-item prop="DemandConditions" label="要求条件：">
							{{form.DemandConditions}}
						</el-form-item>
					</div>
				</div>

				<!--如果角色选择为游客，则显示-->
				<div class="visitor" v-if="visitor">
					<h3>浏览喜好</h3>
					<div class="form-box basic width150">
						<el-form-item prop="vocation" label="行业：">
							{{form.vocation}}
						</el-form-item>
						<el-form-item prop="direction" label="方向：">
							{{form.direction}}
						</el-form-item>
					</div>
					<h3>浏览目标</h3>
					<div class="form-box basic width150 border-bottom">
						<el-form-item prop="appeal" label="诉求：">
							{{form.appeal}}
						</el-form-item>
					</div>
				</div>

				<!--增值服务-->
				<div class="inforTitle">
					<h2>增值服务</h2>
				</div>
				<h3>免费报告</h3>
				<div class="form-box basic width110 border-bottom">
					<el-form-item label="类型：" prop="FreeReport">
						{{form.freeReport}}
					</el-form-item>
					<el-form-item label="语言：" prop="language">
						{{form.language}}
					</el-form-item>
					<el-form-item label="同步接收邮箱： " prop="receiveEmail">
						{{form.receiveEmail}}
					</el-form-item>
				</div>
				<!--附件-->
				<div class="inforTitle" v-if="Enclosure">
					<h2>附件</h2>
				</div>
				<h3 v-if="Enclosure">{{EnclosureText}}</h3>
				<div class="form-box basic width110 border-bottom" v-if="Enclosure">
					<el-form-item label="附件上传： ">
					</el-form-item>
				</div>
			
			</el-form>
		</div>

	</div>
</template>

<script scope>
export default {
	props:{
    lookAddCen: { type: Object, required: false, default: null }
},
  data () {
    // 手机号验证
    var cellphoneReg = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      RoleId: this.$route.query.roleId,
      Phone: this.$route.query.phone,
      userType: '',
      form: {},
      Enclosure: true, // 附件
      Submit: true, // 点击提交后事件按钮隐藏
      EnclosureText: '项目成果性展示',
      ESTP: false, // 创业者 1
      investor: false, // 投资人 2
      FAInstitution: false, // FA机构 3
      Partner: false, // 合伙人 4
      fundcompany: false, // 基金管理公司 5
      InvestmentInstitution: false, // 投资机构 6
      government: false, // 政府 7
      visitor: false, // 游客 8
      regisertInf: true, // 注册信息title
      Reginformation: false, // 创业者、投资人、合伙人的注册信息
      Eduinformation: false, // 创业者、投资人、合伙人的教育信息
      Workinformation: false, // 创业者、投资人、合伙人 的工作信息
      FAReginformation: false, // FA注册信息
      FundReginformation: false, // 基金管理公司注册信息
      InvestReginformation: false, // 投资机构注册信息
      RegterInformation: false, // FA、基金管理公司、投资机构的注册联系人
      GovReginformation: false, // 政府单位注册信息
      GovRegerinformation: false, // 政府单位注册联系人
      Tourist: false, // 游客联络信息
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 10,
          message: '长度在 2 到 10 个字符',
          trigger: 'blur'
        }
        ],
        cellphone: [{
          required: true,
          trigger: 'blur',
          validator: cellphoneReg
        },
        {
          type: 'number',
          message: '手机号格式不正确'
        }

        ],
        gender: [{
          required: true,
          message: '请输入性别',
          trigger: 'change'
        }],
        wechat: [{
          required: true,
          message: '请输入微信号',
          trigger: 'blur'
        }],
        nationality: [{
          required: true,
          message: '请输入国籍',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        },
        {
          type: 'email',
          required: true,
          message: '邮箱格式不正确',
          trigger: 'blur'
        }
        ],
        idType: [{
          required: true,
          message: '请选择证件类型',
          trigger: 'change'
        }],
        idTypeNumber: [{
          required: true,
          message: '请输入证件号',
          trigger: 'blur'
        }],
        education: [{
          required: true,
          message: '请选择最高学历',
          trigger: 'change'
        }],
        school: [{
          required: true,
          message: '请输入学校',
          trigger: 'blur'
        }],
        professional: [{
          required: true,
          message: '请输入专业',
          trigger: 'blur'
        }],
        graduationDate: [{
          required: true,
          message: '请选择毕业日期',
          trigger: 'blur'
        }],
        work: [{
          required: true,
          message: '请输入单位名称',
          trigger: 'blur'
        }],
        duty: [{
          required: true,
          message: '请输入职务',
          trigger: 'blur'
        }],
        rank: [{
          required: true,
          message: '请选择职级',
          trigger: 'change'
        }],
        city: [{
          required: true,
          message: '请输入所在地区',
          trigger: 'blur'
        }],
        firstBusiness: [{
          required: true,
          message: '请选择是否为首次创业',
          trigger: 'change'
        }],
        achievement: [{
          required: true,
          message: '请输入创业经历与成果',
          trigger: 'blur'
        }],
        entrepreneurship: [{
          required: true,
          message: '请选择创业领域',
          trigger: 'change'
        }],
        AnnualRevenue: [{
          required: true,
          message: '请输入每年营收',
          trigger: 'blur'
        }],
        financingScale: [{
          required: true,
          message: '请输入融资规模',
          trigger: 'blur'
        }],
        customerSize: [{
          required: true,
          message: '请输入客户规模',
          trigger: 'blur'
        }],
        scale: [{
          required: true,
          message: '请输入企业规模',
          trigger: 'blur'
        }],
        targetElse: [{
          required: true,
          message: '请输入其他',
          trigger: 'blur'
        }],
        summarize: [{
          required: true,
          message: '请输入创业项目概述',
          trigger: 'blur'
        }],
        CGAnnualRevenue: [{
          required: true,
          message: '请输入每年营收',
          trigger: 'blur'
        }],
        CGfinancingScale: [{
          required: true,
          message: '请输入融资规模',
          trigger: 'blur'
        }],
        CGcustomerSize: [{
          required: true,
          message: '请输入客户规模',
          trigger: 'blur'
        }],
        resourceNeeds: [{
          required: true,
          message: '请选择资源需求',
          trigger: 'change'
        }],
        // 投资人需要必选的字段
        financialAssets: [{
          required: true,
          message: '请选择个人金融资产',
          trigger: 'change'
        }],
        PastInvestments: [{
          required: true,
          message: '请输入过往投资项目',
          trigger: 'blur'
        }],
        CastConditionAfter: [{
          required: true,
          message: '请输入投后情况',
          trigger: 'blur'
        }],
        fieldInvestment: [{
          required: true,
          message: '请选择投资领域',
          trigger: 'change'
        }],
        investmentStage: [{
          required: true,
          message: '请选择投资阶段',
          trigger: 'change'
        }],
        // FA
        CorporateName: [{
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        }],
        operationAddress: [{
          required: true,
          message: '请输入运营地址',
          trigger: 'blur'
        }],
        post: [{
          required: true,
          message: '请输入职务',
          trigger: 'blur'
        }],
        businessDirection: [{
          required: true,
          message: '请选择业务方向',
          trigger: 'change'
        }],
        coveringDomain: [{
          required: true,
          message: '请选择覆盖领域',
          trigger: 'change'
        }],
        clientType: [{
          required: true,
          message: '请选择客户类型',
          trigger: 'change'
        }],
        FAinvestmentStage: [{
          required: true,
          message: '请选择业务特色',
          trigger: 'blur'
        }],
        onlinePlatform: [{
          required: true,
          message: '请选择线上对接平台',
          trigger: 'change'
        }],
        LicenceQualification: [{
          required: true,
          message: '请输入牌照资质',
          trigger: 'blur'
        }],
        fundType: [{
          required: true,
          message: '请选择基金类型',
          trigger: 'change'
        }],
        FundPhase: [{
          required: true,
          message: '请选择基金阶段',
          trigger: 'change'
        }],
        businessDirections: [{
          required: true,
          message: '请选择业务发展方向',
          trigger: 'change'
        }],
        CustomerDirection: [{
          required: true,
          message: '请选择客户发展方向',
          trigger: 'change'
        }],
        // 合伙人
        NaturePartner: [{
          required: true,
          message: '请选择合伙人性质',
          trigger: 'change'
        }],
        PartnershipMode: [{
          required: true,
          message: '请选择合伙人方式',
          trigger: 'change'
        }],
        fieldExpertise: [{
          required: true,
          message: '请选择擅长领域',
          trigger: 'change'
        }],
        property: [{
          required: true,
          message: '请选择属性',
          trigger: 'change'
        }],
        territory: [{
          required: true,
          message: '请输入地域',
          trigger: 'blur'
        }],
        // 基金管理公司
        // CorporateName:[{
        // 	required: true,
        // 	message: '请输入公司名称',
        // 	trigger: 'blur'
        // }],
        // operationAddress:[{
        // 	required: true,
        // 	message: '请输入运营地址',
        // 	trigger: 'blur'
        // }],
        Fundmanagementscale: [{
          required: true,
          message: '请输入基金管理规模',
          trigger: 'blur'
        }],
        // TeamIntroduction:[{
        // 	required: true,
        // 	message: '请输入团队介绍',
        // 	trigger: 'blur'
        // }],
        MainGundType: [{
          required: true,
          message: '请选择主营基金类型',
          trigger: 'change'
        }],
        CFundPhase: [{
          required: true,
          message: '请选择基金阶段',
          trigger: 'change'
        }],
        CfieldExpertise: [{
          required: true,
          message: '请选择覆盖领域',
          trigger: 'change'
        }],
        Functerritory: [{
          required: true,
          message: '请输入在管基金',
          trigger: 'blur'
        }],
        CinvestmentStage: [{
          required: true,
          message: '请输入业务特色',
          trigger: 'blur'
        }],
        CfieldInvestment: [{
          required: true,
          message: '请选择投资领域',
          trigger: 'change'
        }],
        Fundother: [{
          required: true,
          message: '请输入其他',
          trigger: 'blur'
        }],
        // 投资机构
        Investmanagementscale: [{
          required: true,
          message: '请输入公司规模',
          trigger: 'blur'
        }],
        InvestmentDirection: [{
          required: true,
          message: '请选择投资方向',
          trigger: 'change'
        }],
        IfieldInvestment: [{
          required: true,
          message: '请选择投资领域',
          trigger: 'change'
        }],
        IinvestmentStage: [{
          required: true,
          message: '请输入业务特色',
          trigger: 'blur'
        }],
        ISInvestmentDirection: [{
          required: true,
          message: '请选择投资方向',
          trigger: 'change'
        }],
        ISfieldInvestment: [{
          required: true,
          message: '请选择投资领域',
          trigger: 'change'
        }],
        Isother: [{
          required: true,
          message: '请输入其他',
          trigger: 'blur'
        }],
        // 政府单位
        govUnitName: [{
          required: true,
          message: '请输入单位名称',
          trigger: 'blur'
        }],
        govUnitAddress: [{
          required: true,
          message: '请输入所在地区',
          trigger: 'blur'
        }],
        Jurisdiction: [{
          required: true,
          message: '请输入管辖范围',
          trigger: 'blur'
        }],

        department: [{
          required: true,
          message: '请输入部门',
          trigger: 'blur'
        }],
        provideResources: [{
          required: true,
          message: '请输入提供的资源',
          trigger: 'blur'
        }],
        introductionType: [{
          required: true,
          message: '请选择引进类型',
          trigger: 'change'
        }],
        IntroductionTarget: [{
          required: true,
          message: '请选择引进目标',
          trigger: 'change'
        }],
        DemandConditions: [{
          required: true,
          message: '请选择要求条件',
          trigger: 'change'
        }],
        // 游客信息
        identity: [{
          required: true,
          message: '请输入身份信息',
          trigger: 'blur'
        }],
        tourAddress: [{
          required: true,
          message: '请输入所在地区',
          trigger: 'blur'
        }],
        vocation: [{
          required: true,
          message: '请选择行业',
          trigger: 'change'
        }],
        direction: [{
          required: true,
          message: '请选择方向',
          trigger: 'change'
        }],
        appeal: [{
          required: true,
          message: '请选择诉求',
          trigger: 'change'
        }]
      }
    }
  },
  created () {
    this.getUserType(this.lookAddCen) 
  },
  methods: {
    getUserType(value) {
			var that = this
			that.form = value
      if (value.collectionId == 1) {
        that.UserType = '创业者'
        that.ESTP = true // 创业者 1
        that.Reginformation = true// 创业者、投资人、合伙人的注册信息
        that.Eduinformation = true// 创业者、投资人、合伙人的教育信息
        that.Workinformation = true// 创业者、投资人、合伙人的工作信息
      } else if (value.collectionId == 2) {
        that.UserType = '投资人'
        that.investor = true// 特征信息
        that.Enclosure = false// 附件
        that.Reginformation = true// 创业者、投资人、合伙人的注册信息
        that.Eduinformation = true// 创业者、投资人、合伙人的教育信息
        that.Workinformation = true// 创业者、投资人、合伙人的工作信息
      } else if (value.collectionId == 3) {
        that.FAInstitution = true// 特征信息
        that.FAReginformation = true// FA注册信息
        that.RegterInformation = true// FA、基金管理公司、投资机构 的注册联系人
        that.EnclosureText = '相关资质证明'
        that.UserType = 'FA机构'
      } else if (value.collectionId == 4) {
        that.Partner = true
        that.Enclosure = false// 附件
        that.Reginformation = true// 创业者、投资人、合伙人的注册信息
        that.Eduinformation = true// 创业者、投资人、合伙人的教育信息
        that.Workinformation = true// 创业者、投资人、合伙人的工作信息
        that.UserType = '合伙人'
      } else if (value.collectionId == 5) {
        that.fundcompany = true
        that.FundReginformation = true// 基金管理公司注册信息
        that.RegterInformation = true// FA、基金管理公司、投资机构 的注册联系人
        that.EnclosureText = '相关资质证明'
        that.UserType = '基金管理公司'
      } else if (value.collectionId == 6) {
        that.InvestmentInstitution = true
        that.InvestReginformation = true// 基金管理公司注册信息
        that.RegterInformation = true// FA、基金管理公司、投资机构 的注册联系人
        that.EnclosureText = '相关资质证明'
        that.UserType = '投资机构'
      } else if (value.collectionId == 7) {
        that.UserType = '政府'
        that.GovReginformation = true// 政府单位的注册信息
        that.GovRegerinformation = true// 政府单位的注册联系人
        that.EnclosureText = '相关政策文件'
        that.government = true
      } else {
        that.regisertInf = false
        that.Tourist = true
        that.visitor = true
        that.Enclosure = false// 附件
        that.UserType = '游客'
      }
    },
  }
}
</script>
<!--Element-ui重置样式-->
<style>
	.el-input--small .el-input__inner {
		height: 44px;
		line-height: 44px;
	}

	.el-form-item--small .el-form-item__content,
	.el-form-item--small .el-form-item__label {
		line-height: 44px;
	}

	.width80 .el-form-item__label {
		width: 80px;
	}

	.width110 .el-form-item__label {
		width: 110px;
	}

	.width150 .el-form-item__label {
		width: 150px;
	}

	.form-box .el-input__inner {
		width: 240px;
	}

	.basic .el-form-item {
		margin-right: 50px;
	}

	.hiEducation .el-radio__label {
		font-size: 16px;
	}

	.hiEducation .el-form-item__label {
		font-size: 16px;
	}

	.basic .el-textarea__inner {
		width: 674px;
		height: 150px;
	}

	.form-box .reset-input .el-input__inner {
		width: 140px;
	}

	.reset-input .el-input {
		width: 140px;
	}

	.reset-input .el-form-item__content {
		width: 700px;
	}

	.authentication .el-button--small {
		padding: 14px 117px;
		margin: 10px auto 60px;
		display: block;
		font-size: 16px;
	}

	.authentication .el-button--primary {
		background-color: #0546B4;
		border-color: #0546B4;
	}

	.multiInput {
		margin-right: 10px !important;
	}

	.multiInput .el-form-item__label {
		width: 110px !important;
		font-size: 14px;
		font-weight: normal;
	}
</style>
<!--页面样式-->
<style scoped>
	.border-bottom {
		border-bottom: none !important;
	}

	.container {
		width: 1000px;
	}

	.headerBg {
		background: #fff;
		box-shadow: 0 3px 11px 0 rgba(51, 51, 51, 0.50);
	}

	.back {
		float: right;
		line-height: 55px;
		color: #0546B4;
		font-size: 18px;
	}

	.information {
		margin-top: 135px;
		margin-bottom: 44px;
	}

	.user {
		display: flex;
		margin-bottom: 30px;
	}

	.user img {
		width: 70px;
		height: 70px;
		margin-right: 20px;
	}

	.user p {
		line-height: 70px;
		font-size: 20px;
	}

	.information h2 {
		font-size: 26px;
		display: inline-block;
	}

	.information span {
		font-size: 16px;
		margin-left: 20px;
	}

	.inforTitle {
		width: 1000px;
		border-bottom: 1px solid #D8D8D8;
		height: 38px;
	}

	.inforTitle h2 {
		font-size: 20px;
		line-height: 38px;
		font-weight: 700;
	}

	.authentication .container .basic {
		padding: 0 0 10px 110px;
	}

	.authentication .container .form-box {
		width: 1000px;
		box-sizing: border-box;
		border-bottom: 1px dashed #ccc;
	}

	.authentication .container h3 {
		font-size: 16px;
		color: #333;
		margin: 40px 0 20px 70px;
	}

	label {
		font-weight: normal;
	}

	h3 {
		font-weight: 700;
	}

	.basic form {
		margin-left: 130px;
	}

	.target {
		display: inline-block;
		position: relative;
		margin-right: 16px;
		margin-bottom: 10px;
	}

	.target span {
		position: absolute;
		right: 10px;
	}

	.reset-input .target:nth-child(5) {
		padding-left: 29px;
	}

	.authentication .container .basic p {
		display: inline-block;
		height: 44px;
		line-height: 44px;
		width: 118px;
		text-align: right;
		font-weight: 700;
		color: #606266
	}
</style>
