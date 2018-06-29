const {mysql} = require('../qcloud.js')

module.exports = async (cxt) => {
  let result = await  mysql('books').select('id','image').orderBy('count','desc').limit(9)
  cxt.body = {
    code:0,
    data:result
  }
}