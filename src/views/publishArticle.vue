<template>
  <div class='publishArticle' :class='$store.state.isPc?"pcAuto":"mdAuto"'>
    <div class="right">
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
        <el-upload
            ref = 'upload'
            class="avatar-uploader"
            :http-request="subeImg"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <div class='updataImg'>
                <i class='iconfont iconjiahao'></i>
                <h4>Upload Cover Image</h4>
                <p>To get a better display effect, we recommends you upload the cover image size not less than size of 905*480 pixels.</p>
              </div>
          </el-upload>
        </div>
        <el-input placeholder="Add Article Title"></el-input>
        <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
        <div class="btnBox">
          <button>Submit</button>
          <button>Save</button>
          <button>Preview</button>
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
      autoCropWidth:200,
      autoCropHeight:200,
      imgUrl:'',
      fileUpload: null,
      isShowCropper:false,
      content: '',
      editorOption: {} 
    }
  },
  methods:{
    subeImg(file){
      // this.fileList = []
      // this.$refs.upload.submit();
      // let reader = new FileReader()
      //   reader.onload = function (e) {
      //     console.log(e)
      //   }
      //   reader.readAsDataURL(file)
      // console.log(file)
        let formData = new FormData();//formdata格式
       formData.append('file', file);
       httpNetwork(this.Upload,formData).then(res => {
         console.log(res)
       });
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 8;
      if (!isJPG&&!isPNG) {
        this.$message.error('The uploaded image can only be in JPG or PNG format!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('The size of uploaded picture cannot exceed 8MB!');
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
</style>