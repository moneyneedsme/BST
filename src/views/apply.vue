<template>
	<div class="apply" :class='$store.state.isPc?"pcAuto":"mdAuto"'>
		<div class='cententBox'>
			<div class="head" v-if='$store.state.isPc'>
				<img :src="userinfo.avatar">
				<span>Welcome! {{userinfo.user_name}}</span>
				<div>
					<h2>{{countnum.points}}</h2>
					<p>Points</p>
				</div>
				<div>
					<h2>{{countnum.applied}}</h2>
					<p>Applied</p>
				</div>
				<div>
					<h2>{{countnum.myreviews}}</h2>
					<p>My Reviews</p>
				</div>
			</div>
			<div class="head" v-else>
				<div>
					<h2>{{countnum.points}}</h2>
					<p>Points</p>
				</div>
				<div>
					<h2>{{countnum.applied}}</h2>
					<p>Applied</p>
				</div>
				<div>
					<h2>{{countnum.myreviews}}</h2>
					<p>My Reviews</p>
				</div>
			</div>
			<div class="tabs">
				<span @click='ontab(0)' :class='{active:index==0}'>All ({{dataall.length}})</span>
				<span @click='ontab(1)' :class='{active:index==1}'>Succeed({{shenqing_chenggong.length}})</span>
				<span @click='ontab(2)' :class='{active:index==2}'>Applying ({{shenqing_shenhezhong.length}})</span>
				<span @click='ontab(3)' :class='{active:index==3}'>Failed({{shenqing_shibai.length}})</span>
			</div>
			<div class="directory">
				<h3>Comment Rules：</h3>
				<p>Congratulations on your successful qualification to obtain free samples, please click Submit Review on below relatedactivity and share your experience and feelings about this evaluation in details. Review would be auditted and once Sorry that your application wasn’t be seleted, please don’t be discouraged, you still have chance to share your comment as long as you purchased our products--click Submit Review on below related activity and share your experience and</p>
			</div>
			<div class="items" v-for='(v,i) in list' :key='i'>
				<div class="items_head">
					<template v-if='v.issuccess==0'>
						<span>Applying</span>
						<i>Announce Soon</i>
					</template>
					<span v-else-if='v.issuccess==1'>Succeed</span>
					<span v-else>Failed</span>
					<i>{{v.apply_date}}</i>
				</div>
				<div class="item_content">
					<img :src="imgUrl+v.image">
					<div>{{v.aname}}</div>
					<button class='active' @click='toPost(v.product_activity_id)'>Submit Review</button>
				</div>
			</div>
		</div>
		<div class="rightBox" v-if='$store.state.isPc'>
			<hot-activities ></hot-activities>
		</div>
		<hot-activities v-else></hot-activities>
	</div>
</template>

<script>
import hotActivities from '../components/hotActivities'
import  {httpNetwork} from "../config/axios";
export default {
	name:'apply',
	components: { 
    hotActivities,
	},
	data(){
		return{
			index: 0,
			list: [],
			dataall: [],
			shenqing_chenggong: [],
			shenqing_shenhezhong: [],
			shenqing_shibai: [],
			userinfo: {},
			countnum: {}
		}
	},
	async mounted(){
		this.index = this.$route.query.index ||0
		await this.getData()
		this.ontab(this.index)
	},
	beforeRouteUpdate (to, from, next) {
		this.index = to.query.index ||0
		this.ontab(this.index)
		next()
	},
	methods:{
		ontab(i){
			this.index = i
			switch(this.index){
				case 1:
					this.list = this.shenqing_chenggong
					break
				case 2:
					this.list = this.shenqing_shenhezhong
					break
				case 3:
					this.list = this.shenqing_shibai
					break
				default:
					this.list = this.dataall
			}
		},
		getData(){
			const url = `index.php?route=forum/houtai/application_list`
      return httpNetwork(url,null,'get').then(res=>{
				this.dataall = res.data.dataall
				this.shenqing_chenggong = res.data.shenqing_chenggong
				this.shenqing_shenhezhong = res.data.shenqing_shenhezhong
				this.shenqing_shibai = res.data.shenqing_shibai
				this.userinfo = res.userinfo
				this.countnum = res.countnum
      })
		},
		toPost(id){
			this.$router.push({path:'/postComments',query:{id}})
		}
	}
}
</script>

