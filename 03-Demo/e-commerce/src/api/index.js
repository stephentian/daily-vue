const BASEURL = 'https://www.easy-mock.com/mock/5bd91a2523c468500c85b724/rebuy/main'
const LOCALURL = 'http:localhost:3000/'

const url = {
  getMain: BASEURL + 'alldata',
  getGoodsInfo: BASEURL + 'goods',
  register: LACALURL + 'user/register',
  login: LOCALURL + 'user/login',
  getGoodsDetail: LOCALURL + 'goods/detail',
  getCategory: LOCALURL + 'goods/category',
  getCategorySub: LOCAL + 'goods/categorysub',
  getGoodsBySubID: LOCAL + 'goods/getGoodsBySubID'
}

module.export = url