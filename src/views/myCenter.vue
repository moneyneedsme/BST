<template>
	<div class='myCenter' :class='$store.state.isPc?"pcAuto":"mdAuto"' ref='myCenter'>
		<div class="content">
			<div class="leftMeun" v-if='$store.state.isPc'>
				<div class='title' :class='{active:leftIndex==0}'><i class='iconfont iconwenzhang '></i>My Articles</div>
				<div @click='toMyArticles(1,"All")' :class='{active:leftIndex==1}'><i></i>All({{allnumbers.articlenum&&allnumbers.articlenum.totalarticle||0}})</div>
				<div @click='toMyArticles(2,"Approved")' :class='{active:leftIndex==2}'><i></i>Approved({{allnumbers.articlenum&&allnumbers.articlenum.approved||0}})</div>
				<div @click='toMyArticles(3,"Not Approved")' :class='{active:leftIndex==3}'><i></i>Not Approved({{allnumbers.articlenum&&allnumbers.articlenum.notapproved||0}})</div>
				<div class='title' :class='{active:leftIndex==4}'><i class='iconfont iconpingzi '></i>My Applications</div>
				<div @click='toApply(5)' :class='{active:leftIndex==5}'><i></i>All({{allnumbers.applicationnum&&allnumbers.applicationnum.totalapplication||0}})</div>
				<div @click='toApply(6)' :class='{active:leftIndex==6}'><i></i>Applying({{allnumbers.applicationnum&&allnumbers.applicationnum.totalshenhezhong||0}})</div>
				<div @click='toApply(7)' :class='{active:leftIndex==7}'><i></i>Succeed({{allnumbers.applicationnum&&allnumbers.applicationnum.totalchenggong||0}})</div>
				<div @click='toApply(8)' :class='{active:leftIndex==8}'><i></i>Failed({{allnumbers.applicationnum&&allnumbers.applicationnum.totalshibai||0}})</div>
				<div class='title' @click='toMyDrafts(9)' :class='{active:leftIndex==9}'><i class='iconfont iconcaogao '></i>My Drafts ({{allnumbers.totaldrafts||0}})</div>
				<div class='title' @click='getMyReviews(10)' :class='{active:leftIndex==10}'><i class='iconfont iconpinglun '></i>My Reviews({{allnumbers.totalreviews||0}})</div>
				<div class='title' @click='leftIndex=11' :class='{active:leftIndex==11}'><i class='iconfont iconshezhi2 '></i>My Settings</div>
				<div @click='toMyProfile(12)' :class='{active:leftIndex==12}'><i></i>My Profile</div>
				<div @click='toChangePassword(13)' :class='{active:leftIndex==13}'><i></i>Change Password</div>
			</div>
			<div class='cententBox'>
				<router-view :headlist = headlist :list = 'list' />
			</div>
			<div class="rightBox" v-if='$store.state.isPc'>
				<div class="userImg">
					<img :src="allnumbers.userinfo&&allnumbers.userinfo.avatar">
					<span>Welcome! {{allnumbers.userinfo&&allnumbers.userinfo.user_name}}</span>
				</div>
				<hot-activities ></hot-activities>
			</div>
			<hot-activities v-else></hot-activities>
		</div>
	</div>
</template>

