/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const { mysql: config } = require('../config')

console.log('\n======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE = path.join(__dirname, './cAuth.sql')
const INIT_DB_FILETwo = path.join(__dirname, './snail.sql')
// const INIT_DB_FILEThree = path.join(__dirname, './comment.sql')

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})

console.log(`准备读取 SQL 文件：${INIT_DB_FILE}`)

// 读取 .sql 文件内容
const content = fs.readFileSync(INIT_DB_FILE, 'utf8')
const contentTwo = fs.readFileSync(INIT_DB_FILETwo, 'utf8')
// const INIT_DB_FILEThree = fs.readFileSync(INIT_DB_FILEThree, 'utf8')

console.log('开始执行 SQL 文件...')

// 执行 .sql 文件内容
DB.raw(content).then(res => {
    console.log('数据库初始化成功！')
    process.exit(0)
}, err => {
    throw new Error(err)
})
DB.raw(contentTwo).then(res => {
    console.log('books表创建成功！')
    process.exit(0)
}, err => {
    throw new Error(err)
})
