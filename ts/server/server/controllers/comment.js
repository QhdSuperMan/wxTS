const {mysql} = require('../qcloud.js')

module.exports = async (ext) => {
  let { openid,bookid,comment,phone,location } = ext.request.query
  let result = await mysql('comments').insert({openid, bookid, comment, phone, location})
  ext.body = {
    code:0,
    data:1
  }
}