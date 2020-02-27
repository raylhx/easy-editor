import fs from 'fs'
import path from 'path'
import {
  startTemplate,
  endTemplate
} from './template'

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
   * @description 将内容插入Html模板中
   */
  insertIntoTemplate (data) {
    return startTemplate + data + endTemplate
  }
  /**
   * @description 从html内容中提取body内容
   * @param {string} data
   */
  extractFromContent (data) {
    let element
    let reg1 = /id="content_start">(.*)<\/div><\/div><\/body>/
    let res = data.match(reg1)
    if (res.length > 0) {
      element = res[1]
      return element
    }
    //  todo 抽取match方法，
    let reg2 = /<body>(.*)<\/body>/
    res = data.match(reg2)
    if (res.length > 0) {
      return res[1]
    }
  }
  /**
   * @description 读取文件
   */
  readFile (path, cb) {
    fs.readFile(path, (err, data) => {
      if (err) {
        cb(err, null)
      }
      let content = data.toString('utf8')
      // console.log('原始导入文件', content)
      if (content) {
        content = this.extractFromContent(content)
      }
      cb(null, content)
    })
  }
  /**
   * @description 写文件
   */
  writeFile (path, data, cb) {
    let content = this.insertIntoTemplate(data)
    fs.writeFile(path, content, 'utf8', cb)
  }
}

export default new Filesystem()
