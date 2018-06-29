const {mysql} = require('../qcloud.js')
module.exports = async (cxt) => {
  let { openid,bookid } = cxt.request.query
  let result = await mysql('comments').select('id').where('openid', openid).where('bookid', bookid)
  if (result.length > 0) {
    cxt.body = {
      code:0,
      data:'评论过了'
    }
  } else {
    cxt.body = {
      code:-1,
      data:'未评论'
    }
  }
}