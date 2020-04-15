<template>
  <div class='commentsItems'>
    <div v-for='(v,i) in list' :key='v.name+i'>
      <div class='imgBox'>
        <img :src="v.imgUrl">
        <p>{{v.name}}</p>
      </div>
      <div class='centent'>
        <div class="times">
          <span>{{v.time}}</span>
          <i>{{i+1}}#</i>
        </div>
        <p>{{v.content}}</p>
        <div class='zan'>
          <span>{{v.zanNum}}</span>
          <i class='iconfont iconxin'></i>
          <i class='iconfont iconlianjie'></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  data(){
    return{
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
        margin: 21px 0 45px;
        font-size:18px;
        font-family:Whitney Book;
        font-weight:400;
        color:rgba(89,87,87,1);
        line-height:24px;
      }
      .zan{
        text-align: right;
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
        .times{
          >span,>i{
            font-size:0.24rem;
          }
        }
        >p{
          margin: 0.21rem 0 0.45rem;
          font-size:0.26rem;
          line-height:0.40rem;
        }
        .zan{
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
