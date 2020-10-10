import storageKey from './keys'

function ls() {
    return window.localStorage;
}

/**
 * 设置本地缓存
 * @param {*} key 名称
 * @param {*} str 字符串对象
 */
export const setLocalStore = (key, str) => {
    const json = JSON.stringify(str);
    ls().setItem(key, json);
}

/**
 * 获取缓存数据
 * @param {*} key: string 名称
 */
export const getLocalStore = key => {
    const json = ls().getItem(key);
    return JSON.parse(json) || null;
}

/**
 * 删除本地缓存
 * @param {*} key: string 名称
 */
export const reLocalStore = key => {
    ls.removeItem(key)
}

// 清楚所有本地缓存
export function clearStorage() {
    Object.values(storageKey).forEach(e => reLocalStore(e));
}