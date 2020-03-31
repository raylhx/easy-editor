import fs from 'fs'
import path from 'path'
const mammoth = require('mammoth')

class Filesystem {
  constructor () {
    this.key = null
  }
  /**
   * @description 绝对路径获取文件名
   */
  getBasename (url = '') {
    let name = path.basename(url)
    if (name) return name
  }
  /**
   * @description 从html内容中提取body内容
   * @param {string} data
   */
  extractFromContent (data) {
    //  todo 抽取match方法，
    let reg2 = /<body>(.*)<\/body>/
    let res = data.match(reg2)
    if (res.length > 0) {
      return res[1]
    }
  }
  /**
   * @description 读取文件
   */
  readFile (path = '') {
    return new Promise((resolve, reject) => {
      if (!path) resolve('')
      fs.readFile(path, (err, data) => {
        if (err) {
          resolve('')
        }
        let content = data.toString('utf8')
        // console.log('读取内容', content)
        resolve(content)
      })
    })
  }
  /**
   * @description 写文件
   */
  writeFile (path = '', data = '') {
    return new Promise((resolve, reject) => {
      if (!data || !path) resolve('')

      fs.writeFile(path, data, 'utf8', (err) => {
        console.log('write error', err)
        if (!err) {
          resolve('ok')
        }
      })
    })
  }
  readDocx (path) {
    return new Promise((resolve, reject) => {
      console.log('path', path)
      if (!path) resolve('')

      fs.readFile(path, (err, data) => {
        if (err) {
          console.log('readfile error', err)
          resolve('')
        }
        mammoth.convertToHtml({arrayBuffer: data})
          .then(function (result) {
            let content = result.value // The generated HTML
            let messages = result.messages // Any messages, such as warnings during conversion
            // console.log('html', content)
            console.log('read docx messages', messages)
            resolve(content)
          })
          .done()
      })
    })
  }
}

export default new Filesystem()
