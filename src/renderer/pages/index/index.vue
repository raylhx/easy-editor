<template>
  <div class="index">
    <div class="logo"></div>
    <section class="select-btn">
      <button class="btn-create"><router-link to="/edit">新建一个</router-link></button>
      <button class="btn-import"><router-link to="/bar">导入文件</router-link></button>
    </section>
  </div>
</template>

<script>
  export default {
  
  }
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  padding-top: 90px;
  .logo {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background: url(~@/assets/logo.png) center center no-repeat;
    background-size: 300px;
  }
  .select-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    display: inline-block;
    width: 120px;
    height: 40px;
    margin-right: 20px;
    border-radius: 20px;
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .btn-import {
    color: #fff;
    background-color: #ccc;
  }
  .btn-create {
    color: #000;
    background-color: #ffdd00;
  }
}
</style>