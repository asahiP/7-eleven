const fakeProduct: Products[] = [
  {
    id: 0,
    name: '烤蔬菜混合色拉坚果配缇鱼酱和新鲜水果',
    description: '清新爽口的蔬菜搭混合各种坚果，搭配缇鱼酱带来丰富的口感',
    pic: '',
    reviews: [],
    price: 29.9,
    isSelfFetch: true,
    delay: null,
    canHeating: false
  },
  {
    id: 0,
    name: '辣肉披萨',
    description: '满满的辣肉让人吃过瘾',
    pic: '',
    reviews: [],
    price: 28,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '汤力美式（冷）',
    description: '口感丰富，颜值高，一款不一样的咖啡。',
    pic: '',
    reviews: [],
    price: 25,
    isSelfFetch: true,
    delay: null,
    canHeating: false
  },
  {
    id: 0,
    name: '蒜你有芝士',
    description: '蒜香面包包含满满的芝士夹心',
    pic: '',
    reviews: [],
    price: 15,
    isSelfFetch: true,
    delay: [1, 3],
    canHeating: true
  },
  {
    id: 0,
    name: '菌菇菠菜披萨',
    description: '菌菇的鲜美搭配上菠菜的清爽',
    pic: '',
    reviews: [],
    price: 39.9,
    isSelfFetch: true,
    delay: [5, 8],
    canHeating: true
  },
  {
    id: 0,
    name: '美式-热/冷',
    description: '浓浓的咖啡香味，入口微苦，唤醒一天的活力',
    pic: '',
    reviews: [],
    price: 9.72,
    isSelfFetch: true,
    delay: [1, 3],
    canHeating: true
  },
  {
    id: 0,
    name: '咖喱安格斯牛腩配糙米饭',
    description: '浓香咖喱配上软嫩牛腩，舌尖舞动的美味',
    pic: '',
    reviews: [],
    price: 38,
    isSelfFetch: true,
    delay: [5, 8],
    canHeating: true
  },
  {
    id: 0,
    name: '享瘦和牛能量碗',
    description: '精选和牛牛肉搭配新鲜蔬菜，吃饱不会胖',
    pic: '',
    reviews: [],
    price: 108,
    isSelfFetch: true,
    delay: null,
    canHeating: false
  },
  {
    id: 0,
    name: '芝士安格斯牛肉汉堡',
    description: '满满安格斯牛肉肉饼，搭配大片芝士',
    pic: '',
    reviews: [],
    price: 58,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '安格斯牛胸三明治配烤菠萝',
    description: '精选安格斯牛胸肉，新鲜的菠萝经过烘烤，带来酸甜的滋味',
    pic: '',
    reviews: [],
    price: 62,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '佛卡夏',
    description: '无糖、纯天然橄榄油 、海盐 、黑橄榄、圣女果、迷迭香',
    pic: '',
    reviews: [],
    price: 13,
    isSelfFetch: true,
    delay: [1, 3],
    canHeating: true
  },
  {
    id: 0,
    name: '无花果全麦',
    description: '粗粮与无花果的搭配',
    pic: '',
    reviews: [],
    price: 18,
    isSelfFetch: true,
    delay: [1, 3],
    canHeating: true
  },
  {
    id: 0,
    name: '炸鱼薯条',
    description: '由经高温油炸裹着面粉的龙利鱼和粗薯条构成',
    pic: '',
    reviews: [],
    price: 35,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '秘制香辣炸鸡',
    description: '甜香带辣的刺激感，一口咬下是柔嫩的鸡肉，实在令人再三吮指回味',
    pic: '',
    reviews: [],
    price: 48,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '南瓜汤配海盐迷迭香薄饼',
    description: '浓郁南瓜汤配上香脆薄饼，从里到外暖洋洋',
    pic: '',
    reviews: [],
    price: 48,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
  {
    id: 0,
    name: '榴莲菠萝披萨',
    description: '入口就是浓郁的榴莲牛奶的香味，再加上丝丝菠萝的酸甜，从没吃过这么致命的香味儿',
    pic: '',
    reviews: [],
    price: 88,
    isSelfFetch: true,
    delay: [3, 5],
    canHeating: true
  },
].map((item, index) => {
  item.id = 1010100 + index
  item.pic = require(`@public/img/products/${index + 1}.webp`).default

  return item
})

export default fakeProduct