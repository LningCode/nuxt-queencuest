// 首页顶部导航
const menuNav = [
    {
        id: 'categories1234',
        name: '首页',
        url: '/',
        submenu: [],
        type: 'nav'
    },
    {
        id: 'categories2234',
        name: '防护用品',
        url: '/goods/productCategory?query=categories2234',
        submenu: [
            {
                id: 'goods3234',
                name: '面具'
            },
            {
                id: 'goods4234',
                name: '手套'
            },
            {
                id: 'goods5234',
                name: '防护镜'
            },
            {
                id: 'goods6234',
                name: '口罩'
            },
            {
                id: 'goods7234',
                name: '防护服'
            },
            {
                id: 'goods723s4',
                name: '额头体温计'
            },
            {
                id: 'goods723s4',
                name: '温度计'
            },
            {
                id: 'goods723s4',
                name: '喷雾器'
            },
            {
                id: 'goods723s4',
                name: '测试盒'
            },
            {
                id: 'goods723s4',
                name: '药物'
            }
        ],
        type: 'sort'
    },
    {
        id: 'categories3234',
        name: '保健与家庭',
        url: '/goods/productCategory?query=categories3234',
        submenu: [
            {
                id: 'goods1234',
                name: '个人护理'
            },
            {
                id: 'goods2234',
                name: '清洁/消毒'
            },
            {
                id: 'goods3234',
                name: '灭蚊灯'
            },
            {
                id: 'goods4234',
                name: '装饰物'
            },
            {
                id: 'goods5234',
                name: '厨房用具'
            },
            {
                id: 'goods6234',
                name: '体验用品'
            },
            {
                id: 'goods7234',
                name: '性玩具'
            }
        ],
        type: 'sort'
    },
    {
        id: 'categories3234',
        name: '玩具与游戏',
        url: '/goods/productCategory?query=categories3234',
        submenu: [
            {
                id: 'goods1234',
                name: '玩具'
            },
            {
                id: 'goods1234',
                name: '电子游戏'
            }
        ],
        type: 'sort'
    },
    {
        id: 'categories5234',
        name: '我们是谁',
        url: '/personal/quienessomos',
        submenu: [
            {
                id: 'goods7234',
                name: '关于我们'
            },
            {
                id: 'goods7234',
                name: '证书'
            }
        ],
        type: 'nav'
    },
    {
        id: 'categories6234',
        name: '联系方式',
        url: '/personal/contacto',
        submenu: [],
        type: 'nav'
    }
]

// 品牌推荐
const brandScreening = [
    {
        id: 2423432,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/2011101524233293.png',
        path: '',
        cn_name: '路易威登',
        en_name: 'Louis Vuitton',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    },
    {
        id: 2142355,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/2011101634834203.png',
        path: '',
        cn_name: '爱马仕',
        en_name: 'Hermes',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    },
    {
        id: 2423432,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/20111019165244380.png',
        path: '',
        cn_name: '巴宝利',
        en_name: 'Burberry',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    },
    {
        id: 2142355,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/20111018131701234_S.png',
        path: '',
        cn_name: '古奇',
        en_name: 'GUCCI',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    },
    {
        id: 2423432,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/20111018161764670.png',
        path: '',
        cn_name: '香奈儿',
        en_name: 'CHANEL',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    },
    {
        id: 2142355,
        icon: 'http://www.138top.com/UploadFiles/2011-10/admin/20111018222252785.png',
        path: '',
        cn_name: '阿玛尼',
        en_name: 'Armani',
        seoKeywords: '路易威登, Louis Vuitton, lv, LV',
        desc: '品牌描述'
    }
]

module.exports = {
    menuNav,
    brandScreening
}