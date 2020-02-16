import fs from 'fs'

class Filesystem {
  constructor () {
    this.key = null
  }

  /**
   * @description 读取文件
   */
  readFile (path, cb) {
    fs.readFile(path, (err, data) => {
      if (err) {
        cb(err, null)
      }
      cb(null, data.toString('utf8'))
    })
  }
  /**
   * @description 写文件
   */
  writeFile (path, content, cb) {
    fs.writeFile(path, content, 'utf8', cb)
  }
}

export default new Filesystem()
