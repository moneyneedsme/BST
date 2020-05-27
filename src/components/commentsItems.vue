<template>
  <div class='commentsItems'>
    <div v-for='(v,i) in list' :key='v.comment_id'>
      <div class='imgBox'>
        <img :src="v.avatar">
        <p>{{v.user_name}}</p>
      </div>
      <div class='centent'>
        <div class="times">
          <span>{{format(v.date_added,"yyyy mmm d hh:mm:ss")}}</span>
          <i>{{v.louceng}}#</i>
        </div>
        <p>{{v.content}}</p>
        <div class="imgShow" v-if='v.images.length'>
          <el-image 
            class="bigImg"
            v-for="(val,index) in v.images" :src="imgUrl+val.photopath" :key="index"
            :preview-src-list="srcList[i]"
          >
          </el-image>
        </div>
        <div class='zan'>
          <span >{{v.numbers_like}}</span>
          <i @click='toZan(v,i)' class='iconfont iconxin'></i>
          <i class='iconfont iconlianjie'></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  {httpNetwork} from "../config/axios"
import  format from "../config/format"
export default {
  name:'commentsItems',
  props:{
    list:{
      type: Array,
      default() {
        return []
      }
    }
  },
  computed:{
    commentsList(){
      return this.list||[]
    },
    srcList(){
      let ary = []
      this.list.map((v,i)=>{
        ary[i] = []
        v.images.map(value=>{
          ary[i].push(this.imgUrl+value.photopath)
        })
      })
      return ary
    }
  },
  methods:{
    format,
    toZan(item,index){
      const url = `index.php?route=forum/ceping/commentlike`
      const data = {
        ceping_comment_id:item.ceping_review_id,
        type:item.type=='1'?'0':'1',
      }
      return httpNetwork(url,data).then(res=>{
        this.$message({
          showClose: true,
          message: res.text,
          type: 'success',
          duration:1500
        });
        this.$set(this.list[index],'type',item.type=='1'?'0':'1')
        this.$set(this.list[index],'numbers_like',this.list[index].numbers_like++)
      })
      console.log(item)
    }
  }
}
</script>

<style lang="less" scoped>
.commentsItems{
  overflow: hidden;
  background: white;
  >div{
    padding:55px 0 21px;
    border-bottom:1px solid rgba(244,244,244,1);
    font-size: 0;
    overflow: hidden;
    .imgBox{
      float: left;
      width: 55px;
      margin-top: 20px;
      margin-right: 37px;
      >img{
        width:55px;
        height: 55px;
        vertical-align: top;
        border-radius: 50%;
      }
      >p{
        text-align: center;
        font-size:16px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(187,187,187,1);
        margin-top: 10px;
      }
    }
    .centent{
      overflow: hidden;
      .imgShow{
        overflow: hidden;
        margin-top: 10px;
        /deep/.bigImg{
          >img{
            margin-top: 10px;
            width: 90px;
            height: 90px;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
      }
      .times{
        overflow: hidden;
        >span,>i{
          font-size:16px;
          font-family:Whitney Book;
          font-weight:400;
          color:rgba(110,110,110,1);
        }
        >i{
          float: right;
        }
      }
      >p{
        margin: 21px 0 0;
        font-size:18px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(89,87,87,1);
        line-height:24px;
      }
      .zan{
        text-align: right;
        margin-top: 45px;
        >span{
          font-size:20px;
          font-family:Whitney;
          font-weight:500;
          color:rgba(186,186,186,1);
        }
        >i{
          color:rgba(186,186,186,1);
          margin-left:8px;
          font-size:18px;
          cursor: pointer;
          &:hover{
            color:#4f4b4b
          }
        }
      }
    }
  }
}
@media screen and (max-width:960px){
  .commentsItems{
    >div{
      padding:0.48rem 0 0.15rem;
      border-bottom:0px;
      border-top:1px solid rgba(244,244,244,1);
      &:last-of-type{
        border-bottom:1px solid rgba(244,244,244,1);
      }
      .imgBox{
        width: 0.55rem;
        margin-top:0;
        margin-right: 0.37rem;
        >img{
          width:0.55rem;
          height: 0.55rem;
        }
        >p{
          font-size:0.24rem;
          margin-top: 0.16rem;
        }
      }
      .centent{
        .imgShow{
          margin-top:0.1rem;
          /deep/.bigImg{
            >img{
              width:1rem;
              height:1rem;
              margin-right:0.1rem
            }
          }
        }
        .times{
          >span,>i{
            font-size:0.24rem;
          }
        }
        >p{
          margin: 0.21rem 0 0;
          font-size:0.26rem;
          line-height:0.40rem;
        }
        .zan{
          margin-top: 0.45rem;
          >span{
            font-size:0.24rem;
          }
          >i{
            margin-left:0.2rem;
            font-size:0.24rem;
          }
        }
      }
    }
  }
}
</style>
