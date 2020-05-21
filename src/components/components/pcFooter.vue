<template>
  <div style="min-width: 1425px;">
    <div class="footer-container">
      <div class="footer">
        <div class="logo" @mouseover="isClassifyOver=false">
          <router-link to="/home"><img src="../../assets/img20191220/logo.png" alt=""></router-link>
        </div>
        <div class="links">
          <div class="seller">
            <h3>Best Seller</h3>
            <ul>
              <li v-for="(item, index) in links_seller" :key="index"><a target="_blank" :href="item.link">{{item.title}}</a></li>
            </ul>
          </div>
          <div class="aboutUs">
            <h3>About Us</h3>
            <ul>
              <li v-for="(item, index) in links_us" :key="index"><a target="_blank" :href="item.link">{{item.title}}</a></li>
            </ul>
          </div>
          <div class="support">
            <h3>Support</h3>
            <ul>
              <li v-for="(item, index) in links_support" :key="index"><a target="_blank" :href="item.link">{{item.title}}</a></li>
            </ul>
          </div>
          <div class="follow">
            <h2>Follow Us On</h2>
            <div class="icons">
              <a @mouseover="changeIcon(1,index)" target="_blank" @mouseout="changeIcon(2,index)" :href="item.link" v-for="(item, index) in followImgs" :key="index"><img :src="item.isOver?item.img2:item.img" alt=""></a>
            </div>
            <div class="usa" @click="showDialog">
              <img src="@/assets/img20191220/usa.png" alt=""><span>United States</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="company-box">
      <div class="company">
        <div class="text" style="text-align:center;width:100%">
          <span>©2020 BESTEK . Official Site</span>
          <a target="_blank" href="https://www.bestekdirect.com/forum/returnpolicy.html">Refund Policy</a>
          <a target="_blank" href="https://www.bestekdirect.com/forum/shippingpolicy.html">Shipping Policy</a>
          <a target="_blank" href="https://www.bestekdirect.com/warranty.html">Warranty Policy</a>
          <a target="_blank" href="https://www.bestekdirect.com/terms">Terms & Conditions</a>
          <a target="_blank" href="https://www.bestekdirect.com/privacy-policy">Privacy Policy</a>
          <a target="_blank" href="https://www.bestekdirect.com/influencerandreviewer.html">BESTEK Influencer</a>
        </div>
        <div class="img" style="display:none"><img src="@/assets/img20191220/copy.png" alt=""></div>
      </div>
    </div>
    <div :class="isShowDia?'lag-dialog fadeIn animated':'lag-dialog'" :style="{top:sTop+'px'}" v-show="isShowDia">
      <div>
        <p><i class="el-icon-close" @click="isShowDia=false"></i></p>
        <h2>SELECT YOUTR COUNTRY OR REGION</h2>
        <div>
          <a href="#"><img src="@/assets/img20191220/gl.png" alt=""><span>Global</span> </a>
          <a href="#"><img src="@/assets/img20191220/us.png" alt=""><span>United States</span></a>
          <a href="http://www.bestek.cn"><img src="@/assets/img20191220/cn.png" alt=""><span style="font-family:PingFang-SC-Medium">中国大陆</span> </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ff from '@/assets/img20191220/ff.png'
