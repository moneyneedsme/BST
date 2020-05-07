<template>
  <div class="classiy-box" @mouseover="classiyOver($event)">
    <div class="classiy">
      <div class="classiy-left">
        <a target="_blank" :class="[index==insetMsg.length-1?'view-more':'',isClick==index?'after-line':'']" @click="changeClassiy(index,$event)" :style="{color:(isClick!=index||index==insetMsg.length-1)?'#000':'#D1D1D1'}" :href="item.href" v-for="(item, index) in insetMsg" :key="index">
          <span>{{item.name}}</span>
        </a>
      </div>
      <p class="line"></p>
      <div class="classiy-right">
        <div class="imgs-right">
          <a target="_blank" :href="insetMsg[currIndex].href">
            <img :src="insetMsg[currIndex].bannerpc&&$api+insetMsg[currIndex].bannerpc" alt="">
            <div class="classifyMore">
              <button><span>Learn More</span></button>
            </div>
          </a>
        </div>
        <div class="imgs-left">
          <a class="sm-pro" target="_blank" :href="item.href" v-for="(item, index) in insetMsg[currIndex].products" :key="index">
            <span><img style="width:88%;" :src="$api+item.thumb" alt=""></span>
            <p>{{item.c_name}}</p>
          </a>
          <a target="_blank" v-if="insetMsg[currIndex].products&&insetMsg[currIndex].products.length>4" :href="insetMsg[currIndex].href" style="background:none;padding:0">
            <img :src="$api+insetMsg[currIndex].bannerviewmorepc" alt="">
            <div class="view-all">VIEW ALL</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currIndex: 0,
      isClick: 0,
    }
  },
  props: {
    insetMsg: Array
  },
  mounted () {
  },
  methods: {
    classiyOver (e) {
      if ($(e.target).hasClass('classiy-box')) {
        this.$parent.isClassifyOver = false;
      }
    },
    changeClassiy (idx, e) {
      this.isClick = idx;
      if (idx != this.insetMsg.length - 1) {
        e && e.preventDefault();
        this.currIndex = idx;
      }
    }
  },

}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.classiy-box {
  background: #eef1f4;
  min-width: 1425px;
  .classiy:extend(.flex) {
    width: 1210px;
    margin: 0 auto;
    height: 546.5px;
    padding: 48.5px 0 112px;
    .line {
      width: 2px;
      height: 100%;
      background: #d6d6d6;
      margin: 0 25px;
    }
    &-left {
      height: 100%;
      padding: 54px 0;
      .after-line {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 2px;
          height: 50px;
          background: #ec0007;
          top: -7px;
          right: -27px;
        }
      }
      a {
        width: 161px;
        height: 37px;
        background: #fff;
        border-radius: 18.5px;
        display: block;
        text-align: center;
        line-height: 37px;
        font-size: 14px;
        text-decoration: none;
        color: #fff;
        font-family: Whitney-Semibold;
        cursor: pointer;
        &:not(:last-child) {
          margin-bottom: 43.5px;
        }
      }
      a.view-more {
        background: #e70f16;
        color: #fff !important;
        position: relative;
        overflow: hidden;
        span {
          z-index: 2;
          position: relative;
        }
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 35.5px;
          background: #fff;
          bottom: -35.5px;
          left: 0;
          border-radius: 20px;
          transition: 0.2s;
        }
        &:hover {
          text-decoration: none;
          background: #fff;
          color: #000 !important;
          transition: 0.3s;
          &:after {
            bottom: 0;
            outline: none;
          }
        }
      }
    }
    &-right {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .imgs {
        &-right {
          width: 388.5px;
          height: 386px;
          margin-right: 18px;
          a {
            display: block;
            position: relative;
            overflow: hidden;
            &:hover {
              .classifyMore {
                opacity: 1;
              }
              img {
                transform: scale(1.05);
              }
            }
            .classifyMore {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.3);
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0;
              transition: all 0.3s;
              button {
                width: 156px;
                height: 35.5px;
                background: none;
                border-radius: 18px;
                font-size: 17px;
                font-family: Whitney-Medium;
                font-weight: 500;
                color: #ffffff;
                border: none;
                cursor: pointer;
                overflow: hidden;
                position: relative;
                border: 2px solid #fff;
                span {
                  z-index: 2;
                  position: relative;
                }
                &:after {
                  content: "";
                  position: absolute;
                  width: 100%;
                  height: 35.5px;
                  background: #ec0007;
                  bottom: -35.5px;
                  left: 0;
                  border-radius: 20px;
                  transition: 0.2s;
                }
                &:hover {
                  text-decoration: none;
                  background: #ec0007;
                  color: #fff;
                  transition: 0.4s;
                  border-color: #ec0007;
                  &:after {
                    bottom: 0;
                    outline: none;
                  }
                }
              }
            }
            img {
              display: block;
              transition: all 0.8s;
            }
          }
        }
        &-left {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          height: 100%;
          .sm-pro {
            &:hover {
              text-decoration: none;
              img {
                transform: scale(0.9);
              }
            }
          }
          a {
            width: 184.5px;
            height: 184.5px;
            background: #fff;
            position: relative;
            &:nth-child(-n + 3) {
              margin-bottom: 17px;
            }
            &:not(:nth-child(3n)) {
              margin-right: 17px;
            }
            span {
              width: 140px;
              height: 140px;
              margin: 0 auto 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            p {
              font-size: 15px;
              font-family: Whitney-Semibold;
              font-weight: 600;
              color: rgba(102, 102, 102, 1);
              text-align: center;
              text-decoration: none;
              transition: all 0.5s;
            }
            img {
              transition: all 0.5s;
            }
            .view-all {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #fff;
              font-family: Whitney-Semibold;
              font-size: 25px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>