import { setLocalStore } from '@/utils/storage';
import { buildTree } from '@/utils';

export const state = () => ({
    token: null,
    // 用户/网站基础信息
    baseInfo: null,
    /**
     * 保存操作收货地址弹层信息：打开/关闭
     * @visible 控制弹层打开/关闭
     * @type 添加或修改 add/edit
     * @keep true为下单时添加，默认在个人中心添加，勾选添加到地址列表
     * @data 编辑时获取到的数据
     */
    addressDialogInfo: {
        visible: false,
        type: 'add',
        keep: false,
        data: {}
    },
    // 购物车列表
    cartList: [],
    // 创建订单信息
    createOrderInfo: {},
    // 导航信息
    navMenu: [],
    productInfo: {}
})

export const getters = {
}

export const mutations = {
    // 保存token
    pushToken(state, token) {
        state.token = token;
    },
    // 保存用户信息
    pushBaseInfo(state, info) {
        state.baseInfo = info;
    },
    // 保存商品详情信息
    keepProductInfo(state, info) {
        state.productInfo = info;
    },
    pushAddressDialogInfo(state, info) {
        const json = { ...state.addressDialogInfo, ...info };
        state.addressDialogInfo = json;
    },
    // 添加购物车列表数据
    cartList(state, list) {
        state.cartList = list;
    },
    // 收集订单信息
    pushOrderInfo(state, param = {}) {
        state.createOrderInfo = { ...state.createOrderInfo, ...param };
    },
    pushNavMenu(state, list) {
        state.navMenu = list;
    }
}

export const actions = {
    // req 为node原生req, ctx 为koa ctx
    nuxtServerInit({ commit }, { redirect, req }) {
        // const token = this.$cookies.get('token');
        // if (!token) {
        //     req.ctx.cookies.set('token', '', { signed: false, maxAge: 0 });
        //     redirect('/login');
        //     return
        // }
        // commit('pushToken', token);
    },
    // 获取用户信息
    fetchBaseInfo({ commit }, { email }) {
        return this.$axios.$get(`baseInfo?email=${email}`).then(({ data }) => {
            setLocalStore('baseInfo', data);
            commit('pushBaseInfo', data);
        });
    },
    // 查询购物车列表数据
    fetchCartList({ commit }) {
        return this.$axios.$get('cartList').then(({ data }) => {
            commit('cartList', data);
        });
    },
    // 获取顶部导航
    fetchVavMenu({ commit }) {
        return this.$axios.$get('navMenu').then(({ data }) => {
            const list = buildTree(data, '0');
            commit('pushNavMenu', list);
        }).catch(err => {});
    },
    // 添加或去除商品收藏
    fetchCollect({ commit }, option) {
        return this.$axios.$post('collect', option);
    }
}