<template>
  <div class='comments'>
    <h3>Comments</h3>
    <div class='box'>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows:5}"
        placeholder="Share your thoughts......"
        v-model="content">
      </el-input>
      <div class="updataImg">
        <div v-for='(v,i) in imgList' :key='i'>
          <img :src="v">
          <i class='iconfont iconchazishanchudaibiankuang' @click='deleteImg(i)'></i>
        </div>
        <el-upload
          class="upload-demo add"
          :action='Upload'
          :on-success = 'onSuccessImg'
          :before-upload = 'beforeAvatarUpload'
          multiple
          :on-error = 'onErrorImg'
          :show-file-list = 'false'
          >
          <i class='iconfont iconjiahao'></i>
        </el-upload>
      </div>
      <div class='btnBox'>
        <el-button round @click='Cancel'>Cancel</el-button>
        <el-button :class='{"Release":content.length}' round @click='onRelease'>Release</el-button>
      </div>
    </div>
    <commentsItems
      class='commentsItems'
      :list= 'list'
    ></commentsItems>
    <el-pagination
      v-if='$store.state.isPc'
      background
      v-show='list.length'
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    <el-pagination
      v-else
      small
      v-show='list.length'
      @current-change = 'currentChange'
      :pageSize='pageSize'
      :currentPage = 'currentPage'
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import commentsItems from '../components/commentsItems'
import  {httpNetwork} from "../config/axios"
import { Upload } from '../config'
export default {
  name:'comments',
  components:{
    commentsItems
  },
  props:['product_activity_id','ceping_review_id'],
  data(){
    return{
      Upload:'https://www.bestekdirect.com/index.php?route=forum/photos/uploadcommentphoto',
      list:[],
      content:'',
      pageSize:10,
      currentPage:1,
      total:1,
      imgList:[],
      imgIds:[],
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    Cancel(){
      this.content = ''
      this.imgList = []
      this.imgIds = []
    },
    deleteImg(index){
      this.imgList.splice(index,1)
      this.imgIds.splice(index,1)
    },
    onSuccessImg(response, file, fileList){
      this.imgList.push(response.photopath)
      this.imgIds.push(response.ceping_comment_photo_id)
    },
    onErrorImg(){
      this.$message({
        showClose: true,
        message: 'Upload failed!',
        type: 'error',
        duration:1500
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 8;
      if (!isJPG&&!isPNG) {
          this.$message({
            showClose: true,
            message: 'The uploaded image can only be in JPG or PNG format!',
            type: 'error',
            duration:1500
          });
        return false;
      }
      if (!isLt2M) {
        this.$message({
          showClose: true,
          message: 'The size of uploaded picture cannot exceed 8MB!',
          type: 'error',
          duration:1500
        });
        return false;
      }
    },
    currentChange(num){
      this.currentPage = num
      this.getList()
    },
    getList(){
      const url = `index.php?route=forum/ceping/comment_getall&product_activity_id=${this.product_activity_id}&page=${this.currentPage}&limit=${this.pageSize}`
      return httpNetwork(url,null,'get').then(res=>{
        this.list = res.data
        this.currentPage = res.currentpage
        this.total = parseInt(res.totalnums)
      })
    },
    onRelease(){
      const url = `index.php?route=forum/ceping/comment_add`
      const data = {
        ceping_review_id:this.ceping_review_id,
        product_activity_id:this.product_activity_id,
        content:this.content,
        comment_image_ids:this.imgIds.join(',')
      }
      return httpNetwork(url,data).then(res=>{
        this.content = ''
        this.imgList = []
      this.imgIds = []
        this.$message({
          showClose: true,
          message: res.text,
          type: 'success',
          duration:1500
        });
        this.getList()
      })
    },
  }
}
</script>

<style lang="less" scoped>
.comments{
  overflow: hidden;
  background: white;
  padding:0px 63px 74px;
  >h3{
    text-align: center;
    font-size:32px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(73,70,69,1);
    margin-bottom: 63px;
  }
  .box{
    padding:40px 30px;
    border:1px solid rgba(208,208,208,1);
    border-radius:5px;
    .updataImg{
      background: white;
      padding:15px 10px;
      border: 1px solid #d0d0d0;
      margin-top: 20px;
      >div{
        display: inline-block;
        vertical-align: top;
        width:113px;
        height:114px;
        position: relative;
        margin-right: 23px;
        margin-top:10px;
        >img{
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
        .iconchazishanchudaibiankuang{
          position: absolute;
          top:2px;
          right:2px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .add{
        line-height: 114px;
        text-align: center;
        .iconjiahao{
          font-size: 42px;
          color:rgba(227,22,25,1);
          cursor: pointer;
        }
        
      }
    }
  }
  .el-button.is-round{
    width:102px;
    height:30px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(208,208,208,1);
    border-radius:15px;
    padding:0px;
    box-sizing: border-box;
    &:hover{
      color:white;
      background: #E31619;
      border:1px solid #E31619;
    }
  }
  .el-button{
    font-size:18px;
    font-family:Whitney;
    font-weight:500;
    color:rgba(89,87,87,1);
  }
  .btnBox{
    margin-top: 21px;
    text-align: right;
    margin-bottom: 30px;
    button.Release {
      background:#E31619;
      color: white;
      &:hover{
        color:white;
        background: #E31619;
        border:1px solid #E31619;
      }
    }
  }
  .el-pagination{
    text-align: center;
  }
  /deep/.el-pagination.is-background .el-pager li{
    background: transparent;
    font-family:Whitney;
    font-weight:500;
    color:rgba(137,137,137,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    border: 1px solid rgba(210,209,211,1);;
    box-sizing: border-box;
  }
  /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(227,22,25,1);
    color:white
  }
  /deep/.el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev{
    background: transparent;
    border: 1px solid rgba(210,209,211,1);
    width: 26px;
    height: 26px;
    line-height: 26px;
    min-width: auto;
  }
  .commentsItems{
    margin-bottom: 56px;
  }
}
@media screen and (max-width:960px){
  .comments{
    padding:0px 0.36rem 0rem;
    >h3{
      font-size:0.45rem;
      margin-bottom: 0.63rem;
    }
    .el-button.is-round{
      width:1.32rem;
      height:0.4rem;
      border-radius:0.2rem;
    }
    .el-button{
      font-size:0.24rem;
      font-family:Whitney;
      font-weight:500;
      color:rgba(89,87,87,1);
    }
    .btnBox{
      margin-top: 0.21rem;
      margin-bottom: 0.30rem;
      button.Release {
        margin-left: 0.15rem;
      }
    }
    /deep/.el-pager li.active{
      color:rgba(227,22,25,1);
    }
    .commentsItems{
      margin-bottom: 0.56rem;
    }
    .box{
      padding:0.4rem 0.3rem;
      .updataImg{
        padding:0.15rem 0.1rem;
        margin-top: 0.2rem;
        >div{
          width:1.13rem;
          height:1.14rem;
          margin-right: 0.23rem;
          margin-top:0.23rem;
          .iconchazishanchudaibiankuang{
            top:2px;
            right:2px;
            font-size:0.28rem;
          }
        }
        .add{
          line-height: 1.14rem;
          .iconjiahao{
            font-size: 0.42rem;
          }
        }
      }
    }
  }
}
</style>