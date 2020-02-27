<template>
  <div class="edit">
    <div class="edit-navigator">
      <div class="edit-home" @click="backHome" alt="Home"></div>
      <span class="edit-title" v-show="fileName">{{fileName}} / </span>
      <span class="edit-title">隐私权保护政策</span>
      <span class="edit-tips" v-show="saveTime">最后保存于 {{ saveTime }}</span>
      <div class="btn edit-save" @click="saveFile" id="save">保存</div>
    </div>
    <div class="edit-container">
      <div class="edit-toolbar-wrapper">
        <div id="toolbar" class="edit-toolbar"></div>
      </div>
      <div class="edit-main-wrapper">
        <div class="edit-main-content">
          <div class="editor">
            <!-- <div class="editor-title">
              <input type="text" name="title" class='title' v-model="title"/>
            </div> -->
            <div id="main" class="edit-main" v-html="htmlContent">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import fs from '@/modules/Filesystem.js'
import {
  timeFormat
} from '@/lib/uitls'

import {
  getSavePath,
  openDialog
} from '@/modules/dialog'

export default {
  name: 'edit',
  data () {
    return {
      flag: false, // 导入true 新建 false
      editor: null,
      title: '隐私权保护政策',
      saveTime: 0, // 最后本地保存的时间
      htmlContent: '', // html内容
      savePath: null, // 保存路径
      fileName: '新建'// 本地保存的文件名 todo 要不要后缀名
    }
  },
  mounted () {
    this.flag = this.$store.state.Reader.isReadFile
    console.log('是否导入？', this.flag)
    this.checkImport()
  },
  methods: {
    /**
     * 检查是否导入文件内容
     */
    checkImport () {
      if (this.flag) {
        this.htmlContent = this.$store.state.Reader.fileContext
        this.fileName = this.$store.state.Reader.fileName
        this.savePath = this.$store.state.Reader.filePath
      }
      this.initEditor()
    },
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
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'table', // 表格
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

      this.editor = editor
    },
    getHtml () {
      return new Promise((resolve, reject) => {
        let text = this.editor.txt.html()
        if (text) resolve(text)
      })
    },
    /**
     * @description 点击保存文件
     */
    async saveFile () {
      // 获取内容
      this.htmlContent = await this.getHtml()
      console.log(this.htmlContent)

      if (!this.savePath) {
        this.savePath = this.saveAsDialog() // todo这里可能需要promise异步
      }
      this.writeFile()
      this.fileName = fs.getBasename(this.savePath)
    },
    /**
     * @description 写入文件
     */
    writeFile () {
      try {
        let error

        fs.writeFile(this.savePath, this.htmlContent, (err) => {
          error = err
        })

        if (!error) {
          // todo 弹窗上用的是原生logo，需要最后找个图片替换一下
          openDialog({
            type: 'info',
            buttons: ['OK'],
            detail: `保存成功：${this.savePath}`
          })
          this.localSave(this.htmlContent)
        }
      } catch (e) {
        console.log('error', e)
      }
    },
    /**
     * @description 保存对话框
     */
    saveAsDialog () {
      let result = getSavePath('privacyprotocol.html', { name: 'html', extensions: ['html'] })
      if (result) return result
    },
    /**
     * @description 更新保存时间
     */
    updateSaveTime () {
      this.saveTime = timeFormat(+new Date(), 'yyyy年MM月dd日 HH:mm:ss')
      console.log('最后保存时间', this.saveTime)
    },
    /**
     * @description 本地保存
     */
    localSave (content) {
      if (!content) return false
      window.localStorage.setItem('easy', content)
      this.updateSaveTime()
    },
    /**
     * @description 本地读取
     */
    localRead () {
      return window.localStorage.getItem('easy') || null
    },
    /**
     * @description 返回Index
     */
    async backHome () {
      this.htmlContent = await this.getHtml()

      if (this.savePath) {
        // 是否更新
        let result = openDialog({
          type: 'question',
          title: 'Update',
          buttons: ['yes', 'No'],
          defaultId: 0,
          cancelId: 1,
          detail: 'Do you want to update the file ?'
        })
        if (result === 0) {
          // 文件内容写入更新 todo 还未实现
        }
      } else if (this.htmlContent) {
        // 询问是否保存 并且关闭
        let result = openDialog({
          type: 'question',
          title: 'Save',
          buttons: ['yes', 'No'],
          defaultId: 0,
          cancelId: 1,
          detail: 'The file has not been saved.Do you want to Save it?'
        })
        console.log('result', result)
        result === 0 && this.saveFile()
      }

      // todo 记得把这路由打开
      this.$router.push('index')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/css/edit.css";
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
  .edit-home{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(~@/assets/home_icon.png) center center no-repeat;
    background-size: 20px;
    cursor: pointer;
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
    cursor: pointer;
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
      padding: 38px 60px 90px 60px;
      min-height: 500px; // todo
      background-color: #fff;
    }
  }
}
</style>