const state = {
  main: 0,
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
  }
}

const actions = {
  someAsyncTask ({
    commit
  }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
