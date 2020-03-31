const state = {
  isReadFile: false, // 是否读取文件
  fileContext: '', // 读取文件内容
  fileName: '', // 文件名
  filePath: '' // 文件路径
}

const mutations = {

  // 更新文件
  UPDATE_FILE (state, file) {
    if (file.context === '') return false

    state.isReadFile = true
    state.fileContext = file.context
    state.fileName = file.name
  }
}

const actions = {
  UPDATE_FILE ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_FILE', data)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
