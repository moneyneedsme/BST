<template>
	<div class="apply" :class='$store.state.isPc?"pcAuto":"mdAuto"'>
		<div class='cententBox'>
			<div class="head">
				<img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
				<span>Welcome! Emily</span>
				<div>
					<h2>2</h2>
					<p>Points</p>
				</div>
				<div>
					<h2>0</h2>
					<p>Applied</p>
				</div>
				<div>
					<h2>3</h2>
					<p>My Reviews</p>
				</div>
			</div>
			<div class="tabs">
				<span @click='index=0' :class='{active:index==0}'>All (5)</span>
				<span @click='index=1' :class='{active:index==1}'>Succeed(2)</span>
				<span @click='index=2' :class='{active:index==2}'>Applying (4)</span>
				<span @click='index=3' :class='{active:index==3}'>Failed(2)</span>
			</div>
			<div class="directory">
				<h3>Comment Rules：</h3>
				<p>Congratulations on your successful qualification to obtain free samples, please click Submit Review on below relatedactivity and share your experience and feelings about this evaluation in details. Review would be auditted and once</p>
				<p>Sorry that your application wasn’t be seleted, please don’t be discouraged, you still have chance to share your comment as long as you purchased our products--click Submit Review on below related activity and share your experience and</p>
			</div>
			<div class="items">
				<div class="items_head">
					<span>Applying</span>
					<i>Announce Soon</i>
					<i>2020-03-20</i>
				</div>
				<div class="item_content">
					<img :src="require('../assets/imgs/free/11.jpg')">
					<div>Reddot Design Award | M-Care Toothbrush Set & UV Sanitizer | Crowdfunding Invitation</div>
					<button>Submit Review</button>
				</div>
			</div>
			<div class="items">
				<div class="items_head">
					<span>Applying</span>
					<i>Announce Soon</i>
					<i>2020-03-20</i>
				</div>
				<div class="item_content">
					<img :src="require('../assets/imgs/free/11.jpg')">
					<div>Reddot Design Award | M-Care Toothbrush Set & UV Sanitizer | Crowdfunding Invitation</div>
					<button class='active'>Submit Review</button>
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
export default {
	name:'apply',
	components: { 
    hotActivities,
	},
	data(){
		return{
			index:0
		}
	},
	methods:{
	}
}
</script>

<style lang="less" scoped>
.apply{
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
</style>