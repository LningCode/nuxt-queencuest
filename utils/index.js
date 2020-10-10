/**
 * 检查是否为Function类型
 * @param {*} val
 */
export const isFn = (val) => {
    const type = Object.prototype.toString.call(val);
    return (type === '[object Function]') ? true : false;
}

/**
 * 无限级分类
 * @param {*} parentId 当前查找
 */
export function buildTree(list, parentId) {
    // 查询一级分类
    const findChild = list.filter(item => {
        return item.parentId === String(parentId)
    });
    if (findChild.length == 0) return [];
    // 对于父节点为0的进行循环，然后查出父节点为上面结果id的节点内容
    findChild.forEach((child) => {
        const buildtree = buildTree(list, String(child._id));
        // 加上buildtree.length条件，数组长度为0不添加children空数组
        if (buildtree) {
            child['children'] = buildtree;
        }
    });
    return findChild;
}