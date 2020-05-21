import hotActivities from '../components/hotActivities'
import  {httpNetwork} from "../config/axios"
import Utils from '../config/util'
export default {
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
		Utils.$on('init', (i)=>{
			console.log(i)
        this.init(i);
    })
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
            if(v.archived==='f'){
              this.fList.push(v)
            }else if(v.archived==='t'){
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