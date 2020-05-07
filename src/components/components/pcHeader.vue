<template>
  <div class="header-box">
    <div class="header">
      <div class="logo" @mouseover="isClassifyOver=false">
        <router-link to="/home"><img src="../../assets/img20191220/logo.png" alt=""></router-link>
      </div>
      <div class="classify-box">
        <a target="_blank" :class="classifyIndex==index?'active':''" :href="index==classifyPc.length-1&&item.href" @mouseover="classifyOver(index,item.children)" v-for="(item, index) in classifyPc" :key="index">{{item.name}}</a>
      </div>
      <transition name="fade">
        <div class="product-view" :style="{height:pViewHeight+'px'}" v-show="isClassifyOver" @mouseover="productViewOver($event)">
          <my-classify :insetMsg="insetMsg" ref="myClassify"></my-classify>
        </div>
      </transition>
      <div class="userMsg" @mouseover="isClassifyOver=false">
        <div class="input_s">
          <input type="text" v-model="keyword" placeholder="Power Inverter">
          <img @click="headerSearch" src="@/assets/img20191220/search.png" alt="">
        </div>
        <div class="cart">
          <a href="https://www.bestekdirect.com/groupbuy/ShoppingCart1.html"><img src="@/assets/img20191220/shop_cart.png" alt=""></a>
          <span v-if="shoppingNum>0">{{shoppingNum}}</span>
        </div>
        <a href="https://www.bestekdirect.com/index.php?route=account/account" class="user"><img src="@/assets/img20191220/user.png" alt=""></a>
      </div>
    </div>
  </div>
</template>
<script>
import myClassify from '@/components/components/classify'

export default {
  components: {
    myClassify
  },
  props: ['classifyPc', 'shoppingNum'],
  data () {
    return {
      isClassifyOver: false,
      //类目弹出框的高度
      pViewHeight: 0,
      insetMsg: [
        { href: '', name: '' }
      ],
      keyword: '',
      classifyIndex: -1
    }
  },
  mounted () {
    this.pViewHeight = $(window).height() - 64;
  },
  methods: {
    headerSearch () {
      if (!this.keyword || /^\s+$/.test((this.keyword))) {
        this.$message.error('Please enter a keyword');
        return;
      }
      window.open('https://www.bestekdirect.com/search_results?k=' + this.keyword.trim());
    },
    productViewOver (e) {
      if ($(e.target).hasClass('product-view')) {
        this.isClassifyOver = false;
        this.classifyIndex = -1;
      }
    },
    classifyOver (idx, insetMsg) {
      if (idx == this.classifyPc.length - 1) {
        this.isClassifyOver = false;
        this.classifyIndex = -1;
        return;
      }
      if (this.classifyIndex != idx) {
        this.$refs.myClassify.changeClassiy(0);
      }
      this.isClassifyOver = true;
      this.insetMsg = insetMsg;
      this.classifyIndex = idx;
    },
  }
}
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@keyframes animateView {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@height: 64px;
.header-box {
  width: 100%;
  height: @height;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 5;
  .header {
    width: 1210px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .animateView {
      animation: animateView 0.3s linear;
    }
    .product-view {
      position: absolute;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 4;
      top: @height;
      left: 0;
    }
    .logo {
      width: 214px;
      height: @height;
      display: flex;
      align-items: center;
      img {
        width: 134.5px;
        display: block;
      }
    }
    .classify-box {
      width: 619.5px;
      height: @height;
      font-family: Whitney-Semibold;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      margin-right: 91.5px;
      a {
        display: inline-block;
        cursor: pointer;
        height: @height;
        line-height: @height;
        color: #444444;
        &:hover {
          color: #e53421;
          text-decoration: none;
        }
      }
      a.active {
        color: #e53421;
      }
    }
    .userMsg {
      width: 285px;
      height: 100%;
      display: flex;
      align-items: center;
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
          width: 20.5px;
          top: 4px;
          position: absolute;
          right: 15px;
          cursor: pointer;
        }
      }
      .cart {
        width: 28.5px;
        height: 22.5px;
        position: relative;
        text-align: right;
        img {
          width: 100%;
          cursor: pointer;
        }
        span {
          position: absolute;
          top: -7px;
          right: -11px;
          width: 17px;
          height: 17px;
          background: #d12f20;
          border-radius: 50%;
          color: #fff;
          font-size: 0.2rem;
          text-align: center;
        }
      }
      .user {
        width: 20px;
        height: 22.5px;
        margin-left: 22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
@media screen and (max-width: 1425px) {
  .header-box {
    width: 1425px;
    position: unset;
  }
}
</style>