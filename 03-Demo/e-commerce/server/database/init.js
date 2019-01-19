/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2019/1.19
 **/

const mongoose = require('mongoose')

const db = 'mongodb://localhost/regou-bd'

mongoose.Promise = global.Promise

exports.connect = () => {
  mongoose.connect(db)
  mongoose.connection.on('disconnected', () => {
    console.log('Connect to database fail!')
    mongoose.connect(db)
  })
  mongoose.connection.on('error', err => {
    console.log('Error:', err)
    mongoose.connect(db)
  })
  mongoose.connection.once('open', () => {
    console.log('Connect to database successfully!')
  })
}