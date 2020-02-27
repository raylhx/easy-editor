<template>
  <div class="index">
    <div class="logo"></div>
    <section class="select-btn">
      <button class="btn-create"><router-link to="/edit">新建一个</router-link></button>
      <button class="btn-import" @click="importFile"><a>导入文件</a></button>
    </section>
  </div>
</template>

<script>
import fs from '@/modules/Filesystem.js'

import {
  selectFileDialog
} from '@/modules/dialog'
export default {
  data () {
    return {
      readFilePath: '' // 读取本地文件的文件路径
    }
  },
  mounted () {
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
    readFile (path = null) {
      if (!path) return false
      fs.readFile(path, (err, data) => {
        if (err) {
          console.log('读取文件失败')
          return false
        }

        console.log('data', data)
        this.$store.dispatch('Reader/UPDATE_FILE', {
          context: data,
          name: fs.getBasename(this.readFilePath),
          path: path
        }).then(() => {
          this.$router.push('edit')
        })
      })
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
}
</style>