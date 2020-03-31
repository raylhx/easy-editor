<template>
  <div class="index">
    <div class="logo"></div>
    <section class="select-btn">
      <button class="btn-create"><router-link to="/edit">新建一个</router-link></button>
      <button class="btn-import"><a @click="importFile()">导入文件</a></button>
    </section>
    <section class="history" v-if="recordList.length > 0">
      <h2>最近记录</h2>
      <ul>
        <li v-for="(item, idx) in recordList" :key="idx">
          <div class="check-icon"></div>
          <span class="time">{{recordList.date}}</span>
          <span class="path-text">文件路径：{{recordList.path}}</span>
        </li>
      </ul>
      
    </section>
  </div>
</template>

<script>
import fs from '@/modules/Filesystem.js'

import {
  selectFileDialog,
  openDialog
} from '@/modules/dialog'
export default {
  data () {
    return {
      recordList: []
    }
  },
  mounted () {
    // this.readLocal()
  },
  methods: {
    /**
     * @description 用户点击导入按钮
     */
    importFile () {
      let result = selectFileDialog()
      if (result) {
        let readFilePath = result[0]
        this.readFile(readFilePath)
      }
    },

    async readFile (path = null) {
      if (!path) return

      if (!this.isWordFile(path)) {
        openDialog({
          type: 'error',
          buttons: ['OK'],
          detail: 'Only docx or doc document types are supported'
        })
        return
      }

      const res = await fs.readDocx(path)
      if (res !== '') {
        console.log('read word success')
        this.$store.dispatch('Reader/UPDATE_FILE', {
          context: res,
          name: fs.getBasename(path)
        })
        this.$router.push('edit')
      }
    },
    updateRecordList () {
      this.recordList = this.$store
    },
    readLocal () {
      let list = window.localStorage.getItem('editorFileInfoList') || []
      this.$store.dispatch('Recorder/READ_LOCAL', list)
      this.updateRecordList()
    },
    /**
     * @description 判断是否为word文档
     * @param {string} name 文件名称
     */
    isWordFile (name) {
      const lastIndex = name.lastIndexOf('.') + 1
      if (!lastIndex) return false
      const len = name.length
      const suffix = name.substring(lastIndex, len)
      if (suffix === 'doc' || suffix === 'docx') return true
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  padding-top: 90px;
  .logo {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    margin-bottom: 40px;
    background: url(~@/assets/logo.png) center center no-repeat;
    background-size: 130px;
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
  .history {
    width: 600px;
    margin: 0 auto;
    padding-top: 20px;
    h2 {
      font-size: 20px;
      color: #8c8c8c;
      font-weight: bold;
      text-align: center;
    }
    ul {
      width: 100%;
    }
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
      color: #8c8c8c;
      font-size: 16px;
      .check-icon {
        width: 16px;
        height: 16px;
        background: url(~@/assets/check_icon.png) center center no-repeat;
        background-size: 16px;
      }
      .time {
        padding: 0 8px;
      }
    }
  }
}
</style>