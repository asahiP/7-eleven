declare module '*.jpg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'
declare module '*.webp'
declare module '*.bmp'
declare module '*.png'

declare interface Review {
  /** 用户名 */
  userName: string
  /** 用户头像 */
  userPic: string
  /** 评分 */
  rating: number
  /** 日期 */
  time: number
  /** 评价详文 */
  comment: string
  /** 实拍图 */
  pics?: string[]
}

declare interface Products {
  /** 唯一编号 */
  id: number
  /** 商品名 */
  name: string
  /** 商品描述 */
  description: string
  /** 主图 */
  pic: string
  /** 商品评价 */
  reviews: Review[]
  /** 价格 */
  price: number
  /** 是否自取 */
  isSelfFetch: boolean
  /** 等待时间 */
  delay?: number[]
  /** 能否加热 */
  canHeating: boolean
  /** 是否热门产品 */
  isHot: boolean
  /** 是否售馨 */
  isSoldout: boolean
}

declare interface Oder {
  /** 订单号 */
  id: string
  /** 订单时间 */
  date: number
  /** 订单状态 */
  status: 'untake'
  /** 提货序号 */
  num: string
  /** 提货时间 */
  time: string
  /** 提货门店 */
  location: string
  /** 订单列表 */
  cart: number[]
  /** 商品件数 */
  mapCartToCount: { [key: number]: number }
  /** 折扣满减 */
  discount: string
  /** 实付 */
  totalPrice: string
}