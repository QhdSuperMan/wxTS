import config from '../config.js'
export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
function request (url, method, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      method,
      data,
      url: config.host + url,
      success (data) {
        if (data.data.code === 0) {
          resolve(data.data)
        } else {
          reject(data.data)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
export function model (title, content, func, err) {
  wx.showModal({
    title,
    content,
    success:func,
    fail:err
  })
}
