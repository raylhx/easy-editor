const state = {
  main: 123,
  isReadFile: '', // 是否读取文件
  fileContext: '', // 读取文件内容
  fileName: '' // 文件名
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  // 更新文件
  UPDATE_FILE (state) {
    state.main += 10
  }
}

const actions = {
  UPDATE_FILE ({commit}) {
    console.log('???')
    commit('UPDATE_FILE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
