import Vue from 'vue'

const method = {
    install(Vue) {
        /**
         * 全局方法校验表单
         * @param {*} self 当前调用组件的this
         * @param {*} fn 回调结果
         * @param {*} type 表单参数对象
         */
        Vue.prototype.fromValidate = (self, fn, type = 'formData') => {
            self.$refs[type].validate((valid) => {
                if (valid) fn(valid)
            })
        }
    }
}
Vue.use(method)
