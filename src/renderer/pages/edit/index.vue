<template>
  <div class="edit">
    <div class="edit-navigator">
      <span class="edit-title">这里是文件名字名字名字名字</span>
      <span class="edit-tips">最后更改于 2020年 2月 5日</span>       
      <div class="btn edit-save">保存</div>
      <!-- <div class="btn edit-impo rt">导出</div>         -->
    </div>
    <div class="edit-container">
      <div class="edit-toolbar-wrapper">
        <div id="toolbar" class="edit-toolbar"></div>  
      </div>
      <div class="edit-main-wrapper">
        <div class="edit-main-content">
          <div class="editor">
            <div class="editor-title">
              <input type="text" name="title" class='title' value="todo这里需要再考虑一下"/>
            </div>
            <div id="main" class="edit-main"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  name: 'edit',
  data () {
    return { }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    /**
     * @description 初始化编辑器
     */
    initEditor () {
      let editor = new Editor('#toolbar', '#main')
      // 自定义菜单栏选项
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        // 'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        // 'quote', // 引用
        // 'emoticon', // 表情
        // 'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 自定义颜色字体
      editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#ff0000',
        '#ffffff'
      ]
      editor.customConfig.pasteIgnoreImg = true
      editor.create()
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.edit {
  width: 100%;
  // height: 100%;
  height: 100vh;
  overflow: hidden;
}
.edit-navigator {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  padding: 10px 30px;
  border: 1px solid #e8e8e8;
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
.edit-container {
  width: 100%;
  height: calc(100vh - 50px);
  .edit-toolbar-wrapper {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    .edit-toolbar {
      width: 555px;
      padding: 6px 0;
      margin: 0 auto;
    }
  }
  .edit-main-wrapper {
    width: 100%;
    height: calc(100% - 39px);
    overflow: auto;
    background-color: #f9f9f9;
    .edit-main-content {
      width: 100%;
      padding: 16px 0 64px 0;
    }
    .editor {
      width: 874px;
      margin: 0 auto;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 8px rgba(115, 115, 115, 0.08);
      background-color: #fff;
    }
    .editor-title {
      width: 100%;
      height: 115px;
      padding: 48px 60px 0 60px;
      input.title {
        display: block;
        width: 100%;
        line-height: 50px;
        color: #262626;
        font-weight: 700;
        font-size: 36px;
        border-bottom: 1px solid #e8e8e8;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
    }
    .edit-main {
      position: relative;
      width: 100%;
      padding: 0px 60px 90px 60px;
      min-height: 500px; // todo
      background-color: #fff;
    }
  }
}
</style>