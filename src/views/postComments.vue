<template>
  <div class='postComments' :class='$store.state.isPc?"pcAuto":"mdAuto"'>
      <div class="updataImg">
        <div v-for='(v,i) in imgList' :key='i'>
          <img :src="v">
          <i class='iconfont iconchazishanchudaibiankuang' @click='deleteImg(i)'></i>
        </div>
        <el-upload
          :class='!imgList.length?"imgTipBox":"upload-demo add"'
          :action='Upload'
          :on-success = 'onSuccessImg'
          :before-upload = 'beforeAvatarUpload'
          multiple
          :on-error = 'onErrorImg'
          :show-file-list = 'false'
          >
          <div class='imgTip' v-if='!imgList.length'>
            <i class='iconfont iconjiahao'></i>
            <p>Please upload at least 4 product images which size not less than size of 750*750 pixels.</p>
          </div>
          <i class='iconfont iconjiahao' v-else></i>
        </el-upload>
      </div>
      <el-input placeholder="Add Article Title" v-model="title"></el-input>
      <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
      <div class="btnBox">
        <button @click='toSubmit(0)'>Submit</button>
        <button @click='toSubmit(1)'>Save</button>
        <!-- <button>Preview</button> -->
      </div>
      <el-dialog 
        class="showSuccess"
        :visible.sync="showSuccess"
        :show-close	= 'false'
      >
        <i class='iconfont iconchazishanchudaibiankuang' @click='showSuccess=false'></i>
        <p>{{this.isdraft?'Your article has been saved':'Your article has been published successfully'}}</p>
        <button @click='tolink'>Go and Check</button>
      </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { Upload } from '../config'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import  {httpNetwork} from "../config/axios";