<style lang="less" scoped>
.apply.pcAuto{
	overflow: hidden;
	margin-top: 77px;
	.rightBox{
		width: 278px;
		float: right;
		margin-left: 35px;
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
	}
	.cententBox{
		background: white;
		padding:29px 51px 78px;
		float: left;
		width: 887px;
		box-sizing: border-box;
		.head{
			overflow:hidden;
			>img{
				width: 65px;
				height: 65px;
				margin-right:18px;
				vertical-align: middle;
			}
			>span{
				font-size:16px;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(73,70,69,1);
				vertical-align: middle;
			}
			>div{
				float: right;
				margin-right: 63px;
				text-align: center;
				margin-top: 10px;
				>h5{
					font-size:32px;
					font-family:Whitney;
					font-weight:500;
					color:rgba(73,70,69,1);
				}
				>p{
					font-size:16px;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(73,70,69,1);
					margin-top: 10px;
				}
			}
		}
		.tabs{
			display: flex;
			justify-content: space-between;
			background:rgba(244,246,248,1);
			margin-top: 90px;
			>span{
				padding: 15px 39px;
				font-size:20px;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(34,24,21,1);
				cursor: pointer;
				box-sizing: border-box;
				&.active{
					background:rgba(232,233,234,1);
					font-family:Whitney Semibold;;
				}
			}
		}
		.directory{
			margin-top: 46px;
			>h3{
				font-size:20px;
				font-family:Whitney Semibold;
				font-weight:400;
				color:rgba(76,73,72,1);
			}
			>p{
				font-size:16px;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(76,73,72,1);
				margin-top: 23px;
			}
		}
		.items{
			overflow: hidden;
			margin-top: 20px;
			border:1px solid rgba(244,246,248,1);
			.items_head{
				height:43px;
				line-height: 43px;
				background:rgba(244,246,248,1);
				padding:0px 34px;
				>span{
					font-size:20px;
					font-family:Whitney Semibold;
					font-weight:400;
					color:rgba(76,73,72,1);
					margin-right: 8px;
				}
				>i{
					font-size:16px;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(73,70,69,1);
					&:last-of-type{
						float: right;
						margin-top: 1px;
					}
				}
			}
			.item_content{
				padding:30px 34px;
				overflow: hidden;
				position: relative;
				width:100%;
				box-sizing: border-box;
				>img{
					width:198px;
					height:101px;
					position: absolute;
					top:50%;
					transform: translateY(-50%);
				}
				>button{
					position: absolute;
					top:50%;
					right:34px;
					transform: translateY(-50%);
					width:140px;
					height:41px;
					line-height: 41px;
					background:rgba(244,246,248,1);
					border:1px solid rgba(219,220,221,1);
					border-radius:21px;
					box-sizing: border-box;
					cursor: pointer;
					&.active{
						border:none;
						background:rgba(227,22,25,1);	
						color:rgba(255,255,255,1);
					}
				}
				>div{
					margin:30px 153px 30px 230px;
					font-size:18px;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(73,70,69,1);
				}
			}
		}
	}
}
.apply.mdAuto{
	overflow: hidden;
	margin-top: 0.17rem;
	.cententBox{
		padding:0px 0.26rem;
		box-sizing: border-box;
		.head{
			background: white;
			padding:0.38rem 0.41rem;
			display: flex;
			justify-content: space-between;
			>div{
				text-align: center;
				width: 1.9rem;
				padding:0.17rem;
				border:1px solid rgba(230,230,232,1);
				border-radius:0.1rem;
				box-sizing: border-box;
				>h2{
					font-size:0.36rem;
					font-family:Whitney;
					font-weight:500;
					color:rgba(73,70,69,1);
				}
				>p{
					margin-top: 0.09rem;
					font-size:0.24rem;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(73,70,69,1);
				}
			}
		}
		.tabs{
			font-size: 0px;
			background:rgba(244,246,248,1);
			margin-top: 0.17rem;
			background: white;
			>span{
				display: inline-block;
				vertical-align: top;
				width: 25%;
				text-align: center;
				height: 0.5rem;
				line-height: 0.5rem;
				font-size:0.26rem;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(34,24,21,1);
				cursor: pointer;
				box-sizing: border-box;
				&.active{
					background:rgba(227,22,25,1);
					font-family:Whitney Semibold;
					color: white;
				}
			}
		}
		.directory{
			background: white;
			padding: 0.6rem 0.42rem 0.55rem 0.3rem;
			margin-top: 0.13rem;
			>h3{
				font-size:0.26rem;
				font-family:Whitney Semibold;
				font-weight:400;
				color:rgba(76,73,72,1);
			}
			>p{
				font-size:0.24rem;
				font-family:Whitney Book;
				font-weight:400;
				color:rgba(76,73,72,1);
				margin-top: 0.36rem;
			}
		}
		.items{
			overflow: hidden;
			background: white;
			padding: 0 0.19rem 0.23rem;
			.items_head{
				height:0.68rem;
				line-height: 0.68rem;
				background:rgba(244,246,248,1);
				padding:0px 0.41rem;
				>span{
					font-size:0.36rem;
					font-family:Whitney Semibold;
					font-weight:400;
					color:rgba(76,73,72,1);
					margin-right:0.1rem;
				}
				>i{
					font-size:0.24rem;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(114,113,113,1);
					&:last-of-type{
						float: right;
						margin-top: 1px;
					}
				}
			}
			.item_content{
				border:1px solid rgba(244,246,248,1);
				border-top: 0px;
				overflow: hidden;
				position: relative;
				width:100%;
				box-sizing: border-box;
				min-height: 1.98rem;
				>img{
					width:1.98rem;
					height:1.01rem;
					position: absolute;
					top:50%;
					left: 0.23rem;
					transform: translateY(-50%);
				}
				>button{
					position: absolute;
					top:65%;
					right:1.32rem;
					transform: translateY(-50%);
					width:1.94rem;
					height:0.35rem;
					line-height: 0.35rem;
					background:rgba(244,246,248,1);
					border:1px solid rgba(219,220,221,1);
					border-radius:21px;
					box-sizing: border-box;
					font-size: 0.24rem;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(255,255,255,1);
					cursor: pointer;
					&.active{
						border:none;
						background:rgba(227,22,25,1);	
						color:rgba(255,255,255,1);
					}
				}
				>div{
					margin:0.41rem 0.23rem 0.41rem 2.3rem;
					font-size:0.24rem;
					font-family:Whitney Book;
					font-weight:400;
					color:rgba(73,70,69,1);
				}
			}
		}
	}
}
</style>