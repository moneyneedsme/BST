<template>
  <div class='postComments' :class='$store.state.isPc?"pcAuto":"mdAuto"'>
      <div class="updataImg">
        <div v-for='(v,i) in imgList' :key='i'>
          <img :src="v">
          <i class='iconfont iconchazishanchudaibiankuang'></i>
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
      <el-input placeholder="Add Article Title"></el-input>
      <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
      <div class="btnBox">
        <button @click='toSubmit'>Submit</button>
        <button>Save</button>
        <button>Preview</button>
        {{content}}
      </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { Upload } from '../config'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name:'postComments',
  components:{
    quillEditor
  },
  data(){
    return{
      Upload,
      imgList:[require('../assets/imgs/free/11.jpg')],
      isShowCropper:false,
      content: '',
      editorOption: {
        // action:  'https://www.bestekdirect.com/index.php?route=forum/photos/upload',  // 必填参数 图片上传地址
        // methods: 'post',  // 必填参数 图片上传方式
      }
    }
  },
  methods:{
    toSubmit(){
      console.log(this.$refs.text.value)
    },
    onSuccessImg(response, file, fileList){
      console.log(response, file, fileList)
    },
    onErrorImg(){
      this.$message.error('Upload failed!');
    },
    beforeAvatarUpload(file) {
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
</style>