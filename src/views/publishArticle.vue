<template>
  <div class='publishArticle' :class='$store.state.isPc?"pcAuto":"mdAuto"'>
    <div class="right" v-if="$store.state.isPc">
      <h3>Instructions for Authors</h3>
      <p>To order to offer a clearer understanding of how to write a perfect article, we provide you a sample for your reference as below.</p>
      <div>
        <img :src="require('../assets/imgs/free/11.jpg')">
        <p class='oneLine'>Special Designed for Global Travel Global Travel</p>
      </div>
      <div>
        <img :src="require('../assets/imgs/free/11.jpg')">
        <p class='oneLine'>Special Designed for Global Travel Global Travel</p>
      </div>
      <div>
        <img :src="require('../assets/imgs/free/11.jpg')">
        <p class='oneLine'>Special Designed for Global Travel Global Travel</p>
      </div>
    </div>
    <div class="left">
      <div class="updataImgBox">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-upload
          v-if="$store.state.isPc"
          ref = 'upload'
          class="avatar-uploader"
          action="Upload"
          :http-request="subeImg"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          >
            <div class='updataImg' v-if='!imageUrl'>
              <i class='iconfont iconjiahao'></i>
              <h4>Upload Cover Image</h4>
              <p>To get a better display effect, we recommends you upload the cover image size not less than size of 905*480 pixels.</p>
            </div>
              <el-button type="primary" v-else class='changeImg'>Change Image</el-button>
        </el-upload>
        <el-upload
          v-else
          class="avatar-uploader"
          :on-success = 'onSuccessImg'
          :action="Upload"
          :limit = '1'
          :on-error = 'onErrorImg'
          :show-file-list="false"
          :before-upload="beforeAvatarUploadIsmd"
          >
            <div class='updataImg' v-if='!imageUrl'>
              <i class='iconfont iconjiahao'></i>
              <h4>Upload Cover Image</h4>
              <p>To get a better display effect, we recommends you upload the cover image size not less than size of 905*480 pixels.</p>
            </div>
              <el-button type="primary" v-else class='changeImg'>Change Image</el-button>
        </el-upload>
      </div>
      <el-input placeholder="Add Article Title" v-model="title"></el-input>
      <quill-editor ref="text" v-model="cooked" class="myQuillEditor" :options="editorOption" />
      <div class="btnBox">
        <button @click='toSubmit'>Submit</button>
        <!-- <button>Save</button>
        <button>Preview</button> -->
      </div>
    </div>
    <img-tailoring
      :isShowCropper.sync = 'isShowCropper'
      :imgUrl.sync = 'imgUrl'
      :fileUpload = 'fileUpload'
      :autoCropWidth = 'autoCropWidth'
      :autoCropHeight = 'autoCropHeight'
      :fixedBox = 'true'
      @subeImg = 'subeImg'
    >
    </img-tailoring>
  </div>
</template>

