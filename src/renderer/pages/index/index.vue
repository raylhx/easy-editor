<template>
  <div class="index">
    <div class="logo"></div>
    <section>
      <button class="btn-import">导入文件</button>
      <button class="btn-create">新建一个</button>
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
  padding-top: 115px;
  .logo {
    width: 128px;
    height: 128px;
    margin: 0 auto;
    background: url(~@/assets/logo.png) center center no-repeat;
    background-size: 128px;
  }
  button {
    display: block;
    width: 120px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 20px;
    outline: none;
  }
  .btn-import {
    color: #000;
    background-color: #ffdd00;
  }
  .btn-create {
    color: #fff;
    background-color: #ccc;
  }
}
</style>