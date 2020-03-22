<template>
  <div class="index">
    <div class="logo"></div>
    <section class="select-btn">
      <button class="btn-create"><router-link to="/edit">新建一个</router-link></button>
      <button class="btn-import"><a>导入文件</a></button>
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
// import fs from '@/modules/Filesystem.js'

import {
  selectFileDialog
} from '@/modules/dialog'
export default {
  data () {
    return {
      readFilePath: '', // 读取本地文件的文件路径
      recordList: []
    }
  },
  mounted () {
    this.readLocal()
  },
  methods: {
    /**
     * @description 用户点击导入按钮
     */
    importFile () {
      let result = selectFileDialog()
      if (result.length > 0) {
        this.readFilePath = result[0]
        this.readFile(this.readFilePath)
      }
    },
    async readFile (path = null) {
      // if (!path) return false
      // const res = await fs.readTemplate(path)
    },
    updateRecordList () {
      this.recordList = this.$store
    },
    readLocal () {
      let list = window.localStorage.getItem('editorFileInfoList') || []
      this.$store.dispatch('Recorder/READ_LOCAL', list)
      this.updateRecordList()
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