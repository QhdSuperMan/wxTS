const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page,openid} = ctx.request.query
    const size = 10
    const books = await get(openid,size,page)
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
 async function get (openid,size,page) {
    if (openid) {
        const books =await  mysql('books')
                .select('books.*', 'cSessionInfo.user_info')
                .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                .where('openid',openid)
                .orderBy('count','desc')
        return books
    } else {
        const books =await  mysql('books')
                .select('books.*', 'cSessionInfo.user_info')
                .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                .orderBy('count','desc')
                .limit(size)
                .offset(Number(page) * size)
                .orderBy('books.id', 'desc')
        // .orderBy('id','desc')
        return books
    }
}