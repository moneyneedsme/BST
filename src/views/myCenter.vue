<template>
	<div class='myCenter' :class='$store.state.isPc?"pcAuto":"mdAuto"'>
		<h1>{{$store.state.islogin}}</h1>
		<div class="content">
			<div class="leftMeun" v-if='$store.state.isPc'>
				<div class='title' :class='{active:leftIndex==0}'><i class='iconfont iconwenzhang '></i>My Articles</div>
				<div @click='toMyArticles(1,"All")' :class='{active:leftIndex==1}'><i></i>All(9)</div>
				<div @click='toMyArticles(2,"Approved")' :class='{active:leftIndex==2}'><i></i>Approved(4)</div>
				<div @click='toMyArticles(3,"Not Approved")' :class='{active:leftIndex==3}'><i></i>Not Approved(2)</div>
				<div class='title' @click='leftIndex=4' :class='{active:leftIndex==4}'><i class='iconfont iconshiyanshaobei2 '></i>My Applications</div>
				<div :class='{active:leftIndex==5}'><i></i>All(4)</div>
				<div @click='toApply(6)' :class='{active:leftIndex==6}'><i></i>Applying(0)</div>
				<div @click='toApply(7)' :class='{active:leftIndex==7}'><i></i>Succeed(0)</div>
				<div @click='toApply(8)' :class='{active:leftIndex==8}'><i></i>Failed(0)</div>
				<div class='title' @click='leftIndex=9' :class='{active:leftIndex==9}'><i class='iconfont iconcaogao '></i>My Drafts (0)</div>
				<div class='title' @click='leftIndex=10' :class='{active:leftIndex==10}'><i class='iconfont iconpinglun '></i>My Reviews(5)</div>
				<div class='title' @click='leftIndex=11' :class='{active:leftIndex==11}'><i class='iconfont iconshezhi2 '></i>My Settings</div>
				<div @click='toMyProfile(12)' :class='{active:leftIndex==12}'><i></i>My Profile</div>
				<div @click='toChangePassword(13)' :class='{active:leftIndex==13}'><i></i>Change Password</div>
			</div>
			<div class='cententBox'>
				<router-view :headlist = headlist />
			</div>
			<div class="rightBox" v-if='$store.state.isPc'>
				<div class="userImg">
					<img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
					<span>Welcome! Emily</span>
				</div>
				<hot-activities ></hot-activities>
			</div>
			<hot-activities v-else></hot-activities>
		</div>
	</div>
</template>

<script>
import hotActivities from '../components/hotActivities'
export default {
	name:'myCenter',
	components: { 
    hotActivities,
	},
	data(){
		return{
			leftIndex:-1,
			headlist:[
				{name:'My Center',path:''},
				{name:'My Articles',path:'/myArticles'},
			],
		}
	},
	methods:{
		toApply(i){
			this.onActive(i)
			this.$router.push({path:'/apply'});
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
			padding:33px;
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
</style>