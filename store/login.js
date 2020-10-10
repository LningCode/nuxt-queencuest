export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    // 登录
    login({ commit }, optiom) {
        return this.$axios.$post('login', optiom);
    },
    // 登出
    loginOut() {
        return this.$axios.$get('loginOut');
    },
    register({ commit }, optiom) {
        return this.$axios.$post('register', optiom);
    }
}