import tt from '@/assets/img20191220/tt.png'
import uu from '@/assets/img20191220/uu.png'
import gg from '@/assets/img20191220/gg.png'
import ii from '@/assets/img20191220/ii.png'
import ff2 from '@/assets/img20191220/ff2.png'
import tt2 from '@/assets/img20191220/tt2.png'
import uu2 from '@/assets/img20191220/uu2.png'
import gg2 from '@/assets/img20191220/gg2.png'
import ii2 from '@/assets/img20191220/ii2.png'
export default {
  data () {
    return {
      followImgs: [
        { img: ff, img2: ff2, isOver: false, link: 'https://www.facebook.com/BestekGlobal/' },
        { img: tt, img2: tt2, isOver: false, link: 'https://twitter.com/bestekglobal' },
        { img: uu, img2: uu2, isOver: false, link: 'https://www.youtube.com/channel/UCb0NcEeBFFocHptKsuC-FQQ' },
        { img: gg, img2: gg2, isOver: false, link: 'https://www.instagram.com/bestek_official/' },
        // { img: ii, img2: ii2, isOver: false, link: 'https://www.instagram.com/bestek_official/' },
      ],
      links_seller: [
        { title: 'Car Power Inverter', link: 'https://www.bestekdirect.com/power-inverters/power-inverter' },
        { title: 'Car Charger', link: 'https://www.bestekdirect.com/charger/car-charger' },
        { title: 'Surge Protector', link: 'https://www.bestekdirect.com/power-strip/surge-protector' },
        { title: 'Travel Adapter', link: 'https://www.bestekdirect.com/travel-converter/power-converter' },
        { title: 'Electric Toothbrush', link: 'https://www.bestekdirect.com/bestek-m-care-electric-toothbrush-blue' },
      ],
      links_us: [
        { title: 'Our Company', link: 'https://www.bestekdirect.com/about_us' },
        { title: 'Community', link: 'https://www.bestekdirect.com/forum/forumindex.html' },
        { title: 'Free Testing', link: 'https://www.bestekdirect.com/#/proTesting' },
        { title: 'Warranty Policy', link: 'https://www.bestekdirect.com/warranty.html' },
        { title: 'Contact Us', link: 'https://www.bestekdirect.com/contact_us' },
      ],
      links_support: [
        { title: 'Warranty Claim', link: 'https://www.bestekdirect.com/claim' },
        { title: 'Product Extension', link: 'https://www.bestekdirect.com/product-extension' },
        { title: 'Terms & Conditions', link: 'https://www.bestekdirect.com/terms' },
        { title: 'Privacy Policy', link: 'https://www.bestekdirect.com/privacy-policy' },
        { title: 'Intellectual Property Rights', link: 'https://www.bestekdirect.com/property.html' },
      ],
      sTop: 0,
      isShowDia: false
    }
  },
  methods: {
    changeIcon (num, idx) {
      this.followImgs[idx].isOver = num == 1 ? true : false;
    },
    showDialog () {
      this.sTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isShowDia = true;
    }
  }
}
</script>
<style lang="less" scoped>
.lag-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 33;
  > div {
    background: #ffffff;
    width: 45%;
    height: 305px;
    position: relative;
    box-shadow: 0 0 25px #6b6b6b;
    > p {
      position: absolute;
      top: 6px;
      right: 14px;
      font-size: 18px;
      cursor: pointer;
    }
    > div {
      text-align: center;
      a {
        cursor: pointer;
        font-family: Whitney-Medium;
        font-size: 18px;
        &:not(:last-child) {
          margin-right: 17%;
        }
        &:hover {
          text-decoration: none;
        }
        span {
          vertical-align: middle;
          color: #000;
        }
        img {
          width: 35px;
          margin-right: 20px;
          vertical-align: middle;
        }
      }
    }
    > h2 {
      font-size: 26px;
      font-family: Whitney-Semibold;
      font-weight: 600;
      color: #444444;
      text-align: center;
      margin: 55px 0 66px;
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 45px;
    }
  }
}
.footer-container {
  height: 411.5px;
  padding: 20px 0;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.company-box {
  min-width: 1210px;
  padding: 22px 0;
  background: #f1f3f4;
}
.flex {
  width: 1210px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.company:extend(.flex) {
  .text {
    width: 61%;
    a,
    span {
      font-family: Whitney-Medium;
      font-size: 16px;
      color: #666;
      padding: 0 1%;
      position: relative;
      &:first-child {
        padding-left: 0;
        font-family: Whitney-Semibold;
      }
    }
    span {
      &:after {
        content: "";
        position: absolute;
        width: 1px;
        height: 11px;
        background: #666;
        top: 4px;
        right: -3px;
      }
    }
    a {
      cursor: pointer;
      color: #888;
      display: inline-block;
      &:hover {
        color: #ec0007;
      }
      &:not(:last-child) {
        &:after {
          content: "";
          position: absolute;
          width: 1px;
          height: 11px;
          background: #666;
          top: 4px;
          right: -3px;
        }
      }
    }
  }
  .img {
    width: 340px;
    height: 32px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.footer:extend(.flex) {
  h3,
  h2 {
    font-family: Whitney-Semibold;
    font-size: 22px;
    color: #444;
    border-bottom: 1px solid #e92410;
    display: inline-block;
    padding-bottom: 22.5px;
    margin-bottom: 42px;
  }
  h2 {
    border-bottom: none;
  }
  li {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    a {
      font-family: Whitney-Medium;
      font-size: 13px;
      color: #666;
      &:hover {
        color: #ec0007;
      }
    }
  }
  .follow {
    .icons {
      margin-bottom: 130px;
      a {
        display: inline-block;
        &:not(:last-child) {
          margin-right: 12.5px;
        }
      }
      img {
        width: 26px;
      }
    }
    span {
      font-family: Whitney-Medium;
      font-size: 15px;
      color: #666;
    }
    .usa {
      cursor: pointer;
      img {
        width: 29.5px;
        height: 20.5px;
        margin-right: 17px;
      }
    }
  }
  .links:extend(.flex) {
    width: 996px;
    justify-content: space-between;
  }
  .logo {
    width: 214px;
    img {
      width: 134.5px;
      display: block;
    }
  }
}
</style>