<template>
  <div class="mheader">
    <div class="mMenu" @click="clickMenu"><i :class="isExpand?'mOne mOneAni':'mOne'"></i><i :class="isExpand?'mTwo mTwoAni':'mTwo'"></i><i :class="isExpand?'mThree mThreeAni':'mThree'"></i></div>
    <div class="mLogo">
      <router-link to="/home"><img src="../../assets/img20191220/logo.png" alt=""></router-link>
    </div>
    <div class="mCart">
      <a href="https://www.bestekdirect.com/index.php?route=account/account" class="user"><img style="width:.55rem;margin-right:.2rem" src="@/assets/img20191220/user.png" alt=""></a>
      <a href="https://www.bestekdirect.com/groupbuy/ShoppingCart1.html"></a><img src="@/assets/img20191220/shop_cart.png" alt=""></a>
      <span v-if="shoppingNum>0">{{shoppingNum}}</span>
    </div>
    <div class="mClassify" :style="{height:mClassifyH+'px',paddingTop:'.3rem'}">
      <div style="padding-bottom:.2rem;margin:0 0.3rem" v-for="(item, index) in classifyMb" :key="index">
        <div class="mClassify-item" @click="openLinks(index)">
          <div>
            <img class="bg" :src="$api+item.image" alt="">
          </div>
          <h3>{{item.name}}<span><img :class="item.isShowLink?'isShowLink':''" src="@/assets/img20191220/jiantou.png" alt=""></span></h3>
        </div>
        <el-collapse-transition>
          <div v-show="item.isShowLink">
            <ul class="mLinks">
              <li v-for="(item2, index2) in item.children" :key="index2">
                <a :href="item2.href">{{item2.name}}
                  <img src="@/assets/img20191220/jiantou2.png" alt="">
                </a>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </div>
      <div class="input_s mInput_s">
        <input v-model="keyword" type="text" placeholder="Power Inverter">
        <img @click="headerSearch" src="@/assets/img20191220/search.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import img1 from '@/assets/img20191220/CarPower.png'

export default {
  data () {
    return {
      isExpand: false,
      mClassifyH: 0,
      keyword: ''
    }
  },
  props: ['classifyMb', 'shoppingNum'],
  mounted () {
    this.mClassifyH = $(window).height() - 100;
  },
  methods: {
    openLinks (idx) {
      this.classifyMb[idx].isShowLink = !this.classifyMb[idx].isShowLink;
      this.classifyMb.forEach((_, _index) => {
        if (_index != idx) {
          _.isShowLink = false;
        }
      })
    },
    //切换类目
    clickMenu () {
      if (!this.isExpand) {
        $('.mClassify').stop().slideDown(200);
      } else {
        $('.mClassify').stop().slideUp(200);
      }
      this.isExpand = !this.isExpand;
    },
    headerSearch () {
      if (!this.keyword || /^\s+$/.test((this.keyword))) {
        this.$message.error('请输入关键字');
        return;
      }
      window.open('https://www.bestekdirect.com/search_results?k=' + this.keyword.trim());
    },
  }
}
</script>
<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mheader:extend(.flex) {
  position: fixed;
  width: 100%;
  height: 1.5rem;
  z-index: 99;
  background: #fff;
  padding: 0 0.5rem;
  .mMenu {
    i {
      display: block;
      width: 0.9rem;
      height: 3px;
      background: #808080;
      border-radius: 0.2rem;
      &:not(:last-child) {
        margin-bottom: 0.11rem;
      }
      transition: all 0.2s;
    }
    .mOneAni {
      transform: rotate(47deg) translate(1px, 6px);
    }
    .mTwo {
      width: 1rem;
      transition: all 0.4s;
    }
    .mThree {
      width: 0.7rem;
    }
    .mThreeAni {
      width: 0.9rem;
      transform: rotate(-45deg) translate(3px, -10px);
    }
    .mTwoAni {
      transform: translateX(-15px);
      opacity: 0;
    }
  }
  .mLogo {
    padding-top: 0.1rem;
    img {
      width: 3.3rem;
    }
  }
  .mCart {
    position: relative;
    img {
      width: 0.8rem;
    }
    span {
      position: absolute;
      top: -0.2rem;
      right: -0.2rem;
      width: 0.4rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #d12f20;
      border-radius: 50%;
      color: #fff;
      font-size: 0.35rem;
      text-align: center;
    }
  }
  .mClassify {
    background: #dddddd;
    position: absolute;
    top: 1.5rem;
    left: 0;
    width: 100%;
    display: none;
    overflow-y: scroll;
    padding-bottom: 1.5rem;
    .input_s {
      position: relative;
      margin-right: 22px;
      input {
        width: 192.5px;
        height: 30px;
        background: rgba(241, 243, 244, 1);
        border-radius: 30px;
        border: none;
        padding-left: 0.5rem;
      }
      img {
        width: 0.6rem;
        top: 0.4rem;
        position: absolute;
        right: 0.8rem;
        cursor: pointer;
      }
    }
    .mInput_s {
      margin-right: 0;
      position: fixed;
      width: 100%;
      bottom: 0;
      background: #fff;
      padding: 0.3rem;
      input {
        width: 100%;
      }
    }
    .mLinks {
      background: #fff;
      padding: 0.5rem 0.3rem;
      padding-top: 0;
      li {
        color: #444;
        font-family: Whitney-Book;
        border-bottom: 1px solid #bebebe;
        a {
          color: #444;
          font-family: Whitney-Book;
          font-size: 0.45rem;
          display: block;
          position: relative;
          padding: 0.5rem 0;
          &:hover {
            text-decoration: none;
          }
          img {
            width: 0.45rem;
            position: absolute;
            top: 0.5rem;
            right: 0;
          }
        }
      }
    }
    div.mClassify-item {
      position: relative;
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
      .isShowLink {
        transform: rotate(90deg);
      }
      img.bg {
        width: 100%;
        display: block;
      }
      h3 {
        position: absolute;
        z-index: 2;
        color: #fff;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.7rem;
        font-family: Whitney-Medium;
        height: 0.7rem;
        line-height: 0.7rem;
        span {
          width: 0.5rem;
          position: absolute;
          top: 0;
          right: 1rem;
          img {
            width: 100%;
            transition: all 0.25s;
          }
        }
      }
    }
  }
}
</style>