export default {
  name:'postComments',
  components:{
    quillEditor
  },
  data(){
    return{
      Upload,
      imgList:[],
      imgIds:[],
      isShowCropper:false,
      content: '',
      editorOption: {
        // action:  'https://www.bestekdirect.com/index.php?route=forum/photos/upload',  // 必填参数 图片上传地址
        // methods: 'post',  // 必填参数 图片上传方式
      },
      product_activity_id:null,
      ceping_review_id:null,
      title:'',
      showSuccess:false,
      isdraft:0
    }
  },
  mounted(){
    this.product_activity_id = this.$route.query.id
    this.ceping_review_id = this.$route.query.cid
    this.getReview()
  },
  methods:{
    tolink(){
      if(this.isdraft){
        this.$router.push({path:'/myCenter',query:{leftIndex:9}})
      }else{
        this.$router.push({path:'/myCenter',query:{leftIndex:10}})
      }
    },
    getReview(){
      if(!this.ceping_review_id) return false
      const data = {
        ceping_review_id:this.ceping_review_id
      }
      const url = `index.php?route=forum/ceping/review_get`
      return httpNetwork(url,data).then(res=>{
        res.data.review_images.map(v=>{
          this.imgList.push(v.photopath)
          this.imgIds.push(v.ceping_review_photo_id)
        })
        this.title = res.data.review_title
        this.content = res.data.review_content
      })
    },
    toSubmit(isdraft){
      this.isdraft = isdraft
      console.log(this.isdraft)
      if(!this.product_activity_id && !this.ceping_review_id){
        this.$message({
          showClose: true,
          message: 'ID does not exist！',
          type: 'error',
          duration:1500
        });
      }else if(this.imgList.length<1){
        this.$message({
          showClose: true,
          message: 'Please upload the picture first！',
          type: 'error',
          duration:1500
        });
      }else if(!this.title){
        this.$message({
          showClose: true,
          message: 'Please fill in the title first！',
          type: 'error',
          duration:1500
        });
      }else if(!this.content){
        this.$message({
          showClose: true,
          message: 'Please fill in the content first',
          type: 'error',
          duration:1500
        });
      }else{
        const data = {
          isdraft:isdraft,
          product_activity_id:this.product_activity_id,
          ceping_review_id:this.ceping_review_id,
          review_content:this.content,
          review_title:this.title,
          review_image_ids:this.imgIds.join(',')
        }
        if(this.ceping_review_id){ //修改
          const url = `index.php?route=forum/ceping/review_update`
          return httpNetwork(url,data).then(res=>{
            this.$message({
              showClose: true,
              message: res.text,
              type: 'success',
              duration:1500
            });
            this.$router.push({path:'/myCenter',query:{leftIndex:10}})
          })
        }else{
          const url = `index.php?route=forum/ceping/review_add`
          return httpNetwork(url,data).then(res=>{
            // this.$message({
            //   showClose: true,
            //   message: res.text,
            //   type: 'success',
            //   duration:1500
            // });
            this.showSuccess =true
          })
        }
      }
    },
    deleteImg(index){
      this.imgList.splice(index,1)
      this.imgIds.splice(index,1)
    },
    onSuccessImg(response, file, fileList){
      this.imgList.push(response.photopath)
      this.imgIds.push(response.ceping_review_photo_id)
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
    }
  }
}
</script>
<style lang="less" scoped>
  .postComments{
    margin-top: 53px;
    overflow: hidden;
    .updataImg{
      background: white;
      padding:0 39px;
      min-height: 480px;
      >div{
        display: inline-block;
        vertical-align: top;
        width:113px;
        height:114px;
        position: relative;
        margin-right: 23px;
        margin-top: 43px;
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
    .el-input{
      margin: 16px 0;
    }
    /deep/.ql-editor{
      min-height: 400px;
    }
    .btnBox{
      text-align: center;
      margin-top: 30px;
      >button{
        cursor: pointer;
        width:194px;
        height:46px;
        border-radius:23px;
        border: none;
        padding:0;
        font-size:22px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(255,255,255,1);
        background:rgba(209,209,210,1);
        margin-right: 18px;
        &:last-of-type{
          margin-right: 0px;
        }
        &:hover{
          background:rgba(228,0,0,1);
        }
      }
    }
  }
.imgTipBox{
  position: relative;
  min-height: 480px!important;
  width: 100%!important;
}
div.imgTip{
  position: absolute;
  width: 100%;
  top:50%;
  left: 0px;
  transform: translateY(-50%);
  text-align: center;
  padding:0 82px;
  box-sizing: border-box;
  >i{
    font-size: 55px;
    color:rgba(227,22,25,1);
    cursor: pointer;
  }
  >h4{
    font-size:28px;
    font-family:Whitney Semibold;
    font-weight:400;
    color:rgba(34,24,21,1);
    margin-top: 36px;
  }
  >p{
    font-size:18px;
    font-family:Whitney Book;
    font-weight:400;
    color:rgba(73,70,69,1);
    margin-top:10px;
  }
}
.showSuccess{
  /deep/.el-dialog{
    background: transparent;
    position: static;
  }
  /deep/ .el-dialog{
    
    margin-top: 0px!important;
  }
  /deep/.el-dialog__header{
    display: none;
  }
  /deep/.el-dialog__body{
    width: 695px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    position: absolute;
    padding: 127px 0px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    >i{
      font-size: 43px;
      color:#EBECED;
      position: absolute;
      top:-22px;
      right: -18px;
      cursor: pointer;
    }
    >p{
      font-size:32px;
      font-family:Whitney Semibold;
      font-weight:400;
      color:rgba(73,70,69,1);
      line-height:38px;
    }
    >button{
      margin-top: 49px;
      width:300px;
      height:35px;
      line-height: 35px;
      background:#D1D1D2;
      border-radius:18px;
      outline: none;
      font-size:20px;
      font-family:Whitney Book;
      font-weight:400;
      color:rgba(255,255,255,1);
      border:none;
      cursor: pointer;
      &:hover{
        background:rgba(227,22,25,1);
      }
    }
  }
}
  @media screen and (max-width:960px){
    .postComments{
      margin-top: 0.53rem;
      overflow: hidden;
      padding:0 0.36rem;
      .updataImg{
        padding:0 0.3rem;
        min-height: 4.80rem;
        >div{
          width:1.13rem;
          height:1.14rem;
          margin-right: 0.23rem;
          margin-top:0.43rem;
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
      .el-input{
        margin: 0.16rem 0;
      }
      /deep/.ql-editor{
        min-height: 4rem;
      }
      .btnBox{
        text-align: center;
        margin-top: 0.3rem;
        >button{
          width:1.94rem;
          height:0.46rem;
          border-radius:23px;
          font-size:0.32rem;
          margin-right: 0.18rem;
        }
      }
    }
    .showSuccess{
      /deep/ .el-dialog{
        margin-top: 0px;
      }
      /deep/.el-dialog__body{
        background:rgba(255,255,255,1);
        border-radius:20px;
        padding: 1.27rem 0px;
        width: 6.79rem;
        >i{
          font-size: 0.58rem;
          top:-0.25rem;
          right: -0.2rem;
        }
        >p{
          font-size:0.36rem;
          line-height:0.45rem;
        }
        >button{
          margin-top:0.7rem;
          width:4rem;
          height:0.58rem;
          line-height: 0.58rem;
          border-radius:0.3rem;
          font-size:0.32rem;
        }
      }
    }
    div.imgTip{
      padding:0 0.42rem;
      >i{
        font-size:0.8rem;
      }
      >p{
        font-size:0.32rem;
        margin-top:0.5rem;
      }
    }
  }
</style>