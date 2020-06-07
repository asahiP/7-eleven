export const location = [
  [ '上海古楼公路同润店(NO.1033)', '古楼公路1198弄269号' ],
  [ '上海世纪大道亚太盛汇店(NO.1034)', '世纪大道2002号南广场地下1层K1-90' ],
  [ '上海陆家嘴店(NO.1035)', '陆家嘴环路1088号' ],
  [ '上海耀体路钱滩店(NO.1036)', '耀体路212号晶耀商务广场1层L114a单元' ],
  [ '上海拱为路浦东医院店(NO.1037)', '拱为路2800号3号楼109室' ],
  [ '上海懿行路懿行店(NO.1038)', '懿行路与林展路交叉口西100米' ],
  [ '上海云岭东路合星店(NO.1039)', '云岭东路651号合星大厦1楼' ],
  [ '上海桂箐路桂箐店(NO.1040)', '桂箐路65号1层109室' ],
  [ '上海高科西路高科店(NO.1041)', '高科西路中建广场乐荟天地1层' ],
  [ '上海蒙自路融创店(NO.1042)', '蒙自路757号融创精彩PIE(13号线世博博物馆站)' ],
  [ '上海秀沿路秀沿店(NO.1043)', '环桥路与秀沿路交叉口西南100米' ],
  [ '上海新开河北路外滩店(NO.1044)', '新开河北路10号外滩SOHO D座内' ],
  [ '上海安波路安波店(NO.1045)', '安波路427号' ],
  [ '上海新闸路新闸店(NO.1046)', '地铁1号线新闸路213号人民广场大三角换乘大厅102、103号铺' ],
  [ '上海福山路城建店(NO.1047)', '福山路500号城建国际中心1层104' ],
  [ '上海和炯路三林店(NO.1048)', '和炯路228号' ],
  [ '上海世纪大道大都会店(NO.1049)', '世纪大道1217号100联世纪购物中心B2层' ],
  [ '上海康新公路时代店(NO.1050)', '康新公路3399弄25号楼1层101室' ],
  [ '上海梅陇镇外环店(NO.1051)', '梅陇镇外环路1-101-1铺位' ],
  [ '上海四川中路汉口店(NO.1052)', '市四川中路213号101室B区' ],
  [ '上海博兴路博兴店(NO.1053)', '博兴路656号' ],
  [ '上海定边路乐坊店(NO.1054)', '定边路260号' ],
  [ '上海共和新路共康店(NO.1055)', '共和新路四七一八弄5号' ],
  [ '上海安拓路创新店(NO.1056)', '安亭镇安拓路56号13号楼' ],
  [ '上海盈港东路国展店(NO.1057)', '徐泾镇盈港东路158号国家会展中心1层R106室' ],
  [ '上海南宁路徐汇店(NO.1058)', '南宁路1000号全筑大厦1层102-A室' ],
  [ '上海杨树浦路滨江店(NO.1059)', '杨树浦路1062号滨江国际广场2号楼' ],
  [ '上海梅园路上海站店(NO.1060)', '梅园路360号环龙商场1F层' ],
  [ '上海安智路安亭店(NO.1061)', '安亭镇安智路155号' ],
  [ '上海沪松公路九亭店(NO.1062)', '九亭镇沪松公路1399弄68号1层银行室' ]
].map((item: any[], index) => {
  item[1] = '上海市' + item[1]
  item[2] = 300 + Math.random() * 1000 * index
  return item
})