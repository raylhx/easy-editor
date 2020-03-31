<template>
  <div class="edit">
    <div class="edit-navigator">
      <div class="edit-home" @click="backHome" alt="Home"></div>
      <span class="edit-title" v-show="fileName">{{fileName}} / </span>
      <span class="edit-title">文本文件</span>
      <span class="edit-tips" v-show="saveTime">最后保存于 {{ saveTime }}</span>
      <div class="btn edit-save" @click="saveFile" id="save">导出</div>
    </div>
    <div class="edit-container">
      <div class="edit-main-wrapper">
        <div class="editor">
          <div id="main" class="edit-main" v-html="importContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import TinyMCE

import tinymce from 'tinymce/tinymce'

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
      title: '文本文件',
      saveTime: 0, // 最后本地保存的时间
      htmlContent: '', // html内容
      savePath: null, // 保存路径
      fileName: '新建', // 本地保存的文件名 todo 要不要后缀名
      templateText: '', // 模板文件
      isInit: false,
      importContent: ''
    }
  },
  mounted () {
    this.flag = this.$store.state.Reader.isReadFile
    console.log('是否导入？', this.flag)
    this.checkImport()
    this.getTemplate()
  },
  beforeDestroy () {
    tinymce.get('main').destroy()
  },
  methods: {
    /**
     * 检查是否导入文件内容
     */
    checkImport () {
      if (this.flag) {
        this.importContent = this.$store.state.Reader.fileContext
        this.fileName = this.$store.state.Reader.fileName
        this.savePath = this.$store.state.Reader.filePath
      }
      this.$nextTick(() => {
        this.initEditor()
      })
    },
    async getTemplate () {
      const tpl = await fs.readFile(`${__static}/template/tp.html`)
      if (tpl) {
        console.log('获取到模板文件')
        this.templateText = tpl
      }
    },
    initEditor () {
      let path = process.env.NODE_ENV !== 'production' ? '/static' : __static
      let editor = tinymce.init({
        selector: '#main',
        language_url: `${path}/tinymce/zh_CN.js`,
        language: 'zh_CN',
        content_css: `${path}/tinymce/content.css`,
        skin_url: `${path}/tinymce/skins/ui/oxide`,
        element_format: 'html',
        branding: false,
        resize: false,
        schema: 'html5',
        remove_linebreaks: false,
        allow_conditional_comments: false,
        plugins: 'code paste preview lists',
        toolbar: 'code preview numlist strikethrough bullist bold italic underline subscript superscript blockquote outdent indent alignjustify alignleft aligncenter alignright',
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        paste_webkit_styles: 'all',
        height: '80vh'
      })
      this.isInit = true
      console.log('editor', editor)
    },
    getHtml () {
      return new Promise((resolve, reject) => {
        resolve(tinymce.activeEditor.getContent())
      })
    },
    /**
     * @description 点击保存文件
     */
    async saveFile () {
      // 获取内容
      this.htmlContent = await this.getHtml()

      if (!this.savePath) {
        let url = this.saveAsDialog() // todo这里可能需要promise异步
        if (!url) return
        this.savePath = url
      }
      this.writeFile()
      this.fileName = fs.getBasename(this.savePath)
    },
    /**
     * @description 写入文件
     */
    async writeFile () {
      try {
        let regx = /<insertContent>/gi
        let data = this.templateText.replace(regx, this.htmlContent)

        const result = await fs.writeFile(this.savePath, data)
        if (result) {
          // todo 弹窗上用的是原生logo，需要最后找个图片替换一下
          openDialog({
            type: 'info',
            buttons: ['OK'],
            detail: `保存成功：${this.savePath}`
          })
          this.localSave()
        } else {
          console.log('保存出错')
        }
      } catch (e) {
        console.log('error', e)
      }
    },
    /**
     * @description 保存对话框
     */
    saveAsDialog () {
      let result = getSavePath(`${timeFormat(+new Date(), 'yyyyMMddHHmm')}.html`, { name: 'html', extensions: ['html'] })
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
    localSave () {
      this.saveTime = timeFormat(+new Date(), 'yyyy-MM-dd HH:mm:ss')

      // let temp = {
      //   date: this.saveTime,
      //   path: this.savePath,
      //   content: this.htmlContent
      // }
      // 更新
      // this.$store.dispatch('Recorder/UPDATE_LIST', temp)
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
        result === 0 && this.writeFile()
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
        result === 0 && this.saveFile()
      }

      this.$router.push('index')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/css/edit.css";
* {
  box-sizing: border-box;
  font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
    Helvetica, Arial, sans-serif;
}
.edit {
  width: 100%;
  min-width: 960px;
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
  .edit-home {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(~@/assets/home_icon.png) center center no-repeat;
    background-size: 20px;
    cursor: pointer;
  }
  .edit-title {
    max-width: 600px;
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
  .edit-main-wrapper {
    width: 100%;
    height: 100%;
    padding: 16px 60px 64px;
    overflow: auto;
    background-color: #f9f9f9;
    .editor {
      // width: 874px;
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