// const isClient = process.env.VUE_ENV === 'client';
import config from '../../config';
import qs from "qs";
import { Message, Loading } from 'element-ui';

// 错误码
const errorCode = {
    'en-US': {
        200: 'Success', // 成功
        401: 'Login session expired',
        404: 'Path does not exist',
        500: 'System error please contact customer service',
        1001: 'You are already a member of this site, you cannot perform this operation', // 您已是本站会员，不能执行这个操作
        1002: 'E-mail can not be empty', // 邮箱不能为空
        1003: 'Email is invalid', // 邮箱不合法
        1004: 'Email registered', // 邮箱已注册
        1005: 'verification code must be filled', // 验证码不能为空
        1006: 'password can not be blank', // 密码不能为空
        1007: 'confirm password can not be blank', // 确认密码不能为空
        1008: 'Passwords entered twice are inconsistent',  // 两次输入的密码不一致
        1009: 'The verification code is incorrect', // 验证码填写不正确
        10010: 'Registration failed, please contact the administrator', // 注册失败，请联系管理员
        10011: 'Member is not logged in', // 会员未登录
        10012: 'Member information does not exist', // 会员信息不存在
        10013: 'Member has been disabled, please contact the administrator', // 会员已被禁用，请联系管理员
        10015: 'Login password is incorrect', // 登录密码不正确
        10016: 'Email is not registered', // 邮箱未注册
        10019: 'Email sending failed, please check', // 邮件发送失败，请检查
        10020: 'Old password cannot be empty', // 旧密码不能为空
        10021: 'Old password entered incorrectly', // 旧密码输入错误
        10022: 'New password cannot be empty', // 新密码不能为空
        10025: 'Inconsistent old and new passwords', // 新旧密码不一致
        10026: 'The old and new passwords cannot be the same', // 新旧密码不能一样
        10027: 'New mailbox cannot be empty', // 新邮箱不能为空
        10028: 'The old and new mailboxes cannot be the same', // 新旧邮箱不能一样
        10029: 'Email is already in use, please change another email', // 邮箱已被使用，请更换其他邮箱
        10030: 'Information has expired', // 信息已经失效
        10031: 'Abnormal token information', // 令牌信息异常
        10032: 'Failed to modify information', // 修改信息失败
        10033: 'Add address failed', // 地址添加失败
        10034: 'Failed to delete address', // 删除地址失败
        10035: 'Information modified success', // 信息修改成功
        10036: 'Product added success', // 商品添加成功
        10037: 'Failed to add product', // 添加商品失败
        10038: 'Invalid parameter', // 参数不合法
        10039: 'Order creation failed', // 订单创建失败
    }
}

function errorMessage(code = 500) {
    const msg = errorCode['en-US'][code];
    Message.error(msg);
}

let loadingInstance;
export default ({ redirect, $axios, app, store }) => {
    $axios.defaults.timeout = config.timeout;
    $axios.defaults.baseURL = config.baseUrl.domain;
    $axios.defaults.withCredentials = true;
    $axios.onRequest(config => {
        const { token } = store.state;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        loadingInstance = Loading.service({ fullscreen: true });
         //Option allowDots can be used to enable dot notation
        config.data = qs.stringify(config.data, {
            allowDots: true
        });
        return config    
    });
    $axios.onResponse(res => {
        if (loadingInstance) loadingInstance.close();
        if (res.status === 200) {
            Promise.resolve(res.data);
        } else {
            console.log('onResponse is not 200', res)
        }
    });
    $axios.onError(error => {
        if (loadingInstance) loadingInstance.close();
        const { response } = error;
        if (response) {
            const { errorCode } = response.data;
            errorMessage(errorCode);
            if (response.status === 401 || response.status === 405) {
                // 会话过期清除cookie token
                app.$cookies.set('cookie-token', '', { signed: false, maxAge: 0 });
                redirect('/login');
            }
            return Promise.reject(response.data);
        } else {
            Message.error('The network connection is abnormal, please try again later!');
            return Promise.reject({
                status: 500,
                message: 'fail',
                errorCode: 500,
                errorMessage: 'Network Error',
                message: 'The network connection is abnormal, please try again later!'
            })
        }
    })
};