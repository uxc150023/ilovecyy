import axios from 'axios'
import { baseUrl } from '@/config/env'
import { Loading } from 'element-ui'

/**
 * 接口地址配置
 */
let postUrl = {
    // APP_ORDER_GET_BUSINESS: 'appOrder/queryBusinessList',
    IMGURL: 'learn/imguplaod/getpic?pictureId=',
    VEDIOURL: 'learn/musicupload/get?id=',
    SMALLIMGURL: 'learn/imguplaod/smallpic?pictureId=', // 题图小图片回显地址
    UPLOAD: 'learn/imguplaod/upload',
    USER_AUTHENTICATION: 'apply/user_authentication', // 用户认证
    USER_GROUP: 'user_group', // 学群信息
    USER_FRIEND: 'user_friend',
    REGISTER: 'learn/useLogin/createUser', // 用户注册
    NOTESIMPORT: 'learn/useLogin/NoteSIMPort', // 短信验证码
    NOTESIMPORTUSERRESET: 'learn/useLogin/NoteSIMPortUserReset', // 重置密码验证码
    CREATEUSER: 'learn/useLogin/createUser', // 用户注册
    // save: 'userauthen/save', //认证
    USERLOGING: 'learn/useLogin/UserLoging', // 用户登录
    REBACKSTUNAME: 'learn/useLogin/reBackStuName', // 修改新学名
    CHANGEORGCONTACTPHONE: 'learn/useLogin/changeOrgContactPhone', // 更换手机号
    RESETPASSWN: 'learn/useLogin/resetPassWN', // 重置用户密码个人
    RESETPASSWFY: 'learn/useLogin/resetPassWFY', // 重置用户密码公司
    USERAUTHENSAVE: 'learn/userauthen/save', // 个人认证
    ORGAUTHENSAVE: 'learn/orgauthen/save', // 单位认证
    REGIONGET: 'learn/region/get', // 获取省，市，区
    USERAUTHENGET: 'learn/userauthen/get', // 个人认证信息查询
    ORGAUTHENGET: 'learn/orgauthen/get', // 单位认证信息查询接口
    IMGUPLAODUPLOAD: 'learn/imguplaod/upload', // 图片上传接口
    SUBGET: 'learn/sub/get', // 获取学科 1级 2级
    SGROUPSAVE: 'learn/sgroup/save', // 新建学群及建群时添加成员接口
    GETMYGROUP: 'learn/sgroup/getmygroup', // 根据用户ID查询已建学群及其成员
    GETGMEMS: 'learn/sgroup/getGmems', // 根据学群ID查询已建学群及其成员
    /* by new api */
    WEBSITEACLACES: 'learn/StuNet/WebSiteAcLACES', // 抢注网名
    SSTNETTEMAI: 'learn/NetPrType/SSTNetTemAi', // 获取学网模板
    SSTNETSIGST: 'learn/NetPrType/SSTNetSigSt', // 获取招牌样式信息
    SSTNETPRTYPE: 'learn/NetPrType/SSTNetPrType', // 获取建站类型信息 //站型与价格
    STUNCOURSE: 'learn/StuNet/StuNCourse', // 建站进程
    SAVECNT: 'learn/pubset/saveCnt', // 样站编辑上传
    SAVESITESAMPLE: 'learn/pubset/saveSiteSample', // 样站观摩保存
    CHECKSTUNAME: 'learn/pubset/checkStuName', // 学网名验证
    GETCNT: 'learn/pubset/getCnt', // 样站编辑获取
    USETPRTYPE: 'learn/NetPrType/USetPrtype', // 设置上传建站价格和类型
    DPRTYPE: 'learn/NetPrType/Dprtype', // 删除建站价格和类型

    WEBSITESETMAL: 'learn/StuNSite/WebSiteSeTmAl', // 获取学网配置全部信息
    WEBSITECTEMP: 'learn/StuNSite/WebSiteCTemp', // 提交需求
    CUSERECOMM: 'learn/UseRecomM/CUseRecomM', // 抢先推介
    DOWNLOAD: 'learn/sgroup/download', // 学群导入模板下载
    NEWSACDC: 'learn/Payment/NewSAcDc', // 新学网直付
    SEUSBOMA: 'learn/UseBom/SeUsBomA', // 获取用户订单价格接口
    SEAPAYNO1: 'learn/BomAging/SeAPayNo1', // 分期订单一期信息查询
    SEAPAYNO2: 'learn/BomAging/SeAPayNo2', // 分期订单二期信息查询
    NEWSACAAGINGT: 'learn/Payment/NewSAcaAgingT', // 分期2期直付
    USEPROMOTLISTAI: 'learn/UsePromoT/UseProMoTListAi', // 获取用户全部优惠情况
    PROMAUTHENCASE: 'learn/UsePromoT/ProMAuthenCase', // 获取新学界建站 用户认证
    PROMTIMONIALS: 'learn/UsePromoT/ProMtimonials', // 获取新学界推荐5位以上优惠
    PROMPRESENCASE: 'learn/UsePromoT/ProMpresenCase', // 获取推荐新学界推荐优惠
    PROMORGSUBSIDYCASE: 'learn/UsePromoT/ProMorgSubsidyCase', // 机构用户拨款补助认证
    PROMZXSTUTCASE: 'learn/UsePromoT/ProMZXStutCase', // 中小/大学生补助预支优惠接口
    INSESTUAUTHENAI: 'learn/UsePromoT/InSeStuAuthenAi', // 中小大学申请 、机构拨款补助申请
    NEWSACNOHPAY: 'learn/Payment/NewSAcNoHPay', // 新学界订单 无需支付
    WEBSITELGIVEUP: 'learn/StuNSite/WebSiteLGiveUp', // 用户是否放弃订单
    VALIDATECODE: 'learn/useLogin/validateCode', // 图形验证码
    NSNAMEDUP: 'learn/StuNSite/NSnameDup', // 机构用户新学名查重
    SAVEMENU: 'learn/stuorg/saveMenu', // 保存/更新学会栏目模块配置接口
    GETALLMENUS: 'learn/stuorg/getAllMenus', // 查询下拉框所有可选的栏目菜单
    DOWNLOAD: 'learn/orgauthen/download', // 单位认证下载

    STUORGINFO: 'learn/stuorg/info', // 查询学会信息接口
    STUORGSAVE: 'learn/stuorg/save', // 保存/更新学会信息接口
    SAVEBANNER: 'learn/stuorg/saveBanner', // 保存/更新学会对应模块Banner图配置接口
    SELEMESTEMAI: 'learn/MesAGain/SeleMesTemAi', // 学会发布消息
    /* new ui */
    SELEMESTEMAITWO: 'learn/MesAGain/SeleMesTemAiTwo', // 自家发布的消息通知
    SELEUSACTIONAI: 'learn/MesAGain/SeleUsActionAi', // 会员动静
    SELEMESOTHERTAITWO: 'learn/MesAGain/SeleMesOtherTAiTwo', // 二级学科信息通知
    SELEPROTEMAITWO: 'learn/MesAGain/SeleProTemAiTwo', // 二级学科作品
    /* end ui */
    MESSEND: 'learn/Message/MesSend', // 发送通知
    SDMESTEMAITWO: 'learn/MesAGain/SDMesTemAiTwo', // 查询/删除暂存数据
    MEMS: 'learn/stumem/mems', // 查询学会会员的信息
    PLITEUPLAOD: 'learn/proFuplaod/PLiteUplaod', // 作品上传无返回值
    JOURNALUPLOAD: 'learn/Journal/JournalUplaod', // 作品上传有返回值
    LITERATURE: 'learn/proFuplaod/Literature', // 文献上传
    SELITERHOAI: 'learn/proFuplaod/SeLiterHoAi', // 查询文献首页分页记录
    SELCLASSIFY: 'learn/proFuplaod/SeLClassify', // 查询文献共享-文献分类记录
    SELTEMLITETYPE: 'learn/proFuplaod/SeLTemLiteType', // 查询学网所有个性分类
    UPLIHOCTN: 'learn/proFuplaod/UpLiHoCTn', // 文献首页 - 修改文献分类名称
    UINSITECSTYLE: 'learn/proFuplaod/UInsiteCStyle', // 文献首页 - 修改文献分类名称
    DELIHOCTN: 'learn/proFuplaod/DeLihoCTn', // 文献 - 删除作品
    SELITERDETAAL: 'learn/proFuplaod/SeLiterDetaAl', // 文献查询
    DPROLITE: 'learn/proFuplaod/DProLite', // 文献下载
    SIKLMINIER: 'learn/proFuplaod/SikLMinier', // 文献大臣 - 收回
    INSITECSTYLE: 'learn/proFuplaod/InsiteCStyle', // 添加文献共享-文献分类 学网个性分类
    SELMINISTER: 'learn/proFuplaod/SeLMinister', // 查询文献大臣
    INLMINISTER: 'learn/proFuplaod/InLMinister', // 添加文献大臣
    SPROREPEATED: 'learn/proFuplaod/SProrepeated', // 重复文献
    INJOURNALAI: 'learn/Journal/InJournalAi', // 本会学报发表
    SEJOURNALAI: 'learn/Journal/SeJournalAi', // 本会学报查询
    DEJOURNAL: 'learn/Journal/DEJournal', // 本会学报删除
    SEMYWORDECHO: 'learn/MesAGain/SeMyWordECHO', // 我世界-我的反响
    SEMYWORDMESS: 'learn/MesAGain/SeMyWordMESS', // 我世界-我的消息
    SEMYWORDSPUSH: 'learn/MesAGain/SeMyWordSPUSH', // 我世界-系统推送
    SEMYWORDFRIEND: 'learn/MesAGain/SeMyWordFRIEND', // 我世界-学友动静
    SEUSALLPRO: 'learn/ReadWrite/SeUsAllPro', // 我世界图集
    MMYWLEAVE: 'learn/Message/MMywLeave', // 获取我世界的留言
    MUPINDETAIL: 'learn/MWAdminH/MUpInDetail', // 我世界公众端管理的上传编辑
    MSEPRODETAIL: 'learn/MWAdminH/MSeProDetail', // 我世界公众端管理的动作行为次数
    SMESTEMDE: 'learn/MesAGain/SMesTemDe', // 学会发布的信息详情

    RWSHOME: 'learn/ReadWrite/RWShome', // 我读首页
    RWSMLOVE: 'learn/ReadWrite/RWSMLove', // 我读-我的最爱
    RWSMASTW: 'learn/ReadWrite/RWSMastW', // 我读-名著标配
    RWMAJORS: 'learn/ReadWrite/RWMajorS', // 我读-专业课业
    WINUSERTYPE: 'learn/ReadWrite/WInUserType', // 我读-添加个性分类
    WUPUSERTYPE: 'learn/ReadWrite/WUpUserType', // 我读-修改个性分类
    WDEUSERTYPE: 'learn/ReadWrite/WDeUserType', // 我读-删除个性分类
    RWSFORB: 'learn/ReadWrite/RWSForB', // 我读-外文图书
    RWLIGHTR: 'learn/ReadWrite/RWLightR', // 我读-闲书
    RWHISTR: 'learn/ReadWrite/RWHistR', // 我读-阅读史
    RWUPLOAD: 'learn/ReadWrite/RWUpload', // 我读-我要上传
    RWMAJORSTYPE: 'learn/ReadWrite/RWMajorSType', // 名著个性分类获取
    RWLIGHTRTYPE: 'learn/ReadWrite/RWLightRType', // 闲书个性分类获取
    MPROREBUYB: 'learn/ProRead/MProReBuyB', // 判断用户是否购买书籍
    SEPROORB: 'learn/proFuplaod/SeProOrB', // 书籍购买 -- 生成生效订单
    SEPROPAY: 'learn/proFuplaod/SeProPay', // 书籍购买 -- 支付

    /* new api */
    ARTCOURSE: 'learn/IWrite/ArtsCourse', // 我写 -- 上传文艺/课程 联动数据获取
    IWUPLOAD: 'learn/IWrite/IWUpload', // 我写 -- 上传
    IRSFORM: 'learn/IRead/IRSform', // 体类查询
    SDPROUSERZ: 'learn/MesAGain/SDProUserZ', // 我写暂存查询
    SPROUSERU: 'learn/IWrite/SProUserU', // 查询作品信息 -- 暂时用于我写修改作品数据回显 productionId  作品ID
    UPROUSER: 'learn/IWrite/UProUser', // 我写 -- 修改作品
    IWPROORB: 'learn/IWrite/IWProOrB', // 我写 -- 修改作品 生成生效订单
    IWPROPAY: 'learn/IWrite/IWProPay', // 我写 -- 我写 -- 修改作品 支付
    SELEUSERTEM: 'learn/MesAGain/SeleUserTem', // 查询用户学网
    SELETEMMEM: 'learn/MesAGain/SeleTemMem', // 查询学网成员
    /* end */

    SEMYWORDCHOAL: 'learn/MesAGain/SeMyWordECHOAl', // 我世界-我的反响详情
    SEMYWORDKAM: 'learn/MesAGain/SeMyWordKAM', // 0-新学锦锂 1-新学来潮 2-新学尖峰

    SEWSHOWFLAUNT: 'learn/ReadWrite/SeWShowflaunt', // 我写，我读我晒
    SERSHOWFLAUNT: 'learn/ReadWrite/SeRShowflaunt', // 我读，我读我晒
    INWJOTTINGS: 'learn/ReadWrite/InWJottings', // 我写-随感添加
    SEWJOTTINGS: 'learn/ReadWrite/SeWJottings', // 我写-随感 查询
    INWABSTRACT: 'learn/ReadWrite/InWAbstract', //
    SEWABSTRACT: 'learn/ReadWrite/InWPaper', // 我写-文摘 查询
    SEWABSEARCH: 'learn/ReadWrite/SeWAbSearch', // 我写-文摘 查询
    SEWPAPER: 'learn/ReadWrite/SeWPaper', // 我写-论文 查询
    RWUPTYPE: 'learn/ReadWrite/RWUpUType', // 我写分类修改
    INWCOPY: 'learn/ReadWrite/InWCopy', // 我写-文案 添加
    SEWCOPY: 'learn/ReadWrite/SeWCopy', // 我写-文案 查询
    INWLITERATURE: 'learn/ReadWrite/InWLiterature', // 我写-文艺 添加
    SEWLITERATURE: 'learn/ReadWrite/SeWLiterature', // 我写-文艺 查询
    SEWHOWFLAUNT: 'learn/ReadWrite/SeWShowflaunt', // 我写我炫 查询
    SEWUPDAFLAUNT: 'learn/ReadWrite/SeWUpdaflaunt', // 我写我炫 提交
    SEUPROACTAL: 'learn/ReadWrite/SeUProActAL', // 获取用户作品动作记录
    SEPROCERT: 'learn/proFuplaod/SeProCert', // 证书 -- 查询作品列表
    SECERTDETA: 'learn/proFuplaod/SeCertDeta', // 证书 -- 查询作品详情 -- 证书显示
    ABSTRBUILD: 'learn/ReadWrite/AbstrBuild', // 文摘导出

    COMMENTID: 'learn/Action/Commentid', // 评论
    ACOMMENLE1A: 'learn/Action/SCommenLe1A', // 作品一级评论查询
    COMMENTHS: 'learn/Action/CommentHS', // 一级评论 赞/踩
    ACOMMENLE2A: 'learn/Action/SCommenLe2A', // 作品二级评论查询
    SPROACTIONAL: 'learn/Action/SProActionAl', // 查作品动作次数
    SPMREADAI: 'learn/ProRead/SPMReadAi', // 查询作品内容{* production_id   作品ID* pro_readID      阅读ID}
    SPRORCONS: 'learn/ProRead/SProRConS', // 查询作品阅读所有目录{production_id 作品ID}
    SPRODITAI: 'learn/ProRead/SProDitAi', // 查询作品详情{production_id   作品ID}
    COMMENTAGREE: 'learn/Action/CommentAgree', // 二级评论同意
    COMOPPOSE: 'learn/Action/ComOppose', // 二级评论反对
    HYMN: 'learn/Action/Hymn', // 赞
    PLAY: 'learn/Action/Play', // 赏
    OTHERORBIL: 'learn/Action/OtherOrBIL', // 生成有效订单
    OTHERPLAY: 'learn/Action/OtherPlay', // 生成有效订单
    SECREDIT: 'learn/MCenter/SeCredit', // 生成有效订单
    FORWARD: 'learn/Action/Forward', // 转
    ULIVETOKEN: 'learn/Action/ULiveToken', // 微博token
    FANS: 'learn/Action/Fans', // 粉
    COLLECT: 'learn/Action/Collect', // 收藏
    READ: 'learn/Action/Read', // 阅读
    DIGEST: 'learn/Action/Digest', // 文摘
    MPROREPORT: 'learn/ProRead/MProReport', // 作品举报{* userid* main_txt     举报内容* production_id    作品ID}
    CCOMPLAIN: 'learn/Action/CComPlain', // 评论举报{* userid* main_txt     举报内容* production_id    作品ID}
    INTEGRAL: 'learn/Action/Integral', // 评分
    /* read new ui */
    IRSNEWPRO: 'learn/IRead/IRSNewPro', // 最新作品查询
    IRINBOOKMARK: 'learn/IRead/IRInBookMark', // 添加书签
    IRSEBOOKMARK: 'learn/IRead/IRSeBookMark', // 查询书签
    IRDEBOOKMARK: 'learn/IRead/IRDeBookMark', // 删除书签
    IRSCLOUMN: 'learn/IRead/IRScloumn', // 我读栏目设置
    IRSETYPEAL: 'learn/IRead/IRSeTypeAl', // 我读栏目数据
    IRINTYPE: 'learn/IRead/IRInType', // 最新作品分类收藏
    IRAGAINTYPE: 'learn/IRead/IRAgainType', // 最新作品重新分类
    IRDPRO: 'learn/IRead/IRDPro', // 删除作品
    IRSCLOUMNLE: 'learn/IRead/IRScloumnLe3', // 我读栏目设置 -- 查询3级栏目
    IRIDCLOUMN: 'learn/IRead/IRIDcloumn', // 我读栏目设置 --添加删除的
    IRUCLOUMN: 'learn/IRead/IRUcloumn', // 我读栏目设置 --启用/关闭
    IRSDEPRO: 'learn/IRead/IRSDePro', // 查询已删除作品
    IRSCLOUMNLE3: 'learn/IRead/IRScloumnLe3', // 查询3级栏目
    SIWRITEPROAL: 'learn/LibraryS/SIWriteProAl', // 我写-我的作品查询
    IWSCLOUMN: 'learn/IWrite/IWScloumn', // 我的作品栏目查询
    DIWREADD: 'learn/IRead/DIWReadD', // 恢已删复作品
    IWSCLOUMNLE3: 'learn/IWrite/IWScloumnLe3', // 我写-查询3级栏目
    IWIDCLOUMN: 'learn/IWrite/IWIDcloumn', // 我写栏目设置 -- 添加/删除
    // 个人中心
    MCHOMES: 'learn/MCenter/MCHomeS', // 个人中心 -- 首页显示
    MCINNAMEB: 'learn/MCenter/MCInNNameB', // 新学名修改 -- 生成生效订单
    MCPAY: 'learn/MCenter/MCPay', // 新学名修改 -- 支付
    MCHPHEIMG: 'learn/MCenter/MCUpHeIMG', // 个人中心 -- 修改头像
    MCUPHEADDR: 'learn/MCenter/MCUpHeAddr', // 个人中心 -- 用户收件地址 显示修改
    MCHUTFN: 'learn/MCenter/MCUpTFN', // 个人中心 -- 发票抬头编辑 显示修改
    MCINDIAMLE: 'learn/MCenter/MCInDiamLe', // 钻级提升 -- 生成生效订单
    MCINDPAY: 'learn/MCenter/MCInDPay', // 钻级提升 -- 支付
    MCINDIAMGIVE: 'learn/MCenter/MCInDiamGive', // 钻级朋友提升  生成有效订单
    MCDGIVEPAY: 'learn/MCenter/MCDGivePay', // 钻级朋友提升  支付
    MCSYOLA: 'learn/MCenter/MCSYOLA', // 收款账户地址显示
    SUPYODEF: 'learn/Account/SUpYoDeF', // 财务室 -- 设置默认收款账户
    ISLIVORDERSWX: 'learn/useLogin/IsLivOrders_WX', // 监听
    GENSPROD: 'learn/ProGenra/GenSProD', // 推广好友作品 -- 根据手机查询作品信息
    GENPROINB: 'learn/ProGenra/GenProInB', // 作品推广 -- 个人作品生成订单
    GENPROPAY: 'learn/ProGenra/GenProPay', // 作品推广 -- 支付
    SGENMYI: 'learn/ProGenra/SGenMyI', // 作品推广历史与效果 查询 我的
    SGENFRI: 'learn/ProGenra/SGenFrI', // 助推历史与效果 查询 朋友的

    // 资料室
    SLIBRARYAL: 'learn/LibraryS/SLibraryAl', // 资料室 -- 显示
    SLMESSAGE: 'learn/LibraryS/SLMessage', // 资料室 -- 我的学聊 -- 展开
    LIBRARYUPTYPE: 'learn/LibraryS/LibraryUpType', // 资料室--修改我读作品类型

    SUCCEIMGCODE: 'learn/useLogin/SucceIMGCode', // 验证图形验证码
    ISLIVORDERS: 'learn/useLogin/IsLivOrders', // 判断用户是否存在未完成订单
    NSNAMEURL: 'learn/StuNSite/NSnameURL', // 新网名查重  //新网址查重
    SQLSTUORGINFO: 'learn/stuorg/info', // 查询学会信息
    SAVESTUORGINFO: 'learn/stuorg/save', // 保存/更新学会信息
    SQLLEADERINFO: 'learn/stumem/leadInfo', // 查询学会领导的信息
    SQLMEMBERINFO: 'learn/stumem/memInfo', // 查询学会会员的信息
    ADDLEADERINFO: 'learn/stumem/saveLeads', // 新增添加学会领导
    ADDMEMBERINFO: 'learn/stumem/saveMems', // 新增添加学会会员接口
    EADITLEADERINFO: 'learn/stumem/editLeads', // 编辑更新学会领导
    DELLEADERINFO: 'learn/stumem/deleteLeads', // 删除领导
    EADITMEMBERINFO: 'learn/stumem/editMems', // 编辑更新学会会员接口
    IMPORTLEADERINFO: 'learn/stumem/importExcelLeads', // Excel导入学会领导
    IMPORTMEMBERINFO: 'learn/stumem/importExcelMems', // Excel导入学会会员接口
    DOWNLOAD_LEADEREXCEL: 'learn/stumem/exportMemsList', // 下载学会领导Excel导入模版
    DOWNLOAD_MEMBEREXCEL: 'learn/stumem/exportMemsList', // 下载学会会员Excel导入模版接口

    PAGINATOR: 'learn/stumem/loadPageMems', // 分页查询学会成员的信息(上一页，下一页)
    ACADEMIC_METTING: 'learn/meeting/list', // 分页查询学术会议接口
    MEETING_NEWLIST: 'learn/meeting/newList', // 分页查询学术会议接口--新
    CERTBASE_SAVE: 'learn/certbase/save', // 学会会议证书保存
    CERTBASE_INFO: 'learn/certbase/info', // 学会会议证书查询
    CHECKIS_SITE: 'learn/stumem/checkIsSite', // 判断领导是否建站
    MAUTHOR: 'learn/meeting/mauthor', // 判断是否有发起会议的权利

    USELOGIN_ORGPHEMICS: 'learn/useLogin/ORGPheMicS', // 单位异地登录验证：
    // 入会管理
    GET_ADMIT_INFO: 'learn/admit/info', // 查询入会管理页面
    APPROVE_ADMIT_APPLY: 'learn/admit/approve', // 选择某条申请进行审批
    GETADMIT_APPLYINFO: 'learn/admit/applyInfo', // 查询入会申请书详细内容
    SAVE_APPLY_DESIGN: 'learn/admit/saveApplyDesign', // 保存入会申请书设计模版
    GET_APPLY_DSSIGN: 'learn/admit/getApplyDesign', // 获取入会申请书设计模版

    GET_ADMIN_PBAPPLYINFO: 'learn/admit/pbApplyInfo', // 查询申请书详细内容
    SAVE_ADMIN_PBAPPLYINFO: 'learn/admit/pbApplySave', // 保存申请书详细内容

    // 会议模块
    INITMEETING: 'learn/meeting/initMeeting', // 学术会议-发起会议
    GET_MEET_MENU: 'learn/meeting/menuInfo', // 查询会议栏目菜单接口
    GET_MEET_INFO: 'learn/meeting/get', // 根据主键查询会议信息接口
    MEET_SAVE: 'learn/meeting/save', // 保存会议信息接口
    UPMUSIC: 'learn/musicupload/multiupload', // 上传音频文件接口
    SAVE_INVITE_LIST: 'learn/meeting/saveInviteList', // 保存拟邀名单接口
    INVITED_LIST: 'learn/join/invitedList', // 拟邀名单
    GET_ALOADPAGEADMITS: 'learn/admit/loadPageAdmits', // 入会管理分页
    SET_USUCCORDERS: 'learn/StuNSite/USuccOrderS', // 创建学网状态 改成358
    GET_JOININFO: 'learn/join/getJoinInfo', // 邀请函件
    GET_PAGEINFO: 'learn/join/loadPageInfo', // 参会反馈列表分页查询接口：（参会名单、会议通讯录）
    GO_BACK_TIME: 'learn/shuttle/info', // 往返时间
    PAPER_MANAGE: 'learn/mpaper/loadPagePapers', // 论文管理
    SAVE_PAPER: 'learn/mpaper/savePaper', // 保存论文接口
    UPDATE_PAPER: 'learn/mpaper/updatePaper', // 更新论文接口：(入选操作等)
    GET_CERTINFO: 'learn/mcert/certInfo', // 查询某会议某用户的证书信息接口
    SAVE_MINFO: 'learn/meeting/saveMInfo', // 更新会议基础信息
    SAVE_CERTINFO: 'learn/mcert/saveCertInfo', // 保存会议证书主任和时间
    SAVE_SHUTTLE: 'learn/shuttle/save', // 保存用户往返安排
    SAVEJOININFO: 'learn/join/saveJoinInfo', // 报名参会接口
    SELECTMYJOIN: 'learn/join/selectMyJoin', // 查询用户参会信息接口
    MFEEPAY: 'learn/join/mFeePay', // 支付接口
    MROMOTEPAY: 'learn/join/mRomotePay', // 参会付费
    SROMOTEPRICE: 'learn/join/SRomotePrice', // 查询参会费
    GETMYJOININFO: 'learn/join/getMyJoinInfo', // 邀请函件
    MEET_MYLIST: 'learn/meeting/myList', // 我世界会议列表
    UPDATE_JOIN: 'learn/join/updateJoin', // 参会反馈报名审核
    CANCELMJOIN: 'learn/join/cancelMjoin', // 取消报名
    SCHED_SAVE: 'learn/sched/save', // 会议日程保存
    SCHED_INFO: 'learn/sched/info', // 会议日程查询
    NOJOIN: 'learn/join/noJoin', // 暂不参会
    ACCEPTINVITE: 'learn/join/acceptInvite', // 参会端接受会议邀请
    GETACCSTATUS: 'learn/join/getAccstatus', // 查询是否接受邀请
    MCOLLECT: 'learn/meeting/mcollect', // 会议通告是否收藏
    CHECKMEETINGURL: 'learn/meeting/checkMeetingUrl', // 会议网址查重

    /* new api */
    MUNITSAVE: 'learn/munit/save', // 会议日程存储
    MUNITINFO: 'learn/munit/info', // 会议日程查询
    SELECTGROUPS: 'learn/join/selectGroups', // 查询会议分组
    UPDATEMJONINFO: 'learn/join/updateMjonInfo', // 更新Mjoin基础信息
    JMEMS: 'learn/munit/jmems', // 会议日程获取参会人员
    SELECTMJGROUPS: 'learn/join/selectMjGroups', // 查询所有分组信息
    MFOLLOWINFO: 'learn/mfollow/info', // 住宿安排一览
    MFOLLOWUPDATE: 'learn/mfollow/update', // 更新住宿安排信息
    SCHEDLIST: 'learn/sched/list', // 个性安排
    SHUTTLEINFO: 'learn/shuttle/info', // 2.0往返车船
    BATUPDATEMJOIN: 'learn/join/batUpdateMjoin', // 批量更新分组

    NO_PAGE_PAPERS: 'learn/mpaper/noPagePapers', // 会议分组结果
    SCHEINFO: 'learn/sched/scheInfo', // 查询个性安排
    SCHEUPDATE: 'learn/sched/update', // 更新个性安排
    UPDATE_USERSCHED: 'learn/sched/updateUserSched', // 保存用户个性日程安排
    GETUSERSCHE: 'learn/sched/getUserSche',
    SCHED_LIST: 'learn/sched/list', // 日程安排参加者
    PHOTO_INFO: 'learn/photo/info',
    PHOTO_SAVE: 'learn/photo/save',
    CHECKPAPER: 'learn/mpaper/checkPaper', // 论文check
    SELECT_GROUPS: 'learn/join/selectGroups', //
    GETMINFO: 'learn/meeting/getMinfo', // 通过url获取meetid
    METLSHOME: 'learn/MetLive/MetLSHome', // 会议直播—首页查询
    METLINLIVE: 'learn/MetLive/MetLInLive', // 发起直播/新增视频
    METLINLIVEB: 'learn/MetLive/MetLInLiveB', // 会议直播 -- 生成生效订单
    MLIVEPAY: 'learn/MetLive/MLivePay', // 立即支付
    CREATE_VIDEO: 'learn/MetLive/CreateVideo', // 获取视频上传地址和凭证
    GETPLAYINFO: 'learn/MetLive/GetPlayInfo', // 根据 VideoId 查询视频播放地址
    METHASHKEY: 'learn/MetLive/MetHashKey', // 流名
    ISMJOIN: 'learn/join/isMjoin', // 共享会议会议留影上传判断是否是参会者
    JOININFOSEARCH: 'learn/join/joinInfoSearch', // 参会报名和参会确认 查询接口
    GETMYINVITE: 'learn/join/getMyInvite',

    SHAREMSG: 'learn/join/shareMsg', // 分享朋友圈
    SAVE_INVITE_CNT: 'learn/meeting/saveInviteCnt', // 保存邀请函
    SAVEMINFO: 'learn/meeting/saveMInfo', // new保存邀请函

    METLSBUGU: 'learn/MetLive/MetLSBuyU', // 会议直播—查询用户是否购买会议视频
    UPDATE_COMLIST: 'learn/join/updateComList', // 会议通讯录修改参会形式和会议房号
    SELECTJOINACES: 'learn/meeting/selectJoinAces', // 参会确认
    QuitMjoin: 'learn/join/quitMjoin', // 退会
    PERINFO: 'learn/shuttle/perinfo', // 参会端获取赴会车船和返回车船信息

    // 第三方登陆
    THAUTHPHONE_LOGIN: 'learn/ThirdL/ThAuthPhone', // QQ登陆成功回掉
    TBOUND_PHONE: 'learn/ThirdL/TBoundPhone', // 绑定手机
    GET_TWXSTOKEN: 'learn/ThirdL/TWXSToken', // 微信登录获取登陆状态
    GET_TWBSTOKEN: 'learn/ThirdL/TWBSToken', // 微博登录获取登陆状态
    GET_TQQSOPENID: 'learn/ThirdL/TQQSOpenID', // 获取QQopenid
    // GET_TQQSOPENID: 'learn/ThirdPartyController/TQQSOpenID', //

    ALIPAY_PAYMENT: 'learn/Payment/AlipayPan', // 支付宝支付
    WXPAY_PAYMENT: 'learn/Payment/WXPay', // 微信支付
    SYNTONY_ALI: 'learn/Alipay/SyntonyALI', // 支付宝支付成功回掉

    GET_MESSEND_STUORG: 'learn/stuorg/StuAllUN', // 查询所有机构

    // 学聊 学群
    CCREATE_USER: 'learn/ChatUOper/CCreateU', // 创建网易用户
    SCHHO_SHOW: 'learn/SchGShow/SchHoShow', // 学群与学友首页 --- 显示
    SCF_HOMES: 'learn/SchGShow/ScFHomeS', // 学员小页 --学友首页
    SCHX_SELFS: 'learn/SchGShow/SchXSelfS', //, 学员小页 -- 本人页面 显示全部信息/修改头像
    SCHXM_SECH: 'learn/SchGShow/SchXMSech', // 拉黑专页 -- 搜索群友名单
    SCHX_OP: 'learn/SchGShow/SchXOp', // 拉黑专页 -- 操作
    SCHX_BLOCKS: 'learn/SchGShow/SchXBlockS', // 拉黑专页 -- 查询
    SCHX_RECOVER: 'learn/SchGShow/SchXRecover', // 拉黑专页 -- 恢复
    SCHC_SHOWA: 'learn/SchGConfig/SchCShowA', // 学群小页 学长 -- 显示
    SCHC_NANU: 'learn/SchGConfig/SUcANaNu', // 学长小页修改 -- 学群名号
    SUCA_OTHER: 'learn/SchGConfig/SUcAOther', // 学长小页修改 -- 其他
    SASE_PERPEL: 'learn/SchGConfig/SASePerpel', // 学长/学员 小页 --查询 我粉与粉我用户
    SUCA_INPERPLE: 'learn/SchGConfig/SUcAInPerpel', // 学长小页 -- 添加群友
    SCHLIST_QUIT: 'learn/SchGShow/SchListQuit', /// /学长小页 -- 删除群友
    SU_AUDIT: 'learn/SchGConfig/SUAudit', // 学长小页 -- 入会审核 查询
    SU_AUDITPD: 'learn/SchGConfig/SUAuditPd', // 学长小页 -- 推荐入会审核 查询
    SU_AUDITSTA: 'learn/SchGConfig/SUAuditSta', // 学长小页 -- 入会审核 通过 不通过
    SU_COMPLAINS: 'learn/SchGConfig/SUComplainS', // 学长小页 -- 投诉与处分 查询
    SU_COMPLAINU: 'learn/SchGConfig/SUComplainU', // 学长小页 -- 投诉与处分 修改
    S_PUBLICITY: 'learn/SchGConfig/SPublicity', // 学长小页 -- 招新宣传 显示
    UP_PUBLICITY: 'learn/SchGConfig/UpPublicity', // 学长小页 -- 招新宣传 修改
    S_ADMINCG: 'learn/SchGConfig/SAdminCg', // 学长小页 -- 学长变更
    SHMH_SHOWA: 'learn/SchGConfig/ShMhShowA', // 学群小页 学员 -- 显示
    SH_MASTERS: 'learn/SchGConfig/ShMasterS', // 学群小页 学员 -- 大咖显示
    SHPF_PERPLE: 'learn/SchGConfig/ShPfPerpel', // 学员小页 -- 荐友入群
    SHP_COMPLAIN: 'learn/SchGConfig/ShPComplain', // 学员小页 -- 投诉违规者
    SHMCA_OTHER: 'learn/SchGConfig/ShMcAOther', // 学员小页 -- 修改
    SGROUP_SCHAI: 'learn/SchGShow/SGroupSchAi', // 查询学群列表
    SCH_QUIT: 'learn/SchGShow/SchQuit', // 退群/恢复
    MME_SHOW: 'learn/Message/MMeShow', // 消息显示 来未复 去未应
    MMES_FRIEND: 'learn/Message/MMeSFriend', // 获取学友list
    MMES_SHOWF: 'learn/Message/MMeSShowF', // 学聊获取信息
    MMES_NEWEST: 'learn/Message/MMeSNewest', // 最新
    SCHSY_GRODE: 'learn/SchGShow/SchSYGroDe', // 首页时序音序 -- 显示同属学群

    SACHOMEW: 'learn/Account/SACHomeW', // 获取充值单号和余额
    TOPUPSTUM: '/learn/Account/TopUpStuM', // 充值
    SEXPIMCMC: '/learn/Account/SExpImcMC', // 所有
    SINCOMEMC: '/learn/Account/SIncomeMC', // 赚取
    STOPDETAILMC: '/learn/Account/STopDetailMC', // 充值
    SEXPENDMC: '/learn/Account/SExpendMC', // 支出
    SUPYOLLON: '/learn/Account/SUpYollon', // 设置收款账户
    SERVTIC: '/learn/Account/ServTic', // 学单密西
    SINWITHDRAWB: '/learn/Account/SInWithdrawB', // 生成提现订单
    WITHDRAW: '/learn/Account/Withdraw', // 提现
    UPORGEIV: '/learn/UseBom/UpOrGeiv', // 退还
    SERVTICPAY: '/learn/Account/ServTicPay', // 学单支付
    GET_NEWS_OFFLINE: 'learn/Payment/NewSOffline', // 线下支付查询
    COMMIT_NEWINFOOLINE: 'learn/Payment/NewInOffline', // 线下支付发送
    SEINVOICE: 'learn/Account/SeInvoice', // 发票列表
    SEINVODE: 'learn/Account/SeInvoDe', // 发票列表
    ISSINVOICE: 'learn/Account/IssInvoice', // 开具发票

    STU_SEARCH: 'learn/Search/StuSearch', // 学搜
    AUTO_TACC: 'learn/useLogin/AutoTAcc', // 判断Token 返回登录信息  --  用于自动登录

    WEBSOCKET_ONOPEN: 'learn/myHandler', // 连接WebSocket

    SAVE_STYLE: 'learn/stuorg/saveStyle', // 设置 保存样式
    GET_STYLE: 'learn/stuorg/getStyle', // 设置获取样式
    SCHG_AUTOC: 'learn/SchGAuto/SchGAutoC', // 自动建群-个人
    SCHGAUTOORG: 'learn/SchGAuto/SchGAutoOrg', // 自动建群-单位

    SSITEPMOTION: 'learn/StuNet/SSitePmotion', // 查询用户优惠获取情况 new
    NURECOMMES: 'learn/StuNet/NuRecommes', // 查询被推荐信息 new
    PRSE_USER_ROLE: 'learn/NetPrType/PRSeUserRole', // 理事证书
    PUBSET_GETCNT: 'learn/pubset/getCnt', // 理事会内容查询，0新学界是何界1会员/理事权利 2会员/理事条件
    SEUSBOMA: 'learn/StuNet/SeUsBomA', // 获取用户订单信息

    PTOVERRALLSET: 'learn/NetPrType/PTOverrallSet', // 优惠设置保存
    GET_PRSETYPETXT: 'learn/NetPrType/PRSeTypeTxt', // 查询优惠活动说明
    SET_PRSETYPETXT: 'learn/NetPrType/PRUpTypeTxt', // 修改优惠说明

    DEUSBOMA: 'learn/StuNet/DeUsBomA', // 退还订单
    CUTIMG: 'learn/imguplaod/cutImg', // base64 转png
    GET_INVITEDLIST: 'learn/join/getInvitedList', // 查询会议邀请名单
    // UPDATEMJONINFO: 'learn/join/updateMjonInfo', //删除邀请名单
    GET_FREELIST: 'learn/join/getFreeList', // 查询自由报名单
    SEND_EXINVIT: 'learn/join/sendExInvite', // 发出邀请
    UPINVITEDCHANNEL: 'learn/join/UpInvitedChannel', // 自由报名单确认
    SENDINVITEDCHANNEL: 'learn/join/sendInvitedChannel', // 发送自由名单邀请

    STEMLATEMAIN: 'learn/NetPrType/STemlateMain', // 学会证书管理 -- 查询模板
    INTEMLATEMAIN: 'learn/NetPrType/InTemlateMain', // 学会证书管理 -- 保存模板
    SETEMLATE: 'learn/NetPrType/SeTemlate', // 查询证书内容

    GETUSERS: 'learn/useLogin/GetUserS', // 获取手机号码
    SMEETCOLUNM: 'learn/meeting/SMeetColunm', // 会议栏目设置 -- 查询
    UMEETNAMESTYLE: 'learn/meeting/UMeetNameStyle', // 会议招牌样式
    UMEETCOLUNM: 'learn/meeting/UMeetColunm', // 修改会议栏目
    UMEETCIMG: 'learn/meeting/UMeetCImg', // 修改会议头图
    GET_PERCERT: 'learn/mcert/percert', // 会议-参会证书
    UPDATEBASEMJOININFO: 'learn/join/updateBaseMjonInfo', // 会议-参会名单 报道与否
    DISSHAREANDJOIN: 'learn/join/disShareAndJoin', // 用户进入会议判断是参会端还是共享端
    CONFIRMNETVIEW: 'learn/join/confirmNetView', // 确认网络参会
    INCRECLICK: 'learn/meeting/increClick', // 记录会议的点击量(参会和共享)
    SELECTIDBYURL: 'learn/meeting/selectIdByUrl', // 通过短地址code获取meetId

    SMYWORLDCOLUMN: 'learn/MesAGain/SMyworldColumn', // 查询我世界共享端栏目
    EXTENDMEETING: 'learn/share/extendMeeting', // 共享端 --会议查询
    STUORG: 'learn/share/stuorg', // 共享端 --新学联盟
    STUCONCERN: 'learn/share/stuConcern', // 共享端 --新学联盟 --关注/取关
    STUPER: 'learn/share/stuper', // 共享端 --新学人物
    STUPERS: 'learn/share/stupers', // 管理端 --新学人物
    SEIRKAM: 'learn/MesAGain/SeIRKAM', // 共享段 -- 我读
    SSTUCLOUMN: 'learn/MesAGain/SStuCloumn', // 共享端 --查询新学界公众端栏目

    MYMASTERSITE: 'learn/share/myMasterSite', // 我世界- 新学联盟 - 我的学网 - 我的主站
    MYSUBSITES: 'learn/share/mySubSites', // 我世界- 新学联盟 - 我的学网 - 我的子站
    MYJOINSITES: 'learn/share/myJoinSites', // 我世界- 新学联盟 - 我的学网 - 我的子站 - 我为成员
    MYCONCERNSITES: 'learn/share/myConcernSites', // 我世界- 新学联盟 - 我的学网 - 我的子站 - 我关注的学网
    MYNOCONCERNSITES: 'learn/share/myNoConcernSites', // 我世界- 新学联盟 - 我的学网 - 我的子站 -我取关的学网
    /* 新学人物 */
    SMYWORLDPEAL: 'learn/MesAGain/SMyWorldPeAl', // 我世界首页--新学人物
    SMYWORLDMEMPE: 'learn/MesAGain/SMyWorldMemPe', // 查询学群成员
    SMYWORLDHCOM: 'learn/MesAGain/SMyWorldIHCom', // 我世界首页 -- 互评
    SMYWORLDIHCOMDOW: 'learn/MesAGain/SMyWorldIHComDow' // 人物评论下载
}

/**
 * 获取接口地址
 * @param  {[type]} urlkey [接口list key]
 * @return {[type]}        [接口地址]
 */
export const _getUrl = (urlkey) => {
    return baseUrl + postUrl[urlkey]
}
/**
 * post
 * @param  {[type]}   url    [接口地址]
 * @param  {[type]}   params [接口参数]
 * @param  {Function} fn     [回调方法]
 */
export const _getData = (url, params, fn) => {
    let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(246, 246, 246, 0.2)'
    })
    axios.post(url, params).then(res => {
        loadingInstance.close()
        fn(res.data)
    }).catch(error => {
        loadingInstance.close()
        console.log(error)
    })
}
