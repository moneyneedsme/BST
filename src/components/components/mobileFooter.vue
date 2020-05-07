<template>
  <div>
    <div :class="index==2?'mbFooter mbFooter1':'mbFooter'" v-for="(item,index) in mLinks" :key="index">
      <div class="mSeller" @click="openLinks(index)" :style="{borderBottom:(index<2||item.isShowLink)?'1px solid #bebebe':'none'}">
        <span>{{item.title}}</span>
        <span :class="item.isShowLink?'forkAni rotateIn animated':'fork rotateInDownLeft animated'"></span>
      </div>
      <el-collapse-transition>
        <div v-show="item.isShowLink">
          <ul class="mLinks">
            <li v-for="(item2, index2) in item.links" :key="index2"><a target="_blank" :href="item2.link">{{item2.title}}</a></li>
          </ul>
        </div>
      </el-collapse-transition>
    </div>
    <div class="mCompany">
      <div class="usa" @click="showDialog">
        <img src="@/assets/img20191220/usa.png" alt=""><span>United States(English/USD)</span>
      </div>
      <div class="mIcons">
        <a target="_blank" @mouseover="changeIcon(1,index)" @mouseout="changeIcon(2,index)" :href="item.link" v-for="(item, index) in followImgs" :key="index"><img :src="item.isOver?item.img2:item.img" alt=""></a>
      </div>
    </div>
    <div class="mCopy">
      <h3>©2020 BESTEK . Official Site</h3>
      <div>
        <a target="_blank" href="https://www.bestekdirect.com/forum/returnpolicy.html">Refund Policy</a>
        <a target="_blank" href="https://www.bestekdirect.com/forum/shippingpolicy.html">Shipping Policy</a>
        <a target="_blank" href="https://www.bestekdirect.com/warranty.html">Warranty Policy</a>
        <a target="_blank" href="https://www.bestekdirect.com/terms">Terms & Conditions</a>
        <a target="_blank" href="https://www.bestekdirect.com/privacy-policy">Privacy Policy</a>
        <a target="_blank" href="https://www.bestekdirect.com/influencerandreviewer.html">BESTEK Influencer</a>
      </div>
      <div class="img" style="display:none"><img src="@/assets/img20191220/copy.png" alt=""></div>
    </div>
    <div class="lag-dialog" :style="{top:sTop+'px'}" v-show="isShowDia">
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
      mLinks: [
        {
          title: 'Best Seller',
          isShowLink: false,
          links: [
            { title: 'Car Power Inverter', link: 'https://www.bestekdirect.com/power-inverters/power-inverter' },
            { title: 'Car Charger', link: 'https://www.bestekdirect.com/charger/car-charger' },
            { title: 'Surge Protector', link: 'https://www.bestekdirect.com/power-strip/surge-protector' },
            { title: 'Travel Adapter', link: 'https://www.bestekdirect.com/travel-converter/power-converter' },
            { title: 'Electric Toothbrush', link: 'https://www.bestekdirect.com/bestek-m-care-electric-toothbrush-blue' },
          ]
        },
        {
          title: 'About Us',
          isShowLink: false,
          links: [
            { title: 'Our Company', link: 'https://www.bestekdirect.com/about_us' },
            { title: 'Community', link: 'https://www.bestekdirect.com/forum/forumindex.html' },
            { title: 'Free Testing', link: 'https://www.bestekdirect.com/#/proTesting' },
            { title: 'Warranty Policy', link: 'https://www.bestekdirect.com/warranty.html' },
            { title: 'Contact Us', link: 'https://www.bestekdirect.com/contact_us' },
          ]
        },
        {
          title: 'Support',
          isShowLink: false,
          links: [
            { title: 'Warranty Claim', link: 'https://www.bestekdirect.com/claim' },
            { title: 'Product Extension', link: 'https://www.bestekdirect.com/product-extension' },
            { title: 'Terms & Conditions', link: 'https://www.bestekdirect.com/terms' },
            { title: 'Privacy Policy', link: 'https://www.bestekdirect.com/privacy-policy' },
            { title: 'Intellectual Property Rights', link: 'https://www.bestekdirect.com/property.html' },
          ]
        },
      ],
      followImgs: [
        { img: ff, img2: ff2, isOver: false, link: 'https://www.facebook.com/BestekGlobal/' },
        { img: tt, img2: tt2, isOver: false, link: 'https://twitter.com/bestekglobal' },
        { img: uu, img2: uu2, isOver: false, link: 'https://www.youtube.com/channel/UCb0NcEeBFFocHptKsuC-FQQ' },
        { img: gg, img2: gg2, isOver: false, link: 'https://www.instagram.com/bestek_official/' },
        // { img: ii, img2: ii2, isOver: false, link: 'https://www.instagram.com/bestek_official/' },
      ],
      isShowDia: false,
      sTop: 0
    }
  },
  methods: {
    changeIcon (num, idx) {
      this.followImgs[idx].isOver = num == 1 ? true : false;
    },
    openLinks (idx) {
      this.mLinks[idx].isShowLink = !this.mLinks[idx].isShowLink;
      this.mLinks.forEach((_, _index) => {
        if (_index != idx) {
          _.isShowLink = false;
        }
      })
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
    width: 90%;
    position: relative;
    box-shadow: 0 0 25px #6b6b6b;
    padding: 1rem 0;
    > p {
      position: absolute;
      top: 6px;
      right: 14px;
      font-size: 18px;
      cursor: pointer;
    }
    > div {
      display: flex;
      flex-direction: column;
      padding-left: 3rem;
      a {
        cursor: pointer;
        font-family: Whitney-Medium;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
        font-size: 0.35rem;
        &:hover {
          text-decoration: none;
        }
        span {
          vertical-align: middle;
          color: #000;
        }
        img {
          width: 0.7rem;
          vertical-align: middle;
          margin-right: 0.5rem;
        }
      }
    }
    > h2 {
      font-size: 0.5rem;
      font-family: Whitney-Semibold;
      color: rgba(68, 68, 68, 1);
      text-align: center;
      margin: 0 0 1rem;
      padding: 0 1.5rem 0.8rem;
      border-bottom: 1px solid #dfdfdf;
    }
  }
}
.mCopy {
  padding: 1rem 0.4rem;
  background: #f1f3f4;
  h3 {
    font-family: Whitney-Semibold;
    font-size: 0.4rem;
    color: #666;
    margin-bottom: 0.8rem;
    text-align: center;
  }
  .img {
    margin-top: 0.6rem;
    img {
      width: 60%;
      display: block;
      margin: 0 auto;
    }
  }
  a {
    font-family: Whitney-Medium;
    font-size: 0.3rem;
    color: #666;
    padding: 0 1%;
    position: relative;
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
.mCompany {
  text-align: center;
  padding: 1rem 0;
  .mIcons {
    margin-top: 0.7rem;
    a {
      &:not(:last-child) {
        margin-right: 0.35rem;
      }
    }
    img {
      width: 34px;
      height: 34px;
    }
  }
  .usa {
    img {
      width: 40px;
      height: 28px;
      margin-right: 20px;
    }
    span {
      font-family: Whitney-Medium;
      font-size: 0.35rem;
      color: #858585;
    }
  }
}
.mbFooter1 {
  border-bottom: 1px solid #bebebe;
}
.mbFooter {
  .mLinks {
    width: 100%;
    li {
      color: #444;
      font-family: Whitney-Book;
      border-bottom: 1px solid #bebebe;
      a {
        color: #666;
        font-family: Whitney-Book;
        font-size: 0.35rem;
        display: block;
        position: relative;
        padding: 0.35rem 0;
      }
    }
  }
  padding: 0 0.5rem;
  > div {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    > span {
      font-family: Whitney-Semibold;
      color: #444;
      font-size: 0.45rem;
      transition: all 0.5s;
    }
    .forkAni {
      position: relative;
      &::before {
        content: "";
        width: 16px;
        height: 2px;
        background: #444;
        position: absolute;
        top: 12px;
        right: 3px;
      }
    }
    .fork {
      position: relative;
      transition: all 0.2s;
      &::after {
        content: "";
        width: 2px;
        height: 16px;
        background: #444;
        position: absolute;
        top: 5px;
        right: 10px;
      }
      &::before {
        content: "";
        width: 16px;
        height: 2px;
        background: #444;
        position: absolute;
        top: 12px;
        right: 3px;
      }
    }
  }
}
</style>