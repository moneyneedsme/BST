<template>
  <div>
    <template v-if="$store.state.isPc">
      <div class="pc_head">
        <div class="content">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="42" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <span class="userName">My Center</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">My Articles</el-dropdown-item>
              <el-dropdown-item command="b">My Applications</el-dropdown-item>
              <el-dropdown-item command="c">My Settings</el-dropdown-item>
              <el-dropdown-item command="e" divided class='align_center'>Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name:'headBox',
  methods:{
    handleCommand(command) {
      this.$message('click on item ' + command);
    }
  }
}
</script>
<style lang="less" scoped>
.pc_head{
  background: white;
  width: 100%;
  .content{
    line-height:65px;
    height:65px;
    width: 1200px;
    margin:0 auto;
    overflow: hidden;
    .el-dropdown{
      float: right;
      cursor: pointer;
      height: 65px;
      .el-avatar{
        vertical-align: middle;
      }
      .el-dropdown-menu__item{
        font-size:18px;
        font-weight:400;
        color:rgba(73,70,69,1);
      }
    }
    .userName{
      font-size:16px;
      font-weight:500;
      color:rgba(73,70,69,1);
      margin-left: 12px;
      vertical-align: middle;
    }
  }
}
</style>