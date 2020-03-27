const state = {
  fileInfoList: [] // 文件信息列表
}

const mutations = {
  UPDATE_LIST (state, item) {
    state.fileInfoList = item
    // state.fileInfoList.unshift(item)
    // state.fileInfoList.length > 5 && state.fileInfoList.pop()
    // window.localStorage.setItem('editorFileInfoList', state.fileInfoList)
  },
  UPDATE_LOCAL (state) {
    window.localStorage.setItem('editorFileInfoList', state.fileInfoList)
  },
  READ_LOCAL (state, list) {
    if (list && list.length <= 0) return false
    state.fileInfoList = list
  }
}

const actions = {
  UPDATE_LIST ({
    commit
  }, data) {
    commit('UPDATE_LIST', data)
  },
  READ_LOCAL ({
    commit
  }, data) {
    commit('READ_LOCAL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
