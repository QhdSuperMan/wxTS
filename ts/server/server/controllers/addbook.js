const https = require('https')
const {mysql} = require('../qcloud')

module.exports =  async (ext, next) => {
  let result, {svn:isbn,openid} = ext.request.body
  if(isbn && openid) {
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length) {
      ext.body = {
        code: -1,
        data: '图书已经存在'
      }
      return
    }
    await getJson("https://api.douban.com/v2/book/isbn/"+ isbn).then(data => {
      result = data
    })
    const {title, image, alt, publisher, summary, price} = result
    const rate = result.rating.average
    const tags = result.tags.map(v => {
        return `${v.title} ${v.count}`
    }).join(',')
    const author = result.author.join(',')
    try {
        await mysql('books').insert({
            isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
        })
        ext.state.data = {
            code: 0,
            title,
            msg: 'success'  
        }
    } catch (e) {
      ext.state = {
          code: -1,
          data: {
              msg: '新增失败:' + e.sqlMessage
          }
      }
    }
  }
}

function getJson (url) {
  return new Promise((resolve,reject)=> {
    https.get(url,res => {
      var result = ''
      res.on('data',data => {
        result += data
      })
      res.on('end',data => {
        resolve(JSON.parse(result))
      })
    })
  })
}