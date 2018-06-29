const {mysql} = require('../qcloud.js')
module.exports = async (cxt) => {
  let {bookid,openid} = cxt.request.query
  const mysqlSelect = mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let result
  if(bookid){
  // 图书详情也的评论列表
    result = await mysqlSelect.where('bookid',bookid)
  }else if(openid){
  // 根据个人的opid筛选
    result = await mysqlSelect.where('openid',openid)
  }      
  result.forEach(val => {
    val.user_info = JSON.parse(val.user_info)
  })
  cxt.body = {
    code:0,
    data:result
  }
}