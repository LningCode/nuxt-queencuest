export const state = () => ({
    addressList: []
})

export const mutations = {
    // 添加收货地址
    pushAddressList(state, list) {
        state.addressList = list;
    }
}

export const actions = {
    // 获取收货地址
    addressList({ commit }) {
        return this.$axios.$get('queryAddress').then(({ data }) => {
            commit('pushAddressList', data);
        })
    }
}