<script>
import  imgTailoring from "../components/imgTailoring";
import  {httpNetwork} from "../config/axios";
import { Upload } from '../config'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name:'publishArticle',
  components:{
    imgTailoring,
    quillEditor
  },
  data(){
    return{
      Upload,
      imageUrl:"",
      autoCropWidth:905,
      autoCropHeight:480,
      imgUrl:'',
      title:'',
      fileUpload: null,
      isShowCropper:false,
      cooked: '',
      ceping_review_photo_id:null,
      topic_id:null,
      editorOption: {} 
    }
  },
  mounted(){
    this.topic_id  = this.$route.query.id
    this.getArticle()
  },
  methods:{
    getArticle(){
      if(!this.topic_id) return false
      const data = {
        topic_id:this.topic_id
      }
      const url = `index.php?route=forum/forumtopiccreate/gettopic_bytopicid`
      return httpNetwork(url,data).then(res=>{
        this.title = res.data.title
        this.cooked = res.data.cooked
        this.imageUrl =  res.image.image_url,
        this.ceping_review_photo_id = res.image.ceping_review_photo_id
      })
    },
    toSubmit(isdraft){
      if(!this.ceping_review_photo_id){
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
      }else if(!this.cooked){
        this.$message({
          showClose: true,
          message: 'Please fill in the content first',
          type: 'error',
          duration:1500
        });
      }else{
        const data = {
          topic_id:this.topic_id,
          cooked:this.cooked,
          title:this.title,
          ceping_review_photo_id:this.ceping_review_photo_id
        }
        if(this.topic_id){ //修改
          const url = `index.php?route=forum/forumtopiccreate/updatetopic`
          return httpNetwork(url,data).then(res=>{
            this.$message({
              showClose: true,
              message: res.text,
              type: 'success',
              duration:1500
            });
            this.$router.push({path:'/myArticles'})
          })
        }else{
          const url = `index.php?route=forum/forumtopiccreate/createtopic`
          return httpNetwork(url,data).then(res=>{
            this.$message({
              showClose: true,
              message: res.text,
              type: 'success',
              duration:1500
            });
            this.$router.push({path:'/myArticles'})
          })
        }
      }
    },
    subeImg(file){
      let formData = new FormData(); // formdata格式
      formData.append('file', file)
      this.$axios.post(this.Upload,formData).then(res => {
        console.log(res)
        this.ceping_review_photo_id = res.data.ceping_review_photo_id
        this.imageUrl = res.data.photopath
      })
    },
    onSuccessImg(response, file, fileList){
      this.ceping_review_photo_id = response.ceping_review_photo_id
      this.imageUrl = response.photopath
    },
    onErrorImg(){
      this.$message({
        showClose: true,
        message: 'Upload failed!',
        type: 'error',
        duration:1500
      });
    },
    beforeAvatarUploadIsmd(file) {
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
      this.fileUpload = file;
      this.$nextTick(function () {
        let _this = this
        let reader = new FileReader()
        reader.onload = function (e) {
          _this.isShowCropper = true;
          _this.imgUrl = e.target.result // img里可以显示未上传的图片文件以供预览
        }
        reader.readAsDataURL(file)
      })
      return false;
    }
  }
}
</script>
<style lang="less" scoped>
  .publishArticle{
    margin-top: 53px;
    overflow: hidden;
    .left{
      width:895px;
      padding-bottom: 50px;
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
    .updataImgBox{
      background: white;
      height: 480px;
      position: relative;
      .avatar{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      div.updataImg{
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
    }
    .right{
      width: 283px;
      margin-left: 17px;
      overflow: hidden;
      float: right;
      >h3{
        font-size:28px;
        font-family:Whitney Semibold;
        font-weight:400;
        color:rgba(34,24,21,1);
      }
      >p{
        font-size:18px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(73,70,69,1);
        margin-top: 21px;
      }
      >div{
        margin-top: 16px;
        width: 100%;
        position: relative;
        >img{
          height:144px;
          width: 100%;
          vertical-align: top;
        }
        >p{
          position: absolute;
          bottom: 16px;
          left: 0;
          padding:0 14px;
          font-size:16px;
          font-family:Whitney;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }
    }

  }
  .changeImg{
    position: absolute;
    width: 180px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
@media screen and (max-width:960px){
  .publishArticle{
    margin-top: 0.2rem;
    .left{
      width:100%;
      padding:0 0.36rem;
      box-sizing: border-box;
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
    .updataImgBox{
      background: white;
      position: relative;
      .avatar{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      div.updataImg{
        position: absolute;
        width: 100%;
        top:50%;
        left: 0px;
        transform: translateY(-50%);
        text-align: center;
        padding:0 0.36rem;
        box-sizing: border-box;
        >i{
          font-size: 0.55rem;
          color:rgba(227,22,25,1);
          cursor: pointer;
        }
        >h4{
          font-size:0.34rem;
          margin-top: 0.4rem;
        }
        >p{
          font-size:0.32rem;
          margin-top:0.5rem;
        }
      }
    }
  }
}
</style>