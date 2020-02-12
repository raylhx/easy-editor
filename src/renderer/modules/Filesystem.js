import fs from 'fs'

class Filesystem {
  constructor () {
    this.key = null
  }

  /**
   * @description 读取文件
   */
  readFile () {

  }
  /**
   * @description 写文件
   */
  writeFile (path, content, cb) {
    fs.writeFile(path, content, 'utf8', cb)
  }
}

export default new Filesystem()