<script>
import hotActivities from '../components/hotActivities'
import  {httpNetwork} from "../config/axios"
import Utils from '../config/util'
export default {
	name:'myCenter',
	components: { 
    hotActivities,
	},
	data(){
		return{
			leftIndex:1,
			headlist:[],
			list:[],
      allList:[],
      fList:[],
			tList:[],
			allnumbers:{}
		}
	},
	async mounted(){
		this.vueLoading.show()
		this.leftIndex = this.$route.query.leftIndex ||1
		this.getAllnumbers()
		await this.getData().finally(()=>{
			this.vueLoading.hide()
		})
		this.init(this.leftIndex)
		// Utils.$on('init', (i)=>{
		// 	console.log(i)
    //     this.init(i);
    // })
	},
	methods:{
		init(i){
			switch(i){
				case 1:
					this.toMyArticles(1,"All");
					break;
				case 2:
					this.toMyArticles(2,"Approved");
					break;
				case 3:
					this.toMyArticles(3,"Not Approved");
					break;
				case 9:
					this.toMyDrafts(9);
					break;
				case 10:
					this.getMyReviews(10);
					break;
				case 12:
					this.toMyProfile(12);
					break;
				case 13:
					this.toChangePassword(13);
					break;
			}
		},
		getAllnumbers(){
			const url = `index.php?route=forum/houtai/getallnumbers`
			httpNetwork(url,null,'get').then(res=>{
				this.allnumbers = res
			})
		},
		async toMyDrafts(i){
			this.onActive(i)
			this.headlist = [
				{name:'My Center',path:''},
				{name:'My Drafts',path:''},
			]
			const url = `https://www.bestekdirect.com/index.php?route=forum/ceping/review_get_all_draft_by_user&page=1&limit=999`
      await httpNetwork(url,null,'get').then(res=>{
        this.list = res.data
			})
			this.$router.push({path:'/myReviews'})
		},
		async getMyReviews(i){
			this.onActive(i)
			this.headlist = [
				{name:'My Center',path:''},
				{name:'My Reviews',path:''},
			]
			const url = `https://www.bestekdirect.com/index.php?route=forum/ceping/review_get_all_by_user&page=1&limit=999`
      await httpNetwork(url,null,'get').then(res=>{
        this.list = res.data
			})
			this.$router.push({path:'/myReviews'})
		},
		getData(){
			const url = `index.php?route=forum/forumtopiccreate/get_topic_list_by_user`
      return httpNetwork(url,null,'get').then(res=>{
        this.allList = res.data
        if(res.data&&res.data.length){
          res.data.map(v=>{
            if(v.visible==='f'){
              this.fList.push(v)
            }else if(v.visible==='t'){
              this.tList.push(v)
            }
          })
        }
      })
		},
		toApply(i){
			this.onActive(i)
			var index
			switch(i){
				case 6:
					index = 2
					break;
				case 7:
					index = 1
					break;
				case 8:
					index = 3
					break;
				default:
					index = 0
			}
			this.$router.push({path:'/apply',query:{index}});
		},
		toMyArticles(i,name){
			if(name){
				this.headlist = [
					{name:'My Center',path:''},
					{name:'My Articles',path:''},
					{name,path:''}
				]
			}else{
				this.headlist = [
					{name:'My Center',path:''},
					{name:'My Articles',path:''},
				]
			}
			switch(i){
				case 2:
					this.list = this.tList
					break;
				case 3:
					this.list = this.fList
					break;
				default:
					this.list = this.allList
			}
			this.$router.push({path:'/myArticles'}),
			this.onActive(i)
		},
		toChangePassword(i){
			this.headlist = [
				{name:'My Center',path:''},
				{name:'My Settings',path:''},
				{name:'Change Password',path:''}
			]
			this.$router.push({path:'/changePassword'}),
			this.onActive(i)
		},
		toMyProfile(i){
			this.headlist = [
				{name:'My Center',path:''},
				{name:'My Settings',path:''},
				{name:'My Profile',path:''}
			]
			this.$router.push({path:'/myProfile'}),
			this.onActive(i)
		},
		onActive(i){
			this.leftIndex = i;
		}
	}
}
</script>

<style lang="less" scoped>
.myCenter{
	padding-top: 47px;
	overflow: hidden;
	.content{
		margin-top:11px;
	}
	.leftMeun{
		width: 214px;
		box-sizing: border-box;
		background: white;
		padding:37px 11px; 
		float: left;
		margin-right: 12px;
		>div{
			height:35px;
			line-height: 35px;
			font-size:16px;
			font-family:Whitney Book;
			font-weight:400;
			cursor: pointer;
			color:rgba(73,70,69,1);
			&.title{
				font-size:20px;
				font-family:Whitney;
				font-weight:500;
				color:rgba(73,70,69,1);
				margin-top: 10px;
			}
			&.active{
				background:rgba(239,242,244,1);
			}
			>i{
				display: inline-block;
				min-width: 42px;
				text-align: center;
				font-size: 17px;
			}
		}
	}
	.rightBox{
		width: 278px;
		float: right;
		margin-left: 12px;
		.userImg{
			padding:33px 0 33px 33px;
			background: white;
			>img{
				width:72px;
				height:72px;
				border-radius:50%;
				vertical-align: middle;
			}
			>span{
				font-size:16px;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(73,70,69,1);
				vertical-align: middle;
				margin-left: 21px;
			}
		}
		/deep/.hotActivities>h2{
			background: transparent;
		}
	}
	.cententBox{
		width: 683px;
		display: inline-block;
	}
}
.pcAuto{
	/deep/.el-breadcrumb{
		position: absolute;
		top: -25px;
		left: -226px;
	}
}
 @media screen and (max-width:960px){
	.myCenter{
		padding-top: 0;
		.cententBox{
			width:100%;
			display:block;
		}
	}
 }
</style>