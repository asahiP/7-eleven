import { range, getRandStr, random } from '@/utils'

const fakePics: string[] = range(1, 17).map(i => require(`@public/img/reviews/${i}.webp`).default)
const fakeComment: string[] = ["包装干净整洁，咖啡一点也没有撒，香浓的拿铁，比很多咖啡店都好喝，相当惊喜了！海盐也是很香脆劲道，最近吃到的最佳了。以后可以每天都点了。","颜值很高 分量很轻 下午会饿。烟熏三文鱼食材很新鲜是优点。","超赞的咖啡，价格非常优惠，口味很好。包装也很精致。以后还要支持。","多次拯救我的午餐！特别的酱汁非常有品位！","菌菇菠菜披萨非常迷你，口味也很一般~","虽然有点变形，但是我还是给100分，巨好吃，特别我是偏爱素食，这个披萨一点都不油，菌菇烤很嫩，菠菜也没有发黄，很翠绿，巨好吃","包装完整，温度保持地很好，汉堡超级好吃！咖啡也很不错，性价比超高！","牛肉还挺多的！","包装没问题……看着新店试一试…… 这个也不便宜吧 加券44元合计…… 就有虫…… 吃到一半 发现的死的虫…… 不是活的 ……刚开始打开后边边有那种扭动的 很小的 我想着是外面因素…… 盒子边上 没在意！ 里面吃到一半…… 看到这个 ……服了 也不想差评吧 ……","分量少到惊人","看着也挺大牌的，这酱能稍微多点不？","咖喱安格斯牛腩配糙米饭 一份餐里就两小块牛肉，其他都是土豆，太差了","被乡村种草，乡村面包配自制柑橘酱和黄油酱 还点了羊角和蒜蓉，都好吃，不过最喜欢的还是乡村，闻起来香喷喷，吃到嘴里外脆内软，配上黄油酱，哈哈哈，不长肉不长肉不长肉","搭配了两款酱 绝了 非常好吃 沙拉新鲜 量正好","很好","非常惊艳，很好吃，蔬菜烤得很香不干，橄榄油也不腻，松子粒很提香，安利同事下次直接杀过来吃午饭","除了稍微有点凉掉以外很赞，会再点～","快要入夏的午餐给自己来份素食Pizza，清清爽爽一人份保了口福，菠菜和蘑菇的搭配，鲜美多汁，难得pizza的底也那么好吃，香而有嚼劲，完美。","相比58元的原价，口味还行，但食料太少了","好","乡村面包已是回购了，终于也试到蒜你有芝士,偏爱蒜蓉包的我，觉得非常惊艳，会继续光顾尝试别的菜品。","很好很满意","好"]
const fakeUserPics: string[] = range(1, 7).map(i => require(`@public/img/default/${i}.jpg`).default)

function reviewFactory (): Review {
  const userName = getRandStr(random([8, 9, 10, 11]))
    .replace(/.*/, fragment => {
      return fragment.slice(0, 3) + '*'.repeat(fragment.length - 6) + fragment.slice(-3)
    })
  const userPic = random(fakeUserPics)
  const rating = random([3, 4, 5])
  const time = Date.now() + random([
    -1000, -5000,
    -10000, -20000,
    -30000, -40000,
    -80000, -160000,
    -160000 * 15
  ].map(i => i * 1000))
  const pics: string[] = range(random([0, 1, 2, 3])).map(i => random(fakePics))
  const comment = random(fakeComment)

  return {
    userName,
    userPic,
    rating,
    time,
    comment,
    pics
  }
}

export default function fakeReviews (length: number): Review[] {
  return range(length).map(i => reviewFactory())
}