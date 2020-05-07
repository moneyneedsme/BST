<template>
  <div>
    <my-pc-header v-if="$store.state.isPc" :shoppingNum="shoppingNum" :classifyPc="classifyPc"></my-pc-header>
    <my-mobile-header :shoppingNum="shoppingNum" :classifyMb="classifyMb" v-else></my-mobile-header>
  </div>
</template>
<script>
import myPcHeader from '@/components/components/pcHeader'
import myMobileHeader from '@/components/components/mobileHeader'
export default {
  components: {
    myPcHeader,
    myMobileHeader,
  },
  data () {
    return {
      classifyPc: [],
      classifyMb: [],
      shoppingNum: 0
    }
  },
  mounted () {
    //获取类目
    this.getClassify();
    this.getShoppingNum();
  },
  methods: {
    //获取类目
    getClassify () {
      this.$axios.get(this.$api + '/index.php?route=newhome/new2/getfullcate&emulateJSON=true')
        .then((res) => {
          if (res.data) {
            this.classifyPc = res.data.cates;
            this.classifyMb = res.data.mobilepcs;
            let imgArr = [];
            //循环拿出所有类目图片，发给上级，一起预加载
            getImg(res.data.cates);
            function getImg (data) {
              data.forEach((_, idx) => {
                for (let item in data[idx]) {
                  if (/(\.jpg|\.png)$/.test(data[idx][item])) {
                    imgArr.push(data[idx][item]);
                  }
                }
                if (_.children && _.children.length) {
                  getImg(_.children);
                }
                if (_.products && _.products.length) {
                  getImg(_.products);
                }
              })
            }
            let count = 0;
            let count2 = 0;
            for (let src of imgArr) {
              let image = new Image()
              image.src = this.$api + src;
              image.onload = () => {
                ++count;
                count2 = ((count / imgArr.length) * 100).toFixed(0) + "%";
                console.log('类目图片加载', count2)
              }
            }
            // this.$emit('imgArr', imgArr);
          }
        }).catch()
    },
    //获取购物车数量
    getShoppingNum () {
      this.$axios.get(this.$api + '/index.php?route=common/cart/cartnum')
        .then((res) => {
          if (res.data) {
            this.shoppingNum = res.data.totalcartnum;
          }
        }).catch()
    },
  }
}
</script>