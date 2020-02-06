<template>
  <div class="edit">
    <div class="edit-navigator">
      <div class="edit-logo-icon"></div>
      <span class="edit-title">这里是文件名字名字名字名字</span>
      <span class="edit-tips">最后更改于 2020年 2月 5日</span>       
      <div class="btn edit-save">保存</div>
      <!-- <div class="btn edit-impo rt">导出</div>         -->
    </div>
    <div class="edit-container">
      <div class="edit-tools">工具栏</div>
      <div class="main"></div>
    </div>
  </div>
</template>

<script>
  export default {
  
  }
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: 100%;
}
.edit-navigator {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  padding: 10px 30px;
  .edit-logo-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background: url(~@/assets/logo.png) center center no-repeat;
    background-size: 20px;
  }
  .edit-title {
    max-width: 300px;
    font-size: 20px;
    font-weight: 700;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .edit-tips {
    padding: 0 8px;
    font-size: 12px;
    color: #8c8c8c;
  }
  .btn {
    position: absolute;
    top: 10px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 30px;
    border-radius: 15px;
    font-size: 16px;
    background-color: #ffdd00;
  }
}
</style>