const {mysql} = require('../qcloud')

module.exports = async (cxt) => {
  const id = cxt.request.query.id
  const data = await mysql('books').select('*')
                    .select('books.*', 'cSessionInfo.*')
                    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                    .where('id', id)
                    .first()
  data.user_info = JSON.parse(data.user_info)
  cxt.body = {
    code:0,
    data:data
  }
  let result = await mysql('books').
                    select('*').
                    where('id',id).
                    increment('count',1)
}